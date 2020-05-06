<template>
  <div>
    <div class="m-rule-nav">
      <el-button-group>
        <el-button type="info">数据规则</el-button>
        <el-button @click="navTo('/rule/identifyModel/documentCharacteristics')">识别模型</el-button>
      </el-button-group>
    </div>
    <div class="m-rule-list">
      <el-form :inline="true" :model="query">
        <el-form-item label="规则名称">
          <el-input v-model="query.name" size="mini" placeholder="规则名称" />
        </el-form-item>
        <el-form-item label="规则类型">
          <el-select v-model="query.subSystem" size="mini" placeholder="规则类型">
            <el-option v-for="(v, k) in subSystemList" :key="k" :label="v.title" :value="v.val" />
          </el-select>
        </el-form-item>
        <el-form-item label="添加方式">
          <el-select v-model="query.definitionType" size="mini" placeholder="添加方式">
            <el-option v-for="(v, k) in definitionTypeList" :key="k" :label="v.title" :value="v.val" />
          </el-select>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="query.description" size="mini" placeholder="备注" />
        </el-form-item>
        <el-form-item>
          <el-button size="mini" type="primary" icon="el-icon-search" @click="getList(1)">查询</el-button>
          <router-link :to="{ path: '/rule/edit' }"><el-button size="mini" type="success" icon="el-icon-circle-plus-outline">新增</el-button></router-link>
        </el-form-item>
      </el-form>
      <el-table v-loading="listLoading" :data="list" element-loading-text="Loading">
        <el-table-column type="selection" width="55" :selectable="selectable" />
        <el-table-column prop="name" label="规则名称" />
        <el-table-column prop="customizedExpression" label="逻辑表达式" />
        <el-table-column prop="ruleType" label="类型" />
        <el-table-column prop="elementStatus" label="状态" />
        <el-table-column prop="description" label="备注" />
        <el-table-column fixed="right" label="操作" align="center" width="280px">
          <template slot-scope="scope">
            <template v-if="selectable(scope.row, scope.$index)">
              <router-link :to="{ path: '/rule/edit?id=' + scope.row.id }">
                <el-button size="mini" type="primary" icon="el-icon-edit">编辑</el-button>
              </router-link>
              <el-button size="mini" type="danger" plain icon="el-icon-delete" @click="remove(scope.row.id)">删除</el-button>
            </template>
            <template v-else>
              <router-link :to="{ path: '/rule/edit?type=ext&id=' + scope.row.id }">
                <el-button size="mini" plain icon="el-icon-share">派生</el-button>
              </router-link>
            </template>
          </template>
        </el-table-column>
      </el-table>
      <div class="f-p10 f-ar"><el-pagination :total="pager.total" :page-size="pager.size" background layout="prev,pager,next" @current-change="getList" /></div>
    </div>
  </div>
</template>

<script>
import { pageRules } from '@/api/rule'
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
      subSystemList: [
        { title: '全部', val: null },
        { title: '终端扫描规则', val: 0 },
        { title: '存储检测规则', val: 1 },
        { title: '网络监控规则', val: 9 }
      ],
      definitionTypeList: [
        { title: '全部', val: null },
        { title: '终端扫描规则', val: 'C_USER_DEFINE' },
        { title: '存储检测规则', val: 'C_PRE_DEFINE' }
      ]
    }
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
        if (this.query.name) query.name = this.query.name
        if (this.query.description) query.description = this.query.description
        if (this.query.subSystem !== null) query.subSystem = this.query.subSystem
        if (this.query.definitionType !== null) query.definitionType = this.query.definitionType
      }
      pageRules(query).then(r => {
        this.listLoading = false
        this.pager.total = Number(r.data.total)
        this.list = r.data.records
      }).catch(e => {
        this.listLoading = false
        console.log(e)
      })
    },
    selectable(row, index) {
      return row.definitionType === 'C_USER_DEFINE'
    }
  }
}
</script>

<style scoped>
.m-rule-nav {
  padding: 20px;
}
.m-rule-nav button {
  width: 500px;
  line-height: 30px;
  border-radius: 10px;
}
.m-rule-list {margin-left: 20px;}
</style>
