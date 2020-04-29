<template>
  <div class="dashboard-container">
    <div id="top">
      <el-form id="tal" :label-position="labelPosition" :model="searchForm" class="search-form">
        <el-form-item label="日期">
          <el-input id="dates" v-model="searchForm.name"></el-input>
        </el-form-item>
        <el-form-item label="地区">
          <el-select size="mini" v-model="searchForm.contentClassifierType" placeholder="输入地区">
            <el-option label="全部" value></el-option>
            <el-option v-for="(item,key) in city" :key="key" :label="item" :value="key"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="部门">
          <el-select v-model="searchForm.contentClassifierType" placeholder="输入部门">
            <el-option label="全部" value></el-option>
            <el-option
              v-for="(item,key) in contentClassifierTypeMap"
              :key="key"
              :label="item"
              :value="key"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="业务系统">
          <el-select v-model="searchForm.contentClassifierType" placeholder="所属类型">
            <el-option label="全部" value></el-option>
            <el-option
              v-for="(item,key) in contentClassifierTypeMap"
              :key="key"
              :label="item"
              :value="key"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="信息源类型">
          <el-select v-model="searchForm.definitionType" placeholder="类型">
            <el-option label="全部" value></el-option>
            <el-option
              v-for="(item,key) in definitionTypeMap"
              :key="key"
              :label="item"
              :value="key"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="信息源">
          <el-input id="from" v-model="searchForm.name" placeholder="输入信息源"></el-input>
        </el-form-item>
        <el-form-item label="对象类型">
          <el-select v-model="searchForm.contentClassifierType" placeholder="所属类型">
            <el-option label="全部" value></el-option>
            <el-option
              v-for="(item,key) in contentClassifierTypeMap"
              :key="key"
              :label="item"
              :value="key"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="对象">
          <el-input id="from" v-model="searchForm.name" placeholder="输入对象"></el-input>
        </el-form-item>
        <el-form-item label="IP类型">
          <el-select v-model="searchForm.contentClassifierType" placeholder="所属类型">
            <el-option label="全部" value></el-option>
            <el-option
              v-for="(item,key) in contentClassifierTypeMap"
              :key="key"
              :label="item"
              :value="key"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="IP">
          <el-input id="from" v-model="searchForm.name" placeholder="输入IP"></el-input>
        </el-form-item>
      </el-form>
      <el-form id="tot" :label-position="labelPosition" :model="searchForm" class="search-form">
        <el-form-item label="匹配内容">
          <el-input id="dates" v-model="searchForm.name" placeholder="输入匹配内容"></el-input>
        </el-form-item>
        <el-form-item label="敏感度">
          <el-select v-model="searchForm.contentClassifierType" placeholder="敏感度">
            <el-option label="全部" value></el-option>
            <el-option
              v-for="(item,key) in contentClassifierTypeMap"
              :key="key"
              :label="item"
              :value="key"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="批量">
          <el-select v-model="searchForm.contentClassifierType" placeholder="批量">
            <el-option label="全部" value></el-option>
            <el-option
              v-for="(item,key) in contentClassifierTypeMap"
              :key="key"
              :label="item"
              :value="key"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="数据类型">
          <el-select v-model="searchForm.contentClassifierType" placeholder="数据类型">
            <el-option label="全部" value></el-option>
            <el-option
              v-for="(item,key) in contentClassifierTypeMap"
              :key="key"
              :label="item"
              :value="key"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="策略类型">
          <el-select v-model="searchForm.contentClassifierType" placeholder="策略类型">
            <el-option label="全部" value></el-option>
            <el-option
              v-for="(item,key) in contentClassifierTypeMap"
              :key="key"
              :label="item"
              :value="key"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="策略">
          <el-input id="from" v-model="searchForm.name" placeholder="输入策略"></el-input>
        </el-form-item>
        <el-form-item label="规则类型">
          <el-select v-model="searchForm.contentClassifierType" placeholder="规则类型">
            <el-option label="全部" value></el-option>
            <el-option
              v-for="(item,key) in contentClassifierTypeMap"
              :key="key"
              :label="item"
              :value="key"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="规则">
          <el-input id="from" v-model="searchForm.name" placeholder="输入规则"></el-input>
        </el-form-item>
      </el-form>
      <div id="srcs">
        <el-checkbox-group v-model="checkList">
          <el-checkbox label="已上报"></el-checkbox>
          <el-checkbox label="已审查"></el-checkbox>
          <el-checkbox label="已处理"></el-checkbox>
          <el-checkbox label="已忽略"></el-checkbox>
          <el-checkbox label="已下载"></el-checkbox>
          <el-checkbox label="已导出"></el-checkbox>
        </el-checkbox-group>
        <el-input width="120px" placeholder="输入搜索内容" prefix-icon="el-icon-search" v-model="input"></el-input>
        <el-button type="info">搜索</el-button>
        <el-button type="info">高级搜索</el-button>
        <el-button type="info">保存搜索条件</el-button>
        <el-button type="info">显示已有搜索</el-button>
        <el-button type="info">清除</el-button>
        <el-button type="primary">确定</el-button>
      </div>
    </div>
    <p id="tit">XX公司数据资产分布与流转图</p>
    <div id="btm">
      <div id="left">
        <el-tabs v-model="times" value @tab-click="handleClick">
          <el-tab-pane
            v-for="(item,i) in lists"
            :key="i"
            :label="item.label"
            :name="item.name"
            lazy
          >
            <ColumnChart :chartData="chartData" />
          </el-tab-pane>
        </el-tabs>
        <el-tabs v-model="sensitive" value @tab-click="handleClick">
          <el-tab-pane v-for="(item,i) in arr" :key="i" :label="item.label" :name="item.name" lazy>
            <RoundChart :chartData="chartData" />
          </el-tab-pane>
        </el-tabs>
        <el-tabs v-model="sensitive" value @tab-click="handleClick">
          <el-tab-pane v-for="(item,i) in arr" :key="i" :label="item.label" :name="item.name" lazy>
            <div v-for="o in 5" :key="o" class="text item">{{'列表内容 ' + o }}</div>
          </el-tab-pane>
        </el-tabs>
      </div>
      <div id="centers">
        <el-tabs v-model="map" value @tab-click="handleClick">
          <el-tab-pane v-for="(item,i) in maps" :key="i" :label="item.label" :name="item.name" lazy>
            <ChinaChart :chartData="chartData" />
          </el-tab-pane>
        </el-tabs>
        <ul id="num">
          <li>
            <span>检测数量总数(MB)：</span>
            <span>
              <i v-for="(num,i) in numbers" :key="i">
                {{num}}
              </i>(MB)
            </span>
          </li>
          <li>
            <span>风险事件数量：</span>
            <span>
              <i v-for="(num,i) in nums" :key="i">
                {{num}}
              </i>
            </span>
          </li>
        </ul>
        <el-table :data="tableData" style="width: 700px" height="150">
          <el-table-column prop="address" label="IP地址" align="center"></el-table-column>
          <el-table-column prop="sensitivity" label="敏感度" align="center"></el-table-column>
          <el-table-column prop="match" label="匹配内容" align="center"></el-table-column>
          <el-table-column prop="type" label="数据类型" align="center"></el-table-column>
          <el-table-column prop="rule" label="规则" align="center"></el-table-column>
          <el-table-column prop="strategy" label="策略" align="center"></el-table-column>
        </el-table>
      </div>
      <div id="right">
        <el-tabs id="tabs" v-model="area" value @tab-click="handleClick">
          <el-tab-pane
            v-for="(item,i) in areas"
            :key="i"
            :label="item.label"
            :name="item.name"
            lazy
          >
            <ColumnarsChart :chartData="chartData" />
          </el-tab-pane>
        </el-tabs>
        <el-card id="card" body-style="{width:'300px'}" class="box-card">
          <div slot="header" class="clearfix">
            <span>匹配内容排行</span>
          </div>
          <div v-for="o in 6" :key="o" class="text item">{{'列表内容 ' + o }}</div>
        </el-card>
        <el-tabs v-model="sensitive" value @tab-click="handleClick">
          <el-tab-pane v-for="(item,i) in arr" :key="i" :label="item.label" :name="item.name">
            <div v-for="o in 6" :key="o" class="text item">{{'列表内容 ' + o }}</div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import ColumnChart from "../components/ColumnarChart";
