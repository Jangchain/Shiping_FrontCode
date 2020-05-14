<template>
  <div class="app-container">
    <el-form inline :model="searchForm" class="search-form" size="mini">
      <el-form-item label="组件">
        <el-select v-model="searchForm.componentId" placeholder="是否删除原记录" @change="search(1)">
          <el-option v-for="(item,key) in componentIdMap" :key="key" :label="item" :value="key"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="refresh">刷新</el-button>
        <el-button type="danger" :disabled="selection.length === 0" @click="batchDel">批量删除</el-button>
        <el-button type="success" @click="create">新建</el-button>
      </el-form-item>
    </el-form>
    <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
      <el-table-column type="selection" :selectable="selectable" width="55">
      </el-table-column>
      <el-table-column label="内网IP">
        <template slot-scope="{row}">
          {{ row.pszIP }}
        </template>
      </el-table-column>
      <el-table-column label="掩码">
        <template slot-scope="{row}">
          {{ row.pszMask }}
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="mini" @click="del(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="f-p10 f-ar">
      <el-pagination :total="pager.total" :page-size="searchForm.size" background layout="prev,pager,next" @current-change="pageChange" />
    </div>
  </div>
</template>
<script>
import { queryIPAndMaskList, setIPAndMark } from "@/api/admin";
export default {
  data() {
    return {
      tableData: [],
      selection: [],
      pager: { total: 0 },
      componentIdMap: {
        '1250267761389654017': 'NM13111'
      },
      searchForm: {
        current: 1,
        size: 10,
        componentId: '1250267761389654017'
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

      queryIPAndMaskList(this.searchForm)
        .then(res => {
          if (res.code === 0) {
            this.tableData = res.data;
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
      const selected = []
      this.selection.map(item => {
        selected.push(item.pszMask)
      })

      const reSetList = [];
      this.tableData.map(item => {
        if (!selected.includes(item.pszMask)) {
          reSetList.push(item)
        }
      })
      console.log(reSetList)
      const post = {};
      post.arrayStr = reSetList;
      const id = this.searchForm.componentId;
      setIPAndMark(post, id).then((r) => {
        if (r.code === '000') {
          this.$message.success(r.message)
          this.search(1)
        } else {
          this.$message.error(r.message)
        }
      })
    },
    del(row) {
      const reSetList = [];
      this.tableData.map(item => {
        if (item.pszMask !== row.pszMask) {
          reSetList.push(item)
        }
      })
      const post = {};
      post.arrayStr = reSetList;
      const id = this.searchForm.componentId;
      setIPAndMark(post, id).then((r) => {
        if (r.code === '000') {
          this.$message.success(r.message)
          this.search(1)
        } else {
          this.$message.error(r.message)
        }
      })
    },
    create() {
      this.$router.push({
        path: `/admin/ip/edit?id=${this.searchForm.componentId}`
      });
    },
    handleSelectionChange(val) {
      this.selection = val;
    },
    pageChange(page) {}
  }
};
</script>
