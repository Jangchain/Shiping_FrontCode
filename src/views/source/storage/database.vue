<template>
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
                v-model="searchValue"
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
</template>
<script>
export default {
  name: 'Share',
  components: {},
  data() {
    return {
      tableData: [],
      listLoading: false,
      pager: {
        total: 0,
        size: 20
      },
      query: {},
      searchValue: ''
    }
  },

  created() {
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
    }
  }
}
</script>
<style lang="scss" scoped>
.data-area {
  padding: 30px 15px 0;
  background-color: #eee;
  .data-area-in {
    background-color: #fff;
    .form-data {
      padding-top: 35px;
    }
  }
}
</style>

