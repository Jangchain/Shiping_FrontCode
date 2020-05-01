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

import share from './share'
import database from './database'
import ftp from './ftp'
import linux from './linux'
import exchange from './exchange'
import lotus from './lotus'
import webDav from './webDav'
import cloudDatabase from './cloudDatabase'
import cloudStorage from './cloudStorage'
import sharePoint from './sharePoint'

export default {
  components: {
    navList,
    share,
    database,
    ftp,
    linux,
    exchange,
    lotus,
    webDav,
    cloudDatabase,
    cloudStorage,
    sharePoint
  },
  data() {
    return {
      navData: [],
      activeName: 'share',
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
      this.$router.replace(`/data/storage/${val.name}`)
    }
  }
}
</script>
<style lang="scss" scoped>
@import '~@/styles/mixin.scss';
.form-data {
  padding-top: 35px;
  .title-name {
    float: left;
    height: 36px;
    line-height: 36px;
  }
  .title-form {
    float: right;
  }
}
</style>
