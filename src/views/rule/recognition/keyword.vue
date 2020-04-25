<template>
  <div>
    <el-form inline :model="searchForm" class="search-form">
      <el-form-item>
        <el-input v-model="searchForm.name" placeholder="输入搜索内容"></el-input>
      </el-form-item>
      <el-form-item label="所属类型">
        <el-select v-model="searchForm.contentClassifierType" placeholder="所属类型">
          <el-option label="全部" value=""></el-option>
          <el-option v-for="(item,key) in contentClassifierTypeMap" :key="key" :label="item" :value="key"></el-option>
        </el-select>
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
    <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55">
      </el-table-column>
      <el-table-column prop="spPlcCcContentClassifiers.name" label="名称" width="120">
      </el-table-column>
      <el-table-column label="所属类型" width="120">
        <template slot-scope="{row}">
          {{ contentClassifierTypeMap[row.spPlcCcContentClassifiers.contentClassifierType] }}
        </template>
      </el-table-column>
      <el-table-column prop="spPlcCcContentClassifiers.optlock" label="版本">
      </el-table-column>
      <el-table-column label="关键字数">
        <template slot-scope="{row}">
          {{ row.lexiconsItemList&&row.lexiconsItemList.length }}
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
import { getContentClassifierByPage } from "@/api/identifyModel";
export default {
  data() {
    return {
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
        queryType: "KEY_PHRASES",
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
      getContentClassifierByPage(this.searchForm)
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
    create() {
      this.$router.push({
        path: "/rule/identifyModel/keyword/create"
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
