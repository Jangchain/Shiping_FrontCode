<!-- 新建Exchange信息源 -->
<template>
  <div>
    <common-form :data="ruleForm" :rules="rules" />
  </div>
</template>
<script>
import commonForm from "./components/common-form";
import { SpValidators } from "./components/spValidators";

export default {
  name: "Exchange",
  components: {
    commonForm
  },
  data() {
    return {
      ruleForm: {
        taskType: "EXCHANGE",
        name: "",
        description: "",
        ip: "",
        username: "",
        password: "",
        domain: "",
        serverAddress: "",
        exchangeEdition: "other"
      },
      rules: {
        exchangeEdition: [SpValidators.required("请选择版本", "change")],
        domain: [SpValidators.required(), SpValidators.domain()]
      }
    };
  },

  created() {},

  methods: {}
};
</script>

<style lang="scss" scoped></style>
