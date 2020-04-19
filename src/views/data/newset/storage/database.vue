<!-- 新建信息源数据库 -->
<template>
  <div>
    <common-form :data="ruleForm" :rules="rules">
      <template v-slot:tree>
        <span />
      </template>
    </common-form>
  </div>
</template>
<script>
import commonForm from './components/common-form'

export default {
  name: 'Database',
  components: {
    commonForm
  },
  data() {
    return {
      ruleForm: {
        name: '',
        description: '',
        databaseType: 'MySql',
        ip: '',
        port: '8080',
        username: '',
        password: ''
      },
      rules: {
        databaseType: [
          { required: true, message: '请选择数据库类型', trigger: 'change' }
        ]
      }
    }
  },

  created() {},

  methods: {}
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
