<template>
  <div class="content">
    <div class="content-in">
      <el-row :gutter="20">
        <el-col :span="8">
          <div class="left">
            <div class="tree-title">组织架构列表</div>
            <el-button class="new-set  el-icon-circle-plus-outline" type="primary" @click.stop="() => modifyTree()"> 新建组织</el-button>
            <el-tree ref="tree" :data="treeData" node-key="id" highlight-current default-expand-all @node-click="ClickTreeNode">
              <span class="custom-tree-node" slot-scope="{ node, data }">
                <span>
                  <span :class="data.icon"></span>
                  <span>{{ data.label }}</span>
                </span>
                <span>
                  <el-button type="text" icon="el-icon-circle-plus-outline" @click.stop="() => modifyTree(data)">添加
                  </el-button>
                  <el-button type="text" icon="el-icon-edit" @click.stop="() => modifyTree(data)">
                  </el-button>
                  <el-button type="text" icon="el-icon-delete" @click.stop="() => removeTree( data)">
                  </el-button>
                </span>
              </span>
            </el-tree>
          </div>
        </el-col>
        <el-col :span="16">
          <div class="right">
            <div class="basic">
              <div class="basic-msg">
                <div class="basic-title">基本信息</div>
                <el-divider></el-divider>
              </div>
              <div class="basic-content">
                <div>名称： {{basicMsg.name}}</div>
                <div>描述： {{basicMsg.description}}</div>
                <div>IP网段： {{basicMsg.ipScope}}</div>
                <div>上级组织： {{basicMsg.pname}}</div>
              </div>
            </div>
            <div class="detail">
              <div class="basic-msg">
                <div class="basic-title">组织详情</div>
                <el-divider></el-divider>
              </div>
              <div class="table">
                <el-table :data="tableData" stripe fit highlight-current-row>
                  <el-table-column prop="name" label="下级组织名称">
                  </el-table-column>
                  <el-table-column prop="resIp" label="IP网段">
                  </el-table-column>
                </el-table>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>

    <el-dialog title="信息提示" :visible.sync="dialogVisible" width="30%">
      <p class="dialog-tips">
        <i class="el-icon-warning dialog-icon"></i>
        <span class="dialog-content">是否确认删除信息源 ？</span>
      </p>
      <div>删除后将无法回复</div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="confirmDel">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>

import request from "@/api/data/common";
export default {
  name: 'organization',
  components: {},
  data() {
    return {
      treeData: [],
      tableData: [],
      pageSize: 10,
      currentPage: 1,
      total: 0,
      dialogVisible: false,
      delData: [],
      basicMsg: {
        name: '',
        description: '',
        ipScope: '',
        pname: '',
      }
    }
  },
  created() {
    this.getOrgListData()
    this.getOrgTreeData()
  },
  methods: {
    getOrgTreeData(filter) {
      request.getOrgTree().then(res => {
        this.treeData = this.treeDataFormat(res.data);
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
    getOrgListData(filter) {
      let params = {
        current: this.currentPage,
        size: this.pageSize,
      }
      params = Object.assign({}, params, filter)
      request.getOrgByPage(params).then(res => {
        this.tableData = []
        this.total = +res.data.total
        res.data.records.forEach(val => {
          //TODO: 判断子架构及子成员，展示不同图标
        });
        this.tableData = res.data.records
      })
    },
    getOrgDetail(ID) {
      request.getOrgById(ID).then(res => {
      })
    },
    search() {
      this.currentPage = 1
      this.pageSize = 10
    },
    //TODO:跳转路径待确认
    modifyTree(val) {
      // this.$router.push({
      //   path: `/data/newset/network/port`,
      //   query: { id: val.id }
      // })
    },
    //TODO:点击竖表 动态加载右侧表格
    ClickTreeNode(val) {
      this.getOrgDetail(val.id)
    },
    removeTree(val) {
      this.dialogVisible = true
      this.delData = val
    },
    //TODO:删除逻辑待补充
    confirmDel() {
      this.dialogVisible = false
      const params = {
        id: this.delData.id
      }
      request.singleDelOrg(params).then(res => {

      })
    },
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
    .right {
      border-left: 1px solid #ccc;
      padding-bottom: 20px;
      .basic-msg {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 18px;
        padding-bottom: 20px;
        .basic-title {
          height: 50px;
          line-height: 50px;
          width: 100px;
        }
      }
      .basic {
        padding: 0 20px;
        .basic-content {
          > div {
            height: 50px;
            line-height: 50px;
            font-size: 16px;
          }
        }
      }
      .detail {
        padding: 20px 20px 0;
        .table {
          border: 1px solid #ccc;
        }
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

