<template>
  <div>
    <p style="background:#031e5e;padding:20px;margin:0;font-size:22px;color:#54D1FF;padding-bottom:0">
      <span style="color:#fff">新建检测任务-</span>选择任务类型
    </p>
    <navList :nav-list="navData" :curIndex="curIndex" @navClick="navClick" />
    <el-tabs id="tabes" type="border-card" v-model="radio" @tab-click="tabChange()">
      <el-tab-pane label="检测策略" name="policy">
        <Datatable
          v-if="!activeName"
          @handleSizeChange="handleSizeChange"
          @handleCurrentChange="handleCurrentChange"
          @modifyRowData="modifyRowData"
          @deleteRowData="deleteRowData"
          :tableData="tableData"
          :tableHeaderData="tableHeaderData"
          :total="total"
        >
          <div class="form-data">
            <div class="title-name">策略列表</div>
            <div class="title-form">
              <el-form :inline="true">
                <el-form-item label="策略类型">
                  <el-select v-model="selectValue" placeholder="全部">
                    <el-option
                      v-for="(v, k) in databaseTypeSelect"
                      :key="k"
                      :label="v.label"
                      :value="v.value"
                    />
                  </el-select>
                </el-form-item>
                <el-form-item label>
                  <el-input v-model="searchValue" placeholder="请输入内容">
                    <i slot="suffix" class="el-input__icon el-icon-search" />
                  </el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="gettableData(1)">搜索</el-button>
                </el-form-item>
                <el-form-item>
                  <el-button type="danger" @click="gettableData(1)">批量删除</el-button>
                </el-form-item>
                <el-form-item>
                  <el-button type="danger" @click="gettableData(1)">批量禁用</el-button>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="gettableData(1)">批量启用</el-button>
                </el-form-item>
                <el-form-item>
                  <el-button type="success" @click="news(1)">新建</el-button>
                </el-form-item>
              </el-form>
            </div>
          </div>
        </Datatable>
      </el-tab-pane>
      <el-tab-pane label="检测任务" name="task1">
        <Datatable
          v-if="!activeName"
          @handleSizeChange="handleSizeChange"
          @handleCurrentChange="handleCurrentChange"
          @modifyRowData="modifyRowData"
          @deleteRowData="deleteRowData"
          :tableData="tableData"
          :tableHeaderData="tableHeaderData1"
          :total="total"
        >
          <div class="form-data">
            <div class="title-name">任务列表</div>
            <div class="title-form">
              <el-form :inline="true">
                <el-form-item label="任务类型">
                  <el-select v-model="selectValue" placeholder="全部">
                    <el-option
                      v-for="(v, k) in databaseTypeSelect"
                      :key="k"
                      :label="v.label"
                      :value="v.value"
                    />
                  </el-select>
                </el-form-item>
                <el-form-item label>
                  <el-input v-model="searchValue" placeholder="请输入内容">
                    <i slot="suffix" class="el-input__icon el-icon-search" />
                  </el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="gettableData(1)">搜索</el-button>
                </el-form-item>
                <el-form-item>
                  <el-button type="danger" @click="gettableData(1)">批量删除</el-button>
                </el-form-item>
                <el-form-item>
                  <el-button type="danger" @click="gettableData(1)">批量禁用</el-button>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="gettableData(1)">批量启用</el-button>
                </el-form-item>
                <el-form-item>
                  <el-button type="success" @click="news(1)">新建</el-button>
                </el-form-item>
              </el-form>
            </div>
          </div>
        </Datatable>
      </el-tab-pane>
    </el-tabs>
    <component :is="activeName" />
  </div>
</template>

<script>
import navList from "../components/nav-list";
import Datatable from "../components/data-table";
import { tabs } from "./common";
export default {
  components: {
    navList,
    Datatable
  },
  data() {
    return {
      navData: [],
      activeName: "",
      curIndex: 2, // 当前展示的nav下标,
      tableData: [],
      tableHeaderData: [],
      tableHeaderData1: [],
      total: 10,
      radio:'task1',
      databaseTypeSelect: [
        {
          label: "全部",
          value: "all"
        }
      ],
      selectValue: "",
      searchValue: ""
    };
  },
  created() {
    tabs.forEach(val => {
      this.navData.push({
        icon: require("../images/1.png"),
        name: val.name,
        label: val.label
      });
      this.databaseTypeSelect.push({
        label: val.label,
        value: val.name
      });
    });
    console.log("this.$route.params", this.$route.params);
    const type = this.$route.params.type;
    if (type) {
      this.$route.meta.title = tabs.find(val => val.name === type).label;
      this.activeName = type;
      this.curIndex = tabs.findIndex(val => val.name === type);
    }
  },
  mounted() {
    this.tableHeaderData = [
      {
        name: "name",
        label: "策略名"
      },
      {
        name: "databaseType",
        label: "策略类型"
      },

      {
        name: "creator",
        label: "创建者"
      },
      {
        name: "obj",
        label: "检测对象"
      },
      {
        name: "nums",
        label: "扫描数据量"
      },
      {
        name: "num",
        label: "事件数"
      },
      {
        name: "date",
        label: "运行周期"
      },
      {
        name: "times",
        label: "时间"
      },
      {
        name: "static",
        label: "状态"
      }
    ];
    this.tableHeaderData1 = [
      {
        name: "name",
        label: "任务名"
      },
      {
        name: "databaseType",
        label: "任务类型"
      },
{
        name: "obj",
        label: "检测目标"
      },
      {
        name: "creator",
        label: "创建者"
      },
      
      {
        name: "nums",
        label: "起始时间"
      },
      {
        name: "num",
        label: "扫描总数"
      },
      {
        name: "date",
        label: "扫描文件大小"
      },
      {
        name: "times",
        label: "已处理"
      },
      {
        name: "static",
        label: "未处理"
      },
      {
        name: "times",
        label: "进度"
      },
      {
        name: "static",
        label: "状态"
      }
    ];
    this.gettableData();
  },
  methods: {
    navClick(val) {
      console.log(`${val.name}`)
      // this.$router.replace(`/scan/tactics/${val.name}`);
    },
    news() {
      this.$router.push("./newtask");
    },
    tabChange(){
      this.$router.push('./tactics')
    },
    gettableData(page) {
      this.tableData = [];
      for (let index = 0; index < 10; index++) {
        this.tableData.push({
          name: "信息源名称" + index,
          databaseType: "信息源类型" + index,
          ip: "IP地址" + index,
          createDate: "创建时间" + index,
          description: "备注" + index,
          creator: "创建者" + index,
          domain: "域名" + index,
          port: "端口" + index,
          lastModifyDate: "最后修改时间" + index
        });
      }
    },
    modifyRowData(val) {
      console.log(val);
    },
    deleteRowData(val) {
      console.log(val);
    },
    handleCurrentChange(val) {
      console.log(val);
    },
    handleSizeChange(val) {
      console.log(val);
    }
  }
};
</script>
<style lang="scss">
.nav-list .grid-content .content-in.bgColor[data-v-5fbfcc2e]{
  background-color: #fff;
}
</style>
<style lang="scss" scoped>
@import "~@/styles/mixin.scss";
.form-data {
  padding-top: 35px;
  .title-name {
    float: left;
    height: 36px;
    line-height: 36px;
  }
  .title-form {
    float: right;
  }
}
#tabes{
  padding: 10px;
  .data-area[data-v-487df30c]{
    padding: 0;
  }
  .form-data[data-v-79f1e701]{
    padding: 0;
  }

}

</style>
