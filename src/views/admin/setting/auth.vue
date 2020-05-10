<template>
  <div class="app-container">
    <div class="m-panel">
      <p class="h4">机器码</p>
      <p class="b">机器码：{{ mcode }}</p>
    </div>
    <div class="m-panel">
      <p class="h4">上传证书</p>
      <p class="b">
        <el-upload
          :action="apiPrefix + '/license/uploadLicense'"
          :on-success="uploaded"
          :on-error="uploadError"
        >
          <el-button size="mini" type="primary">选择证书上传</el-button>
        </el-upload>
      </p>
    </div>
    <div class="m-panel">
      <p class="h4">当前证书信息</p>
      <p class="b">系统名称：{{ license.productName }}</p>
      <p class="b">有效期：{{ license.notBefore }} 至 {{ license.notAfter }}</p>
      <p class="b">资源限制：{{ license.resLimitCount }}</p>
      <p class="b">终端限制：{{ license.depResLimitCount }}</p>
    </div>
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
