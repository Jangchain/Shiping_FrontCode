<!-- 新建Lotus信息源 -->
<template>
  <div>
    <common-form :data="ruleForm" :rules="rules" />
  </div>
</template>
<script>
import commonForm from './components/common-form'

export default {
  name: 'Lotus',
  components: {
    commonForm
  },
  data() {
    return {
      ruleForm: {
        name: '',
        description: '',
        ip: '',
        username: '',
        password: '',
        domain: '',
        lotusServerType: 'Mail',
        port: '63148'
      },
      rules: {}
    }
  },

  created() {},

  methods: {}
}
</script>

<style lang="scss" scoped></style>
