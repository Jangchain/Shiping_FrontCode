<template>
  <div id="tol">
    <div id="find">
      <h3>检查任务类</h3>
      <em></em>
      <ul>
        <li style="background:#f1455b;border:solid 8px #fcdade" @click="save()">
          <img src="../images/2.png" alt />
          <i>存储检查任务</i>
        </li>
        <li @click="scan()" style="background:#37c19d;border:solid 8px #d7f3eb">
          <img src="../images/3.png" alt />
          <i>终端扫描任务</i>
        </li>
        <li @click="capacity()" style="background:#505382;border:solid 8px #dcdde6">
          <img src="../images/4.png" alt />
          <i>智能分类任务</i>
        </li>
        <li @click="modules()" style="background:#3b7bc1;border:solid 8px #d8e5f3">
          <img src="../images/6.png" alt />
          <i>模块分类任务</i>
        </li>
      </ul>
    </div>
    <div id="look">
      <h3>监控任务类</h3>
      <em></em>
      <ul>
        <li @click="control()" style="background:#bfa342;border:solid 8px #bfa34233">
          <img src="../images/5.png" alt />
          <i>网络监控任务</i>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {

    }
  },
  methods: {
    save() {
      this.$router.push('./newtask')
    },
    scan() {
      this.$router.push('./newpolicy')
    },
    capacity() {},
    modules() {},
    control() {}
  }
};
</script>
<style lang="scss">
</style>
<style lang="scss" scoped>
#tol {
  width: 50%;
  margin: 0 auto;
  background: #fff;
  padding: 5rem;
}
i {
  font-style: normal;
}
ul {
  padding-top: 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  li {
   position: relative;
    list-style: none;
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 90px;
    height: 80px;
    border: 8px solid hotpink;
    border-radius: 2rem;
    background: #f1455b;
    &:nth-of-type(2){
      background:#f1455b;
      border:solid 3px #f1455b33
    }
    img {
      width: 32px;
      height: 32px;
    }
    i {
      position: absolute;
      top: 6rem;
      font-size: 0.75rem;
    }
  }
}
#find {
  padding-bottom: 60px;
  position: relative;
  h3 {
    z-index: 3;
  }
  em {
    display: inline-block;
    position: absolute;
    top: 10px;
    width: 80%;
    left: 120px;
    height: 0px;
    border-bottom: dashed 1px red;
  }
}
#look {
  position: relative;
  em {
    display: inline-block;
    position: absolute;
    top: 10px;
    width: 80%;
    left: 120px;
    height: 0px;
    border-bottom: dashed 1px red;
  }
}
</style>
