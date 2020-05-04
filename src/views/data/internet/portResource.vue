<template>
  <div class="data-area">
    <Datatable @handleSizeChange="handleSizeChange"
               @handleCurrentChange="handleCurrentChange"
               @modifyRowData="modifyRowData"
               @deleteRowData="deleteRowData"
               @selectionChange="selectionChange"
               :tableData="tableData"
               :tableHeaderData="tableHeaderData"
               :total="total"
               :pageSize="pageSize"
               :currentPage="currentPage">
      <div class="form-data">
        <div class="title-name">信息源列表</div>
        <div class="title-form">
          <el-form :inline="true"
                   :model="searchCondition">
            <el-form-item label="信息源名称">
              <el-input v-model="searchCondition.name"
                        placeholder="请输入内容">
                <i slot="suffix"
                   class="el-input__icon el-icon-search" />
              </el-input>
            </el-form-item>
            <el-form-item label="协议">
              <el-input v-model="searchCondition.protocol"
                        placeholder="请输入内容">
                <i slot="suffix"
                   class="el-input__icon el-icon-search" />
              </el-input>
            </el-form-item>
            <el-form-item label="备注">
              <el-input v-model="searchCondition.description"
                        placeholder="请输入内容">
                <i slot="suffix"
                   class="el-input__icon el-icon-search" />
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
    </Datatable>

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
import request from "@/api/data/network";
export default {
  name: 'portResource',
  components: { Datatable },
  data() {
    return {
      tableData: [],
      tableHeaderData: [],
      pageSize: 10,
      currentPage: 1,
      total: 0,
      searchCondition: {
        name: '',
        protocol: '',
        description: ''
      },
      selection: [],
      dialogVisible: false,
      delData: []
    }
  },
  created() {
    this.getNetworkPortData()
    this.tableHeaderData = [
      {
        name: 'name',
        label: '信息源名称'
      },
      {
        name: 'portEndValue',
        label: '端口'
      },
      {
        name: 'protocol',
        label: '协议'
      },
      {
        name: 'status',
        label: '引用状态'
      },
      {
        name: 'type',
        label: '类型'
      },
      {
        name: 'description',
        label: '备注'
      }
    ]
  },
  methods: {
    getNetworkPortData(filter) {
      let params = {
        current: this.currentPage,
        size: this.pageSize,
        descs: 'createDate'
      }
      params = Object.assign({}, params, filter)
      request.getNetworkPortByPage(params).then(res => {
        this.tableData = []
        this.total = +res.data.total
        res.data.records.forEach(val => {
          this.tableData.push({
            name: val.name,
            portEndValue: val.portEndValue,
            protocol: val.protocol,
            status: val.status ? '是' : '否',
            type: +val.type ? '自定义' : '预定义',
            description: val.description
          })
        });
      })
    },
    search() {
      this.currentPage = 1
      this.pageSize = 10
      this.getNetworkPortData(this.searchCondition)
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
    batchDel() {
      this.dialogVisible = true
      this.delData = this.selection
    },
    selectionChange(val) {
      this.selection = val
    },
    confirmDel() {
      this.dialogVisible = false
      console.log('this.delData', this.delData)
      //调用批量删除接口
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.getNetworkPortData()
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.getNetworkPortData()
    }
  }
}
</script>
<style lang="scss" scoped>
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

