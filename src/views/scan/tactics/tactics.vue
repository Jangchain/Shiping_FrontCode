<template>
  <div id="con">
    <div id="left">
      <p>任务组列表</p>
      <el-button
        icon="el-icon-circle-plus-outline"
        type="primary"
        @click="dialogFormVisible = true;add()"
      >新建组</el-button>
     <!--  <el-dialog title="新增项目" :visible.sync="dialogFormVisible">
        <el-form :model="form" :inline="true">
          <el-form-item label="项目编号" :label-width="formLabelWidth">
            <el-input v-model="form.code" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="项目名称" :label-width="formLabelWidth">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="系统名称" :label-width="formLabelWidth">
            <el-input v-model="form.systemName" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="项目密码" :label-width="formLabelWidth">
            <el-input v-model="form.password" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="备案证明编号" :label-width="formLabelWidth">
            <el-input v-model="form.recordNumber" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="标准体系" :label-width="formLabelWidth">
            <el-select v-model="form.region">
              <el-option label="标准体系" value="shanghai"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="行业" :label-width="formLabelWidth">
            <el-select v-model="form.region">
              <el-option label="标准体系" value="shanghai"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="扩展体系" :label-width="formLabelWidth">
            <el-select v-model="form.region">
              <el-option label="扩展体系" value="shanghai"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <p>|受检单位信息</p>
        <el-form  :model="formInline" :inline="true">
          <el-form-item label="单位名称" :label-width="formLabelWidth">
            <el-input v-model="formInline.detectUnit" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="单位所属部门/省" :label-width="formLabelWidth">
            <el-input v-model="formInline.unitProvince" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="单位组织机构代码" :label-width="formLabelWidth">
            <el-input v-model="formInline.unitOrgCode" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="单位地址" :label-width="formLabelWidth">
            <el-input v-model="formInline.unitAddress" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="单位负责人姓名" :label-width="formLabelWidth">
            <el-input v-model="formInline.unitManager" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="单位负责人职务" :label-width="formLabelWidth">
            <el-input v-model="formInline.managerPosition" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
        </div>
      </el-dialog> -->
      <!--  <el-tree
        id="tree"
        :data="data"
        show-checkbox
        node-key="id"
        default-expand-all
        :expand-on-click-node="false"
      >
        <span class="custom-tree-node" slot-scope="{ node, data }">
          <span>{{ node.label }}</span>
          <span>
            <el-button
              type="text"
              size="mini"
              icon="el-icon-circle-plus-outline"
              @click="() => append(data)"
            >添加</el-button>

            <el-button type="text" size="mini" icon="el-icon-edit" @click="() => edit(data)"></el-button>
            <el-button
              type="text"
              size="mini"
              icon="el-icon-delete"
              @click="() => remove(node, data)"
            ></el-button>
          </span>
        </span>
      </el-tree>-->
    </div>
    <div id="right">
      <Datatable
        v-if="!activeName"
        @handleSizeChange="handleSizeChange"
        @handleCurrentChange="handleCurrentChange"
        @modifyRowData="modifyRowData"
        @deleteRowData="deleteRowData"
        :tableData="tableData"
        :tableHeaderData="tableHeaderData"
        :total="total"
        :pageSize="pageSize"
        :currentPage="currentPage"
         :typesStep2="typesStep2"       
        :widthes="widthes"
      >
        <div class="form-data">
          <div class="title-name">任务列表</div>
          <div class="title-form">
            <el-form :inline="true">
              <el-form-item label>
                 <el-date-picker
                    v-model="scanTime"
                    type="datetimerange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                  </el-date-picker>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="search()">搜索</el-button>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="reset()">重置</el-button>
              </el-form-item>
              <el-form-item>
                <el-button type="danger" @click="deletes()">批量删除</el-button>
              </el-form-item>
              <el-form-item>
                <el-button type="danger" @click="stops()">批量禁用</el-button>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="start()">批量启用</el-button>
              </el-form-item>
              <el-form-item>
                <el-button type="success" @click="news()">新建</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </Datatable>
    </div>
  </div>
