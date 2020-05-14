<template>
  <div>
    <div class="app-top">
      <div class="logo">
        <img src="/assets/img/logo.png">
      </div>
      <div class="navs">
        <ul>
          <template v-for="(v, i) in navs.data">
            <li v-if="v.location !== 'right'" :key="v.key" :class="{ active: i === navs.current }" @click="changeNav(i)">{{ v.val }}</li>
          </template>
        </ul>
      </div>
      <div class="navs navs-right">
        <ul>
          <template v-for="(v, i) in navs.data">
            <template v-if="v.location === 'right'">
              <li v-if="v.key === 'admin'" :key="v.key" :class="{ active: i === navs.current }" @click="changeNav(i)">
                <el-dropdown>
                  <span class="el-dropdown-nav">
                    <svg-icon icon-class="user" /> {{ roleName }}
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item><router-link :to="{ path: '/admin/password' }">修改密码</router-link></el-dropdown-item>
                    <el-dropdown-item divided><span style="display:block;" @click="logout">退出登录</span></el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </li>
              <li v-else :key="v.key" :class="{ active: i === navs.current }" @click="changeNav(i)">{{ v.val }}</li>
            </template>
          </template>
        </ul>
      </div>
    </div>
    <div :class="classObj" class="app-wrapper">
      <div v-if="device==='mobile'&&sidebar.opened" class="drawer-bg" @click="handleClickOutside" />
      <sidebar v-if="navRoutes.length > 0" class="sidebar-container" />
      <div :class="{hasTagsView:needTagsView, noSideBar: navRoutes.length < 1}" class="main-container">
        <div :class="{'fixed-header':fixedHeader}">
          <navbar />
          <!-- <tags-view v-if="needTagsView" /> -->
        </div>
        <app-main />
        <!-- <right-panel v-if="showSettings">
          <settings />
        </right-panel> -->
      </div>
    </div>
  </div>
</template>

<script>
// import RightPanel from '@/components/RightPanel'
import { AppMain, Navbar, Sidebar, TagsView } from './components'
import ResizeMixin from './mixin/ResizeHandler'
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'Layout',
  components: {
    AppMain,
    Navbar,
    // RightPanel,
    // Settings,
    Sidebar
    // TagsView
  },
  mixins: [ResizeMixin],
  computed: {
    ...mapState({
      sidebar: state => state.app.sidebar,
      device: state => state.app.device,
      // showSettings: state => state.settings.showSettings,
      needTagsView: state => state.settings.tagsView,
      fixedHeader: state => state.settings.fixedHeader,
      navs: state => state.nav
    }),
    ...mapGetters([
      'navRoutes', 'roleName'
    ]),
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      }
    }
  },
  methods: {
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    },
    handleClickOutside() {
      this.$store.dispatch('app/closeSideBar', { withoutAnimation: false })
    },
    changeNav(n) {
      this.$store.commit('nav/SET_NAV_INDEX', n)
      this.$router.push('/' + this.navs.data[this.navs.current].key)
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "~@/styles/mixin.scss";
  @import "~@/styles/variables.scss";

  .app-top {
    position: fixed;
    width: 100%;
    height: 60px;
    background: rgb(2, 2, 19);
    z-index: 19;

    .logo {
      width: 160px;
      height: 60px;
      float: left;
      background: #E51C22;
      border-bottom-right-radius: 20px;
      text-align: center;
      line-height: 60px;

      img {
        width: 102px;
        vertical-align: middle;
      }
    }

    .navs {
      float: left;

      ul {
        @include clearfix;
        margin: 0;

        li {
          font-size: 12px;
          float: left;
          list-style: none;
          margin: 0;
          padding: 0 15px;
          cursor: pointer;
          color: rgba(185, 201, 221, 1);
          line-height: 60px;

          &.active {
            background-color: rgb(4, 30, 95);
            color: #fff;
          }
        }
      }
    }

    .navs-right {
      float: right;
    }
  }

  .app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;
    padding-top: 60px;

    &.mobile.openSidebar {
      position: fixed;
      top: 0;
    }
  }

  .drawer-bg {
    background: #000;
    opacity: 0.3;
    width: 100%;
    top: 0;
    height: 100%;
    position: absolute;
    z-index: 999;
  }

  .fixed-header {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 9;
    width: calc(100% - #{$sideBarWidth});
    transition: width 0.28s;
  }

  .hideSidebar .fixed-header {
    width: calc(100% - 54px)
  }

  .mobile .fixed-header {
    width: 100%;
  }

  #app .main-container.noSideBar {
    margin-left: 0;
  }

  .el-dropdown-nav {
    color: #b9c9dd;
  }

  .active .el-dropdown-nav {
    color: #fff;
  }
</style>
