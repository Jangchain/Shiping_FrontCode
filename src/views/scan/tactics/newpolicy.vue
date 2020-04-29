<template>
  <div class="policy">
    <div class="up1">
      <div class="create-nav">
      <nav-tabs />
    </div>
    </div>
    <navList :nav-list="navData" :curIndex="curIndex" @navClick="navClick" />
    <el-button type='primary' @click="back()">返回</el-button>
  </div>
</template>

<script>
import navList from "../components/nav-list";
import { tabs } from "./common";
import navTabs from '../components/nav-tabs'
export default {
  components: {
    navList,
    navTabs,
  },
  name: "newpolicy",
  data() {
    return {
      value: "0",
      navData: [],
      activeName: "",
      curIndex: NaN, // 当前展示的nav下标,

    };
  },
  methods: {
    changeSwitch(data) {
      console.log(data);
    },
    navClick(val) {
      console.log(`${val.name}`)
      // this.$router.replace(`/scan/tactics/${val.name}`);
    },
    back(){
      this.$router.push('./tactics')
    }
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
    const type = this.$route.params.type;
    if (type) {
     /*  this.$route.meta.title = tabs.find(val => val.name === type).label;
      this.activeName = type;
      this.curIndex = tabs.findIndex(val => val.name === type); */
    }
  },
};
</script>

<style lang="scss">
.up1 {
  .el-switch__label--left {
    position: relative;
    left: 230px;
    color: #fff;
    z-index: -1111;
  }
  .el-switch__label--right {
    position: relative;
    right: 230px;
    color: #fff;
    z-index: -1111;
  }
  .el-switch__label.is-active {
    z-index: 1111;
    color: #fff;
  }
  .el-switch__label--left {
    position: relative;
    left: 230px;
    color: #fff;
    z-index: -1111;
  }
  .el-switch__label--right {
    position: relative;
    right: 230px;
    color: #fff;
    z-index: -1111;
  }
  .el-switch__label--right.is-active {
    z-index: 1111;
    color: #fff !important;
  }
  .el-switch__label--left.is-active {
    z-index: 1111;
    color: #9c9c9c !important;
  }
  .el-radio-group{
    margin-top: 12px;
    padding-left: 43%;
  }
}
.policy{
  background: #031E5E;
  height: 100vh;
  .nav-list{
    padding: 0 80px;
  }
  .el-button{
    margin-left: 100px;
  }
}
</style>
<style lang="scss" scoped>


</style>