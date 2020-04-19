<template>
  <div>
    <common-form />
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

    }
  },

  created() {},

  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
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
