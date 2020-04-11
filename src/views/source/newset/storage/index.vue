<template>
  <div>
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane
        v-for="tab in tabs"
        :key="tab.name"
        :label="tab.label"
        :name="tab.name"
      />
    </el-tabs>

    <div class="form-content">
      <component :is="activeName" />
    </div>

  </div>
</template>
<script>
import share from './share'
import database from './database'
import ftp from './ftp'
import linux from './linux'
import exchange from './exchange'
import lotus from './lotus'
import webDav from './webDav'
import cloudDatabase from './cloudDatabase'
import cloudStorage from './cloudStorage'

const tabs = [
  {
    label: '共享文档',
    name: 'share'
  },
  {
    label: '数据库',
    name: 'database'
  },
  {
    label: 'FTP',
    name: 'ftp'
  },
  {
    label: 'Linux主机',
    name: 'linux'
  },
  {
    label: 'Exchange',
    name: 'exchange'
  },
  {
    label: 'Lotus',
    name: 'lotus'
  },
  {
    label: 'webDav',
    name: 'webDav'
  },
  {
    label: '云数据库',
    name: 'cloudDatabase'
  },
  {
    label: '云对象存储',
    name: 'cloudStorage'
  }
]
export default {
  components: {
    share,
    database,
    ftp,
    linux,
    exchange,
    lotus,
    webDav,
    cloudDatabase,
    cloudStorage
  },
  data() {
    return {
      tabs,
      activeName: 'share'
    }
  },
  created() {
    const type = this.$route.params.type
    const tab = this.tabs.find(n => n.name === type)
    if (tab) {
      this.$route.meta.title = tab.label
    }
    this.activeName = type
  },

  methods: {
    handleClick(tab) {
      this.$router.push(`/data/newset/storage/${tab.name}`)
    }
  }
}
</script>
