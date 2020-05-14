<template>
  <div class="dept-main" style="padding:15px">
    <el-row :gutter="10">
      <el-col :span="8" class="dept-left">
        <p>组织部门</p>
        <p><el-button type="primary" size="small" @click="createDept">新增部门</el-button></p>
        <el-tree :data="deptTree" :props="defaultProps" :expand-on-click-node="false" :render-content="renderContent"></el-tree>
      </el-col>
      <el-col :span="16" class="dept-right">
        <p>已授权用户列表</p>
        <el-form inline :model="searchForm" class="search-form">
          <el-form-item>
            <el-button type="primary" @click="search(1)">刷新</el-button>
          </el-form-item>
        </el-form>
        <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%">
          <el-table-column label="用户名" width="120">
            <template slot-scope="{row}">
              {{ row.userName }}
            </template>
          </el-table-column>
          <el-table-column label="真实姓名" width="120">
            <template slot-scope="{row}">
              {{ row.creatorUserName }}
            </template>
          </el-table-column>
          <el-table-column label="用户角色" show-overflow-tooltip>
            <template slot-scope="{row}">
              {{ row.roleName }}
            </template>
          </el-table-column>
          <el-table-column label="用户状态" show-overflow-tooltip>
            <template slot-scope="{row}">
              {{ row.acctStateDesc }}
            </template>
          </el-table-column>
          <el-table-column label="用户类型" show-overflow-tooltip>
            <template slot-scope="{row}">
              {{ row.typeDesc }}
            </template>
          </el-table-column>
          <el-table-column label="手机号" show-overflow-tooltip>
            <template slot-scope="{row}">
              {{ row.phone }}
            </template>
          </el-table-column>
          <el-table-column label="是否在线" show-overflow-tooltip>
            <template slot-scope="{row}">
              {{ row.onlineStateDesc }}
            </template>
          </el-table-column>
          <el-table-column label="部门" show-overflow-tooltip>
            <template slot-scope="{row}">
              {{ row.deptName }}
            </template>
          </el-table-column>
          <el-table-column label="邮箱" show-overflow-tooltip>
            <template slot-scope="{row}">
              {{ row.email }}
            </template>
          </el-table-column>
        </el-table>
        <div class="pager">
          <el-pagination :current-page="searchForm.current" :page-size="searchForm.size" layout="total, prev, pager, next, jumper" :total="pager.total" @current-change="pageChange">
          </el-pagination>
        </div>
      </el-col>
      
      
    </el-row>
  </div>
</template>
<script>
import { getAuthorityList, getDeptTree, deleteDept } from "@/api/admin";
export default {
  data() {
    return {
      tableData: [],
      pager: { total: 0 },
      searchForm: {
        current: 1,
        size: 10,
      },
      deptTree: [],
      defaultProps: {
        children: 'children',
        label: 'name'
      }
    };
  },
  created() {
    this.search(1);
    this.getTree()
  },
  methods: {
    renderContent(h, { node, data, store }) {
      return (
        <span class="custom-tree-node">
          <span>{node.label}</span>
          <span class="option">
            <el-button size="mini" type="text" on-click={ () => this.edit(data) }>编辑</el-button>
            <el-button size="mini" type="text" on-click={ () => this.remove(node, data) }>删除</el-button>
          </span>
        </span>);
    },
    getTree() {
      getDeptTree().then(r => {
        if(r.code === 0) {
          this.deptTree = r.data
        }
      })
    },
    createDept() {
      this.$router.push({
        path: "/admin/dept/edit?type=create"
      });
    },
    search(page) {
      this.searchForm.current = page || this.searchForm.current;
      
      getAuthorityList(this.searchForm, '1000000000000000000')
        .then(res => {
          if (res.code === 0) {
            this.tableData = res.data.records;
            this.searchForm.current = Number(res.data.current);
            this.pager.total = Number(res.data.total);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    edit(data) {
      this.$router.push({
        path: `/admin/dept/edit?id=${data.id}&type=edit`
      });
    },
    remove(node, data) {
      deleteDept(data.id).then(r => {
        this.$alert('操作成功', '提示', {
          callback: () => {
            this.getTree()
          }
        })
      })
    },
    pageChange(page) {},
  }
};
</script>
