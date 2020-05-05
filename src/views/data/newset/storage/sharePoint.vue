<!-- 新建sharePoint信息源 -->
<template>
  <div>
    <common-form :data="ruleForm" :rules="rules" />
  </div>
</template>
<script>
import commonForm from './components/common-form'

export default {
  name: 'SharePoint',
  components: {
    commonForm
  },
  data() {
    return {
      ruleForm: {
        taskType: 'SHARE_POINT',
        name: '',
        description: '',
        ip: '',
        username: '',
        password: '',
        domain: '',
        site: ''
      },
      rules: {

      }
    }
  },

  created() {},

  methods: {}
}
</script>

<style lang="scss" scoped></style>
