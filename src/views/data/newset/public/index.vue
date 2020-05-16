<template>
  <div>
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane
        v-for="tab in tabs"
        :key="tab.name"
        :label="tab.label"
        :name="tab.name"
      />
    </el-tabs>

    <div v-loading="loading" class="form-content">
      <h3>新建{{ formTitle }}信息源</h3>
      <el-scrollbar style="height:calc(100vh - 285px)">
        <component :is="activeName" @loading="handleLoading" />
      </el-scrollbar>
    </div>
  </div>
</template>
<script>
import orgination from "./orgination";
import account from "./account";
import network from "./network";

const tabs = [
  {
    label: "组织架构",
    name: "orgination"
  },
  {
    label: "用户账号",
    name: "account"
  },
  {
    label: "网络区间",
    name: "network"
  }
];
export default {
  components: {
    orgination,
    account,
    network
  },
  data() {
    return {
      tabs,
      activeName: "orgination",
      errorDialogVisible: true,
      loading: false,
      formTitle: ""
    };
  },

  created() {
    const type = this.$route.params.type || 'orgination';
    console.log("type==", type);
    const tab = this.tabs.find(n => n.name === type);
    if (tab) {
      this.$route.meta.title = tab.label;
      this.formTitle = tab.label;
    }
    this.activeName = type;
  },

  methods: {
    handleClick(tab) {
      this.$route.meta.title = tab.label;
      this.$router.push(`/data/newset/public/${tab.name}`);
    },

    handleLoading(value) {
      this.loading = value;
    }
  }
};
</script>
