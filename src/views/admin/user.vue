<template>
  <div class="app-container">
    <el-form :inline="true" :model="query">
      <el-form-item label="用户名">
        <el-input v-model="query.userName" size="mini" placeholder="用户名" />
      </el-form-item>
      <el-form-item label="真实姓名">
        <el-input v-model="query.realName" size="mini" placeholder="真实姓名" />
      </el-form-item>
      <el-form-item label="用户角色">
        <el-input v-model="query.roleName" size="mini" placeholder="用户角色" />
      </el-form-item>
      <el-form-item label="用户状态">
        <el-select v-model="query.acctState" size="mini">
          <el-option v-for="(v, k) in acctStateList" :key="k" :label="v.note" :value="v.v" />
        </el-select>
      </el-form-item>
      <el-form-item label="用户类型">
        <el-select v-model="query.type" size="mini">
          <el-option v-for="(v, k) in typeList" :key="k" :label="v.note" :value="v.v" />
        </el-select>
      </el-form-item>
      <el-form-item label="手机号">
        <el-input v-model="query.phone" size="mini" placeholder="手机号" />
      </el-form-item>
      <el-form-item label="是否在线">
        <el-select v-model="query.onlineState" size="mini">
          <el-option v-for="(v, k) in onlineStateList" :key="k" :label="v.note" :value="v.v" />
        </el-select>
      </el-form-item>
      <el-form-item label="部门">
        <el-input v-model="query.deptName" size="mini" placeholder="部门" />
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input v-model="query.email" size="mini" placeholder="邮箱" />
      </el-form-item>
      <el-form-item>
        <el-button size="mini" type="primary" icon="el-icon-search" @click="getList(1)">查询</el-button>
        <router-link :to="{ path: '/admin/user/edit' }">
          <el-button size="mini" type="success" icon="el-icon-circle-plus-outline">新增</el-button>
        </router-link>
      </el-form-item>
    </el-form>
    <el-table v-loading="listLoading" :data="list" element-loading-text="Loading">
      <el-table-column type="selection" width="55" />
      <el-table-column prop="userName" label="用户名" />
      <el-table-column prop="realName" label="真实姓名" />
      <el-table-column prop="roleName" label="用户角色" />
      <el-table-column prop="acctState" label="用户状态" />
      <el-table-column prop="type" label="用户类型" />
      <el-table-column prop="onlineState" label="是否在线" />
      <el-table-column prop="phone" label="手机号" />
      <el-table-column prop="deptName" label="部门" />
      <el-table-column prop="email" label="邮箱" />
      <el-table-column fixed="right" label="操作" align="center" width="280px">
        <template slot-scope="scope">
          <router-link :to="{ path: '/admin/user/edit?id=' + scope.row.id }">
            <el-button size="mini" type="primary" icon="el-icon-edit">编辑</el-button>
          </router-link>
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
      acctStateList: [],
      typeList: [],
      onlineStateList: []
    };
  },
  created() {
    this.getList(1)
    http.get('/common/sys/dict/get/list/acctState', {}).then(r => {
      this.acctStateList = r.data
    })
    http.get('/common/sys/dict/get/list/type', {}).then(r => {
      this.typeList = r.data
    })
    http.get('/common/sys/dict/get/list/onlineState', {}).then(r => {
      this.onlineStateList = r.data
    })
  },
  methods: {
    getList(page) {
      const query = {
        size: this.pager.size,
        current: page || 1
      }
      if (this.query) {
        if (this.query.userName) query.userName = this.query.userName
        if (this.query.realName) query.realName = this.query.realName
        if (this.query.roleName) query.roleName = this.query.roleName
        if (this.query.acctState) query.acctState = this.query.acctState
        if (this.query.type) query.type = this.query.type
        if (this.query.onlineState) query.onlineState = this.query.onlineState
        if (this.query.phone) query.phone = this.query.phone
        if (this.query.deptName) query.deptName = this.query.deptName
        if (this.query.email) query.email = this.query.email
      }
      http.get('/common/auth/acct/get/page', query).then(r => {
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

