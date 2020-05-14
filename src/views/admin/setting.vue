<template>
  <div class="app-container">
    <el-tabs tab-position="left">
      <el-tab-pane label="帐户安全配置">
        <el-card>
          <div slot="header">
            <span>主要设置帐户等相关安全配置</span>
          </div>
          <el-form :model="AUTH_MANAGE" label-width="240px" size="mini">
            <el-form-item>
              <el-checkbox-group v-model="AUTH_MANAGE.weeklyTime">
                <el-checkbox label="是否第一次登录修改密码"></el-checkbox>
                <el-checkbox label="只允许单IP登录"></el-checkbox>
                <el-checkbox label="开启工作时间操作限制"></el-checkbox>
                <el-checkbox label="开启IP变动过大限制"></el-checkbox>
                <el-checkbox label="是否启用Ukey"></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item label="尝试最大次数">
              <el-input v-model="AUTH_MANAGE.description" />
            </el-form-item>
            <el-form-item label="尝试最大次数后锁定时长(单位:分钟)">
              <el-input v-model="AUTH_MANAGE.description" />
            </el-form-item>
            <el-form-item label="登录后页面超时时长(单位:分钟)">
              <el-input v-model="AUTH_MANAGE.description" />
            </el-form-item>
            <el-form-item label="用户并发会话的最大数量">
              <el-input v-model="AUTH_MANAGE.description" />
            </el-form-item>
            <el-form-item label="密码复杂度组合">
              <el-checkbox-group v-model="AUTH_MANAGE.weeklyTime">
                <el-checkbox label="必须以字母开头"></el-checkbox>
                <el-checkbox label="开启工作时间操作限制"></el-checkbox>
                <el-checkbox label="必须包含数字"></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item label="验证码访问次数限制">
              <el-input v-model="AUTH_MANAGE.description" />
            </el-form-item>
            <el-form-item label="手动/随机重置密码">
              <el-radio v-model="radio" label="1">手动重置</el-radio>
              <el-radio v-model="radio" label="2">随机重置</el-radio>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" size="medium" @click="onSubmit">保存</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-tab-pane>
      <el-tab-pane label="邮箱中心配置">
        <el-card>
          <div slot="header">
            <span>主要设置邮件服务等相关安全配置</span>
          </div>
          <el-form :model="AUTH_MANAGE" label-width="120px" size="mini">
            <el-form-item>
              <el-checkbox-group v-model="AUTH_MANAGE.weeklyTime">
                <el-checkbox label="邮件服务器是否启用SSL"></el-checkbox>
                <el-checkbox label="邮件服务是否需要用户名密码验证"></el-checkbox>
                <el-checkbox label="邮件服务器是否启用STARTTLS"></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item label="邮件服务器地址">
              <el-input v-model="AUTH_MANAGE.description" />
            </el-form-item>
            <el-form-item label="邮件服务器端口">
              <el-input v-model="AUTH_MANAGE.description" />
            </el-form-item>
            <el-form-item label="邮箱服务器帐号">
              <el-input v-model="AUTH_MANAGE.description" />
            </el-form-item>
            <el-form-item label="邮件服务器密码">
              <el-input v-model="AUTH_MANAGE.description" />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" size="medium" @click="onSubmit">测试连接并保存</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-tab-pane>
      <el-tab-pane label="认证服务配置">
        <el-card>
          <div slot="header">
            <span>主要配置LDAP服务器</span>
          </div>
          <el-form :model="AUTH_MANAGE" label-width="160px" size="mini">
            <el-form-item label="认证服务器名称">
              <el-input v-model="AUTH_MANAGE.description" />
            </el-form-item>
            <el-form-item label="认证服务器地址/主机名">
              <el-input v-model="AUTH_MANAGE.description" />
            </el-form-item>
            <el-form-item label="认证服务器端口">
              <el-input v-model="AUTH_MANAGE.description" />
            </el-form-item>
            <el-form-item label="认证服务器域名">
              <el-input v-model="AUTH_MANAGE.description" />
            </el-form-item>
            <el-form-item label="认证服务器用户名">
              <el-input v-model="AUTH_MANAGE.description" />
            </el-form-item>
            <el-form-item label="认证服务器密码">
              <el-input v-model="AUTH_MANAGE.description" />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" size="medium" @click="onSubmit">测试连接并保存</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-tab-pane>
      <el-tab-pane label="网络设置">
        <el-card>
          <div slot="header">
            <span>主要设置网络等相关安全配置</span>
          </div>
          <el-form :model="AUTH_MANAGE" label-width="120px" size="mini">
            <el-form-item label="网卡名称">
              <el-input v-model="AUTH_MANAGE.description" />
            </el-form-item>
            <el-form-item label="IP">
              <el-input v-model="AUTH_MANAGE.description" />
            </el-form-item>
            <el-form-item label="子网IP/掩码位">
              <el-input v-model="AUTH_MANAGE.description" />
            </el-form-item>
            <el-form-item label="网关">
              <el-input v-model="AUTH_MANAGE.description" />
            </el-form-item>
            <el-form-item label="网卡索引">
              <el-input v-model="AUTH_MANAGE.description" />
            </el-form-item>
            <el-form-item label="DNS1">
              <el-input v-model="AUTH_MANAGE.description" />
            </el-form-item>
            <el-form-item label="DNS2">
              <el-input v-model="AUTH_MANAGE.description" />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" size="medium" @click="onSubmit">保存</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-tab-pane>
      <el-tab-pane label="帐户扫描">
        <el-card>
          <div slot="header">
            <span>主要设置帐户扫描等相关安全配置</span>
          </div>
          <el-form :model="AUTH_MANAGE" label-width="150px" size="mini">
            <el-form-item>
              <el-checkbox v-model="AUTH_MANAGE.checked">是否扫描账户</el-checkbox>
            </el-form-item>
            <el-form-item label="最后一次扫描时间">
              1234
            </el-form-item>
            <el-form-item label="休眠时长(单位:月)">
              <el-input v-model="AUTH_MANAGE.description" />
            </el-form-item>
            <el-form-item label="注销时长(单位:年)">
              <el-input v-model="AUTH_MANAGE.description" />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" size="medium" @click="onSubmit">保存</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-tab-pane>
      <el-tab-pane label="syslog日志服务器设置">
        <el-card>
          <div slot="header">
            <span>主要设置日志服务等相关安全配置</span>
          </div>
          <el-form :model="AUTH_MANAGE" label-width="150px" size="mini">
            <el-form-item>
              <el-checkbox v-model="AUTH_MANAGE.checked">是否启用syslog日志服务</el-checkbox>
            </el-form-item>
            <el-form-item label="Syslog日志接收地址">
              <el-input v-model="AUTH_MANAGE.description" />
            </el-form-item>
            <el-form-item label="Syslog日志接收协议">
              <el-input v-model="AUTH_MANAGE.description" />
            </el-form-item>
            <el-form-item label="Syslog日志接收端口">
              <el-input v-model="AUTH_MANAGE.description" />
            </el-form-item>
            <el-form-item label="日志类型">
              <el-checkbox-group v-model="AUTH_MANAGE.weeklyTime">
                <el-checkbox label="操作日志"></el-checkbox>
                <el-checkbox label="安全日志"></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" size="medium" @click="onSubmit">测试连接并保存</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-tab-pane>
      <el-tab-pane label="时间设置">
        <el-card>
          <div slot="header">
            <span>主要设置时间等相关安全配置</span>
          </div>
          <el-form :model="AUTH_MANAGE" label-width="120px" size="mini">
            <el-form-item label="自定义修改时间">
              <el-input v-model="AUTH_MANAGE.description" />
            </el-form-item>
            <el-form-item>
              <el-checkbox v-model="AUTH_MANAGE.checked">是否启用NTP服务同步时间</el-checkbox>
            </el-form-item>
            <el-form-item label="时间服务器">
              <el-input v-model="AUTH_MANAGE.description" />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" size="medium" @click="onSubmit">保存</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import http from '@/api/http'
import _ from 'lodash'

export default {
  data() {
    return {
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
