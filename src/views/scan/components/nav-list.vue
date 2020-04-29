<template>
  <div>
    <div class="nav-list">
      <el-container>
        <el-main>
          <el-row :gutter="20">
            <el-col v-for="(data,index) in navList"
                    :key="index"
                    :xs="12"
                    :sm="12"
                    :lg="{span: '4-8'}">
              <div class="grid-content"
                   :style="styleObject(index)"
                   @click="newSet(index)">
                <div class="content-in"
                     :class="{bgColor:curIndex === index}">
                  <div class="icon">
                    <img :src="data.icon">
                  </div>
                  <div class="name"
                       v-text="data.label" />
                </div>
              </div>
            </el-col>
          </el-row>
        </el-main>
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
    },
    curIndex: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      // curIndex: 0 // 当前点击的nav下标
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
  created() {},
  methods: {
    newSet(index) {
      this.$emit('navClick', this.navList[index])
    }
  }
}
</script>
<style lang="scss" scoped>
@import '~@/styles/mixin.scss';
.el-row {
  .el-col-lg-4-8 {
    width: 20%;
  }
}
.nav-list {
  background-color: rgb(4, 30, 95);
  color: #fff;
  .grid-content {
    font-size: 16px;
    font-family: '微软雅黑';
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
      &.bgColor {
        background-color: #54d1ff;
      }
      .icon {
        margin: 0 30px;
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
