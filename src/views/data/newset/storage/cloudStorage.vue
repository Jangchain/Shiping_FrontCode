<!-- 新建云对象存储信息源 -->
<template>
  <div class="cloud-object-save-create">
    <common-form :data="ruleForm" :rules="rules" @test-connect="testConnect">
      <template v-slot:taskConnect>
        <div>dsss</div>
      </template>
    </common-form>
  </div>
</template>
<script>
import commonForm from "./components/common-form";
import { SpValidators } from "./components/spValidators";

export default {
  name: "CloudStorage",
  components: {
    commonForm
  },
  data() {
    return {
      ruleForm: {
        taskType: "CLOUD_OBJECT_SAVE",
        name: "",
        description: "",
        username: "",
        password: "",
        storageType: "ali_oss",
        accessKeyId: "",
        accessKeySecret: "",
        endPoint: ""
      },
      rules: {
        storageType: [SpValidators.required("请选择存储类型", "change")],
        accessKeyId: [SpValidators.required()],
        accessKeySecret: [SpValidators.required()],
        endPoint: [SpValidators.required()]
      }
    };
  },

  created() {},

  methods: {}
};
</script>

<style lang="scss" scoped>
.cloud-object-save-create {
  >>> .test-connect-btn {
    left: 640px;
  }
}
</style>
