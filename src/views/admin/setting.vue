<template>
  <div class="app-container">
    <el-menu default-active="0" mode="horizontal">
      <el-menu-item v-for="(v, k) in menus" :key="k" :index="k">{{ v.note }}</el-menu-item>
    </el-menu>
    <router-view></router-view>
  </div>
</template>

<script>
import http from '@/api/http'
import _ from 'lodash'

export default {
  data() {
    return {
      menus: [],
      groupArr: [{
          note: '告警邮箱配置',
          v: 'ALARM_CONFIG'
        },
        {
          note: '告警级别及开关',
          v: 'ALARM_LEVEL'
        },
        {
          note: '帐户扫描',
          v: 'SCAN_ACCT'
        },
        {
          note: '帐户安全配置',
          v: 'AUTH_MANAGE',
          url: 'auth'
        },
        {
          note: '邮箱中心配置',
          v: 'EMAIL_SETTING'
        },
        {
          note: '认证服务配置',
          v: 'LDAP_SETTING'
        },
        {
          note: '审计日志存放位置',
          v: 'AUDIT_INFO_LOCATION'
        },
        {
          note: '日志容量阈值配置',
          v: 'LOG_ALARM'
        },

        {
          note: 'syslog日志服务器设置',
          v: 'SYSLOG_SETTING'
        },

        {
          note: '网络设置',
          v: 'NETWORK_SETTING'
        },

        {
          note: '时间设置',
          v: 'TIME_SETTING'
        },
        {
          note: '操作日志设置',
          v: 'AUDIT_INFO_SETTING'
        }
      ]
    }
  },
  created() {
    http.get('/common/sys/param/get/basic/setting/menu', {}).then(r => {
      const menus = r.data
      this.menus = _.filter(this.groupArr, o => {
        return menus.indexOf(o.v) > -1
      })
    })
  },
  methods: {
    uploaded() {
      this.$alert('上传成功', '提示')
    },
    uploadError(e) {
      const r = JSON.parse(e.message) || {}
      this.$alert(r.message || '上传失败', '提示')
    }
  }
}
</script>

<style scoped>
.m-panel {
  padding-bottom: 15px;
}
.m-panel .h4 {
  font-weight: bold;
}
.m-panel .b {
  font-size: 12px;
}
</style>
