<template>
  <div class="content">
    <div class="content-in">
      <el-row :gutter="20">
        <el-col :span="8">
          <div class="left">
            <div class="tree-title">组织架构列表</div>
            <el-button class="new-set  el-icon-circle-plus-outline"
                       type="primary"> 新建组织</el-button>
            <el-tree ref="tree"
                     :data="treeData"
                     node-key="id"
                     highlight-current
                     default-expand-all
                     :filter-node-method="filterNode"
                     @node-click="ClickTreeNode">
              <span class="custom-tree-node"
                    slot-scope="{ node, data }">
                <span>
                  <span class='el-icon-circle-plus-outline'></span>
                  <span>{{ node.label }}</span>
                </span>
                <span>
                  <el-button type="text"
                             icon="el-icon-circle-plus-outline"
                             @click="() => modifyTree(data)">添加
                  </el-button>
                  <el-button type="text"
                             icon="el-icon-edit"
                             @click="() => modifyTree(data)">
                  </el-button>
                  <el-button type="text"
                             icon="el-icon-delete"
                             @click="() => removeTree( data)">
                  </el-button>
                </span>
              </span>
            </el-tree>
          </div>
        </el-col>
        <el-col :span="16">
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
const treedata = [{
  id: 1,
  label: '一级 1',
  children: [{
    id: 4,
    label: '二级 1-1',
    children: [{
      id: 9,
      label: '三级 1-1-1'
    }, {
      id: 10,
      label: '三级 1-1-2'
    }]
  }]
}, {
  id: 2,
  label: '一级 2',
  children: [{
    id: 5,
    label: '二级 2-1'
  }, {
    id: 6,
    label: '二级 2-2'
  }]
}, {
  id: 3,
  label: '一级 3',
  children: [{
    id: 7,
    label: '二级 3-1'
  }, {
    id: 8,
    label: '二级 3-2'
  }]
}];
import Datatable from '../components/data-table'
import request from "@/api/data/common";
export default {
  name: 'organization',
  components: { Datatable },
  data() {
    return {
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
  created() {
    this.getOrgListData()
    this.getOrgTreeData()
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
    getOrgTreeData(filter) {
      request.getOrgTree().then(res => {
        // this.treeData = []
        // res.data.records.forEach(val => {
        //   this.treeData.push({
        //     id: val.id,
        //     label: val.name,
        //   })
        // });
      })
    },
    getOrgListData(filter) {
      let params = {
        current: this.currentPage,
        size: this.pageSize,
      }
      params = Object.assign({}, params, filter)
      request.getOrgByPage(params).then(res => {
        console.log('res==', res)
        this.tableData = []
        this.total = +res.data.total
        res.data.records.forEach(val => {

        });
      })
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    search() {
      this.currentPage = 1
      this.pageSize = 10
      this.getTerminalListData(this.searchCondition)
    },
    //TODO:跳转路径待确认
    newSet() {
      this.$router.push(`/data/newset/network/port`)
    },
    modifyTree(val) {
      this.$router.push({
        path: `/data/newset/network/port`,
        query: { id: val.id }
      })
    },
    //TODO:点击竖表 动态加载右侧表格
    ClickTreeNode(val) {
      this.tableTitle = val.label
    },
    removeTree(val) {
      this.dialogVisible = true
      this.delData = val
    },
    confirmDel() {
      this.dialogVisible = false
      console.log('this.delData', this.delData)
      const params = {
        id: this.delData.id
      }
      request.singleDel().then(res => {

      })
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
    .left {
      padding-left: 10px;
      padding-right: -10px;
      .tree-title {
        font-size: 18px;
        height: 50px;
        line-height: 50px;
        padding-left: 25px;
      }
      .new-set {
        width: 100%;
      }
    }
  }
}
.el-tree {
  >>> .el-tree-node__content {
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

