<template>
  <div>
    <div class="top-drawer">
      <div class="title-name">存储信息源</div>
      <navList :nav-list="navData" @navClick="navClick" />
    </div>
    <div class="data-area">
      <div class="data-area-in">
        <div class="form-data">
          <div style="float:left">信息源列表</div>
          <div style="float:right">
            <el-form :inline="true" :model="query">
              <el-form-item label="信息源类型">
                <el-select v-model="query.status" placeholder="设备状态">
                  <el-option v-for="(v, k) in ['离线', '在线']" :key="k" :label="v" :value="k" />
                </el-select>
              </el-form-item>
              <el-form-item label="">
                <el-input
                  v-model="input4"
                  placeholder="请输入内容"
                >
                  <i slot="suffix" class="el-input__icon el-icon-search" />
                </el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="getList(1)">查询</el-button>
              </el-form-item>
              <el-form-item>
                <el-button type="danger" @click="getList(1)">批量删除</el-button>
              </el-form-item>
              <el-form-item>
                <el-button type="success" @click="getList(1)">新建</el-button>
              </el-form-item>
            </el-form>
          </div>
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
                <el-button size="mini" type="text" icon="el-icon-edit">修改</el-button>
                <el-button size="mini" type="text" icon="el-icon-delete" @click="remove(scope.row.id)">删除</el-button>
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
const tabs = [
  {
    label: '共享文档',
    name: 'share'
  },
  {
    label: '数据库',
    name: 'database'
  },
  {
    label: 'FTP',
    name: 'ftp'
  },
  {
    label: 'Linux主机',
    name: 'linux'
  },
  {
    label: 'Exchange',
    name: 'exchange'
  },
  {
    label: 'Lotus',
    name: 'lotus'
  },
  {
    label: 'webDav',
    name: 'webDav'
  },
  {
    label: '云数据库',
    name: 'cloudDatabase'
  },
  {
    label: '云对象存储',
    name: 'cloudStorage'
  }
]
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
    tabs.forEach(val => {
      this.navData.push({
        icon: require('../images/1.png'),
        name: val.label
      })
    })
    this.getList()
  },
  methods: {
    getList(page) {
      this.tableData = []
      for (let index = 0; index < 10; index++) {
        this.tableData.push({
          name: '信息源名称' + index,
          type: 'IP地址' + index,
          protocol: '创建时间' + index,
          desc: '创建者' + index,
          creator: '备注' + index,
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
  color: #fff;
  .title-name {
    height: 60px;
    line-height: 60px;
    font-size: 16px;
    margin: 0 0 -15px 35px;
  }
}
.data-area {
  padding: 30px 15px 0;
  background-color: #eee;
  .data-area-in{
    background-color: #fff;
  .form-data {
    padding-top: 35px;
  }
  }
}
</style>
