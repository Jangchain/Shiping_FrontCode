<template>
  <div>
    <div class="top-drawer">
      <h3>网络信息源</h3>
      <div v-if="topDrawerShow">
        <ul>
          <li><i class="el-icon-share" /> 共享文档</li>
          <li><i class="el-icon-share" /> 共享文档</li>
          <li><i class="el-icon-share" /> 共享文档</li>
          <li><i class="el-icon-share" /> 共享文档</li>
          <li><i class="el-icon-share" /> 共享文档</li>
          <li><i class="el-icon-share" /> 共享文档</li>
          <li><i class="el-icon-share" /> 共享文档</li>
          <li><i class="el-icon-share" /> 共享文档</li>
          <li><i class="el-icon-share" /> 共享文档</li>
          <li><i class="el-icon-share" /> 共享文档</li>
        </ul>
      </div>
      <div @click="topDrawerShow = !topDrawerShow">
        <i v-if="topDrawerShow" class="el-icon-arrow-up" />
        <i v-else class="el-icon-arrow-down" />
      </div>
    </div>
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
</template>

<script>
export default {
  data() {
    return {
      topDrawerShow: true,
      pager: {
        total: 0,
        size: 20
      },
      query: {},
      list: null,
      listLoading: true,
      form: {
        deviceId: 0,
        keyCode: ''
      }
    }
  },
  created() {
  },
  methods: {
    getList(page) {
      const query = {
        hotelId: this.user.hotelId,
        rows: this.pager.size,
        page: page || 1
      }
      if (this.query) {
        if (typeof this.query.status !== 'undefined') query.status = this.query.status
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

  h3 {
    font-weight: normal;
  }

  ul {
    @include clearfix;
    margin: 0;
    padding: 0;

    li {
      float: left;
      list-style: none;
      margin: 0 15px 15px 0;
      padding-left: 20px;
      display: block;
      cursor: pointer;
      color: rgba(185, 201, 221, 1);
      line-height: 60px;
      background-color: #fff;
      border-radius: 10px;
      width: 300px;
      height: 140px;
      line-height: 140px;

      &.active {
        background-color: rgb(4, 30, 95);
        color: #fff;
      }
    }
  }
}
</style>
