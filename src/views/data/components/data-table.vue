<template>
  <div class="data-area">
    <div class="data-area-in">
      <slot></slot>
      <div class="b">
        <el-table @row-click="rowClick"
                  @selection-change="handleSelectionChange"
                  :data="tableData"
                  element-loading-text="Loading"
                  stripe
                  fit
                  highlight-current-row>
          <el-table-column type="selection"
                           width="45" />
          <el-table-column v-for="(val, index) in tableHeaderData"
                           :key="index"
                           ndex
                           :prop="val.name"
                           :label="val.label" />
          <el-table-column fixed="right"
                           label="操作"
                           align="center"
                           width="280px">
            <template slot-scope="scope">
              <el-button @click.native.stop="modifyRowData(scope.row)"
                         size="mini"
                         type="text"
                         icon="el-icon-edit">编辑</el-button>
              <el-button @click.native.stop="deleteRowData(scope.row,scope.$index, tableData)"
                         size="mini"
                         type="text"
                         icon="el-icon-delete">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div class="pager">
      <el-pagination @size-change="handleSizeChange"
                     @current-change="handleCurrentChange"
                     :current-page="currentPage"
                     :page-sizes="[10, 20, 50, 100]"
                     :page-size="pageSize"
                     layout="total, sizes, prev, pager, next, jumper"
                     :total="total">
      </el-pagination>
    </div>

    <el-drawer :visible.sync="isShowDrawer"
               :show-close="false"
               :append-to-body="true">
      <div class="drawer-content">
        <div class="title-name">{{ drawerData.name }}</div>
        <div>信息源名称：{{ drawerData.name }}</div>
        <div>大类：</div>
        <div>子类：</div>
        <div>地区/部门：</div>
        <div>域名：</div>
        <div>备注：{{ drawerData.description }}</div>
        <div>信息源类型：{{ drawerData.databaseType }}</div>
        <div>IP地址：{{ drawerData.ip }}</div>
        <br />
        <div>所属平台：</div>
        <div>接口编号：</div>
        <div>接口IP：</div>
        <div>端口：</div>
        <el-divider></el-divider>
        <div>创建者：{{ drawerData.creator }}</div>
        <div>最后修改：</div>
        <div>最后修改时间：</div>
        <div>是否共享：</div>
      </div>
    </el-drawer>
  </div>
</template>
<script>
export default {
  name: 'dataTable',
  components: {},
  props: {
    tableData: {
      type: Array,
      default: () => {
        return []
      }
    },
    tableHeaderData: {
      type: Array,
      default: () => {
        return []
      }
    },
    total: Number,
    pageSize: {
      type: Number,
      default: 10
    },
    currentPage: {
      type: Number,
      default: 1
    },
  },
  data() {
    return {
      isShowDrawer: false,
      drawerData: {},
    }
  },
  created() { },
  methods: {
    handleSizeChange(val) {
      //每页条数变化
      this.$emit('handleSizeChange', val)
    },
    handleCurrentChange(val) {
      //页数变化
      this.$emit('handleCurrentChange', val)
    },
    rowClick(row) {
      this.isShowDrawer = true
      this.drawerData = row
    },
    modifyRowData(val) {
      this.$emit('modifyRowData', val)
    },
    deleteRowData(val) {
      this.$emit('deleteRowData', val)
    },
    handleSelectionChange(val) {
      this.$emit('selectionChange', val)
    },
  }
}
</script>
<style lang="scss" scoped>
.data-area {
  padding: 30px 15px 0;
  background-color: #eee;
  .data-area-in {
    background-color: #fff;
    padding: 0 20px 20px;
  }
  .pager {
    padding: 40px 0;
  }
}
.drawer-content {
  padding: 50px;
  .title-name {
    font-size: 32px;
    font-weight: 700;
    padding: 20px 0;
  }
}
</style>

