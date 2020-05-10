<template>
  <div class="app-container">
    <p class="f-ar"><router-link :to="{ path: './' }"><el-button size="mini">返回</el-button></router-link></p>
    <el-form :model="form" label-width="120px">
      <el-form-item label="主机名称">
        <el-input v-model="form.host" :disabled="formType==='detail'" @input="checkName" />
      </el-form-item>
      <el-form-item label="主机IP">
        <el-input v-model="form.ip" :disabled="formType==='detail'" @input="checkIp" />
      </el-form-item>
      <el-form-item label="备注">
        <el-input
          type="textarea"
          :rows="2"
          placeholder="请输入内容"
          v-model="form.note"
          :disabled="formType==='detail'">
        </el-input>
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
import { getHostwhiteById, updateHostwhite, duplicate, getMenuList, insertHostwhite } from '@/api/admin'
import { mapGetters } from 'vuex'
import getPageTitle from '@/utils/get-page-title'

export default {
  data() {
    return {
      formType: 'create',
      form: {
        host: '',
        ip: '',
        note: ''
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
      getHostwhiteById(id).then((r) => {
        this.form.host = r.data.host
        this.form.ip = r.data.ip
        this.form.note = r.data.note;
        this.form.id = r.data.id;
        this.form.creator = r.data.creator;
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
      if (!this.form.host) {
        this.$message.error('请先填写组件名称')
        return false
      }
      if (this.$route.query.id) {
        const post = {
          id: this.form.id,
          host: this.form.host,
          ip: this.form.ip,
          note: this.form.note
        }
        updateHostwhite(post).then((r) => {
          this.$alert('提交成功', '提示', {
            callback: () => {
              this.$router.go(-1)
            }
          })
        })
      } else {
        const post = {
          host: this.form.host,
          ip: this.form.ip,
          note: this.form.note
        }
        insertHostwhite(post).then((r) => {
          this.$alert('提交成功', '提示', {
            callback: () => {
              this.$router.go(-1)
            }
          })
        })
      }
    },
    checkName() {
      const host = this.form.host;
      const post = {
        entityName: 'sys_host_white_list',
        checkName: 'host',
        checkValue: host,
        pkName: 'id',
        pkValue: this.form.id || '',
        conditions: {
          creator: this.form.creator
        }
      }
      duplicate(post).then((r) => {
        if(r.code == 0) this.checkInput()
      })
    },
    checkIp() {
      const ip = this.form.ip;
      const post = {
        entityName: 'sys_host_white_list',
        checkName: 'ip',
        checkValue: ip,
        pkName: 'id',
        pkValue: this.form.id || '',
        conditions: {
          creator: this.form.creator
        }
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
