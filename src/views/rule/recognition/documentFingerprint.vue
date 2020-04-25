<template>
  <div>
    <el-form inline :model="searchForm" class="search-form">
      <el-form-item>
        <el-input v-model="searchForm.name" placeholder="输入搜索内容"></el-input>
      </el-form-item>
      <el-form-item label="所属类型">
        <el-select v-model="searchForm.isContentSimilarity" placeholder="所属类型">
          <el-option label="全部" value=""></el-option>
          <el-option v-for="(item,key) in isContentSimilarityMap" :key="key" :label="item" :value="key"></el-option>
        </el-select>
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
    <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55">
      </el-table-column>
      <el-table-column prop="name" label="名称" width="120">
      </el-table-column>
      <el-table-column label="所属类型">
        <template slot-scope="{row}">
          {{ isContentSimilarityMap[row.isContentSimilarity] }}
        </template>
      </el-table-column>
      <el-table-column label="部署状态">
        <template slot-scope="{row}">
          {{ elementStatusMap[row.elementStatus] }}
        </template>
      </el-table-column>
      <el-table-column prop="startTime" label="开始时间"></el-table-column>
      <el-table-column prop="endTime" label="结束时间"></el-table-column>
      <el-table-column label="进度">
        <template slot-scope="{row}">
          <el-progress :percentage="parseInt(row.status)"></el-progress>
        </template>
      </el-table-column>
      <el-table-column label="结果">
        <template slot-scope="{row}">
          {{ resultMap[row.status] }}
        </template>
      </el-table-column>
      <el-table-column prop="description" label="信息"></el-table-column>
      <el-table-column label="规则中使用">
        <template slot-scope="{row}">
          {{ row.inUse == "0" ? "否" : "是" }}
        </template>
      </el-table-column>
      <el-table-column prop="successCount" label="已处理"></el-table-column>
      <el-table-column prop="failCount" label="未处理"></el-table-column>
      <el-table-column label="操作">
        <el-button type="text" size="mini" @click="edit">编辑</el-button>
        <el-button type="text" size="mini">删除</el-button>
      </el-table-column>
    </el-table>
    <div class="pager">
      <el-pagination :current-page="pager.page" :page-size="pager.size" layout="total, prev, pager, next, jumper" :total="pager.total" @current-change="pageChange">
      </el-pagination>
    </div>
  </div>
</template>
<script>
import { getFingerPrintsByNativeSql } from "@/api/identifyModel";
export default {
  data() {
    return {
      tableData: [],
      selection: [],
      pager: { total: 0 },
      isContentSimilarityMap: {
        "0": "精确指纹",
        "1": "相似指纹",
        "2": "图片指纹"
      },
      elementStatusMap: {
        SYNCHRONIZED: "已部署",
        UNSYNCHRONIZED_NEW: "新建未部署",
        UNSYNCHRONIZED_EDIT: "编辑未部署"
      },
      resultMap: {
        UNSTART: "未开始",
        SUCCESS: "成功",
        COMPLETEDWITHERROR: "完成",
        PENDING: "等待中",
        PAUSED: "停止",
        PAUSING: "停止中",
        FAILED: "失败",
        RUNNING: "运行中",
        STARTING: "启动中",
        PENDERROR: "部署失败",
        TRAINING: "训练中"
      },
      definitionTypeMap: {
        C_USER_DEFINE: "自定义",
        C_PRE_DEFINE: "默认"
      },
      searchForm: {
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
      this.searchForm.current = page || this.searchForm.current;
      getFingerPrintsByNativeSql(this.searchForm)
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
