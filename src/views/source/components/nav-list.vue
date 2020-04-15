<template>
  <div>
    <div class="nav-list">
      <el-container>
        <el-main>
          <el-row :gutter="20">
            <el-col v-for="(data,index) in navList" :key="index" :xs="12" :sm="12" :lg="{span: '4-8'}">
              <div
                class="grid-content"
                :style="styleObject(index)"
                @click="newSet(index)"
              >
                <div v-if="!isShow||curIndex !== index" class="content-in">
                  <div class="icon">
                    <img :src="data.icon">
                  </div>
                  <div class="name" v-text="data.name" />
                </div>
                <!-- 终端信息源展示新建选项 -->
                <div v-if="isShow&&curIndex === index" class=" new-set">
                  <div class="name-title">
                    <i class="el-icon-edit" />
                    {{ data.name }}
                  </div>
                  <div class="name">新建{{ data.name }}</div>
                </div>
              </div>
            </el-col>
            <!-- NAV数小于5个，设置按钮跟随NAV展示 -->
            <el-col v-if="navList.length<5" class="less-five-box" :xs="12" :sm="12" :lg="{span: '4-8'}">
              <el-button class="setting" icon="el-icon-setting" />
            </el-col>
          </el-row>
        </el-main>
        <el-aside v-if="navList.length>=5" width="125px" class="right-side">
          <!-- 设置按钮 -->
          <el-button class="setting" icon="el-icon-setting" />
          <!-- NAV数大于5个，展示翻页按钮 -->
          <div v-if="navList.length>5">
            <el-button class="page-up" icon=" el-icon-arrow-up" />
            <el-button class="page-down" icon=" el-icon-arrow-down" />
          </div>
        </el-aside>
      </el-container>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    navList: {
      type: Array,
      default: () => {
        return []
      }
    },
    isShowNewSet: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isShow: false, // 是否展示新建按钮样式，true：展示
      curIndex: 0// 当前点击的nav
    }
  },
  computed: {
    /* nav超过两行，调整后一行margin为0 */
    styleObject() {
      return index => {
        let marginBottom = '20px'
        const dataLength = this.navList.length
        const remainder =
          this.navList.length % 5 === 0 ? 5 : this.navList.length % 5
        if (index >= dataLength - remainder) {
          marginBottom = 0
        }
        return {
          marginBottom: marginBottom
        }
      }
    }
  },
  created() {
    console.log('navList', this.navList.length)
  },
  methods: {
    newSet(index) {
      if (this.isShow && this.curIndex === index) {
        this.$router.push(`/data/newset`)
        return
      }
      this.curIndex = index
      this.isShow = true
      this.$emit('navClick', this.navList[index])// 抛出当前点击按钮信息
    }
  }
}
</script>
<style lang="scss" scoped>
@import "~@/styles/mixin.scss";
.el-row {
  .el-col-lg-4-8 {
    width: 20%;
  }
}
.nav-list {
  .grid-content {
    font-size: 16px;
    font-family: "微软雅黑";
    color: #333333;
    border: 1px solid rgba(255, 0, 0, 0);
    > div {
      height: 140px;
      border-radius: 10px;
    }
    .content-in {
      background-color: #fff;
      display: flex;
      align-items: center;
      .icon {
        margin: 0 30px;
      }
    }
    .new-set {
      background-color: #54D1FF;
      text-align: center;
      > div {
        height: 40px;
        line-height: 40px;
        margin-bottom: 10px;
      }
      .name-title {
        font-size: 14px;
      }
      .name {
        font-size: 20px;
      }
    }
  }
}
.right-side {
  background-color: transparent;
  padding: 20px 0;
  margin: 0;
  button {
    font-size: 36px;
    color: #cccccc;
  }
  .setting {
    margin-top: 30px;
    width: 80px;
    height: 80px;
  }
  .page-up {
    margin-top: 50px;
    width: 80px;
    height: 70px;
  }
  .page-down {
    margin: 0;
    width: 80px;
    height: 70px;
  }
}
.less-five-box {
  .setting {
    margin-top: 30px;
    width: 80px;
    height: 80px;
    font-size: 36px;
    color: #cccccc;
  }
}
</style>
