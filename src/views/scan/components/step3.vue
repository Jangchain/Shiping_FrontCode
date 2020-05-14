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
    <div id="bts">
      <p id="txt">请在以下列表选择相关信息源，也可通过新建创建信息源，新建的数据默认选中并与规则列表数据同步更新.</p>
      <div v-if="show1">
        <el-button @click="news()" type="success">新建</el-button>
        <Datatable
        @select="select"
          @handleSizeChange="handleSizeChange"
          @handleCurrentChange="handleCurrentChange"
          @modifyRowData="modifyRowData"
          @deleteRowData="deleteRowData"
          :tableData="tableData"
          :tableHeaderData="tableHeaderData"
          :total="total"
          :arr="arr"
          :pageSize="pageSize"
          :currentPage="currentPage"
        ></Datatable>
      </div>
      <div v-else-if="show2">
        <div id="step3Show">
          <el-form id="form1" :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="规则名称">
              <el-input v-model="formInline.user" placeholder="规则名称"></el-input>
            </el-form-item>
            <el-form-item label="规则类型">
              <el-select v-model="formInline.region">
                <el-option label="终端扫描规则" value="0"></el-option>
                <el-option label="存储检查规则" value="1"></el-option>
                <el-option label="网络监控规则" value="2"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="严重性">
              <el-select v-model="formInline.region1">
                <el-option label="很低" value="0"></el-option>
                <el-option label="低" value="1"></el-option>
                <el-option label="中等" value="2"></el-option>
                <el-option label="高" value="3"></el-option>
                <el-option label="很高" value="4"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="备注">
              <el-input v-model="formInline.user"></el-input>
            </el-form-item>
            <el-form-item label="生效时间">
              <el-select v-model="value">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <div>
            <el-row :gutter="40">
              <el-col :span="10">ssa</el-col>
              <el-col :span="4">ssa</el-col>
              <el-col :span="10">asd</el-col>
            </el-row>
            <el-button>保存</el-button>
            <el-button @click="cancel">取消</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Datatable from "../components/data-table";
import { scanGetRulesByPage } from "@/api/scan";
export default {
  name: "step3",
  components: {
    Datatable
  },
  data() {
    return {
      value: "",
      tableData: [],
      tableHeaderData: [],
      pageSize:10,
      currentPage:1,
      total: 10,
      show1: true,
      show2: false,
      formInline: {},
      radio: "",
      options: [
        {
          value: "0",
          label: "全天生效"
        },
        {
          value: "1",
          label: "工作日（默认周一到周五8：00~18：00）"
        },
        {
          value: "2",
          label: "非工作日（工作日以外的其他时间）"
        },
        {
          value: "3",
          label: "自定义"
        }
      ],
      value: "",
      arr:[]
    };
  },
  methods: {
    select(rows){
      console.log(rows)
      this.arr=rows
    },
    rulesList(){
      const list = {
        current:this.currentPage,
        size:this.pageSize,
        descs:this.tableData.modifyDate,
        subSystem:1
      }
     scanGetRulesByPage(list).then(res=>{
       console.log(res)
       if(res.code == 0){
         this.tableData = res.data.records
         this.total =Number(res.data.total) 
        //  this.currentPage = res.data.current
       }
     })
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
      this.rulesList()
    },
    handleSizeChange(val) {
      console.log(val);
      this.pageSize = val
      this.rulesList()
    },
    news() {
      // (this.show1 = false), (this.show2 = true);
    },
    onSubmit() {
      console.log("submit!");
    },
    cancel(){
(this.show2 = false), (this.show1= true);
    }
  },
  mounted() {
    this.tableHeaderData = [
      {
        name: "name",
        label: "检测规则名称"
      },
      {
        name: "subsystem",
        label: "规则类型"
      },

      {
        name: "customizedExpression",
        label: "规则逻辑条件"
      },
      {
        name: "definitionType",
        label: "添加方式"
      },
      {
        name: "modifyDate",
        label: "修改时间"
      },
      {
        name: "description",
        label: "备注"
      }
    ];
    this.rulesList()
  }
};
</script>

<style lang="scss">
#bts {
  width: 100%;
  margin-left: 40px;
  #txt {
    font-size: 16px;
    font-weight: normal;
    color: #999;
    line-height: 2.5rem;
  }
}
#step3Show{
  #form1{
    height: 80px;
    border: none;
    margin-bottom: 0;
  }
}
</style>
<style lang="scss" scoped>
#top1 {
  position: relative;
  width: 100%;
  height: 100px;
  background: #2a41c1;
  // margin-top: 20px;
  border-bottom: solid 1px rgba(255, 0, 0, 0);
  ul {
    display: flex;
    flex-direction: row;
    border-bottom: solid 1px rgba(19, 18, 18, 0.123);
  }
  ul li {
    width: 240px;
    height: 120px;
    padding-top: 20px;
    margin-top: -20px;
    margin-right: 0;
    margin-left: 0;
    list-style: none;
    line-height: 100px;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    background: #fff;
    &:nth-of-type(1) {
      border-radius: 10px 0px 0 0;
    }
    &:nth-of-type(3) {
      border-radius: 0 10px 0 0;
      background: #fff;
    }
    i {
      &:nth-of-type(1) {
        width: 60px;
        height: 60px;
        border-radius: 30px;
        margin-top: 20px;
        line-height: 60px;
        text-align: center;
        color: white;
      }
      &:nth-of-type(3) {
        color: #101010;
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
    i {
      &:nth-of-type(1) {
        color: #101010;
      }
    }
  }
}
i {
  font-style: normal;
}
</style>