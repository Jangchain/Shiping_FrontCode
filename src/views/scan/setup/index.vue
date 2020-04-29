<template>
  <div class="dashboard-container">
    父组件
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // url: location.hash
    }
  },
  created() {
  }
}
</script>