import RoundChart from "../components/RoundChart";
import ChinaChart from "../components/ChinaChart";
import ColumnarsChart from "../components/ColumnarsChart";
export default {
  components: { ColumnChart, RoundChart, ChinaChart, ColumnarsChart },
  data() {
    return {
      sensitive: "level",
      times: "day",
      map: "distribution",
      area: "region",
      tableData: [],
      chartData: {},
      nums:[
        9,7,8,3
      ],
      numbers:[
        9,7,8,3,4,4,5
      ],
      labelPosition: "left",
      searchForm: {
        queryType: "FILE_CHARACTERISTIC",
        descs: "updateDate",
        current: 1,
        size: 10
      },
      city: {
        value1: "北京",
        value2: "浙江杭州",
        value3: "上海",
        value4: "广东广州",
        value5: "广东深圳",
        value6: "江西南昌",
        value7: "江苏苏州",
        value8: "山东青岛",
        value9: "江苏南京"
      },
      contentClassifierTypeMap: {
        FILE_TYPE: "文件类型",
        FILE_NAME: "文件名称",
        FILE_SIZE: "文件大小",
        FILE_OWNER: "文件所有者",
        FILE_TIME: "文件时间"
      },
      definitionTypeMap: {
        C_USER_DEFINE: "自定义",
        C_PRE_DEFINE: "默认"
      },
      lists: [
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
        },
        {
          label: "年",
          name: "year"
        }
      ],
      arr: [
        {
          label: "敏感级别",
          name: "level"
        },
        {
          label: "风险特征",
          name: "trait"
        }
      ],
      maps: [
        {
          label: "分布图",
          name: "distribution"
        },
        {
          label: "拓扑图",
          name: "topology"
        },
        {
          label: "定制统计图",
          name: "customization"
        }
      ],
      areas: [
        {
          label: "地区",
          name: "region"
        },
        {
          label: "部门",
          name: "section"
        },
        {
          label: "业务系统",
          name: "operation"
        }
      ],
      checkList: ["选中且禁用", "复选框 A"],
      input: ""
    };
  },
  methods: {
    handleClick() {}
  },
  created() {}
};
</script>
<style lang="scss">
#top[data-v-9465a952] {
  text-align: left !important;
}
#top {
  .el-form-item {
    margin-bottom: 0;
    .el-input__inner {
      height: 30px !important;
      width: 120px;
    }
    #dates {
      width: 220px;
    }
    #from {
      width: 180px;
    }
  }
  .el-form-item__label {
    color: #54d1ff;
    font-size: 12px;
  }
  .el-checkbox__label {
    margin-top: 4px;
    color: #54d1ff;
    font-size: 12px;
  }
}
#srcs {
  .el-input--medium .el-input__inner {
    height: 30px !important;
  }

  .el-button {
    height: 30px !important;
    font-size: 14px;
  }
}
#tot,
#tal {
  .el-form-item {
    margin-right: 10px;
  }
}
#tit {
  width: 100%;
  // background: #090d3e;
  position: absolute;
  text-align: center;
  color: #fff;
  font-size: 24px;
}
#btm {
  padding-top: 80px;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  // background: #090d3e;
