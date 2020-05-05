<!-- 新建Linux主机信息源 -->
<template>
  <div>
    <common-form :data="ruleForm" :rules="rules" />
  </div>
</template>
<script>
import commonForm from "./components/common-form";

export default {
  name: "Linux",
  components: {
    commonForm
  },
  data() {
    return {
      ruleForm: {
        taskType: "SFTP",
        name: "",
        description: "",
        ip: "",
        port: "",
        username: "",
        password: "",
        domain: "",
        passwordType: "PASSWORD",
        publicKeyName: ""
      },
      rules: {}
    };
  },

  created() {},

  methods: {}
};
</script>

<style lang="scss" scoped></style>
