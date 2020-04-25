<!-- 新建云对象存储信息源 -->
<template>
  <div>
    <common-form :data="ruleForm" :rules="rules" @test-connect="testConnect">
      <template v-slot:taskConnect>
        <div>dsss</div>
      </template>
    </common-form></div>
</template>
<script>
import commonForm from './components/common-form'

export default {
  name: 'CloudStorage',
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
        port: '5432',
        storageType: '',
        accessKeyId: '',
        accessKeySecret: '',
        endPoint: ''
      },
      rules: {}
    }
  },

  created() {},

  methods: {
    // 测试连接
    testConnect(data) {
      console.log('测试连接', data)
    }
  }
}
</script>

<style lang="scss" scoped></style>
