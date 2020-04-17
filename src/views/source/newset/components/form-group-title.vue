<template functional>
  <div class="form-group-title">
    <span class="title">{{ props.title }}</span>
    <div class="line" />
  </div>
</template>

<style lang="scss" scoped>
.form-group-title {
  position: relative;
   padding: 10px 10px;
   margin-bottom: 20px;
  .title {
    padding: 0 20px 0 10px;
    font-size: 16px;
    background: #fff;
    font-weight: 700;
  }
  .line {
    width: 100%;
    height: 1px;
    background-color: #dcdfe6;
    position: absolute;
    top: 50%;
    z-index: -1;
  }
}
</style>
