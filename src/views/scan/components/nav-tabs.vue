<template>
  <el-radio-group v-model="activeTab" size="normal" @change="handleChange">
    <el-radio-button v-for="tab in tabs" :key="tab.value" :label="tab.value">
      {{ tab.label }}
    </el-radio-button>
  </el-radio-group>
</template>

<script>
const tabs = [
  {
    value: 'newpolicy',
    label: '监测策略',
  },
  {
    value: 'newtask',
    label: '检测任务'
  },
]
export default {
  name: 'NavTabs',
  data() {
    return {
      tabs,
      activeTab: 'newpolicy'
    }
  },
  computed: {
    redirectUri() {
      const tab = tabs.find(n => n.value === this.activeTab)
      return tab ? tab.redirect || tab.value : ''
    }
  },
  created() {
    if (this.$route.name === 'newpolicy') {
      console.log(this.$router.name)
      this.$router.push('../tactics/newtask')
    }
    const type = this.$route.meta.type
    this.activeTab = type
  },
  methods: {
    handleChange() {
      console.log(`${this.redirectUri}`)
      this.$router.push(`../tactics/${this.redirectUri}`)
    }
  }
}
</script>
