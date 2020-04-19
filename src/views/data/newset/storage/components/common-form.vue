<template>
  <div>
    <el-form
      ref="ruleForm"
      :model="ruleForm"
      :rules="newRules"
      label-width="120px"
      class="demo-ruleForm"
    >
      <form-group-title title="基本信息" />

      <el-form-item label="信息源名称" prop="name">
        <el-input v-model="ruleForm.name" placeholder="输入名称" />
      </el-form-item>

      <el-form-item label="类型" prop="fileType">
        <el-select v-model="ruleForm.fileType" placeholder="请选择类型">
          <el-option
            v-for="item in fileType"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="数据库类型" prop="databaseType">
        <el-select v-model="ruleForm.databaseType" placeholder="请选择类型">
          <el-option
            v-for="item in databaseType"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="存储类型" prop="storageType">
        <el-select v-model="ruleForm.storageType" placeholder="请选择存储类型">
          <el-option
            v-for="item in storageType"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="备注" prop="description">
        <el-input
          v-model="ruleForm.description"
          resize="none"
          type="textarea"
          placeholder="输入备注"
        />
      </el-form-item>

      <form-group-title title="认证信息" />

      <el-form-item label="匿名登录" prop="anonymousLogin">
        <el-select
          v-model="ruleForm.anonymousLogin"
          placeholder="请选择是否匿名登录"
          @change="handleAnonymousLogin"
        >
          <el-option label="是" value="1" />
          <el-option label="否" value="0" />
        </el-select>
      </el-form-item>

      <el-form-item label="IP地址" prop="ip">
        <el-input v-model="ruleForm.ip" placeholder="输入IP地址" />
      </el-form-item>

      <el-form-item label="端口" prop="port">
        <el-input v-model="ruleForm.port" placeholder="输入端口" />
      </el-form-item>

      <el-form-item v-show="!isAnonymousLogin" label="用户名" prop="username">
        <el-input v-model="ruleForm.username" placeholder="输入用户名" />
      </el-form-item>

      <el-form-item label="密码类型" prop="keyType">
        <el-select
          v-model="ruleForm.keyType"
          placeholder="请选择密码类型"
        >
          <el-option label="密码" value="public_key" />
          <el-option label="秘钥" value="password" />
        </el-select>
      </el-form-item>

      <el-form-item v-show="!isAnonymousLogin" label="密码" prop="password">
        <el-input
          v-model="ruleForm.password"
          placeholder="输入密码"
          type="password"
        />
      </el-form-item>

      <el-form-item label="秘钥" prop="publicKeyName">
        <el-input v-model="ruleForm.publicKeyName" placeholder="请选择秘钥" />
        <span class="pl-5 pr-5" />
        <el-button type="primary">秘钥管理</el-button>
      </el-form-item>

      <el-form-item label="域名" prop="domain">
        <el-select
          v-model="ruleForm.anonymousLogin"
          placeholder="请选择是否匿名登录"
          @change="handleAnonymousLogin"
        >
          <el-option label="是" value="1" />
          <el-option label="否" value="0" />
        </el-select>
        <span class="pl-5 pr-5" />
        <el-button type="primary" @click="taskConnect">测试链接</el-button>
      </el-form-item>

      <el-form-item class="tree-form-item">
        <slot name="tree" />
      </el-form-item>

      <el-form-item>
        <el-button
          type="primary"
          @click="submitForm('ruleForm')"
        >保存</el-button>
      </el-form-item>
      </el-form-item></el-form>
  </div>
</template>
<script>
import formGroupTitle from '../../components/form-group-title'

// 存储类型
const storageType = [
  {
    label: '阿里OSS',
    value: 'ali_oss'
  },
  {
    label: '华为OBS',
    value: 'huawei_obs'
  },
  {
    label: '腾讯COS',
    value: 'tencent_cos'
  },
  {
    label: 'Ceph S3',
    value: 's3'
  }
]

// 类型
const fileType = [
  {
    label: 'Windows文件共享',
    value: ''
  },
  {
    label: '虚拟机vmdk解析',
    value: 'VMDK'
  }
]

// 类型
const databaseType = [
  {
    label: 'MySql',
    value: 'MySql'
  },
  {
    label: 'MariaDB',
    value: 'MariaDB'
  }
]
export default {
  components: {
    formGroupTitle
  },
  props: {
    data: {
      type: Object,
      default: () => {
        return {}
      }
    },
    rules: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      storageType,
      fileType,
      databaseType,
      defaultForm: {
        name: '', // 信息源名称
        description: '', // 备注
        storageType: 'ali_oss', // 存储类型
        fileType: '', // 类型
        ip: '', // ip
        port: '', // 端口
        username: '', // 用户名
        password: '', // 密码
        domain: '', // 域名
        databaseType: 'MySql', // 数据库类型
        anonymousLogin: '0' // 匿名登录
      },

      defalutRules: {
        name: [
          { required: true, message: '请输入信息源名称', trigger: 'blur' },
          { min: 2, max: 16, message: '长度在 2 到 16 个字符', trigger: 'blur' }
        ],
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 2, max: 16, message: '长度在 2 到 16 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 2, max: 16, message: '长度在 2 到 16 个字符', trigger: 'blur' }
        ],
        port: [{ required: true, message: '请输入端口号', trigger: 'blur' }]
      },
      newRules: {},
      ruleForm: {},
      isAnonymousLogin: false
    }
  },

  watch: {

  },

  created() {
    this.newRules = Object.assign(this.defalutRules, this.rules)
    console.log('this.data', this.data)
    this.ruleForm = this.data
  },
  mounted() {
    this.initForm()
    this.handleAnonymousLogin()
  },

  methods: {
    // 测试连接
    taskConnect() {},

    // 表单提交
    submitForm(formName) {
      console.log('ruleForm', this.ruleForm)
      // this.$emit('validated-data', this.ruleForm)
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$emit('validated-data', this.ruleForm)
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },

    // 初始化表单
    initForm() {
      if (!Object.keys(this.data).length) return
      const formItems = this.$refs.ruleForm.fields
      formItems.forEach(item => {
        item.$el.style.display = 'none'
        if (Object.keys(this.data).includes(item.prop)) {
          item.$el.style.display = 'block'
        }
      })
    },

    // 处理匿名登录切换
    handleAnonymousLogin(val) {
      if (!val) {
        val = this.ruleForm.anonymousLogin
      }
      this.isAnonymousLogin = val === '1'
    }
  }
}
</script>

<style lang="scss" scoped></style>
