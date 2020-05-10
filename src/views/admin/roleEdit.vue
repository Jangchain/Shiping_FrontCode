<template>
  <div class="app-container">
    <p class="f-ar"><router-link :to="{ path: './' }"><el-button size="mini">返回</el-button></router-link></p>
    <el-form :model="form" label-width="120px">
      <el-form-item label="角色编码">
        <el-input v-model="form.code" :disabled="formType==='detail' || formType==='edit'" @input="checkCode" />
      </el-form-item>
      <el-form-item label="角色名称">
        <el-input v-model="form.name" :disabled="formType==='detail'" @input="checkName" />
      </el-form-item>
      <el-form-item>
        <el-tree
          :data="menuList"
          :props="defaultProps"
          show-checkbox
          node-key="cdcKey"
          :disabled="formType==='detail'"
          :default-checked-keys="defaultCheckedKeys"
          @check="handleCheckChange"
          >
        </el-tree>
      </el-form-item>
      <el-form-item>
        <template v-if="formType!=='detail'">
          <el-button type="primary" @click="onSubmit">确定</el-button>
        </template>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getMenuListById, getRoleById, updateRole, duplicate, getMenuList, insertRole } from '@/api/admin'
import { mapGetters } from 'vuex'
import getPageTitle from '@/utils/get-page-title'

export default {
  data() {
    return {
      formType: 'create',
      form: {
        name: '',
        code: '',
        seq: '0',
        note: '',
        level: ''
      },
      menuList: [],
      testBtnDisabled: true,
      testSuccess: false,
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      defaultCheckedKeys: []
    }
  },
  computed: {
    ...mapGetters(['user'])
  },
  beforeCreate() {
    this.$route.meta.title = {
      create: '新建角色',
      edit: '编辑角色',
    }[this.formType]
    document.title = getPageTitle(this.$route.meta.title)
  },
  created() {
    if (this.$route.query.id) {
      this.formType = this.$route.query.type
      // if( === 'detail')
      // if (this.$route.query.id) {
      //   this.formType = 'edit'
      // } else if() {
      //   this.formType = 'detail'
      // } else {
      //   this.formType = 'create'
      // }


      const id = this.$route.query.id
      getRoleById(id).then((r) => {
        this.form.name = r.data.name
        this.form.code = r.data.code
        this.form.seq = r.data.seq;
        this.form.note = r.data.note;
        this.form.level = r.data.level;
      })
      getMenuListById(id).then((r) => {
        const list = r.data;
        list.map(item => {
          if(item.children){
            item.children.map(c => {
              c.children = []
            })
          }
        })
        this.menuList = list
        this.setMenuDefaultChecked(this.menuList)
      })
    } else {
      getMenuList().then((r) => {
        const list = r.data;
        list.map(item => {
          if(item.children){
            item.children.map(c => {
              c.children = []
            })
          }
        })
        this.menuList = list
      })
    }
  },
  methods: {
    setMenuDefaultChecked(list, flag) {
      list.map(item => {
        if(item.isAuthority) this.defaultCheckedKeys.push(item.cdcKey);
        if(this.formType === 'detail') item.disabled = true;
        if(item.children) {
          this.setMenuDefaultChecked(item.children, true);
        }
      })
    },
    onSubmit() {
      if (!this.form.name) {
        this.$message.error('请先填写组件名称')
        return false
      }
      if (this.$route.query.id) {
        this.form.id = this.$route.query.id;
        this.form.menuIdList = this.defaultCheckedKeys;
        updateRole(this.form).then((r) => {
          this.$alert('提交成功', '提示', {
            callback: () => {
              this.$router.go(-1)
            }
          })
        })
      } else {
        this.form.id = '';
        this.form.menuIdList = this.defaultCheckedKeys;
        insertRole(this.form).then((r) => {
          this.$alert('提交成功', '提示', {
            callback: () => {
              this.$router.go(-1)
            }
          })
        })
      }
    },
    checkName() {
      const name = this.form.name;
      const post = {
        entityName: 'auth_role',
        checkName: 'name',
        checkValue: name
      }
      duplicate(post).then((r) => {
        if(r.code == 0) this.checkInput()
      })
    },
    checkCode() {
      const code = this.form.code;
      const post = {
        entityName: 'auth_role',
        checkName: 'code',
        checkValue: code
      }
      duplicate(post).then((r) => {
        if(r.code == 0) this.checkInput()
      })
    },
    checkInput() {
      const ipReg = "^((25[0-5]|2[0-4]\\d|[1]{1}\\d{1}\\d{1}|[1-9]{1}\\d{1}|\\d{1})($|(?!\\.$)\\.)){4}$";
      var patt1=new RegExp(ipReg); 

      const name = this.form.name;
      const ip = this.form.ip
      if(name !== '' && patt1.test(ip)) {
        this.testBtnDisabled = false
      }
    },
    handleCheckChange(currentData, selectedKeys) {
      console.log(currentData, selectedKeys);
      this.defaultCheckedKeys = selectedKeys.checkedKeys
    }
  }
}
</script>
