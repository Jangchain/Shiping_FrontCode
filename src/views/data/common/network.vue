<template>
  <div class="data-area">
    <Datatable v-loading="loading"
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
      <div class="form-data">
        <div class="title-name">网络区间</div>
        <div class="title-form">
          <el-form :inline="true"
                   :model="searchCondition">
            <el-form-item label="名称">
              <el-input v-model="searchCondition.name"
                        clearable
                        placeholder="请输入内容">
              </el-input>
            </el-form-item>
            <el-form-item label="类型">
              <el-select v-model="searchCondition.networkType"
                         clearable
                         placeholder="请选择">
                <el-option v-for="item in networkTypeOptions"
                           :key="item.value"
                           :label="item.label"
                           :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="备注">
              <el-input v-model="searchCondition.description"
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
import request from "@/api/data/common";
export default {
  name: 'network',
  components: { Datatable },
  data() {
    return {
      loading: true,
      tableData: [],
      tableHeaderData: [],
      pageSize: 10,
      currentPage: 1,
      total: 0,
      searchCondition: {
        name: '',
        networkType: '',
        description: ''
      },
      networkTypeOptions: [
        { value: '', label: '全部' },
        { value: 'MASK', label: '网段' },
        { value: 'IP_ADDRESS', label: 'IP区间' },
      ],
      selection: [],
      dialogVisible: false,
      delData: []
    }
  },
  created() {
    this.getNetWorksSourceData()
    this.tableHeaderData = [
      {
        name: 'name',
        label: '名称'
      },
      {
        name: 'networkType',
        label: '类型'
      },
      {
        name: 'ip',
        label: '网络地址'
      },
      {
        name: 'status',
        label: '引用状态'
      },
      {
        name: 'description',
        label: '备注'
      }
    ]
  },
  methods: {
    getNetWorksSourceData(filter) {
      let params = {
        current: this.currentPage,
        size: this.pageSize,
        descs: 'createDate',
      }
      this.loading = true;
      params = Object.assign({}, params, filter)
      request.getNetWorkByPage(params).then(res => {
        if (res.code === 0) {
          this.loading = false;
          this.total = +res.data.total
          res.data.records.forEach(item => {
            item.status = item.status ? '是' : '否';
            item.networkType = item.networkType == 'MASK' ? '网段' : 'IP区间';
            item.ip = item.networkType == '网段' ? `${item.ipStart}/${item.ipEnd}` : `${item.ipStart}-${item.ipEnd}`;
          });
          this.tableData = res.data.records
        }
      }).catch(err => {
        console.log(err)
      })
    },
    delete(ids) {
      request.batchDelNetWork({ ids }).then(res => {
        if (res.code === 0) {
          this.search()
        }
      }).catch(err => {
        console.log(err)
      })
    },
    search() {
      this.currentPage = 1
      this.pageSize = 10
      this.getNetWorksSourceData(this.searchCondition)
    },
    newSet() {
      this.$router.push(`/data/newset/public/network`)
    },
    modifyRowData(val) {
      this.$router.push({
        path: `/data/newset/public/network`,
        query: { id: val.id }
      })
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
      this.dialogVisible = false
      const ids = []
      this.delData.forEach(val => {
        ids.push(val.id)
      })
      //调用批量删除接口
      this.delete(ids)
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.getNetWorksSourceData()
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.getNetWorksSourceData()
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