background: url('../images/2.jpg');
background-size: 100%;
  .RoundChart {
    width: 200px;
  }
  #centers {
    width: 800px;
    height: 800px;
    .chinachart {
      width: 100%;
      height: 100%;
    }
    .el-tabs__header{
      position: absolute;
      top: 40px;
      left: 32%;
      margin-bottom: 0;
      .el-tabs__nav-wrap::after{
        height: 0;
      }
    }
    .el-tabs {
      width: 100%;
      height: 500px;
      border: none;
    }
    .el-tabs__item {
        padding: 0 15px;
        border-bottom: none;
        height: 20px;
        line-height: 20px;
        color: #333;
        font-size: 18px;
      }
      .el-tabs__item.is-active {
        color: white;
        border-bottom: solid 1px white;
      }
      .el-tabs__active-bar {
        height: 0;
      }
    .el-table {
      background: rgba(3, 4, 13, 0.2);
    }
    .el-table th {
      background: rgba(3, 4, 13, 0.2);
      border: none;
    }
    .el-table tr {
      background: rgba(3, 4, 13, 0.2);
      border: none;
    }
    .el-table__empty-block {
      background: rgba(3, 4, 13, 0.2);
      border: none;
    }
    .el-table--group::after,
    .el-table--border::after,
    .el-table::before {
      background-color: rgba(3, 4, 13, 0.2);
    }
  }
  #right {
    margin-right: 50px;
    .el-tabs__header {
      position: absolute;
      top: 10px;
      right: 20px;
      border: solid 1px white;
      height: 20px;
      line-height: 20px;
      border-radius: 5px;
      .el-tabs__item {
        padding: 0 5px;
        border-bottom: none;
        height: 20px;
        line-height: 20px;
      }
    }
    #tabs {
      margin-left: 0;
    }
    .el-tabs__item {
      padding: 0 5px;
      border-bottom: none;
      height: 20px;
      line-height: 20px;
      color: white;
    }
    .el-tabs__item.is-active {
      background: white !important;
      color: #333;
    }
    .el-tabs__active-bar {
      background-color: white;
    }
    #card {
      width: 300px;
      height: 300px;
      background: #090d3e10;
      color: #2b93cd;
      border-color: #045397;
      margin-bottom: 30px;
      padding: 5px;
      .el-card__header {
        border-bottom: none;
        color: white;
      }
    }
  }
  #left {
    margin-left: 50px;
    .el-tabs__header {
      position: absolute;
      top: 30px;
      right: 30px;
      border: solid 1px white;
      height: 20px;
      line-height: 20px;
      border-radius: 5px;
      .el-tabs__item {
        padding: 0 5px;
        border-bottom: none;
        height: 20px;
        line-height: 20px;
        color: white;
      }
      .el-tabs__item.is-active {
        background: white !important;
        color: #333;
      }
      .el-tabs__active-bar {
        background-color: white;
      }
    }
  }
  .el-tabs {
    padding: 5px;
    width: 300px;
    height: 300px;
    border: solid 1px #045397;
    margin-bottom: 30px;
    position: relative;
  }
}
#num{
  margin-top: 140px;
  width: 700px;
  padding-left: 0;
}
</style>
<style lang="scss" scoped>
#top {
  left: 150px;
  top: 59px;
  width: 100%;
  height: 220px;
  line-height: 20px;
  background-color: rgba(12, 20, 66, 1);
  font-size: 12px;
  text-align: center;
  font-family: Roboto;
  border: 1px solid rgba(255, 0, 0, 0);
  padding-left: 30px;
  .el-form {
    width: 100%;
    display: flex;
    flex-direction: row;
    .el-form-item {
      padding-bottom: 0;
    }
  }
}
#srcs {
  display: flex;
  flex-direction: row;
  margin-top: 38px;
  .el-input {
    width: 280px;
    margin-left: 20px;
    height: 30px;
  }
}
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  width: 480px;
}
ul li{
  list-style: none;
}
i{
  font-style: normal;
}
#num{
  
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    li{
      display: flex;
      flex-direction: column;
      span{
        font-size: 24px;
        color: #BAE0F6;
        margin-bottom: 25px;
        i{
          display: inline-block;
          width: 40px;
          height: 60px;
          font-size: 36px;
          line-height: 60px;
          background: #0d6dee;
          color: #fff;
          margin-right: 5px;
          text-align: center;
        }
      }
    }
  
}
</style>
