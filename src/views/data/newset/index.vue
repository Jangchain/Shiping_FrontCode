<template>
  <div class="source-create-page">
    <!-- 导航 -->
    <div class="create-nav">
      <nav-tabs />
    </div>

    <div class="create-content-container">
      <create-main />
    </div>
  </div>
</template>

<script>
import navTabs from "./components/nav-tabs";
import createMain from "./components/create-main";

export default {
  components: {
    navTabs,
    createMain
  },
  data() {
    return {};
  },
  created() {},
  methods: {}
};
</script>
<style lang="scss" scoped>
@import "~@/styles/mixin.scss";
.source-create-page {
  .create-nav {
    text-align: center;
    padding: 5px 0 15px;
    background-color: rgb(4, 30, 95);
  }
  .create-content-container {
    padding: 20px;
    >>> .el-input,
    >>> .el-select,
    >>> .el-textarea {
      width: 450px;
    }
    >>> .el-select {
      .el-input {
        width: 100%;
      }
    }
  }
}
</style>
