<template>
  <div>
    <div class="top-drawer">
      <div class="title-name">存储信息源</div>
      <navList :nav-list="navData" :curIndex="curIndex" @navClick="navClick" />
    </div>

    <component :is="activeName" />
    <!-- <router-view /> -->
  </div>
</template>

<script>
import navList from "../components/nav-list";
import share from "./share";
import database from "./database";
import ftp from "./ftp";
import linux from "./linux";
import exchange from "./exchange";
import lotus from "./lotus";
import webDav from "./webDav";
import cloudDatabase from "./cloudDatabase";
import cloudStorage from "./cloudStorage";
const tabs = [
  {
    label: "共享文档",
    name: "share"
  },
  {
    label: "数据库",
    name: "database"
  },
  {
    label: "FTP",
    name: "ftp"
  },
  {
    label: "Linux主机",
    name: "linux"
  },
  {
    label: "Exchange",
    name: "exchange"
  },
  {
    label: "Lotus",
    name: "lotus"
  },
  {
    label: "webDav",
    name: "webDav"
  },
  {
    label: "云数据库",
    name: "cloudDatabase"
  },
  {
    label: "云对象存储",
    name: "cloudStorage"
  }
];
export default {
  components: {
    navList,
    share,
    database,
    ftp,
    linux,
    exchange,
    lotus,
    webDav,
    cloudDatabase,
    cloudStorage
  },
  data() {
    return {
      navData: [],
      activeName: "share",
      curIndex: 0 // 当前展示的nav下标
    };
  },
  created() {
    tabs.forEach(val => {
      this.navData.push({
        icon: require("../images/1.png"),
        name: val.name,
        label: val.label
      });
    });
    console.log("this.$route.params", this.$route.params);
    const storgeType = this.$route.params.storgeType;
    const tab = tabs.find((n, index) => {
      this.curIndex = index;
      return n.name === storgeType;
    });
    if (tab) {
      this.$route.meta.title = tab.label;
    }
  },
  methods: {
    navClick(val) {
      console.log("val====", val);
      this.$router.replace(`/data/storage/${val.name}`);
    }
  }
};
</script>
<style lang="scss" scoped>
@import "~@/styles/mixin.scss";
.top-drawer {
  background-color: rgb(4, 30, 95);
  color: #fff;
  .title-name {
    height: 60px;
    line-height: 60px;
    font-size: 16px;
    margin: 0 0 -15px 35px;
  }
}
</style>
