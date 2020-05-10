<template>
  <div class="app-container">
    <el-row :gutter="10">
      <el-col :span="6">
        <el-card>
          <div slot="header">
            <span>组织部门</span>
          </div>
          <div>
            <el-button type="success" size="mini" @click="onSubmit">新增部门</el-button>
          </div>
          <el-tree :data="[{ label: '未知用户组' }]">
            <span slot-scope="{ node, data }">
              <span>
                <el-button type="text" size="mini" icon="el-icon-edit"></el-button>
                <el-button type="text" size="mini" icon="el-icon-delete"></el-button>
              </span>
            </span>
          </el-tree>
        </el-card>
      </el-col>
      <el-col :span="18">
        <el-card>
          <div slot="header">
            <span>已授权用户列表</span>
          </div>
          <div>
            <el-button size="mini" @click="onSubmit">刷新</el-button>
          </div>
          <el-table :data="list">
            <el-table-column type="selection" width="55" />
            <el-table-column prop="userName" label="用户名" />
            <el-table-column prop="realName" label="真实姓名" />
            <el-table-column prop="roleName" label="用户角色" />
            <el-table-column prop="acctState" label="用户状态" />
            <el-table-column prop="type" label="用户类型" />
            <el-table-column prop="onlineState" label="是否在线" />
            <el-table-column prop="phone" label="手机号" />
            <el-table-column prop="deptName" label="部门" />
            <el-table-column prop="email" label="邮箱" />
          </el-table>
          <div class="f-p10 f-ar">
            <el-pagination :total="pager.total" :page-size="pager.size" background layout="prev,pager,next" @current-change="getList" />
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import http from '@/api/http'
import _ from 'lodash'

export default {
  data() {
    return {
      pager: {
        total: 0,
        size: 10
      },
      query: {},
      list: null,
      menus: [],
      AUTH_MANAGE: {
        weeklyTime: []
      },
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
          v: 'AUTH_MANAGE'
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
