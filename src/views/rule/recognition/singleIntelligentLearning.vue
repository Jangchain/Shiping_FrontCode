<template>
  <div>
    <el-form inline :model="searchForm" class="search-form">
      <el-form-item>
        <el-input v-model="searchForm.name" placeholder="输入搜索内容"></el-input>
      </el-form-item>
      <el-form-item label="部署状态">
        <el-select v-model="searchForm.elementStatus" placeholder="部署状态">
          <el-option label="全部" value=""></el-option>
          <el-option v-for="(item,key) in elementStatusMap" :key="key" :label="item" :value="key"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="结果">
        <el-select v-model="searchForm.result" placeholder="结果">
          <el-option label="全部" value=""></el-option>
          <el-option v-for="(item,key) in resultMap" :key="key" :label="item" :value="key"></el-option>
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
      <el-table-column type="selection" width="55">
      </el-table-column>
      <el-table-column prop="name" label="名称" width="120" show-overflow-tooltip>
      </el-table-column>
      <el-table-column label="部署状态">
        <template slot-scope="{row}">
          {{ elementStatusMap[row.elementStatus] }}
        </template>
      </el-table-column>
      <el-table-column prop="startTime" label="开始时间" show-overflow-tooltip></el-table-column>
      <el-table-column prop="endTime" label="结束时间" show-overflow-tooltip></el-table-column>
      <el-table-column label="进度">
        <template slot-scope="{row}">
          <el-progress :percentage="parseInt(row.status)"></el-progress>
        </template>
      </el-table-column>
      <el-table-column label="结果">
        <template slot-scope="{row}">
          {{ resultMap[row.result] }}
        </template>
      </el-table-column>
      <el-table-column label="信息">
        <template slot-scope="{row}">
          {{ failReasonMap[row.failReason] && failReasonMap[row.failReason] || '' }}
        </template>
      </el-table-column>
      <el-table-column label="规则中使用">
        <template slot-scope="{row}">
          {{ row.inUse == "0" ? "否" : "是" }}
        </template>
      </el-table-column>
      <el-table-column prop="successCount" label="已处理"></el-table-column>
      <el-table-column prop="failCount" label="未处理"></el-table-column>
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
import { singleIntelligentLearning } from "@/api/identifyModel";
import { failReasonMap, elementStatusMap, resultMap } from "../util/service";
export default {
  data() {
    return {
      loading: false,
      tableData: [],
      selection: [],
      pager: { total: 0 },
      elementStatusMap,
      resultMap,
      definitionTypeMap: {
        C_USER_DEFINE: "自定义",
        C_PRE_DEFINE: "默认"
      },
      searchForm: {
        descs: "updateDate",
        current: 1,
        size: 10
      },
      failReasonMap
    };
  },
  created() {
    this.search(1);
  },
  methods: {
    search(page) {
      this.loading = true;
      this.searchForm.current = page || this.searchForm.current;
      singleIntelligentLearning(this.searchForm)
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
    create() {},
    handleSelectionChange(val) {
      this.selection = val;
    },
    pageChange(page) {
      this.search(page);
    }
  }
};
</script>
