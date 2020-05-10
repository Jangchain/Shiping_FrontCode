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
      <el-form-item label="名称">
        <el-input v-model="searchForm.name" placeholder="输入名称"></el-input>
      </el-form-item>
      <el-form-item label="类型">
        <el-select v-model="searchForm.pageType" placeholder="类型">
          <el-option label="全部" value=""></el-option>
          <el-option v-for="(item,key) in pageTypeMap" :key="key" :label="item" :value="key"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="IP">
        <el-input v-model="searchForm.ip" placeholder="输入IP"></el-input>
      </el-form-item>
      <el-form-item label="网络状态">
        <el-select v-model="searchForm.netStatus" placeholder="网络状态">
          <el-option label="全部" value=""></el-option>
          <el-option v-for="(item,key) in netStatusMap" :key="key" :label="item" :value="key"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="服务状态">
        <el-select v-model="searchForm.deamon" placeholder="服务状态">
          <el-option label="全部" value=""></el-option>
          <el-option v-for="(item,key) in deamonMap" :key="key" :label="item" :value="key"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="软件版本">
        <el-input v-model="searchForm.networkElementVersion" placeholder="输入软件版本"></el-input>
      </el-form-item>
      <el-form-item label="序列号">
        <el-input v-model="searchForm.serialNumber" placeholder="输入序列号"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="default" @click="search(1)">搜索</el-button>
        <el-button type="primary" @click="refresh">刷新</el-button>
        <el-button type="danger" :disabled="selection.length === 0" @click="batchDel">批量删除</el-button>
        <el-button type="success" @click="create">新建</el-button>
      </el-form-item>
    </el-form>
    <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55">
      </el-table-column>
      <el-table-column label="名称" width="120">
        <template slot-scope="{row}">
          {{ row.name }}
        </template>
      </el-table-column>
      <el-table-column label="类型" width="120">
        <template slot-scope="{row}">
          {{ row.pageType }}
        </template>
      </el-table-column>
      <el-table-column label="IP" show-overflow-tooltip>
        <template slot-scope="{row}">
          {{ row.ip }}
        </template>
      </el-table-column>
      <el-table-column label="网络状态">
        <template slot-scope="{row}">
          {{ row.netStatus }}
        </template>
      </el-table-column>
      <el-table-column label="服务状态">
        <template slot-scope="{row}">
          {{ row.deamon }}
        </template>
      </el-table-column>
      <el-table-column prop="spPlcCcContentClassifiers.updateDate" label="注册日期">
        <template slot-scope="{row}">
          {{ row.regestrationDate }}
        </template>
      </el-table-column>
      <el-table-column label="软件版本">
        <template slot-scope="{row}">
          {{ row.networkElementVersion }}
        </template>
      </el-table-column>
      <el-table-column label="序列号">
        <template slot-scope="{row}">
          {{ row.serialNumber }}
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <router-link :to="{ path: '/admin/component/edit?id=' + scope.row.id }">
            <el-button type="text" size="mini">编辑</el-button>
          </router-link>
          <el-button type="text" size="mini" @click="del(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="f-p10 f-ar">
      <el-pagination :total="pager.total" :page-size="searchForm.size" background layout="prev,pager,next" @current-change="pageChange" />
    </div>
  </div>
</template>
<script>
import { getSiteelements, deleteSiteelements } from "@/api/admin";
export default {
  data() {
    return {
      tableData: [],
      selection: [],
      pager: { total: 0 },
      pageTypeMap: {
        'DLPv1.5_NM': 'DLPv1.5_NM',
        'SimpDLP_EP': 'SimpDLP_EP',
        'SimpDLP_SP': 'SimpDLP_SP'
      },
      netStatusMap: {
        ON: '在线',
        LEAVE: '不在线'
      },
      deamonMap: {
        NORMAL: '正常',
        ERROR: '异常'
      },
      searchForm: {
        current: 1,
        size: 10,
        date: '',
        pageType: '',
        netStatus: '',
        deamon: '',
        name: '',
        ip: '',
        networkElementVersion: '',
        serialNumber: ''
      }
    };
  },
  created() {
    this.search(1);
  },
  methods: {
    search(page) {
      this.searchForm.current = page || this.searchForm.current;

      this.searchForm.regestrationDateBeginTime = this.searchForm.date ? this.searchForm.date[0] + ' 00:00:00' : '';
      this.searchForm.regestrationDateEndTime = this.searchForm.date ? this.searchForm.date[1] + ' 24:00:00' : '';
      delete (this.searchForm['date'])
      getSiteelements(this.searchForm)
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
    batchDel() {
      const ids = []
      this.selection.map(item => {
        ids.push(item.id)
      })
      const post = {
        ids
      }
      deleteSiteelements(post).then((r) => {
        if (r.message === '操作成功！') {
          this.search(1)
        } else {
          this.$message.error(r.message)
        }
      })
    },
    del(id) {
      const ids = [];
      ids.push(id);
      const post = {
        ids
      }
      deleteSiteelements(post).then((r) => {
        if (r.message === '操作成功！') {
          this.$message.error(r.message)
          this.search(1)
        } else {
          this.$message.error(r.message)
        }
      })
    },
    create() {
      this.$router.push({
        path: "/admin/component/edit"
      });
    },
    handleSelectionChange(val) {
      this.selection = val;
    },
    pageChange(page) {}
  }
};
</script>

