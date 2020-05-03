<template>
  <div class="data-area">
    <el-container>
      <el-aside width="400px">Aside</el-aside>
      <el-main>
        <div class="form-data">
          <div class="title-name">{{tableTitle}}</div>
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
                           @click="newset">新建组</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </el-main>
    </el-container>

    <el-container>
      <el-aside width="400px">
        <div class="tree-title">终端信息源组</div>
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
      </el-aside>
      <el-main>
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
      </el-main>
    </el-container>

    <el-dialog title="信息提示"
               :visible.sync="dialogVisible"
               width="30%">
      <p class="dialog-tips">
        <i class="el-icon-warning dialog-icon"></i>
        <span class="dialog-content">是否确认删除信息源 ？</span>
      </p>
      <div>删除后将无法回复</div>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary"
                   @click="confirmDel">确定</el-button>
      </span>
    </el-dialog>
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
    id: 3,
    label: '一级 3',
  }, {
    id: 3,
    label: '一级 3',
  }];
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
.tree-title {
  font-size: 18px;
}
.tree-filter-input {
  padding: 5px 20px 5px 0;
  width: 300px;
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
.form-data {
  padding-top: 35px;
  height: 60px;
  .title-name {
    float: left;
    height: 36px;
    line-height: 36px;
  }
  .title-form {
    float: right;
  }
}
.data-table {
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