</template>

<script>
import navList from "../components/nav-list";
import Datatable from "../components/data-table";
import { tabs } from "./common";
import {
  taskCenterGetTaskCenterByPage,
} from "@/api/scan";
export default {
  components: {
    navList,
    Datatable
  },
  data() {
    const data = [
      {
        id: 1,
        label: "一级 1",
        children: [
          {
            id: 4,
            label: "二级 1-1",
            children: [
              {
                id: 9,
                label: "三级 1-1-1"
              },
              {
                id: 10,
                label: "三级 1-1-2"
              }
            ]
          }
        ]
      },
      {
        id: 2,
        label: "一级 2",
        children: [
          {
            id: 5,
            label: "二级 2-1"
          },
          {
            id: 6,
            label: "二级 2-2"
          }
        ]
      },
      {
        id: 3,
        label: "一级 3",
        children: [
          {
            id: 7,
            label: "二级 3-1"
          },
          {
            id: 8,
            label: "二级 3-2"
          }
        ]
      }
    ];
    return {
      navData: [],
      activeName: "",
      curIndex: NaN, // 当前展示的nav下标,
      tableData: [],
      tableHeaderData: [],
      pageSize:10,
      currentPage:1,
      total: 10,
      widthes: 180,
      typesStep2: 0,
      radio: "policy",
      scanTime:[],
      databaseTypeSelect: [
        {
          label: "全部",
          value: ""
        },{
          label: "数据库扫描",
          value: "DATABASE"
        },{
          label: "共享文件扫描",
          value: "FILE_SYSTEM"
        },{
          label: "exchange扫描",
          value: "EXCHANGE"
        },{
          label: "SharePoint扫描",
          value: "SHARE_POINT"
        },{
          label: "Lotus扫描",
          value: "LOTUS"
        },{
          label: "FTP扫描",
          value: "FTP"
        },{
          label: "Linux主机扫描",
          value: "SFTP"
        },{
          label: "WebDav扫描",
          value: "WEBDAV"
        },{
          label: "云数据库检查",
          value: "CLOUD_DATABASE"
        },{
          label: "云对象存储检查",
          value: "CLOUD_OBJECT_SAVE"
        },{
          label: "智能分类",
          value: "intelligentClassification"
        },{
          label: "模式分类",
          value: "patternClassification"
        },{
          label: "网络监控",
          value: "NETWORKMONITOR_DISCOVERY_TASK"
        },{
          label: "终端扫描",
          value: "TERMINAL_DLP_TASK"
        },
      ],
      selectValue: "",
      searchValue: "",
      data: JSON.parse(JSON.stringify(data)),
      dialogFormVisible: false,
      form: {},
      formInline: {},
      formLabelWidth: "120px"
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
        name: "type",
        label: "类型"
      },
      {
        name: "endTime",
        label: "运行周期"
      },
      {
        name: "startTime",
        label: "时间"
      },

      {
        name: "createdName",
        label: "创建者"
      },
      {
        name: "totalRecordCount",
        label: "事件数"
      }
    ];
    this.gettableData();
  },
  methods: {
    date(time){
      let times = new Date(time)
      let dates = times.getFullYear() + '-' + (times.getMonth() + 1) + '-' + times.getDate() + ' ' + times.getHours() + ':' + times.getMinutes() + ':' + times.getSeconds();  
      return dates
  },
    add() {
      // this.$router.push('./task')
      let list = {
        code: "0001",
        detectUnit: "医院",
        extendedStandard: "",
        industry: "7cfdbdda3b4011e9acb0b06ebf3411be",
        managerPosition: "无",
        name: "测试",
        password:
          "04a75772b3f36f6352192807df9f72fe90e2825fad5083567c76a9b691478ef82729c4324fe734902b9468fc558a4c0bb0859fbf8325b94d46cd09dfad7318ca0bd14936d79ebdee534eea2e1760f696ba667c1699eda9a50d6cdefc9c255ad60ce95db21357dd5dcd3e",
        recordNumber: "01010101010101010",
        standardSystem: "",
        systemName: "测试",
        unitAddress: "江宁区",
        unitManager: "CC",
        unitOrgCode: "12345678-1",
        unitProvince: "江宁区中医院"
      };
     /*  scanComplianceCreate().then(res => {
        if (res.code == 0) {
          console.log(res);
        }
      }); */
    },
    news() {
      this.$router.push("./task");
    },
    search(){

     this.gettableData()
    },
    reset(){
     this.scanTime = []
    },
    deletes(){
      console.log(this.searchValue)
    },
    stops(){
      console.log(this.searchValue)
    },
    start(){
      console.log(this.searchValue)
    },
    gettableData(page) {
      this.tableData = [];
      console.log(this.date(this.scanTime[0]),this.date(this.scanTime[1]))
      let starttime = this.date(this.scanTime[0])
      if(isNaN(starttime)){
        starttime = ""
      }
      const lists = {
        current:this.currentPage,
        size:this.pageSize,
        startTime: starttime,
        endTime:""
      };
      taskCenterGetTaskCenterByPage(lists).then(res => {
        console.log(res.data.records)
        if (res.code == 0) {
          this.tableData = res.data.records;
          this.total =Number(res.data.total) 
          console.log(this.tableData);
          this.tableData.forEach((item,i)=>{
            console.log(item)
            if(item.discoveryTaskType == this.databaseTypeSelect[i].value){
              this.tableData.type = this.databaseTypeSelect[i].label
            }
          })
        }
      });
    },
    modifyRowData(val) {
      console.log(val);
    
    },
    deleteRowData(val) {
      console.log(val);
    },
    handleCurrentChange(val) {
      console.log(val);
       this.currentPage = val
      this.gettableData()
    },
    handleSizeChange(val) {
      console.log(val);
       this.pageSize = val
      this.gettableData()
    },
    append(data) {
      const newChild = { id: id++, label: "testtest", children: [] };
      if (!data.children) {
        this.$set(data, "children", []);
      }
      data.children.push(newChild);
    },

    remove(node, data) {
      const parent = node.parent;
      const children = parent.data.children || parent.data;
      const index = children.findIndex(d => d.id === data.id);
      children.splice(index, 1);
    },

    renderContent(h, { node, data, store }) {
      return (
        <span class="custom-tree-node">
          <span>{node.label}</span>
          <span>
            <el-button
              size="mini"
              type="text"
              on-click={() => this.append(data)}
            >
              Append
            </el-button>
            <el-button
              size="mini"
              type="text"
              on-click={() => this.remove(node, data)}
            >
              Delete
            </el-button>
          </span>
        </span>
      );
    }
  }
};
</script>

