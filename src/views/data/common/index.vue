<template>
  <div>
    <navList :nav-list="navData"
             :curIndex="curIndex"
             @navClick="navClick" />

    <component :is="activeName" />
  </div>
</template>

<script>
import navList from '../components/nav-list'
import { tabs } from './common'

import organization from './organization'
import account from './account'
import network from './network'

export default {
  components: {
    navList,
    organization,
    account,
    network
  },
  data() {
    return {
      navData: [],
      activeName: 'organization',
      curIndex: 0, // 当前展示的nav下标,
    }
  },
  created() {
    tabs.forEach(val => {
      this.navData.push({
        icon: require('../images/1.png'),
        name: val.name,
        label: val.label
      })
    })
    const type = this.$route.params.type
    if (type) {
      this.$route.meta.title = tabs.find(val => val.name === type).label
      this.activeName = type
      this.curIndex = tabs.findIndex(val => val.name === type)
    }
  },
  mounted() {
  },
  methods: {
    navClick(val) {
      this.$router.replace(`/data/common/${val.name}`)
    }
  }
}
</script>
<style lang="scss" scoped>
@import '~@/styles/mixin.scss';
</style>
