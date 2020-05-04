<template>
  <div class="content">
    <div class="content-in">
      <el-row :gutter="20">
        <el-col :span="4">
          <div class="title-name">{{tableTitle}}</div>
        </el-col>
        <el-col :span="20">
          <div class="form-data">
            <div>{{tableTitle}}</div>
            <div class="title-form">
              <el-form :inline="true"
                       :model="searchCondition">
                <el-form-item label="主机名称">
                  <el-input v-model="searchCondition.name"
                            placeholder="请输入内容">
                  </el-input>
                </el-form-item>
                <el-form-item label="IP">
                  <el-input v-model="searchCondition.ip"
                            placeholder="请输入内容">
                  </el-input>
                </el-form-item>
                <el-form-item label="系统类型">
                  <el-input v-model="searchCondition.description"
                            placeholder="请输入内容">
                  </el-input>
                </el-form-item>
                <el-form-item label="DEP主机状态">
                  <el-input v-model="searchCondition.description"
                            placeholder="请输入内容">
                  </el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary"
                             @click="search">查询</el-button>
                </el-form-item>
                <el-form-item>
                  <el-button type="success"
                             @click="newSet">新建组</el-button>
                </el-form-item>
              </el-form>
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="4">
          <div class="tree-filter-input">
            <el-input placeholder="输入关键字进行筛选"
                      v-model="filterTreeText">
            </el-input>
          </div>
          <el-tree ref="tree"
                   :data="treeData"
                   node-key="id"
                   default-expand-all
                   :expand-on-click-node="false"
                   :filter-node-method="filterNode">
            <span class="custom-tree-node"
                  slot-scope="{ node, data }">
              <span>{{ node.label }}</span>
              <span>
                <el-button type="text"
                           icon="el-icon-edit"
                           @click="() => appendTree(data)">
                </el-button>
                <el-button type="text"
                           icon="el-icon-delete"
                           @click="() => removeTree(node, data)">
                </el-button>
              </span>
            </span>
          </el-tree>
        </el-col>
        <el-col :span="20">
          <Datatable class="data-table"
                     @handleSizeChange="handleSizeChange"
                     @handleCurrentChange="handleCurrentChange"
                     :tableData="tableData"
                     :tableHeaderData="tableHeaderData"
                     :total="total"
                     :pageSize="pageSize"
                     :currentPage="currentPage"
                     :isShowModify="false">
          </Datatable>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
const treedata = [
  {
    id: 1,
    label: '一级 1',
  }, {
    id: 2,
    label: '一级 2',
  }, {
    id: 3,
    label: '一级 3',
  }, {
    id: 4,
    label: '一级 4',
  }, {
    id: 5,
    label: '一级 5',
  }
];
//TODO: DEP主机状态字段不确定
const deviceStatus = {
  0: '在线',
  1: '离线',
  2: '网络异常离线',
  3: '客户端异常离线',
}

import Datatable from '../components/data-table'
import request from "@/api/data/terminal";
export default {
  name: 'terminalGroup',
  components: { Datatable },
  data() {
    return {
      filterTreeText: '',
      treeData: treedata,
      tableTitle: '全部',
      tableData: [],
      tableHeaderData: [],
      pageSize: 10,
      currentPage: 1,
      total: 0,
      searchCondition: {
        name: '',
        ip: '',
        systemType: '',
        deviceStatus: ''
      },
      dialogVisible: false,
      delData: []
    }
  },
  watch: {
    filterTreeText(val) {
      this.$refs.tree.filter(val);
    }
  },
  created() {
    this.getTerminalListData()
    this.getTerminalGroupData()
    this.tableHeaderData = [
      {
        name: 'name',
        label: '主机名称'
      },
      {
        name: 'mac',
        label: 'MAC地址'
      },
      {
        name: 'ip',
        label: 'IP地址'
      },
      {
        name: 'systemType',
        label: '系统类型'
      },
      {
        name: 'deviceStatus',
        label: 'DEP主机状态'
      }
    ]
  },
  methods: {
    getTerminalGroupData(filter) {
      let params = {
        current: 1,
        size: 20,
      }
      params = Object.assign({}, params, filter)
      request.getTerminalGroupByPage(params).then(res => {
        // this.treeData = []
        // res.data.records.forEach(val => {
        // });
      })
    },
    getTerminalListData(filter) {
      let params = {
        current: this.currentPage,
        size: this.pageSize,
      }
      params = Object.assign({}, params, filter)
      request.getTerminalListByPage(params).then(res => {
        this.tableData = []
        this.total = +res.data.total
        res.data.records.forEach(val => {
          this.tableData.push({
            name: val.name,
            mac: val.mac,
            ip: val.ip,
            systemType: val.systemType,
            Account_name: Account_name,
            description: val.description,
            groupId: val.groupId,
            //TODO: DEP主机状态字段不确定
            deviceStatus: val.deviceStatus,
          })
        });
      })
    },
    filterNode(value, data) {
      console.log('value, data=', value, data)
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    search() {
      this.currentPage = 1
      this.pageSize = 10
      this.getTerminalListData(this.searchCondition)
    },
    newSet() {
      this.$router.push(`/data/newset/network/port`)
    },
    modifyRowData(val) {
      this.$router.push({
        path: `/data/newset/network/port`,
        query: { id: val.id }
      })
    },
    deleteRowData(val) {
      this.dialogVisible = true
      this.delData = val
    },
    confirmDel() {
      this.dialogVisible = false
      console.log('this.delData', this.delData)
      //TODO: 调用批量删除接口
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.getTerminalListData()
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.getTerminalListData()
    }
  }
}
</script>
<style lang="scss" scoped>
.content {
  padding: 30px 15px;
  background-color: #eee;
  .content-in {
    background-color: #fff;
    padding: 0 20px;
    .title-name {
      height: 58px;
      line-height: 58px;
    }
    .form-data {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .title-form {
        position: relative;
        top: 11px;
      }
    }
  }
}
.tree-filter-input {
  padding: 5px 20px 5px 0;
}
.el-tree {
  >>> .el-tree-node {
    height: 40px;
    .custom-tree-node {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 14px;
      padding-right: 8px;
    }
  }
}
.dialog-tips {
  font-size: 18px;
  padding-left: 10px;
  display: flex;
  align-items: center;
  .dialog-icon {
    font-size: 40px;
    color: rgb(254, 148, 0);
  }
  .dialog-content {
    padding-left: 50px;
  }
}
</style>

