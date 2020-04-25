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
    <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%" row-key="spPlcCcContentClassifiers.id" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55">
      </el-table-column>
      <el-table-column prop="spPlcCcContentClassifiers.name" label="名称" width="120">
      </el-table-column>
      <el-table-column label="所属类型" width="120">
        <template slot-scope="{row}">
          {{ contentClassifierTypeMap[row.spPlcCcContentClassifiers.contentClassifierType] }}
        </template>
      </el-table-column>
      <el-table-column label="值" show-overflow-tooltip>
        <template slot-scope="{row}">
          {{ valueFormat(row) }}
        </template>
      </el-table-column>
      <el-table-column prop="inUse" label="规则中使用">
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
      <el-pagination :current-page="searchForm.current" :page-size="searchForm.size" layout="total, prev, pager, next, jumper" :total="pager.total" @current-change="pageChange">
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
        FILE_TYPE: "文件类型",
        FILE_NAME: "文件名称",
        FILE_SIZE: "文件大小",
        FILE_OWNER: "文件所有者",
        FILE_TIME: "文件时间"
      },
      definitionTypeMap: {
        C_USER_DEFINE: "自定义",
        C_PRE_DEFINE: "默认"
      },
      searchForm: {
        queryType: "FILE_CHARACTERISTIC",
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
        path: "/rule/identifyModel/documentCharacteristics/create"
      });
    },
    handleSelectionChange(val) {
      this.selection = val;
    },
    pageChange(page) {},
    valueFormat(row) {
      let str = "";
      const type = row.spPlcCcContentClassifiers.contentClassifierType;
      switch (type) {
        case "FILE_TYPE":
          str = row.spPlcFileTypes.map(e => e.extension).join(",");
          break;
        case "FILE_NAME":
          str = row.spPlcCcFileTypeNameVals.map(e => e.value).join(",");
          break;
        case "FILE_SIZE":
          if (row.spPlcCcFileTypes.compareType === "CHECK_GREATER_THAN") {
            str = "最小>=" + row.spPlcCcFileTypes.value1 + "KB";
          } else {
            str =
              "范围：" +
              row.spPlcCcFileTypes.value1 +
              "KB至" +
              row.spPlcCcFileTypes.value2 +
              "KB";
          }
          break;
        case "FILE_OWNER":
          str = row.fileOwner.author;
          break;
        case "FILE_TIME":
          if (row.fileTime.createTime) {
            str +=
              "文档创建时间：" +
              (row.fileTime.createTimeCondition === "0" ? "早于" : "晚于") +
              row.fileTime.createTime;
          }
          if (row.fileTime.modifyTime) {
            str +=
              "文档创建时间：" +
              (row.fileTime.modifyTimeCondition === "0" ? "早于" : "晚于") +
              row.fileTime.modifyTime;
          }
          break;
      }
      return str;
    }
  }
};
</script>

