<template>
  <div class="app-container">
    <el-form inline :model="searchForm" class="search-form" size="mini">
      <el-form-item label="主机名称">
        <el-input v-model="searchForm.host" placeholder="输入名称"></el-input>
      </el-form-item>
      <el-form-item label="主机IP">
        <el-input v-model="searchForm.ip" placeholder="输入角色编码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="default" @click="search(1)">搜索</el-button>
        <el-button type="primary" @click="refresh">刷新</el-button>
        <el-button type="danger" :disabled="selection.length === 0" @click="batchDel">批量删除</el-button>
        <el-button type="success" @click="create">新建</el-button>
      </el-form-item>
    </el-form>
    <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
      <el-table-column type="selection" :selectable="selectable" width="55">
      </el-table-column>
      <el-table-column label="主机名称" width="120">
        <template slot-scope="{row}">
          {{ row.host }}
        </template>
      </el-table-column>
      <el-table-column label="主机IP" width="120">
        <template slot-scope="{row}">
          {{ row.ip }}
        </template>
      </el-table-column>
      <el-table-column label="备注" show-overflow-tooltip>
        <template slot-scope="{row}">
          {{ row.note }}
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <router-link :to="{ path: '/admin/hostwhite/edit?id=' + scope.row.id + '&type=detail' }">
            <el-button type="text" size="mini">查看</el-button>
          </router-link>
          <template v-if="scope.row.type !== 0">
            <router-link :to="{ path: '/admin/hostwhite/edit?id=' + scope.row.id +'&type=edit' }">
              <el-button type="text" size="mini">编辑</el-button>
            </router-link>
            <el-button type="text" size="mini" @click="del(scope.row.id)">删除</el-button>
          </template>
        </template>
      </el-table-column>
    </el-table>
    <div class="f-p10 f-ar">
      <el-pagination :total="pager.total" :page-size="searchForm.size" background layout="prev,pager,next" @current-change="pageChange" />
    </div>
  </div>
</template>
<script>
import { getHostwhiteList, deleteHostwhiteById, deleteHostwhiteAll } from "@/api/admin";
export default {
  data() {
    return {
      tableData: [],
      selection: [],
      pager: { total: 0 },
      typeMap: {
        0: '预定义',
        1: '自定义'
      },
      searchForm: {
        current: 1,
        size: 10,
        host: '',
        ip: ''
      }
    };
  },
  created() {
    this.search(1);
  },
  methods: {
    selectable(row) {
      return row.type !== 0
    },
    search(page) {
      this.searchForm.current = page || this.searchForm.current;

      getHostwhiteList(this.searchForm)
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
    refresh() {
      this.search();
    },
    batchDel() {
      const ids = []
      this.selection.map(item => {
        ids.push(item.id)
      })
      const post = {
        ids
      }
      deleteHostwhiteAll(post).then((r) => {
        if (r.message === '操作成功！') {
          this.search(1)
        } else {
          this.$message.error(r.message)
        }
      })
    },
    del(id) {
      deleteHostwhiteById(id).then((r) => {
        if (r.message === '操作成功！') {
          this.$message.success(r.message)
          this.search(1)
        } else {
          this.$message.error(r.message)
        }
      })
    },
    create() {
      this.$router.push({
        path: "/admin/hostwhite/edit?type=create"
      });
    },
    handleSelectionChange(val) {
      this.selection = val;
    },
    pageChange(page) {}
  }
};
</script>
