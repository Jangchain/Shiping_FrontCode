<template>
  <div class="app-container">
    <p class="f-ar"><router-link :to="{ path: './' }"><el-button size="mini">返回</el-button></router-link></p>
    <el-form :model="form" label-width="120px">
      <el-form-item label="名称">
        <el-input v-model="form.name" @input="checkName" />
      </el-form-item>
      <el-form-item label="组件IP">
        <el-input v-model="form.ip" :disabled="formType==='edit'" @input="checkIp" />
      </el-form-item>
      <el-form-item>
        <template v-if="formType==='edit'">
          <div class="component-edit-bg">
            <p>组件类型：{{ form.type }}</p>
            <p>版本：{{ form.networkElementVersion }}</p>
          </div>
        </template>
        <template v-else-if="!testSuccess">
          <el-button type="danger" :disabled="testBtnDisabled" @click="testConection">测试连接</el-button>
        </template>
      </el-form-item>
      <el-form-item v-show="testSuccess">
        <div class="component-edit-bg">
          <p>组件类型：{{ form.type }}</p>
          <p>版本：{{ form.networkElementVersion }}</p>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">确定</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getSiteelementById, updatesiteelement, testConnect, duplicate, insertSiteelements } from '@/api/admin'
import { mapGetters } from 'vuex'
import getPageTitle from '@/utils/get-page-title'

export default {
  data() {
    return {
      formType: 'create',
      form: {
        name: '',
        ip: '',
        type: '',
        networkElementVersion: ''
      },
      testBtnDisabled: true,
      testSuccess: false
    }
  },
  computed: {
    ...mapGetters(['user'])
  },
  beforeCreate() {
    this.$route.meta.title = {
      create: '新建组件',
      edit: '编辑组件',
    }[this.formType]
    document.title = getPageTitle(this.$route.meta.title)
  },
  created() {
    if (this.$route.query.id) {
      if (this.$route.query.id) {
        this.formType = 'edit'
      } else {
        this.formType = 'create'
      }

      const id = this.$route.query.id
      getSiteelementById(id).then((r) => {
        this.form.name = r.data.name
        this.form.ip = r.data.ip
        this.form.type = r.data.type
        this.form.networkElementVersion = r.data.networkElementVersion
      })
      
    }
  },
  methods: {
    onSubmit() {
      if (!this.form.name) {
        this.$message.error('请先填写组件名称')
        return false
      }
      if (this.$route.query.id) {
        this.form.id = this.$route.query.id;
        updatesiteelement(this.form).then((r) => {
          this.$alert('提交成功', '提示', {
            callback: () => {
              this.$router.go(-1)
            }
          })
        })
      } else {
        this.form.id = '';
        insertSiteelements(this.form).then((r) => {
          this.$alert('提交成功', '提示', {
            callback: () => {
              this.$router.go(-1)
            }
          })
        })
      }
    },
    testConection() {
      const ip = this.form.ip;
      testConnect(ip).then((r) => {
        if(r.message !== '操作成功！') {
          this.$message.error(r.message)
        } else {
          this.testSuccess = true;
          this.form.type = r.data.Product,
          this.form.networkElementVersion = r.data.Version
        }
      })
    },
    checkName() {
      const name = this.form.name;
      const post = {
        entityName: 'sp_sm_site_elements',
        checkName: 'name',
        checkValue: name
      }
      duplicate(post).then((r) => {
        if(r.code == 0) this.checkInput()
      })
    },
    checkIp() {
      const ip = this.form.ip;
      const post = {
        entityName: 'sp_sm_site_elements',
        checkName: 'ip',
        checkValue: ip
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
    }
  }
}
</script>
