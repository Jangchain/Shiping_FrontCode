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
  }
}
</script>
