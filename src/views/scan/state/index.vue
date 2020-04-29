<template>
  <div class="dashboard-container">
    <div id="top">
      <div class="left">
        <el-dropdown>
          <span class="el-dropdown-link">
            当日数据
            <i></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>黄金糕</el-dropdown-item>
            <el-dropdown-item>狮子头</el-dropdown-item>
            <el-dropdown-item>螺蛳粉</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <!-- <el-select size="mini" v-model="selectValue"
                         placeholder="当日数据">
                <el-option v-for="(v, k) in states"
                           :key="k"
                           :label="v.label"
                           :value="v.value" />
        </el-select>-->
        <el-form ref="ruleForm"
                 :model="ruleForm"
                 :rules="ruleRules"
                 class="login-form"
                 autocomplete="on"
                 label-position="right">
          <el-form-item prop="date">
            <span id="spa">日期</span>
            <el-input ref="date"
                      v-model="ruleForm.date"
                      placeholder="date"
                      name="date"
                      type="text"
                      tabindex="1"
                      autocomplete="on"
                      size="mini" />
          </el-form-item>
          <el-form-item prop="obj">
            <span id="spa">对象类型</span>
            <el-select size="mini"
                       v-model="selectValue"
                       placeholder="全部">
              <el-option v-for="(v, k) in databaseTypeSelect"
                         :key="k"
                         :label="v.label"
                         :value="v.value" />
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <span id="bor">|</span>
      <div id="right">
        <ul>
          <li>
            <span>
              <i class="el-icon-edit"></i>
            </span>
            <span>
              <i>检测数据量(MB)</i>
              <i>18124</i>
            </span>
          </li>
          <li>
            <span>
              <i class="el-icon-edit"></i>
            </span>
            <span>
              <i>事件总数</i>
              <i>3563</i>
            </span>
          </li>
          <li>
            <span>
              <i class="el-icon-edit"></i>
            </span>
            <span>
              <i>检测对象数</i>
              <i>8124</i>
            </span>
          </li>
          <li>
            <span>
              <i class="el-icon-edit"></i>
            </span>
            <span>
              <i>策略启用总数</i>
              <i>21</i>
            </span>
          </li>
          <li>
            <span>
              <i class="el-icon-edit"></i>
            </span>
            <span>
              <i>规则启用总数</i>
              <i>126</i>
            </span>
          </li>
        </ul>
      </div>
    </div>
    <div id="main">
      <div id="lf">
        <span id="tre">事件排行</span>
        <el-table :header-cell-style="{background:'#eee',color:'#606266'}"
                  :data="tableData"
                  style="width: 100%"
                  :default-sort="{prop: 'date', order: 'descending'}">
          <el-table-column prop="date"
                           label="IP地址"
                           align="center">
            <template slot-scope="scope">
              <el-popover trigger="hover"
                          placement="top">
                <p>IP: {{ scope.row.name }}</p>
                <p>地区/部门: {{ scope.row.address }}</p>
                <p>设备号: {{ scope.row.address }}</p>
                <p>所属信息源: {{ scope.row.address }}</p>
                <p>信息源1: {{ scope.row.address }}</p>
                <p>信息源2: {{ scope.row.address }}</p>
                <p>信息源3: {{ scope.row.address }}</p>
                <div slot="reference"
                     class="name-wrapper">
                  <el-tag size="medium">{{ scope.row.name }}</el-tag>
                </div>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column prop="name"
                           label="IP类型"
                           sortable
                           align="center"></el-table-column>
          <el-table-column prop="name"
                           label="策略类型"
                           sortable
                           align="center"></el-table-column>
          <el-table-column prop="address"
                           label="事件数"
                           align="center"
                           :formatter="formatter"></el-table-column>
        </el-table>
      </div>
      <div id="rg">
        <div class="chart-container">
          <el-dropdown>
            <span class="el-dropdown-link">
              当日数据
              <i></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>黄金糕</el-dropdown-item>
              <el-dropdown-item>狮子头</el-dropdown-item>
              <el-dropdown-item>螺蛳粉</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <!--  <chart height="100%" width="100%" /> -->
        </div>

        <el-row style="background:#fff;padding:40px 50px 0;margin-bottom:32px;">
          <el-tabs v-model="map"
                   value
                   @tab-click="handleClick">
            <el-tab-pane v-for="(item,i) in maps"
                         :key="i"
                         :label="item.label"
                         :name="item.name"
                         lazy>
              <line-chart :chart-data="lineChartData" />
            </el-tab-pane>
          </el-tabs>
        </el-row>
        <div id="ads">
          <span>
            IP:
            <i>192.190.10.150</i>
          </span>
          <span>地址/部门：浙江省 杭州市 市场部</span>
          <span>设备：服务器08</span>
          <span>
            详情
            <i class="el-icon-arrow-right"></i>
          </span>
        </div>
        <p>
          <span>事件列表</span>
          <el-input placeholder="输入搜索内容"
                    v-model="input"
                    size="small"
                    style="width:260px">
            <i slot="suffix"
               class="el-input__icon el-icon-search"></i>
          </el-input>
          <el-button type="info"
                     size="small">搜索</el-button>
          <el-button size="small">高级搜索</el-button>
          <el-button type="info"
                     size="small">批量上报</el-button>
          <el-button type="info"
                     size="small">批量导出</el-button>
          <el-button type="info"
                     size="small">忽略</el-button>
          <el-button type="info"
                     size="small">列管理</el-button>
        </p>
        <el-table ref="multipleTable"
                  :data="tableData"
                  tooltip-effect="dark"
                  style="width: 100%"
                  :default-sort="{prop: 'date', order: 'descending'}"
                  @selection-change="handleSelectionChange"
                  :header-cell-style="{background:'#eee',color:'#606266'}">
          <el-table-column type="selection"
                           width="55"></el-table-column>
          <el-table-column prop="name"
                           label="敏感度"
                           sortable
                           align="center"
                           :filters="[{ text: '家', value: '家' }, { text: '公司', value: '公司' }]"
                           :filter-method="filterTag">
            <template slot-scope="scope">
              <el-tag :type="scope.row.tag === '家' ? 'primary' : 'success'"
                      disable-transitions>{{scope.row.tag}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="name"
                           label="匹配内容"
                           align="center"></el-table-column>

          <el-table-column prop="name"
                           label="数据类型"
                           sortable
                           align="center"></el-table-column>
          <el-table-column prop="name"
                           label="规则"
                           align="center"></el-table-column>
          <el-table-column prop="address"
                           label="策略"
                           align="center"></el-table-column>
          <el-table-column fixed="right"
                           label="操作"
                           align="center">
            <template slot-scope="scope">
              <el-button @click="handleClick(scope.row)"
                         type="text"
                         size="small">上报</el-button>
              <el-button @click="handleClick(scope.row)"
                         type="text"
                         size="small">下载</el-button>
              <el-button type="text"
                         size="small">忽略</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
// 引入 ECharts 主模块
// import Chart from "@/components/Charts/BarChart";
import LineChart from "../components/LineChart";
export default {
  name: "BarChart",
  components: { LineChart },
  data() {
    const validate = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请输入日期"));
      } else {
        callback();
      }
    };
    const valiobj = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请输入对象类型"));
      } else {
        callback();
      }
    };
    const lineChartData = {
      newVisitis: {
        expectedData: [100, 120, 161, 134, 105, 160, 165],
        actualData: [120, 82, 91, 154, 162, 140, 145]
      },
      messages: {
        expectedData: [200, 192, 120, 144, 160, 130, 140],
        actualData: [180, 160, 151, 106, 145, 150, 130]
      },
      purchases: {
        expectedData: [80, 100, 121, 104, 105, 90, 100],
        actualData: [120, 90, 100, 138, 142, 130, 130]
      },
      shoppings: {
        expectedData: [130, 140, 141, 142, 145, 150, 160],
        actualData: [120, 82, 91, 154, 162, 140, 130]
      }
    };
    return {
      databaseTypeSelect: [
        {
          label: "全部",
          value: "all"
        }
      ],
      lineChartData: lineChartData.newVisitis,
      ruleForm: {},
      ruleRules: {
        date: [{ required: true, trigger: "blur", validator: validate }],
        obj: [{ required: true, trigger: "blur", validator: valiobj }]
      },
      tableData: [
        {
          date: "01",
          name: "王小虎",
          address: "1518 "
        },
        {
          date: "02",
          name: "王小虎",
          address: "1519 "
        }
      ],
      map: "hour",
      maps: [
        {
          label: "小时",
          name: "hour"
        },
        {
          label: "日",
          name: "day"
        },
        {
          label: "周",
          name: "week"
        },
        {
          label: "月",
          name: "month"
        }
      ],
      multipleSelection: [],
      input: "",
      states: [
        {
          label: "当日数据",
          value: "1"
        }
      ],
      selectValue: ""
    };
  },
  methods: {
    formatter(row, column) {
      return row.address;
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleClick(row) {
      console.log(row);
    },
    create() { },
    resetDateFilter() {
      this.$refs.filterTable.clearFilter("date");
    },
    clearFilter() {
      this.$refs.filterTable.clearFilter();
    },
    formatter(row, column) {
      return row.address;
    },
    filterTag(value, row) {
      return row.tag === value;
    }
  },
  created() { }
};
</script>
 <style lang="scss">
