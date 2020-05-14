<template>
  <div class="app-container">
    <p class="f-ar"><router-link :to="{ path: './' }"><el-button size="mini">返回</el-button></router-link></p>
    <el-form :model="form" label-width="120px">
      <el-form-item label="部门编码">
        <el-input v-model="form.code" :disabled="formType==='edit'" @input="checkCode" />
      </el-form-item>
      <el-form-item label="部门名称">
        <el-input v-model="form.name" @input="checkName" />
      </el-form-item>
      <el-form-item label="上级部门">
        <el-input v-model="form.pname" @focus="handlePName" />
        <div v-show="showTree" class="dept-tree-position">
          <el-tree :data="deptTree" :props="defaultProps" :expand-on-click-node="false" @node-click="handleNodeClick"></el-tree>
        </div>
      </el-form-item>
      <el-form-item label="部门负责人">
        <el-input v-model="form.leader" @input="checkInput" />
      </el-form-item>
      <el-form-item label="部门邮箱">
        <el-input v-model="form.email" @input="checkInput" />
      </el-form-item>
      <el-form-item label="负责人手机号码">
        <el-input v-model="form.phone" @input="checkInput" />
      </el-form-item>
      <el-form-item label="备注">
        <el-input
          type="textarea"
          :rows="2"
          placeholder="请输入内容"
          v-model="form.note">
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" :disabled="testBtnDisabled" @click="onSubmit">确定</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getDept, updateDept, duplicate, getMenuList, insertDept, getDeptTree, getDeptTreeById } from '@/api/admin'
import { mapGetters } from 'vuex'
import getPageTitle from '@/utils/get-page-title'

export default {
  data() {
    return {
      formType: 'create',
      form: {
        code: '',
        name: '',
        seq: '0',
        note: '',
        email: '',
        leader: '',
        phone: '',
        pid: '',
        pname: '',
      },
      testBtnDisabled: true,
      testSuccess: false,
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      defaultCheckedKeys: [],
      deptTree: [],
      showTree: false
    }
  },
  computed: {
    ...mapGetters(['user'])
  },
  beforeCreate() {
    this.formType = this.$route.query.type
    this.$route.meta.title = {
      create: '新建部门',
      edit: '编辑部门',
    }[this.formType]
    document.title = getPageTitle(this.$route.meta.title)
  },
  created() {
    if (this.$route.query.id) {
      const id = this.$route.query.id
      this.getTreeById(id);
      getDept(id).then((r) => {
        this.form.code = r.data.code;
        this.form.name = r.data.name;
        this.form.note = r.data.note;
        this.form.email = r.data.email;
        this.form.leader = r.data.leader;
        this.form.phone = r.data.phone;
        this.form.pid = r.data.pid;
        this.form.pname = r.data.pname;
        this.checkInput();
      })
    } else {
      this.getTree()
    }
  },
  methods: {
    handlePName() {
      this.showTree = true;
    },
    getTree() {
      getDeptTree().then(r => {
        if(r.code === 0) {
          this.deptTree = r.data
        }
      })
    },
    getTreeById(id) {
      getDeptTreeById(id).then(r => {
        if(r.code === 0) {
          this.deptTree = r.data;
        }
      })
    },
    handleNodeClick(data) {
      this.form.pid = data.id;
      this.form.pname = data.name;
      this.showTree = false;
    },
    onSubmit() {
      if (this.$route.query.id) {
        const post = {
          code: this.form.code,
          name: this.form.name,
          seq: '0',
          note: this.form.note,
          email: this.form.email,
          leader: this.form.leader,
          phone: this.form.phone,
          pid: this.form.pid,
          id: this.$route.query.id
        }
        updateDept(post).then((r) => {
          this.$alert('提交成功', '提示', {
            callback: () => {
              this.$router.go(-1)
            }
          })
        })
      } else {
        const post = {
          code: this.form.code,
          name: this.form.name,
          seq: '0',
          note: this.form.note,
          email: this.form.email,
          leader: this.form.leader,
          phone: this.form.phone,
          pid: this.form.pid,
        }
        insertDept(post).then((r) => {
          this.$alert('提交成功', '提示', {
            callback: () => {
              this.$router.go(-1)
            }
          })
        })
      }
    },
    checkCode() {
      const post = {
        entityName: 'auth_dept',
        checkName: 'code',
        checkValue: this.form.code,
      }
      duplicate(post).then((r) => {
        if(r.code == 0) this.checkInput()
      })
    },
    checkName() {
      const post = {
        entityName: 'auth_dept',
        checkName: 'name',
        checkValue: this.form.name,
      }
      duplicate(post).then((r) => {
        if(r.code == 0) this.checkInput()
      })
    },
    checkInput() {
      const code = this.form.code;
      const name = this.form.name;
      const leader = this.form.leader;
      const email = this.form.email;
      const phone = this.form.phone;
      if(name !== '' && code !== '' && leader !== '' && email !== '' && phone !== '') {
        this.testBtnDisabled = false
      }
    },
  }
}
</script>
