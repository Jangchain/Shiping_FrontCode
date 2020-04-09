<template>
  <div>
    <div class="top-drawer">
      <h3>公共信息源</h3>
      <navList :nav-list="navData" @navClick="navClick" />

      <div class="data-list">
        <div class="h">
          <el-form :inline="true" :model="query">
            <el-form-item label="设备状态">
              <el-select v-model="query.status" placeholder="设备状态">
                <el-option v-for="(v, k) in ['离线', '在线']" :key="k" :label="v" :value="k" />
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" icon="el-icon-search" @click="getList(1)">查询</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div class="b">
          <el-table v-loading="listLoading" :data="tableData" element-loading-text="Loading" border fit highlight-current-row>
            <el-table-column type="selection" width="45" />
            <el-table-column prop="name" label="信息源名称" />
            <el-table-column prop="type" label="信息源类型" />
            <el-table-column prop="protocol" label="信息源协议" />
            <el-table-column prop="desc" label="信息源备注" />
            <el-table-column prop="creator" label="创建者" />
            <el-table-column fixed="right" label="操作" align="center" width="280px">
              <template slot-scope="scope">
                <el-button size="mini" type="primary" icon="el-icon-edit">修改</el-button>
                <el-button size="mini" type="danger" plain icon="el-icon-delete" @click="remove(scope.row.id)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="pager">
          <el-pagination :total="pager.total" :page-size="pager.size" background layout="prev,pager,next" @current-change="getList" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import navList from '../components/nav-list'
export default {
  components: { navList },
  data() {
    return {
      navData: [],
      pager: {
        total: 0,
        size: 20
      },
      query: {},
      tableData: [],
      listLoading: false,
      form: {
        deviceId: 0,
        keyCode: ''
      }
    }
  },
  created() {
    for (let index = 0; index < 10; index++) {
      this.navData.push({
        icon: require('../images/1.png'),
        name: '共享文档' + index
      })
    }
    this.getList()
  },
  methods: {
    getList(page) {
      this.tableData = []
      for (let index = 0; index < 10; index++) {
        this.tableData.push({
          name: '信息源名称' + index,
          type: '信息源类型' + index,
          protocol: '信息源协议' + index,
          desc: '信息源备注' + Math.pow(97, index),
          creator: '创建者' + index,
          operate: '操作' + index
        })
      }
    },
    navClick(val) {
      console.log('val====', val)
    }
  }
}
</script>
<style lang="scss" scoped>
@import "~@/styles/mixin.scss";
.top-drawer {
  background-color: rgb(4, 30, 95);
  padding: 10px;
  color: #fff;
  .el-row {
    .el-col-lg-4-8 {
      width: 20%;
    }
  }
  .nav-list {
    .grid-content {
      height: 50px;
      margin-bottom: 20px;
      background-color: #fff;
      border-radius: 4px;
    }
  }
  h3 {
    font-weight: normal;
  }
}
</style>
