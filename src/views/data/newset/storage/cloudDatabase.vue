<!-- 新建云数据库信息源 -->
<template>
  <div>
    <common-form :data="ruleForm" :rules="rules" />
  </div>
</template>
<script>
import commonForm from './components/common-form'

export default {
  name: 'CloudDatabase',
  components: {
    commonForm
  },
  data() {
    return {
      ruleForm: {
        taskType: 'CLOUD_DATABASE',
        name: '',
        description: '',
        ip: '',
        username: '',
        password: '',
        domain: '',
        databaseType: 'MySql',
        port: '5432'
      },
      rules: {}
    }
  },

  created() {},

  methods: {

  }
}
</script>

<style lang="scss" scoped></style>
