<template>
  <div class="sub-types">
    <div class="type-index">
      <el-menu :default-active="activeMenu" mode="horizontal" router @select="handleSelect">
        <el-menu-item v-for="item in typeMap" :key="item.key" :index="item.key">{{ item.name }}</el-menu-item>
      </el-menu>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      typeMap: [
        { key: "documentCharacteristics", name: "文档特征" },
        { key: "keyword", name: "关键字" },
        { key: "match", name: "匹配模式" },
        { key: "documentFingerprint", name: "文档指纹" },
        { key: "databaseFingerprint", name: "数据库指纹" },
        { key: "singleIntelligentLearning", name: "二维智能学习" },
        { key: "multiIntelligentLearning", name: "多维智能学习" }
      ]
    };
  },
  computed: {
    activeMenu() {
      const route = this.$route;
      const { meta, path } = route;
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu;
      }
      return path.split("/")[3];
    }
  },
  methods: {
    handleSelect(key) {
      // this.$router.replace({ name: "identifyModel", params: { subType: key } });
    }
  }
};
</script>
<style scoped lang="scss">
.sub-types {
  .type-index {
  }
}
</style>
