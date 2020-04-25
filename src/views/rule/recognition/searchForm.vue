<template>
  <el-form inline :model="searchForm" class="search-form">
    <el-form-item label="创建者">
      <el-select v-model="searchForm.a" placeholder="创建者">
        <el-option label="admin" value="admin"></el-option>
        <el-option label="区域二" value="beijing"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-input v-model="searchForm.b" placeholder="输入搜索内容"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="default" @click="search">搜索</el-button>
      <el-button type="primary" @click="refresh">刷新</el-button>
      <el-button type="danger" @click="batchDel">批量删除</el-button>
      <el-button type="success" @click="create">新建</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
export default {
  data() {
    return {
      searchForm: {},
      creater: []
    };
  },
  methods: {
    search() {
      this.$emit("search", this.searchForm);
    },
    refresh() {
      this.$emit("refresh", this.searchForm);
    },
    batchDel() {
      this.$emit("del", this.searchForm);
    },
    create() {
      this.$emit("create", null);
    }
  }
};
</script>
