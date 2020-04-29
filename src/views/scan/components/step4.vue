<template>
  <div>
    <div id="top1">
      <ul>
        <li>
          <i>step1</i>
          <i>基本信息</i>
        </li>
        <li>
          <em>></em>
          <i style="background:#DF9DFF;border:solid 3px #f9e9ff">step2</i>
          <i>选取信息源</i>
        </li>
        <li>
          <em>></em>
          <i style="background:#7AE179;border:solid 3px #e3f8e3">step3</i>
          <i>规则配置</i>
        </li>
        <li>
          <em>></em>
          <i style="background:#FFBE5D;border:solid 3px #fff1de">step4</i>
          <i>管控配置</i>
        </li>
      </ul>
    </div>

    <div id="bts">
      <p>管控配置</p>
      <em>运行时间<i></i></em>
      <div id="a">
        运行时间
        <el-select size="mini" v-model="select" placeholder="当日数据">
          <el-option v-for="(v, k) in selects" :key="k" :label="v.label" :value="v.value" />
        </el-select>
      </div>
      <div id="times">
        <span>
          开始运行时间：
          <el-time-picker
            v-model="value1"
            size="mini"
            :picker-options="{
      selectableRange: '18:30:00 - 20:30:00'
    }"
            placeholder="任意时间点"
          ></el-time-picker>
        </span>
        <span>
          开始运行时间2：
          <el-time-picker
            arrow-control
            v-model="value2"
            size="mini"
            :picker-options="{
      selectableRange: '18:30:00 - 20:30:00'
    }"
            placeholder="任意时间点"
          ></el-time-picker>
        </span>
      </div>
      <h6 id="tre">每周：</h6>
      <div id="di">
        <el-checkbox-group v-model="checkedCities">
        <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
      </el-checkbox-group>
      
      </div>
      <div id="di1">
        <el-button @click="go()">上一步</el-button>
      <el-button type="primary">完成</el-button>
      </div>
    </div>
  </div>
</template>

<script>
const cityOptions = [
  "星期一",
  "星期二",
  "星期三",
  "星期四",
  "星期五",
  "星期六",
  "星期天"
];
export default {
  data() {
    return {
      checkedCities: ["星期一", "星期二"],
      cities: cityOptions,
      select: "",
      value1: new Date(2016, 9, 10, 18, 40),
      value2: new Date(2016, 9, 10, 18, 40),
      selects: [
        {
          label: "按预定时间",
          value: "1"
        },
        {
          label: "订单号",
          value: "2"
        },
        {
          label: "用户电话",
          value: "3"
        }
      ]
    };
  },
  methods: {
    go(){
      this.$router.push('./step3')
    }
  }
};
</script>

<style lang="scss">
#bts {
  margin-left: 40px;
  p {
    font-size: 24px;
    font-weight: bold;
    color: rgba(16, 16, 16, 1);
    margin-bottom: 60px;
    margin-top: 50px;
  }
  em{
    font-style: normal;
    font-size: 20px;
    color: #333;
    line-height: 40px;
    margin-bottom: 30px;
    font-weight: bold;
    i{
      display: inline-block;
      position: absolute;
      left: 150px;
      top: 275px;
      width: 1550px;
      height: 1px;
      background-color: rgba(187, 187, 187, 1);
    }
  }
  #a{
    font-size: 18px;
    color: #101010;
    line-height: 40px;
    margin-bottom: 30px;
    .el-select{
      margin-left: 80px;
      
    }
  }
  .el-tabs {
    .el-tab-pane {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      #left {
        width: 800px;
      }
      #right {
        width: 800px;
      }
    }
  }
}
#times{
  margin-left: 159px;
  span{
        padding-right: 20px;
        &:nth-of-type(2){
          // margin-left: 20px;
          .el-time-picker{
            width: 180px;
            height: 40px;
          }
        }
      }
}
#di{
  margin-left: 159px;
  .el-checkbox-group{
    margin-bottom: 244px;
  }
}
#di1{
  .el-button{
    width: 200px;
    height: 60px;
    margin-right: 20px;
    &:nth-of-type(1){
      border: none;
    }
  }
}
</style>
<style lang="scss" scoped>
#top1 {
  width: 100%;
  height: 100px;
  background: #2a41c1;
  margin-top: 20px;
  border-bottom: solid 1px rgba(255, 0, 0, 0);
  ul {
    position: absolute;
    display: flex;
    flex-direction: row;
    width: 960px;
    height: 120px;
    margin-top: -20px;
    background: rgba(255, 255, 255, 1);
    margin-left: 20px;
    padding-top: 0;
    border-radius: 10px 10px 0px 0px;
    border-bottom: solid 1px rgb(19, 18, 18);
    li {
      list-style: none;
      display: flex;
      align-items: center;
      width: 240px;
      height: 120px;
      i {
        &:nth-of-type(1) {
          display: inline-block;
          width: 60px;
          height: 60px;
          background-color: #53d1ff;
          text-align: center;
          border: 1px solid #dcf6ff;
          margin-left: 30px;
          margin-top: 10px;
          font-size: 12px;
          text-align: center;
          color: white;
          border-radius: 30px;
          margin-right: 0;
          height: 60px;
          line-height: 60px;
          //   opacity: 0.6;
        }
        &:nth-of-type(2) {
          margin-left: 20px;
          line-height: 80px;
        }
      }
      em {
        color: #ccc;
        display: inline-block;
        width: 30px;
        line-height: 120px;
      }
    }
  }
}
#tre{
  font-size: 18px;
  margin-left: 159px;
  margin-bottom: 8px;
  color: rgba(51,51,51,1);
  font-weight: normal;
}
i {
  font-style: normal;
}
</style>