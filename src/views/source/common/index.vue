<template>
  <div>
    <div class="top-drawer">
      <h3>公共信息源</h3>
      <navList :nav-list="navData" />

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
          <el-table v-loading="listLoading" :data="list" element-loading-text="Loading" border fit highlight-current-row>
            <el-table-column prop="id" label="设备ID" />
            <el-table-column prop="hotelId" label="酒店ID" />
            <el-table-column prop="sn" label="序列号" />
            <el-table-column prop="intro" label="介绍" />
            <el-table-column label="状态">
              <template slot-scope="scope">
                {{ ['离线', '在线'][scope.row.status] }}
              </template>
            </el-table-column>
            <el-table-column prop="version" label="应用版本" />
            <el-table-column prop="onlineTime" label="上次上线时间" />
            <el-table-column prop="offlineTime" label="上次离线时间" />
            <el-table-column fixed="right" label="操作" align="center" width="280px">
              <template slot-scope="scope">
                <el-button size="mini" type="success" plain icon="el-icon-info" @click="sendMsg(scope.row.id)">发送消息</el-button>
                <router-link :to="{ path: 'edit?id=' + scope.row.id }">
                  <el-button size="mini" type="primary" icon="el-icon-edit">修改</el-button>
                </router-link>
                <el-button size="mini" type="danger" plain icon="el-icon-delete" @click="remove(scope.row.id)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="pager"><el-pagination :total="pager.total" :page-size="pager.size" background layout="prev,pager,next" @current-change="getList" /></div>
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
      list: null,
      listLoading: false,
      form: {
        deviceId: 0,
        keyCode: ''
      }
    }
  },
  created() {
    for (let index = 0; index < 5; index++) {
      this.navData.push({
        icon: require('../images/1.png'),
        name: '共享文档' + index
      })
    }
  },
  methods: {
    getList(page) {
      const query = {
        hotelId: this.user.hotelId,
        rows: this.pager.size,
        page: page || 1
      }
      if (this.query) {
        if (typeof this.query.status !== 'undefined') {
          query.status = this.query.status
        }
      }
      this.list = []
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