.left {
  .el-dropdown {
    margin-top: 16px;
    padding-right: 70px;
    margin-bottom: 22px;
    .el-dropdown-link {
      i {
        width: 0;
        height: 0;
        border-right: 8px solid transparent;
        border-left: 8px solid transparent;
        border-top: 8px solid white;
        position: absolute;
        left: 99px;
        top: 5px;
      }
    }
  }
  .el-form {
    width: 200px;
    height: 24px;
    .el-form-item {
      margin-bottom: 0;
      padding-left: 87px;
      .el-input {
        width: 200px;
        height: 24px;
      }
      span {
        position: absolute;
        color: #3d96c5;
        text-indent: 5px;
        font-size: 12px;
        margin-bottom: 11px;
      }
      #spa {
        position: absolute;
        left: -60px;
      }
    }
  }
}
#lf {
  .el-table {
    .el-table-item {
      .el-popover {
        background: #3e3e3e65;
      }
    }
  }
  #tre {
    display: inline-block;
    width: 550px;
    height: 60px;
    text-indent: 20px;
    color: #464f5bc4;
    line-height: 60px;
    font-size: 18px;
    font-weight: bold;
  }
}
#rg {
  position: relative;
  width: 70%;
  .el-tabs__header {
    position: absolute;
    right: 80px;
    top: 20px;
    border: solid 1px #3f51b5;
    height: 30px;
    border-radius: 10px;
  }
  .el-tabs__nav-wrap::after {
    height: 0;
  }
  .el-tabs--top .el-tabs__item.is-top {
    width: 40px;
    height: 28px;
    padding: 0;
    text-align: center;
    line-height: 28px;
    border-right: solid 1px #3f51b5;
    &:nth-of-type(5) {
      border: none;
    }
  }
  .el-tabs__item.is-active {
    background: #3f51b5;
    color: white;
  }
  .el-tabs__active-bar {
    height: 0;
  }
  ul {
    display: flex;
    flex-direction: row;
    width: 160px;
    border: solid 1px #5268df;
    border-radius: 8px;
    position: absolute;
    top: -5vh;
    left: 50vw;
    li {
      list-style: none;
      width: 40px;
      height: 30px;
      border-right: solid 1px #5268df;
      font-size: 12px;
      line-height: 30px;
      text-align: center;
      &:nth-of-type(4) {
        border-right: none;
      }
    }
  }
  width: calc(100%-550px);
  .chart-container {
    padding: 0;
  }
  #ads {
    display: flex;
    flex-direction: row;
    border: solid 1px #d1d1d1;
    width: calc(100%-550px);
    height: 60px;
    line-height: 60px;
    span {
      font-size: 12px;
      &:nth-of-type(1) {
        display: inline-block;
        width: 232px;
        margin-left: 15px;
        color: #999;
        font-size: 16px;
        i {
          font-style: normal;
          font-weight: bold;
          color: #333;
        }
      }
      &:nth-of-type(3) {
        margin-left: 50px;
      }
      &:nth-of-type(4) {
        margin-left: 500px;
      }
    }
  }
  p {
    width: calc(100%-550px);
    height: 54px;
    background: #eee;
    margin: 0;
    line-height: 54px;
    border-bottom: solid 1px #d8d8d8;
    > span {
      display: inline-block;
      width: 126px;
      margin-left: 15px;
      font-weight: bold;
      margin-right: 15vw;
    }
    .el-button {
      //  width: 70px;
      color: white;
      font-size: 14px;
      &:nth-of-type(2) {
        background: none;
        color: #333;
        border: none;
      }
      > span {
        margin: 0;
        display: inline-block;
      }
    }
  }
}
</style>

