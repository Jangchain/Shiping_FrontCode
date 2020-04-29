<template>
  <div>
    <div id="top1">
      <ul>
        <li>
          <i style="background:#53d1ff;border:solid 3px #dcf6ff">step1</i>
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
          <i style="background:#fff;border:solid 3px #5567CD">step4</i>
          <i>管控配置</i>
        </li>
      </ul>
    </div>
    <div id="main">
      <h2>选取规则</h2>
      <el-row :gutter="20">
        <el-col :span="12">
          <div class="grid-content bg-purple">
            <el-table :data="tableData" border style="width: 100%">
              <el-table-column label="规则列表" align="center">
                <template slot-scope="scope">
                  <el-switch
                    v-model="scope.value1"
                    active-text="个人信息-风险探知"
                    inactive-text="人力文档-风险探知"
                  ></el-switch>
                </template>
              </el-table-column>
              <el-table-column prop="province" label="备注" align="center"></el-table-column>
            </el-table>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple-light">
            <el-table :data="tableData" border style="width: 100%">
              <el-table-column label="规则列表" align="center">
                <template slot-scope="scope">
                  <el-switch
                    v-model="scope.value1"
                    active-text="个人信息-风险探知"
                    inactive-text="人力文档-风险探知"
                  ></el-switch>
                </template>
              </el-table-column>
              <el-table-column prop="province" label="备注" align="center"></el-table-column>
            </el-table>
          </div>
        </el-col>
      </el-row>
      <p>
        规则说明规则说明规则说明规则说明规则说明规则说明规则说明，去
        <a id="new">新建规则</a>。
      </p>
    </div>
    <div id="main1">
      <em>
        高级设置
        <i></i>
      </em>
      <div id="a">
        OCR设置
        <el-select size="mini" v-model="select" placeholder="自定义识别模式">
          <el-option v-for="(v, k) in selects" :key="k" :label="v.label" :value="v.value" />
        </el-select>
      </div>
      <div id="times">
        <span>
          时间段
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
          至：
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
      <div id="d">
        <el-checkbox-group v-model="checkedCities">
          <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
        </el-checkbox-group>
      </div>
      <div id="btn">
        <el-button id="btns" @click="back()">上一步</el-button>
        <el-button id="btns" type="primary" @click="go()">下一步</el-button>
      </div>
    </div>
  </div>
</template>

<script>
const cityOptions = [
  "gif图片识别",
  "身份证识别",
  "源码识别",
  "印章识别",
  "红头文件检测",
  "政府机关公文识别",
  "数字二次精准识别"
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
      ],
      tableData: []
    };
  },
  methods: {
    go() {
      this.$router.push("./step4");
    },
    back() {
      this.$router.push("./step2");
    }
  }
};
</script>

<style lang="scss">
#main1 {
  width: 650px;
  margin-left: 40px;
  p {
    font-size: 24px;
    font-weight: bold;
    color: rgba(16, 16, 16, 1);
    margin-bottom: 60px;
    margin-top: 50px;
  }
  em {
    font-style: normal;
    font-size: 20px;
    color: #333;
    line-height: 40px;
    margin-bottom: 30px;
    font-weight: bold;
    i {
      margin-top: 20px;
      display: inline-block;
      position: absolute;
      left: 150px;
      // top: 363px;
      // top: 20px;
      width: 1550px;
      height: 1px;
      background-color: rgba(187, 187, 187, 1);
    }
  }
  #a {
    font-size: 18px;
    color: #101010;
    line-height: 40px;
    margin-bottom: 30px;
    .el-select {
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
#times {
  margin-left: 159px;
  height: 40px;
  span {
    display: inline-block;
    padding-right: 20px;
    .el-date-editor.el-input, .el-date-editor.el-input__inner{
      width: 160px;
    }
    &:nth-of-type(2) {
      .el-time-picker {
        width: 100px;
        height: 40px;
        .el-date-editor.el-input,
        .el-date-editor.el-input__inner {
          width: 100px;
        }
        .el-input--mini .el-input__inner {
          line-height: 40px;
        }
      }
    }
  }
}
#d .el-checkbox-group {
  // margin-bottom: 134px;
  margin-bottom: 134px;
}
#d {
  margin-top: 20px;
  margin-left: 159px;
  background-color: white;
  width: 100%;
  .el-checkbox-group {
    .el-checkbox__label {
      font-size: 18px;
      line-height: 40px;
      margin-bottom: 10px;
      color: #333333;
    }
  }
  
}
#btn {
    //  margin-top: 134px;
    width: 100%;
    .el-button {
      width: 200px;
      height: 60px;
    }
  }
#main {
  padding-left: 39px;
}
</style>
<style lang="scss" scoped>
#top1 {
  position: relative;
  width: 100%;
  height: 100px;
  background: #2a41c1;
  border-bottom: solid 1px rgba(255, 0, 0, 0);
  ul {
    display: flex;
    flex-direction: row;
    border-bottom: solid 1px rgb(19, 18, 18);
  }
  ul li {
    width: 240px;
    height: 120px;
    padding-top: 20px;
    margin-top: -20px;
    background: blueviolet;
    margin-right: 0;
    margin-left: 0;
    list-style: none;
    border-radius: 10px 10px 0 0;
    line-height: 100px;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    background: #fff;
    i {
      &:nth-of-type(1) {
        width: 60px;
        height: 60px;
        border-radius: 30px;
        margin-top: 20px;
        line-height: 60px;
        text-align: center;
      }
      em {
        display: inline-block;
        width: 10px;
        height: 10px;
        background: #fff;
        line-height: 100px;
        margin-top: 44px;
        color: #d4d4d4;
      }
    }
  }
  ul li:nth-child(4) {
    padding-top: 0;
    height: 100px;
    background: #2a41c1;
    margin-top: 0;
  }
}
i {
  font-style: normal;
}
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
}
#new{
  color: #5A6FDF;
}
</style>