<template>
  <div class="app-container">
    <el-form inline :model="searchForm" class="search-form" size="mini">
      <el-form-item>
        <el-date-picker
          v-model="searchForm.date"
          type="daterange"
          range-separator="至"
          value-format="yyyy-MM-dd"
          start-placeholder="注册开始日期"
          end-placeholder="注册结束日期"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="状态">
        <el-select v-model="searchForm.status" placeholder="状态">
          <el-option label="全部" value=""></el-option>
          <el-option v-for="(item,key) in statusMap" :key="key" :label="item" :value="key"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="类型">
        <el-select v-model="searchForm.eventType" placeholder="类型">
          <el-option label="全部" value=""></el-option>
          <el-option v-for="(item,key) in eventTypeMap" :key="key" :label="item" :value="key"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="是否删除原记录">
        <el-select v-model="searchForm.isDel" placeholder="类型">
          <el-option label="全部" value=""></el-option>
          <el-option v-for="(item,key) in isDelMap" :key="key" :label="item" :value="key"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="default" @click="search(1)">搜索</el-button>
        <el-button type="primary" @click="refresh">刷新</el-button>
        <el-button type="success" @click="archive">归档</el-button>
      </el-form-item>
    </el-form>
    <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%">
      <el-table-column label="状态" width="120">
        <template slot-scope="{row}">
          {{ row.status }}
        </template>
      </el-table-column>
      <el-table-column label="类型" width="120">
        <template slot-scope="{row}">
          {{ row.eventType }}
        </template>
      </el-table-column>
      <el-table-column label="开始时间" width="120">
        <template slot-scope="{row}">
          {{ row.startTime }}
        </template>
      </el-table-column>
      <el-table-column label="结束时间" width="120">
        <template slot-scope="{row}">
          {{ row.endTime }}
        </template>
      </el-table-column>
      <el-table-column label="能否删除原记录" width="120">
        <template slot-scope="{row}">
          {{ row.isDel }}
        </template>
      </el-table-column>
      <el-table-column label="归档事件个数" width="120">
        <template slot-scope="{row}">
          {{ row.ip }}
        </template>
      </el-table-column>
      <el-table-column label="操作时间" width="120">
        <template slot-scope="{row}">
          {{ row.createDate }}
        </template>
      </el-table-column>
      <el-table-column label="备注" show-overflow-tooltip>
        <template slot-scope="{row}">
          {{ row.comments }}
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <router-link :to="{ path: '/admin/log/edit?id=' + scope.row.id + '&type=detail' }">
            <el-button type="text" size="mini">查看</el-button>
          </router-link>
          <template v-if="scope.row.type !== 0">
            <router-link :to="{ path: '/admin/log/edit?id=' + scope.row.id +'&type=edit' }">
              <el-button type="text" size="mini">编辑</el-button>
            </router-link>
          </template>
        </template>
      </el-table-column>
    </el-table>
    <div class="f-p10 f-ar">
      <el-pagination :total="pager.total" :page-size="searchForm.size" background layout="prev,pager,next" @current-change="pageChange" />
    </div>
  </div>
</template>
<script>
import { getEventSafetyLogsByPage, archiveValid } from "@/api/admin";
export default {
  data() {
    return {
      tableData: [],
      selection: [],
      pager: { total: 0 },
      typeMap: {
        0: '预定义',
        1: '自定义'
      },
      searchForm: {
        current: 1,
        size: 10,
        startTime: '',
        endTime: '',
        date: '',
        status: '',
        eventType: ''
      },
      statusMap: {
        0: '正在归档',
        1: '恢复中',
        2: '归档成功',
        3: '恢复成功',
        4: '归档失败',
        5: '恢复失败'
      },
      eventTypeMap: {
        1: '网络监控事件',
        2: '终端扫描事件',
        3: '存储检查事件'
      },
      isDelMap: {
        0: '是',
        1: '否'
      }
    };
  },
  created() {
    this.search(1);
  },
  methods: {
    search(page) {
      this.searchForm.current = page || this.searchForm.current;
      this.searchForm.startTime = this.searchForm.date ? this.searchForm.date[0] + ' 00:00:00' : '';
      this.searchForm.endTime = this.searchForm.date ? this.searchForm.date[1] + ' 24:00:00' : '';
      delete (this.searchForm['date'])
      getEventSafetyLogsByPage(this.searchForm)
        .then(res => {
          if (res.code === 0) {
            this.tableData = res.data.records;
            this.searchForm.current = Number(res.data.current);
            this.pager.total = Number(res.data.total);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    refresh() {
      this.search();
    },
    del(id) {
      deleteHostwhiteById(id).then((r) => {
        if (r.message === '操作成功！') {
          this.$message.success(r.message)
          this.search(1)
        } else {
          this.$message.error(r.message)
        }
      })
    },
    archive() {
      this.$router.push({
        path: "/admin/log/archive"
      });
      // archiveValid().then((r) => {
      //   alert(r.code)
      //   if(r.code === '51000') {
      //     alert('dddd')

      //   }
      // })
    },
    pageChange(page) {}
  }
};
</script>
