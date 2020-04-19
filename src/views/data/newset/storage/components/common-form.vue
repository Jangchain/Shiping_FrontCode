<template>
  <div>
    <el-form
      ref="ruleForm"
      :model="ruleForm"
      :rules="rules"
      label-width="120px"
      class="demo-ruleForm"
    >
      <form-group-title title="基本信息" />

      <el-form-item label="信息源名称" prop="name">
        <el-input v-model="ruleForm.name" placeholder="输入名称" />
      </el-form-item>

      <el-form-item label="类型" prop="fileType">
        <el-select
          v-model="ruleForm.fileType"
          placeholder="请选择类型"
        >
          <el-option
            v-for="item in fileType"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="数据库类型" prop="databaseType">
        <el-select
          v-model="ruleForm.databaseType"
          placeholder="请选择类型"
        >
          <el-option
            v-for="item in databaseType"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="存储类型" prop="storageType">
        <el-select
          v-model="ruleForm.storageType"
          placeholder="请选择存储类型"
        >
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

      <el-form-item label="IP地址" prop="ip">
        <el-input v-model="ruleForm.ip" placeholder="输入IP地址" />
      </el-form-item>

      <el-form-item label="用户名" prop="username">
        <el-input v-model="ruleForm.username" placeholder="输入用户名" />
      </el-form-item>

      <el-form-item label="密码" prop="password">
        <el-input
          v-model="ruleForm.password"
          placeholder="输入密码"
          type="password"
        />
      </el-form-item>

      <el-form-item label="域名" prop="domain">
        <el-input v-model="ruleForm.ip" placeholder="输入域名" />
        <span class="pl-5 pr-5" />
        <el-button type="primary" @click="taskConnect">测试链接</el-button>
      </el-form-item>

      <el-form-item class="tree-form-item">
        <slot />
      </el-form-item>

      <el-form-item>
        <el-button
          type="primary"
          @click="submitForm('ruleForm')"
        >保存</el-button>
      </el-form-item>
    </el-form>
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
  data() {
    return {
      storageType,
      fileType,
      databaseType,
      ruleForm: {
        name: '', // 信息源名称
        description: '', // 备注
        storageType: 'ali_oss', // 存储类型
        fileType: '', // 类型
        ip: '', // ip
        username: '', // 用户名
        password: '', // 密码
        domain: '', // 域名

        databaseType: 'MySql', // 数据库类型

        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        region: [
          { required: true, message: '请选择活动区域', trigger: 'change' }
        ],
        date1: [
          {
            type: 'date',
            required: true,
            message: '请选择日期',
            trigger: 'change'
          }
        ],
        date2: [
          {
            type: 'date',
            required: true,
            message: '请选择时间',
            trigger: 'change'
          }
        ],
        type: [
          {
            type: 'array',
            required: true,
            message: '请至少选择一个活动性质',
            trigger: 'change'
          }
        ],
        resource: [
          { required: true, message: '请选择活动资源', trigger: 'change' }
        ],
        desc: [{ required: true, message: '请填写活动形式', trigger: 'blur' }]
      }
    }
  },

  created() {},

  methods: {
    // 测试连接
    taskConnect() {},

    // 表单提交
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.tree-form-item {
    padding: 25px 0;
  >>> .el-card__header {
    padding: 0 20px;
    background-color: #ededed;
  }
}
</style>
