<template>
  <div class="dashboard-container">
    {{ url }}
  </div>
</template>

<script>
export default {
  data() {
    return {
      url: location.hash
    }
  },
  created() {
    this.$store.commit('nav/SET_NAV_INDEX_BY_KEY', (location.hash.match(/^#\/(\w+)\/?/) || [])[1])
  }
}
</script>
