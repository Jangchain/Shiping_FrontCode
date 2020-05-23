<template>
  <div class="app-container">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="告警统计" name="first">
        <el-form inline :model="searchForm" class="search-form" size="mini">
          <el-form-item label="类型">
            <el-select v-model="searchForm.type" placeholder="类型">
              <el-option v-for="(item,key) in typeMap" :key="key" :label="item" :value="key"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="起止时间">
            <el-date-picker
              v-model="searchForm.date"
              type="daterange"
              range-separator="至"
              value-format="yyyy-MM-dd"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="default" @click="search(1)">搜索</el-button>
          </el-form-item>
        </el-form>
        <div id="cpuChart" style="width: 100%; height: 220px"></div>
        <div id="ramChart" style="width: 100%; height: 220px"></div>
        <div id="hadChart" style="width: 100%; height: 220px"></div>
      </el-tab-pane>
      <el-tab-pane label="今日告警" name="second">
        <el-form inline :model="todaySearchForm" class="search-form" size="mini">
          <el-form-item label="起止时间">
            <el-date-picker
              v-model="todaySearchForm.date"
              type="daterange"
              range-separator="至"
              value-format="yyyy-MM-dd"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="default" @click="searchToday(1)">搜索</el-button>
          </el-form-item>
        </el-form>
        <el-table ref="multipleTable" :data="todyData" tooltip-effect="dark" style="width: 100%">
          <el-table-column prop="name" label="名称" width="120" />
          <el-table-column prop="createDate" label="创建时间" width="180" />
          <el-table-column prop="typeDesc" label="资源类型" />
          <el-table-column prop="levelDesc" label="等级" />
          <el-table-column prop="description" label="告警描述" width="200" />
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button icon="el-icon-s-order" circle @click="showModal(scope.row)"></el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          @size-change="handleSizeChangeToday"
          @current-change="handleCurrentChange"
          :current-page="todaySearchForm.current"
          :page-sizes="[10, 20, 50]"
          :page-size="10"
          layout="total, sizes, prev, pager, next, jumper"
          :total="todayTotal">
        </el-pagination>
      </el-tab-pane>
      <el-tab-pane label="历史告警" name="third">
        <el-form inline :model="historySearchForm" class="search-form" size="mini">
          <el-form-item label="起止时间">
            <el-date-picker
              v-model="historySearchForm.date"
              type="daterange"
              range-separator="至"
              value-format="yyyy-MM-dd"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="default" @click="searchHistory(1)">搜索</el-button>
          </el-form-item>
        </el-form>
        <el-table ref="multipleTable" :data="historyData" tooltip-effect="dark" style="width: 100%">
          <el-table-column prop="name" label="名称" width="120" />
          <el-table-column prop="createDate" label="创建时间" width="180" />
          <el-table-column prop="typeDesc" label="资源类型" />
          <el-table-column prop="levelDesc" label="等级" />
          <el-table-column prop="description" label="告警描述" width="200" />
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button icon="el-icon-s-order" circle @click="showModal(scope.row)"></el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          @size-change="handleSizeChangeHistory"
          @current-change="handleCurrentChangeHistory"
          :current-page="historySearchForm.current"
          :page-sizes="[10, 20, 50]"
          :page-size="10"
          layout="total, sizes, prev, pager, next, jumper"
          :total="historyTotal">
        </el-pagination>
      </el-tab-pane>
    </el-tabs>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="50%">
      <div>
        <el-form :label-position="'right'" label-width="80px" :model="detailInfo">
          <el-form-item label="资源类型">
            <el-input v-model="detailInfo.typeDesc" disabled></el-input>
          </el-form-item>
          <el-form-item label="等级">
            <el-input v-model="detailInfo.levelDesc" disabled></el-input>
          </el-form-item>
          <el-form-item label="创建时间">
            <el-input v-model="detailInfo.createDate" disabled></el-input>
          </el-form-item>
          <el-form-item label="描述">
            <el-input v-model="detailInfo.description" disabled></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
  import { alarmGetStat, alarmGetDay, alarmPage, alarmHistory } from "@/api/admin";
  export default {
    data() {
      return {
        activeName: 'first',
        typeMap: {
          '1': '日',
          '2': '周',
          '3': '月',
          '4': '年'
        },
        searchForm: {
          type: '1',
          date: ''
        },
        chartData: [],
        todaySearchForm: {
          current: 1,
          size: 10,
          date: ''
        },
        todyData: [],
        todayTotal: 0,
        historySearchForm: {
          current: 1,
          size: 10,
          date: ''
        },
        historyData: [],
        historyTotal: 0,
        dialogVisible: false,
        detailInfo: {}
      };
    },
    mounted(){
      this.getInit();
      this.searchToday(1)
      this.searchHistory(1)
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      },
      getInit() {
        alarmGetDay().then(res => {
          if(res.code === 0) {
            this.chartData = res.data;
            this.drawLine()
          }
        })
      },
      search() {
        this.searchForm.startDate = this.searchForm.date ? this.searchForm.date[0] + ' 00:00:00' : '';
        this.searchForm.endDate = this.searchForm.date ? this.searchForm.date[1] + ' 23:59:59' : '';
        delete (this.searchForm['date'])
        const post = {};
        if(this.searchForm.type) post.type = this.searchForm.type;
        if(this.searchForm.startDate) post.startDate = this.searchForm.startDate;
        if(this.searchForm.endDate) post.endDate = this.searchForm.endDate;
        alarmGetStat(post).then(res => {
          if(res.code === 0) {
            this.chartData = res.data
            this.drawLine()
          }
        })
      },
      searchToday(page) {
        this.todaySearchForm.current = page;
        this.getAlarmList()
      },
      getAlarmList() {
        this.todaySearchForm.startDate = this.todaySearchForm.date ? this.todaySearchForm.date[0] + ' 00:00:00' : '';
        this.todaySearchForm.endDate = this.todaySearchForm.date ? this.todaySearchForm.date[1] + ' 23:59:59' : '';
        const post = {
          current: this.todaySearchForm.current,
          size: this.todaySearchForm.size,
          startDate: this.todaySearchForm.startDate,
          endDate: this.todaySearchForm.endDate
        }
        alarmPage(post).then(res => {
          if(res.code === 0) {
            this.todyData = res.data.records;
            this.todayTotal = parseInt(res.data.total);
            console.log(this.todayTotal)
          }
        })
      },
      handleSizeChangeToday(value) {
        this.todaySearchForm.size = value;
        this.getAlarmList()
      },
      handleCurrentChange(value) {
        this.todaySearchForm.current = value;
        this.getAlarmList()
      },
      searchHistory(page) {
        this.historySearchForm.current = page;
        this.getAlarmHistory()
      },
      getAlarmHistory() {
        this.historySearchForm.startDate = this.historySearchForm.date ? this.historySearchForm.date[0] + ' 00:00:00' : '';
        this.historySearchForm.endDate = this.historySearchForm.date ? this.historySearchForm.date[1] + ' 23:59:59' : '';
        const post = {
          current: this.historySearchForm.current,
          size: this.historySearchForm.size,
          startDate: this.historySearchForm.startDate,
          endDate: this.historySearchForm.endDate
        }
        alarmHistory(post).then(res => {
          if(res.code === 0) {
            this.historyData = res.data.records;
            this.historyTotal = parseInt(res.data.total);
          }
        })
      },
      handleSizeChangeHistory(value) {
        this.historySearchForm.size = value;
        this.getAlarmHistory()
      },
      handleCurrentChangeHistory(value) {
        this.historySearchForm.current = value;
        this.getAlarmHistory()
      },
      drawLine() {
        const chartData = this.chartData;
        let xAxisList = [];
        let cpuDataLevel0 = [], cpuDataLevel1 = [], cpuDataLevel2 = [], cpuDataLevel3 = [], cpuDataLevel4 = [];
        let ramDataLevel0 = [], ramDataLevel1 = [], ramDataLevel2 = [], ramDataLevel3 = [], ramDataLevel4 = [];
        let hadDataLevel0 = [], hadDataLevel1 = [], hadDataLevel2 = [], hadDataLevel3 = [], hadDataLevel4 = []
        for(let i in chartData) {
          xAxisList.push(i)
          chartData[i].map(item => {
            console.log(item.typeDesc)
            if(item.typeDesc === 'cpu') {
              if(item.level === 0) {
                cpuDataLevel0.push(item.count)
              } else if (item.level === 1) {
                cpuDataLevel1.push(item.count)
              } else if (item.level === 2) {
                cpuDataLevel2.push(item.count)
              } else if (item.level === 3) {
                cpuDataLevel3.push(item.count)
              } else if (item.level === 4) {
                cpuDataLevel4.push(item.count)
              }
            } else if (item.typeDesc === '内存') {
              if(item.level === 0) {
                ramDataLevel0.push(item.count)
              } else if (item.level === 1) {
                ramDataLevel1.push(item.count)
              } else if (item.level === 2) {
                ramDataLevel2.push(item.count)
              } else if (item.level === 3) {
                ramDataLevel3.push(item.count)
              } else if (item.level === 4) {
                ramDataLevel4.push(item.count)
              }
            } else if (item.typeDesc === '硬盘') {
              if(item.level === 0) {
                hadDataLevel0.push(item.count)
              } else if (item.level === 1) {
                hadDataLevel1.push(item.count)
              } else if (item.level === 2) {
                hadDataLevel2.push(item.count)
              } else if (item.level === 3) {
                hadDataLevel3.push(item.count)
              } else if (item.level === 4) {
                hadDataLevel4.push(item.count)
              }
            }
          })
        }
        console.log(cpuDataLevel0)
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById('cpuChart'))
        // 绘制图表
        myChart.setOption({
            title: { text: 'CPU告警次数' },
            tooltip: {},
            legend: {
              data: ['紧急告警次数', '严重告警次数', '重要告警次数', '一般告警次数', '提示告警次数']
            },
            tooltip: {
              trigger: 'axis'   // axis   item   none三个值
            },
            xAxis: {
                data: xAxisList
            },
            yAxis: {},
            series: [{
              name: '提示告警次数',
              type: 'line',
              data: cpuDataLevel0
            }, {
              name: '一般告警次数',
              type: 'line',
              data: cpuDataLevel1
            }, {
              name: '重要告警次数',
              type: 'line',
              data: cpuDataLevel2
            }, {
              name: '严重告警次数',
              type: 'line',
              data: cpuDataLevel3
            }, {
              name: '紧急告警次数',
              type: 'line',
              data: cpuDataLevel4
            }]
        });
        let ramChart = this.$echarts.init(document.getElementById('ramChart'))
        ramChart.setOption({
            title: { text: '内存告警次数' },
            tooltip: {},
            legend: {
              data: ['紧急告警次数', '严重告警次数', '重要告警次数', '一般告警次数', '提示告警次数']
            },
            tooltip: {
              trigger: 'axis'   // axis   item   none三个值
            },
            xAxis: {
                data: xAxisList
            },
            yAxis: {},
            series: [{
              name: '提示告警次数',
              type: 'line',
              data: ramDataLevel0
            }, {
              name: '一般告警次数',
              type: 'line',
              data: ramDataLevel1
            }, {
              name: '重要告警次数',
              type: 'line',
              data: ramDataLevel2
            }, {
              name: '严重告警次数',
              type: 'line',
              data: ramDataLevel3
            }, {
              name: '紧急告警次数',
              type: 'line',
              data: ramDataLevel4
            }]
        });
        let hadChart = this.$echarts.init(document.getElementById('hadChart'))
        hadChart.setOption({
            title: { text: '硬盘告警次数' },
            tooltip: {},
            legend: {
              data: ['紧急告警次数', '严重告警次数', '重要告警次数', '一般告警次数', '提示告警次数']
            },
            tooltip: {
              trigger: 'axis'   // axis   item   none三个值
            },
            xAxis: {
                data: xAxisList
            },
            yAxis: {},
            series: [{
              name: '提示告警次数',
              type: 'line',
              data: hadDataLevel0
            }, {
              name: '一般告警次数',
              type: 'line',
              data: hadDataLevel1
            }, {
              name: '重要告警次数',
              type: 'line',
              data: hadDataLevel2
            }, {
              name: '严重告警次数',
              type: 'line',
              data: hadDataLevel3
            }, {
              name: '紧急告警次数',
              type: 'line',
              data: hadDataLevel4
            }]
        });
      },
      showModal(record) {
        this.dialogVisible = true;
        this.detailInfo = record



      }
    }
  };
</script>