<!-- 新建WebDav信息源 -->
<template>
  <div>
    <common-form :data="ruleForm" :rules="rules" />
  </div>
</template>
<script>
import commonForm from './components/common-form'

export default {
  name: 'WebDav',
  components: {
    commonForm
  },
  data() {
    return {
      ruleForm: {
        taskType: "WEBDAV",
        name: '',
        description: '',
        ip: '',
        username: '',
        password: '',
        domain: '',
        serverAddress: ''
      },
      rules: {}
    }
  },

  created() {},

  methods: {}
}
</script>

<style lang="scss" scoped></style>
