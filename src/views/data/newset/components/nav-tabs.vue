<!-- 信息源nav切换 -->
<template>
  <el-radio-group v-model="activeTab" size="normal" @change="handleChange">
    <el-radio-button v-for="tab in tabs" :key="tab.value" :label="tab.value">
      {{ tab.label }}
    </el-radio-button>
  </el-radio-group>
</template>

<script>
const tabs = [
  {
    value: "storage",
    label: "存储信息源",
    redirect: "storage/share"
  },
  {
    value: "internet",
    label: "网络信息源"
  },
  {
    value: "terminal",
    label: "终端信息源"
  },
  {
    value: "public",
    label: "公共信息源"
  }
];
export default {
  name: "NavTabs",
  data() {
    return {
      tabs,
      activeTab: ""
    };
  },
  computed: {
    redirectUri() {
      const tab = tabs.find(n => n.value === this.activeTab);
      return tab ? tab.redirect || tab.value : "";
    }
  },
  created() {
    console.log("this.$route.name", this.$route.name);
    if (this.$route.name === "newset") {
      this.$router.push(`/data/newset/storage/share`);
    }
    if (this.$route.name === "dataNewsetPublic") {
      this.$router.push(`/data/newset/public/orgination`);
    }
    const type = this.$route.meta.type;
    this.activeTab = type;
  },
  methods: {
    handleChange() {
      this.$router.push(`/data/newset/${this.redirectUri}`);
    }
  }
};
</script>
