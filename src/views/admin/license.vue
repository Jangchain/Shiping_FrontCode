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

export default {
  data() {
    return {
      mcode: '',
      license: {}
    }
  },
  created() {
    http.get('/license/getCurrentLicenseInfo', {}).then(r => {
      this.license = r.data
    })
    http.get('/license/mcode', {}).then(r => {
      this.mcode = r.data.mcode
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
