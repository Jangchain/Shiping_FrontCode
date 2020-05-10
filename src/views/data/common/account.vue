<template>
  <div class="content">
    <div class="content-in">
      <el-row :gutter="20">
        <el-col :span="4">
          <div class="title-name">用户分组</div>
        </el-col>
        <!-- 表单 -->
        <el-col :span="20">
          <div class="form-data">
            <div class="title-name">{{tableTitle}}</div>
            <div class="title-form">
              <el-form :inline="true"
                       :model="searchCondition">
                <el-form-item label="账号">
                  <el-input v-model="searchCondition.name"
                            clearable
                            placeholder="请输入内容">
                  </el-input>
                </el-form-item>
                <el-form-item label="IP">
                  <el-input v-model="searchCondition.ip"
                            clearable
                            placeholder="请输入内容">
                  </el-input>
                </el-form-item>
                <el-form-item label="电子邮箱">
                  <el-input v-model="searchCondition.mail"
                            clearable
                            placeholder="请输入内容">
                  </el-input>
                </el-form-item>
                <el-form-item label="MAC地址">
                  <el-input v-model="searchCondition.mac"
                            clearable
                            placeholder="请输入内容">
                  </el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary"
                             @click="search">查询</el-button>
                </el-form-item>
                <el-form-item>
                  <el-button type="danger"
                             :disabled="!selection.length"
                             @click="batchDel">批量删除</el-button>
                </el-form-item>
                <el-form-item>
                  <el-button type="success"
                             @click="newSet">新建</el-button>
                </el-form-item>
              </el-form>
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <!-- 竖表 -->
        <el-col :span="4">
          <div class="tree-filter-input">
            <el-input placeholder="输入关键字进行筛选"
                      v-model="filterTreeText">
            </el-input>
          </div>
          <el-tree ref="tree"
                   :data="treeData"
                   node-key="id"
                   highlight-current
                   default-expand-all
                   :filter-node-method="filterNode"
                   @node-click="ClickTreeNode">
            <span class="custom-tree-node"
                  slot-scope="{ data }">
              <span>
                <span :class="data.icon"></span>
                <span>{{ data.label }}</span>
              </span>
            </span>
          </el-tree>
        </el-col>
        <el-col :span="20">
          <Datatable class="data-table"
                     v-loading="tableloading"
                     @handleSizeChange="handleSizeChange"
                     @handleCurrentChange="handleCurrentChange"
                     @modifyRowData="modifyRowData"
                     @deleteRowData="deleteRowData"
                     @selectionChange="selectionChange"
                     :tableData="tableData"
                     :tableHeaderData="tableHeaderData"
                     :total="total"
                     :pageSize="pageSize"
                     :currentPage="currentPage"
                     :isShowDraw="false">
          </Datatable>
        </el-col>
      </el-row>
    </div>

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
import Datatable from '../components/data-table'
import request from "@/api/data/common";
export default {
  name: 'account',
  components: { Datatable },
  data() {
    return {
      tableloading: true,
      filterTreeText: '',
      treeData: [],
      curTree: '',
      tableTitle: '全部',
      tableData: [],
      tableHeaderData: [],
      pageSize: 10,
      currentPage: 1,
      total: 0,
      searchCondition: {
        name: '',
        ip: '',
        mac: '',
        mail: ''
      },
      dialogVisible: false,
      delData: [],
      selection: [],
      curGroupId: '',//当前表格展示的组
    }
  },
  watch: {
    filterTreeText(val) {
      this.$refs.tree.filter(val);
    }
  },
  created() {
    this.getAccountListData()
    this.getAccountGroupData()
    //TODO:字段确认：工号和账号区别？用哪个字段。
    //TODO:字段确认：所在位置是哪个字段，目前接口没有范返回。
    this.tableHeaderData = [
      {
        name: 'name',
        label: '账号'
      },
      {
        name: 'username',
        label: '真实姓名'
      },
      {
        name: 'departmentName',
        label: '部门'
      },
      {
        name: 'jobNum',
        label: '工号'
      },
      {
        name: 'phone',
        label: '电话号码'
      },
      {
        name: '',
        label: '所在位置'
      },
      {
        name: 'mail',
        label: '电子邮箱'
      },
      {
        name: 'ip',
        label: '用户IP'
      },
      {
        name: 'mac',
        label: 'MAC地址'
      }
    ]
  },
  methods: {
    //TODO:竖表数据结构，交互逻辑待确定，新建页面，删除等
    /* 获取组 竖表数据 */
    getAccountGroupData(filter) {
      let params = {
        current: 1,
        size: 20,
      }
      params = Object.assign({}, params, filter)
      request.getAccountGroupByPage(params).then(res => {
        if (res.code === 0) {
          this.treeData = this.treeDataFormat(res.data.records)
        }
      }).catch(err => {
        console.log(err)
      })
    },
    treeDataFormat(data) {
      data.forEach(val => {
        val.label = val.name
        val.icon = 'el-icon-folder'
        if (val.children && val.children.length > 0) {
          // val.icon = 'el-icon-folder'
          this.treeDataFormat(val.children)
        } else {
          // val.icon = 'el-icon-s-custom'
        }
      })
      return data
    },
    /* 获取单个组数据 竖表数据 */
    getSingleAccountGroupData() {
      request.getAccountGroupSingle(this.curGroupId).then(res => {
        if (res, code === 0) {
          //TODO:
        }
      }).catch(err => {
        console.log(err)
      })
    },
    /* 人员列表，表格数据 */
    getAccountListData() {
      this.tableloading = true;
      let params = {
        current: this.currentPage,
        size: this.pageSize,
      }
      params = Object.assign({}, params, this.searchCondition, { groupId: this.curGroupId })
      request.getAccountByPage(params).then(res => {
        if (res.code === 0) {
          this.tableloading = false;
          this.tableData = res.data.records
          this.total = +res.data.total
        }
      }).catch(err => {
        console.log(err)
      })
    },
    /* 竖表搜索 */
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    //TODO:点击竖表 动态加载竖表
    ClickTreeNode(val) {
      this.tableTitle = val.label;
      this.curGroupId = val.id;
      this.getSingleAccountGroupData();
      this.currentPage = 1
      this.pageSize = 10
      this.getAccountListData();
    },
    search() {
      this.currentPage = 1
      this.pageSize = 10
      this.getAccountListData()
    },
    //TODO:跳转路径待确认
    newSet() {
      this.$router.push(`/data/newset/network/port`)
    },
    modifyRowData(val) {
      // this.$router.push({
      //   path: `/data/newset/storage/cloudDatabase`,
      //   query: { id: val.id }
      // })
    },
    deleteRowData(val) {
      this.dialogVisible = true
      this.delData = [val]
    },
    batchDel() {
      this.dialogVisible = true
      this.delData = this.selection
    },
    selectionChange(val) {
      this.selection = val
    },
    confirmDel() {
      this.dialogVisible = false;
      const ids = [];
      this.delData.forEach(val => {
        ids.push(val.id)
      })
      request.batchDelAccount({ ids }).then(res => {
        if (res.code === 0) {
          this.search()
        }
      }).catch(err => {
        console.log(err)
      })
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.getAccountListData()
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.getAccountListData()
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
      min-width: 100px;
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

