<!-- 信息源nav切换 -->
<template>
  <el-radio-group v-model="activeTab" size="normal">
    <el-radio-button v-for="tab in tabs" :key="tab.value" :label="tab.value">
      {{ tab.label }}
    </el-radio-button>
  </el-radio-group>
</template>

<script>
const tabs = [
  {
    value: 'storage',
    label: '存储信息源'
  },
  {
    value: 'internet',
    label: '网络信息源'
  },
  {
    value: 'terminal',
    label: '终端信息源'
  },
  {
    value: 'public',
    label: '公共信息源'
  }
]
export default {
  name: 'NavTabs',
  data() {
    return {
      tabs,
      activeTab: ''
    }
  },
  watch: {
    activeTab(value) {
      this.$router.push(`/data/newset/${value}`)
    }
  },
  created() {
    console.log(this.$route.path)

    this.$nextTick(() => {
      const path = this.$route.path
      const uri = path.split('/')[3]
      this.activeTab = uri || 'storage'
    })
  }
}
</script>
