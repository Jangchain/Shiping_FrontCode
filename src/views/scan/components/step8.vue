<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="11">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span style="font-size:16px">选取规则</span>
          </div>
          <Datatable
            @select="select"
            @setCurrentRow="setCurrentRow"
            @handleSizeChange="handleSizeChange"
            @handleCurrentChange="handleCurrentChange"
            :isStep2="true"
            :list="list"
            :tableData="tableData"
            :tableHeaderData="tableHeaderData"
            :total="total"
            :widthes="widthes"
            :typesStep2="typesStep2"
            :pageSize="pageSize"
            :currentPage="currentPage"
          ></Datatable>
        </el-card>
      </el-col>
      <el-col :span="2">
        <div id="transferStep">
          <i class="el-icon-arrow-left" @click="left()"></i>
          <i class="el-icon-arrow-right" @click="right()"></i>
        </div>
      </el-col>
      <el-col :span="11">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span style="font-size:16px">已选信息源</span>
          </div>
          <Datatable
            @select="select"
            @setCurrentRow="setCurrentRow"
            @handleSizeChange="handleSizeChange"
            @handleCurrentChange="handleCurrentChange"
            :isStep2="true"
            :list="list"
            :tableData="tableData1"
            :tableHeaderData="tableHeaderData1"
            :total="total"
            :widthes="widthes"
            :typesStep2="typesStep2"
            :pageSize="pageSize"
            :currentPage="currentPage"
          ></Datatable>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { scanGetRulesByPage } from "@/api/scan";
import Datatable from "../components/data-table";
export default {
  name: "step8",
  components: {
    Datatable
  },
  data() {
    return {
      value: "modifyDate",
      pageSize: 10,
      currentPage: 1,
      tableData: [],
      tableData1: [],
      tableHeaderData: [],
      tableHeaderData1: [],
      total: 10,
      widthes: 0,
      typesStep2: 0,
      list: {}
    };
  },
  methods: {
    select(row) {
      this.list = row;
      // console.log(this.list)
    },
    setCurrentRow(e) {
      // console.log(e);
    },
    sourceList() {
      const data = {
        current: this.currentPage,
        size: this.pageSize,
        descs: this.value,
        subSystem:1*1
      };
      scanGetRulesByPage(data).then(res => {
        console.log(res);
        if (res.code == 0) {
          this.tableData = res.data.records;
          (this.total = Number(res.data.total)),
            (this.currentPage = res.data.current);
        }
      });
    },
    /* selectChange(value) {
      let _this = this;
      this.types.forEach((item, index) => {
        console.log(index);
        if (item.value === value) {
          // _this.tableHeaderData[0].label = item.label
          _this.tableHeaderData = _this.title[index];
        }
      });
      this.sourceList();
    }, */
    modifyRowData(val) {
      console.log(val);
    },
    deleteRowData(val) {
      console.log(val);
    },
    handleCurrentChange(val) {
      console.log(val);
      this.currentPage = val
      this.sourceList()
    },
    handleSizeChange(val) {
      console.log(val);
      this.pageSize = val
      this.sourceList()
    },
    left(){
      // this.tableData1.splice(this.list,1)
    },
    right(){
      this.tableData1.push(this.list)
    }
  },
  mounted() {
    this.tableHeaderData = [
      {
        name: "name",
        label: "规则列表"
      },
      {
        name: "description",
        label: "备注"
      }
    ];
    this.tableHeaderData1 = [
      {
        name: "name",
        label: "规则列表"
      },
      {
        name: "description",
        label: "备注"
      }
    ];
    this.sourceList();
  }
};
</script>

<style lang="scss">
</style>
<style lang="scss" scoped>
#transferStep{
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20vh;
  i{
    border: solid 1px #000;
    width: 50px;
    height: 50px;
    border-radius: 25px;
    line-height: 50px;
    text-align: center;
    margin-bottom: 20px;
    font-size: 30px;
    }
}
</style>