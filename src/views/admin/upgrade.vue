<template>
  <div class="app-container">
    <el-form :inline="true" :model="query">
      <el-form-item label="基本版本">
        <el-input v-model="query.version" size="mini" placeholder="基本版本" />
      </el-form-item>
      <el-form-item label="状态">
        <el-select v-model="query.deployStatus" size="mini">
          <el-option v-for="(v, k) in deployStatusList" :key="k" :label="v.title" :value="v.val" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button size="mini" type="primary" icon="el-icon-search" @click="getList(1)">查询</el-button>
        <router-link :to="{ path: '/admin/upgrade/edit' }">
          <el-button size="mini" type="success" icon="el-icon-circle-plus-outline">上传</el-button>
        </router-link>
      </el-form-item>
    </el-form>
    <el-table v-loading="listLoading" :data="list" element-loading-text="Loading">
      <el-table-column prop="userName" label="基本版本" />
      <el-table-column prop="realName" label="目标版本" />
      <el-table-column prop="roleName" label="小版本" />
      <el-table-column prop="acctState" label="状态" />
      <el-table-column prop="type" label="上传时间" />
      <el-table-column prop="onlineState" label="升级时间" />
      <el-table-column fixed="right" label="操作" align="center" width="280px">
        <template slot-scope="scope">
          <el-button size="mini" type="danger" plain icon="el-icon-delete" @click="remove(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="f-p10 f-ar">
      <el-pagination :total="pager.total" :page-size="pager.size" background layout="prev,pager,next" @current-change="getList" />
    </div>
  </div>
</template>
<script>
import http from '@/api/http'
export default {
  data() {
    return {
      pager: {
        total: 0,
        size: 10
      },
      query: {},
      list: null,
      listLoading: true,
      deployStatusList: [
        { val: '', title: '全部' },
        { val: 0, title: '未部署' },
        { val: 1, title: '部署中' },
        { val: 2, title: '部署成功未重启' },
        { val: 3, title: '部署成功已重启' },
        { val: 4, title: '部署失败' }
      ]
    };
  },
  created() {
    this.getList(1)
  },
  methods: {
    getList(page) {
      const query = {
        size: this.pager.size,
        current: page || 1
      }
      if (this.query) {
        if (this.query.version) query.version = this.query.version
        if (this.query.deployStatus !== '') query.deployStatus = this.query.deployStatus
      }
      http.get('/system/update/get/server/package/page', query).then(r => {
        this.listLoading = false
        this.pager.total = Number(r.data.total)
        this.list = r.data.records
      }).catch(e => {
        this.listLoading = false
        console.log(e)
      })
    }
  }
};
</script>

