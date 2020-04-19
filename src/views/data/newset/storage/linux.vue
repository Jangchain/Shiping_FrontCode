<template>
  <div>
    <common-form :data="ruleForm" :rules="rules" />
  </div>
</template>
<script>
import commonForm from './components/common-form'

export default {
  name: 'Linux',
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
        keyType: '',
        publicKeyName: ''
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
