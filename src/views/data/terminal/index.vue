<template>
  <div>
    <navList :nav-list="navData"
             :curIndex="curIndex"
             @navClick="navClick" />
    <Datatable v-if="!activeName"
               @handleSizeChange="handleSizeChange"
               @handleCurrentChange="handleCurrentChange"
               @modifyRowData="modifyRowData"
               @deleteRowData="deleteRowData"
               :tableData="tableData"
               :tableHeaderData="tableHeaderData"
               :total="total">
      <div class="form-data">
        <div class="title-name">信息源列表</div>
        <div class="title-form">
          <el-form :inline="true">
            <el-form-item label="信息源类型">
              <el-select v-model="selectValue"
                         placeholder="全部">
                <el-option v-for="(v, k) in databaseTypeSelect"
                           :key="k"
                           :label="v.label"
                           :value="v.value" />
              </el-select>
            </el-form-item>
            <el-form-item label="">
              <el-input v-model="searchValue"
                        placeholder="请输入内容">
                <i slot="suffix"
                   class="el-input__icon el-icon-search" />
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary"
                         @click="gettableData(1)">查询</el-button>
            </el-form-item>
            <el-form-item>
              <el-button type="danger"
                         @click="gettableData(1)">批量删除</el-button>
            </el-form-item>
            <el-form-item>
              <el-button type="success"
                         @click="gettableData(1)">新建</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </Datatable>

    <component :is="activeName" />
  </div>
</template>

<script>
import navList from '../components/nav-list'
import Datatable from '../components/data-table'
import { tabs } from './common'

import terminalOne from './terminalOne'

export default {
  components: {
    navList,
    Datatable,
    terminalOne
  },
  data() {
    return {
      navData: [],
      activeName: '',
      curIndex: NaN, // 当前展示的nav下标,
      tableData: [],
      tableHeaderData: [],
      total: 10,
      databaseTypeSelect: [
        {
          label: '全部',
          value: 'all'
        }
      ],
      selectValue: '',
      searchValue: ''
    }
  },
  created() {
    tabs.forEach(val => {
      this.navData.push({
        icon: require('../images/1.png'),
        name: val.name,
        label: val.label
      })
      this.databaseTypeSelect.push({
        label: val.label,
        value: val.name
      })
    })
    console.log('this.$route.params', this.$route.params)
    const type = this.$route.params.type
    if (type) {
      this.$route.meta.title = tabs.find(val => val.name === type).label
      this.activeName = type
      this.curIndex = tabs.findIndex(val => val.name === type)
    }
  },
  mounted() {
    this.tableHeaderData = [
      {
        name: 'name',
        label: '信息源名称'
      },
      {
        name: 'databaseType',
        label: '信息源类型'
      },
      {
        name: 'ip',
        label: 'IP地址'
      },
      {
        name: 'description',
        label: '备注'
      },
      {
        name: 'creator',
        label: '创建者'
      }
    ]
    this.gettableData()
  },
  methods: {
    navClick(val) {
      this.$router.replace(`/data/terminal/${val.name}`)
    },
    gettableData(page) {
      this.tableData = []
      for (let index = 0; index < 10; index++) {
        this.tableData.push({
          name: '信息源名称' + index,
          databaseType: '信息源类型' + index,
          ip: 'IP地址' + index,
          createDate: '创建时间' + index,
          description: '备注' + index,
          creator: '创建者' + index,
          domain: '域名' + index,
          port: '端口' + index,
          lastModifyDate: '最后修改时间' + index
        })
      }
    },
    modifyRowData(val) {
      console.log(val)
    },
    deleteRowData(val) {
      console.log(val)
    },
    handleCurrentChange(val) {
      console.log(val)
    },
    handleSizeChange(val) {
      console.log(val)
    }
  }
}
</script>
<style lang="scss" scoped>
@import '~@/styles/mixin.scss';
.form-data {
  padding-top: 35px;
  .title-name {
    float: left;
    height: 36px;
    line-height: 36px;
  }
  .title-form {
    float: right;
  }
}
</style>
