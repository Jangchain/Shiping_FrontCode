<template>
  <div>
    <common-form :data="ruleForm" :rules="rules" />
  </div>
</template>
<script>
import commonForm from './components/common-form'

export default {
  name: 'Ftp',
  components: {
    commonForm
  },
  data() {
    return {
      ruleForm: {
        name: '',
        description: '',
        ip: '',
        port: '8080',
        username: '',
        password: '',
        domain: '',
        anonymousLogin: '1'
      },
      rules: {}
    }
  },

  created() {},

  methods: {}
}
</script>

<style lang="scss" scoped></style>
