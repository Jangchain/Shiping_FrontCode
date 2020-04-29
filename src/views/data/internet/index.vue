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

// TODO: 邮件和URL目前需求不明确，暂时不做
import portResource from './portResource'
// import emailResource from './emailResource'
// import urlResource from './urlResource'

export default {
  components: {
    navList,
    portResource,
    // emailResource,
    // urlResource
  },
  data() {
    return {
      navData: [],
      activeName: 'portResource',
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
    console.log('this.$route.params', this.$route.params)
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
      this.$router.replace(`/data/internet/${val.name}`)
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
