<template>
  <div class="app-container">
    <p>测试连接</p>
    <el-form size="mini" :inline="true">
      <el-form-item label="IP地址">
        <el-input v-model="ip" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="testIP">测试连接</el-button>
      </el-form-item>
      <el-form-item>
        结果：{{ ipRes }}
      </el-form-item>
    </el-form>
    <p>系统操作</p>
    <el-form size="mini" :inline="true" class="sysact">
      <el-row>
        <el-button size="mini" type="danger" @click="halt">关机</el-button>
        <span>(点击按钮后所有的服务即会关机，关机之前，请确保没有正在执行的策略，以免影响事件上报)</span>
      </el-row>
      <el-row>
        <el-button size="mini" type="warning" @click="reboot">重启</el-button>
        <span>(点击按钮后所有的服务即会重启，重启之前，请确保没有正在执行的策略，以免影响事件上报)</span>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import http from '@/api/http'

export default {
  data() {
    return {
      ip: '',
      ipRes: ''
    }
  },
  methods: {
    testIP() {
      http.post('/system/tools/pingIp', {
        pingIp: this.ip
      }).then(r => {
        this.ipRes = JSON.stringify(r)
      })
    },
    halt() {
      this.$confirm('确认是否关机?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        http.post('/system/tools/shutdown', {}).then(r => {
          this.$alert(r.message || '操作成功', '提示')
        })
      })
    },
    reboot() {
      this.$confirm('确认是否重启?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        http.post('/system/tools/reboot', {}).then(r => {
          this.$alert(r.message || '操作成功', '提示')
        })
      })
    }
  }
}
</script>

<style scoped>
.sysact .el-row {
  margin-bottom: 15px;
  font-size: 12px;
}
</style>
