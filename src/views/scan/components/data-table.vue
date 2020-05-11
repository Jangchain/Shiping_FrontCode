<template>
  <div class="data-area">
    <div class="data-area-in">
      <slot></slot>
      <div class="b">
        <el-table
         ref="multipleTable"
          @row-click="rowClick"
          :data="tableData"
          element-loading-text="Loading"
          @select="select"
          border
          fit
          highlight-current-row
          height="40vh"
        >
          <el-table-column type="selection" width="45" />
          <el-table-column
            v-for="(val, index) in tableHeaderData"
            :key="index"
            align="left"
            :prop="val.name"
            :label="val.label"
          />
          <el-table-column v-if="typesStep2" label="状态" align="center">
            <template>
              <el-progress :text-inside="true" :percentage="percentage" :color="customColorMethod"></el-progress>
            </template>
          </el-table-column>
          <el-table-column v-if="widthes" fixed="right" label="操作" align="center">
            <template slot-scope="scope">
              <el-button
                @click.native.stop="modifyRowData(scope.row)"
                size="mini"
                type="text"
                icon="el-icon-edit"
              >修改</el-button>
              <el-button
                @click.native.stop="deleteRowData(scope.row)"
                size="mini"
                type="text"
                icon="el-icon-delete"
              >删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div class="pager">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
  </div>
</template>
<script>
export default {
  name: "dataTable",
  components: {},
  props: {
    tableData: {
      type: Array,
      default: () => {
        return [];
      }
    },
    isStep2:{
      type: Boolean,
      default: false
    },
    widthes:Number,
    typesStep2:Number,
    tableHeaderData: {
      type: Array,
      default: () => {
        return [];
      }
    },
    total: Number
  },
  data() {
    return {
      pageSize: 10,
      currentPage: 1,
      isShowDrawer: false,
      drawerData: {},
      percentage:20
    };
  },
  created() {
    // console.log(typeof this.widthes)
  },
  methods: {
     customColorMethod(percentage) {
        if (percentage < 30) {
          return '#909399';
        } else if (percentage < 70) {
          return '#e6a23c';
        } else {
          return '#67c23a';
        }
      },
    handleSizeChange(val) {
      //每页条数变化
      this.$emit("handleSizeChange", val);
    },
    handleCurrentChange(val) {
      //页数变化
      this.$emit("handleCurrentChange", val);
    },
    select(rows){
      
      if(this.isStep2){
        rows.forEach(row => {
          this.$refs.multipleTable.clearSelection();
          this.$refs.multipleTable.toggleRowSelection(row,true);
          // 当前点击选择项
          this.$emit("select", row);
        });
      }else{
this.$emit("select",rows)
      }
      // console.log(aaa);
    },
    rowClick(row) {
      this.isShowDrawer = true;
      this.drawerData = row;
    },
    modifyRowData(val) {
      this.$emit("modifyRowData", val);
    },
    deleteRowData(val) {
      this.$emit("deleteRowData", val);
    }
  }
};
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

