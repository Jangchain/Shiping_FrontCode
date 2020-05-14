<template>
  <div class="app-container">
    <p>邮件类型</p>
    <el-form :model="mail" label-width="120px" size="mini">
      <el-form-item label="路径">
        <el-input v-model="mail.path" />
      </el-form-item>
      <el-form-item label="视图">
        <el-input v-model="mail.view" />
      </el-form-item>
      <el-form-item label="字段">
        <el-input v-model="mail.field" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="saveMail">确定</el-button>
      </el-form-item>
    </el-form>
    <p>文档类型</p>
    <el-form :model="doc" :inline="true" size="mini">
      <el-row v-for="(v, k) in doc" :key="k">
        <el-form-item label="IP">
          <el-input v-model="v.host" />
        </el-form-item>
        <el-form-item label="路径">
          <el-input v-model="v.path" />
        </el-form-item>
        <el-form-item label="视图">
          <el-input v-model="v.view" />
        </el-form-item>
        <el-form-item label="名称">
          <el-input v-model="v.name" />
        </el-form-item>
        <el-form-item>
          <el-button type="success" plain @click="copyDoc(v)">复制</el-button>
          <el-button type="success" @click="addDoc">新增</el-button>
          <el-button type="danger" plain @click="delDoc(k)">删除</el-button>
        </el-form-item>
      </el-row>
      <el-form-item>
        <el-button type="primary" @click="saveDoc">确定</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import http from '@/api/http'

export default {
  data() {
    return {
      mail: {},
      doc: []
    }
  },
  created() {
    http.get('/lotus/config/mail', {}).then(r => {
      this.mail.path = r.data.path
      this.mail.view = r.data.view
      this.mail.field = r.data.field
    })
    http.get('/lotus/config/document', {}).then(r => {
      this.doc = r.data
    })
  },
  methods: {
    saveMail() {
      http.post('/lotus/config/mail', this.mail).then(r => {
        this.$alert(r.message || '操作成功', '提示')
      })
    },
    saveDoc() {
      http.post('/lotus/config/document', this.doc).then(r => {
        this.$alert(r.message || '操作成功', '提示')
      })
    },
    copyDoc(v) {
      this.doc.push({
        host: v.host,
        path: v.path,
        view: v.view,
        name: v.name,
        uuid: v.uuid,
        field: v.field
      })
    },
    addDoc() {
      this.doc.push({
        host: '',
        path: '',
        view: '',
        name: ''
      })
    },
    delDoc(k) {
      this.doc.splice(k, 1)
    }
  }
}
</script>