<style lang="scss">
#left {
  #tree {
    .el-button {
      width: 20%;
    }
  }
}
#right {
  .data-area[data-v-487df30c] {
    padding-left: 0;
  }
  .el-table th.is-leaf,
  .el-table td {
    border-bottom: none;
  }
  .el-table--border th,
  .el-table--border td {
    border-bottom: none;
    border-right: none;
  }
  .el-table--border th {
    border-bottom: none;
    background: rgba(128, 128, 128, 0.233);
  }
  .el-table__row {
    td {
      &:nth-of-type(7) {
        color: red;
      }
      &:nth-of-type(9) {
        .el-button--text {
          color: #333;
        }
      }
    }
  }
}
</style>
<style lang="scss" scoped>
#con {
  width: 100%;
  display: flex;
  flex-direction: row;
}
#left {
  width: 25%;
  padding-top: 10px;
  padding-left: 10px;
  p {
    background: rgba(128, 128, 128, 0.3);
    height: 50px;
    font-size: 14px;
    line-height: 50px;
    text-indent: 20px;
    margin: 0;
  }
  .el-button {
    width: 100%;
    border-radius: 0;
  }
}
#right {
  width: 75%;
  .data-area {
    background: white;
  }
  .title-name {
    float: left;
    margin-top: 10px;
    font-weight: bold;
  }
  .title-form {
    float: right;
  }
}
</style>