<style lang="scss" scoped>
.el-dropdown-link {
  width: 244px;
  height: 41px;
  cursor: pointer;
  color: #ffffff;
  margin-left: 30px;
  padding-top: 16px;
}
.el-icon-arrow-down {
  font-size: 12px;
}
#top {
  width: 100%;
  height: 141px;
  background: #0c1442;
  position: relative;
}
#bor {
  display: inline-block;
  width: 2px;
  height: 100px;
  background: #54d1ff;
  position: absolute;
  top: 21px;
  left: 352px;
}
#left {
  width: 352px;
}
#right {
  position: absolute;
  left: 354px;
  top: 0;
  ul {
    display: flex;
    justify-content: space-around;
    flex-direction: row;
    margin: 0;
    padding: 0;
    li {
      list-style: none;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-around;
      margin: 40px 50px;
      &:nth-of-type(2) {
        span {
          color: #ff980d;
        }
      }
      span {
        display: flex;
        flex-direction: column;
        align-items: center;
        &:nth-of-type(1) {
          i {
            display: inline-block;
            width: 60px;
            height: 60px;
            border-radius: 12px;
            background: #3d96c544;
            line-height: 60px;
            font-size: 36px;
            text-align: center;
            margin-right: 20px;
          }
        }
        i {
          font-style: normal;
          color: #3d96c5;
          font-size: 12px;
          display: inline-block;
          &:nth-of-type(2) {
            font-size: 24px;
            color: white;
          }
        }
      }
    }
  }
}
#main {
  width: 100%;
  display: flex;
  flex-direction: row;
}
#lf {
  width: 30%;
  .el-table {
    .el-table-item {
      .el-popover {
        width: 300px;
        height: 280px;
        background: #3e3e3e65;
        color: #fff;
      }
    }
  }
}
.chart-container {
  position: relative;
  width: 1000px;
  height: 240px;
  padding: 10px;
  margin-left: 157px;
}
#rg {
  border-left: solid 1px #3e3e3e;
}
</style> 
