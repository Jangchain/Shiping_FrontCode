<template>
  <div>
    <el-form inline :model="searchForm" class="search-form">
      <el-form-item>
        <el-input v-model="searchForm.name" placeholder="输入搜索内容"></el-input>
      </el-form-item>
      <el-form-item label="类型">
        <el-select v-model="searchForm.definitionType" placeholder="类型">
          <el-option label="全部" value=""></el-option>
          <el-option v-for="(item,key) in definitionTypeMap" :key="key" :label="item" :value="key"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="default" @click="search(1)">搜索</el-button>
        <el-button type="primary" @click="refresh">刷新</el-button>
        <el-button type="danger" :disabled="selection.length === 0" @click="batchDel">批量删除</el-button>
        <el-button type="success" @click="create">新建</el-button>
      </el-form-item>
    </el-form>
    <el-table ref="multipleTable" v-loading="loading" :data="tableData" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" :selectable="selectable">
      </el-table-column>
      <el-table-column prop="spPlcCcContentClassifiers.name" label="名称" show-overflow-tooltip>
      </el-table-column>
      <el-table-column label="值" show-overflow-tooltip>
        <template slot-scope="{row}">
          {{ row.pattern.value }}
        </template>
      </el-table-column>
      <el-table-column label="规则中使用">
        <template slot-scope="{row}">
          {{ row.inUse == "0" ? "否" : "是" }}
        </template>
      </el-table-column>
      <el-table-column label="类型">
        <template slot-scope="{row}">
          {{ definitionTypeMap[row.spPlcCcContentClassifiers.definitionType] }}
        </template>
      </el-table-column>
      <el-table-column prop="spPlcCcContentClassifiers.updateDate" label="修改时间">
      </el-table-column>
      <el-table-column label="操作">
        <el-button type="text" size="mini" disabled @click="edit">编辑</el-button>
        <el-button type="text" size="mini" disabled>删除</el-button>
      </el-table-column>
    </el-table>
    <div class="pager">
      <el-pagination :current-page="pager.page" :page-size="pager.size" layout="total, prev, pager, next, jumper" :total="pager.total" @current-change="pageChange">
      </el-pagination>
    </div>
  </div>
</template>
<script>
import { getContentClassifierByPage } from "@/api/identifyModel";
export default {
  data() {
    return {
      loading: false,
      tableData: [],
      selection: [],
      pager: { total: 0 },
      contentClassifierTypeMap: {
        KEY_PHRASES: "单个关键字",
        KEY_PHRASES_COUPLE: "关键字对",
        LEXICON: "关键字组"
      },
      definitionTypeMap: {
        C_USER_DEFINE: "自定义",
        C_PRE_DEFINE: "默认"
      },
      searchForm: {
        queryType: "PRECICEID_PATTERN",
        descs: "updateDate",
        current: 1,
        size: 10
      }
    };
  },
  created() {
    this.search(1);
  },
  methods: {
    search(page) {
      this.loading = true;
      this.searchForm.current = page || this.searchForm.current;
      getContentClassifierByPage(this.searchForm)
        .then(res => {
          if (res.code === 0) {
            this.tableData = res.data.records;
            this.searchForm.current = Number(res.data.current);
            this.pager.total = Number(res.data.total);
          }
          this.loading = false;
        })
        .catch(_ => {
          this.loading = false;
        });
    },
    refresh() {
      this.search();
    },
    batchDel() {},
    edit() {},
    del() {},
    selectable(row, index) {
      return row.spPlcCcContentClassifiers.definitionType === "C_USER_DEFINE";
    },
    create() {
      this.$router.push({
        path: "/rule/identifyModel/match/create"
      });
    },
    handleSelectionChange(val) {
      this.selection = val;
    },
    pageChange(page) {
      this.search(page);
    }
  }
};
</script>
