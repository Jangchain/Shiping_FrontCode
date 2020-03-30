<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  mounted() {
    this.$store.commit('nav/SET_NAV_INDEX_BY_KEY', (location.hash.match(/^#\/(\w+)\/?/) || [])[1])
  }
}
</script>
