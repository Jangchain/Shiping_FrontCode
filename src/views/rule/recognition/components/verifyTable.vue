<template>
  <div>
    <el-table ref="verifyTable" :data="tableData" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55">
      </el-table-column>
      <el-table-column prop="name" label="信息源名称" width="160" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="ip" label="IP地址" width="120" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="createDate" label="创建时间" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="creator" label="创建者" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="description" label="备注" show-overflow-tooltip>
      </el-table-column>
    </el-table>
    <el-pagination :current-page="pager.page" :page-size="pager.size" layout="total, prev, pager, next, jumper" :total="pager.total" @current-change="pageChange" small>
    </el-pagination>
    <el-table ref="verifyPathTable" :data="pathTableData" tooltip-effect="dark" style="width: 100%" @selection-change="handlePathSelectionChange">
      <el-table-column type="selection" width="55">
      </el-table-column>
      <el-table-column label="路径" show-overflow-tooltip>
        <template slot-scope="{row}">{{row}}</template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { storageSourceFile } from "@/api/identifyModel";
export default {
  props: {
    value: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  data() {
    return {
      tableData: [],
      pathTableData: [],
      pager: { page: 1, size: 10, total: 0 }
    };
  },
  created() {
    this.getList(1);
  },
  methods: {
    getList(page) {
      storageSourceFile({
        resType: "file",
        current: page,
        size: this.pager.size
      }).then(res => {
        if (res.code === 0) {
          this.tableData = res.data.records;
          this.pager.size = Number(res.data.size);
          this.pager.total = Number(res.data.total);
          this.pager.page = Number(res.data.current);
        }
      });
    },
    pageChange(page) {
      this.getList(page);
    },
    handleSelectionChange(value) {
      this.pathTableData = [];
      this.value.targetTypeDatas = [];
      value.forEach(element => {
        this.pathTableData.push(...element.pathList);
        this.value.targetTypeDatas.push({
          entityName: "SpRepoTargetRes",
          id: element.id,
          name: element.name,
          selectionType: "File"
        });
      });
    },
    handlePathSelectionChange(value) {
      this.value.incldPath = value;
    }
  }
};
</script>
