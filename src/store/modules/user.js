import { login, logout } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import router, { resetRouter } from '@/router'
import { encrypt } from '@/utils'

const state = {
  token: getToken(),
  name: '',
  avatar: '',
  introduction: '',
  roleName: '����Ա',
  roles: []
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
  SET_ROLENAME: (state, roleName) => {
    state.roleName = roleName
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password, validCode, validCodeKey } = userInfo
    return new Promise((resolve, reject) => {
      login({
        username: username.trim(),
        password: encrypt(password),
        validCode,
        validCodeKey
      }).then(response => {
        const { data } = response
        commit('SET_TOKEN', data.authorization)
        setToken(data.authorization)
        commit('SET_NAME', data.authAcct.userName)
        commit('SET_ROLES', data.authAcct.roleIdList)
        commit('SET_ROLENAME', data.authAcct.roleName)
        sessionStorage.setItem('user', JSON.stringify(data.authAcct))
        location.reload()
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit }) {
    const user = JSON.parse(sessionStorage.getItem('user'))
    commit('SET_NAME', user.userName)
    commit('SET_ROLES', user.roleIdList)
    return { roles: user.roleIdList }
  },

  // user logout
  logout({ commit, state, dispatch }) {
    sessionStorage.removeItem('user')
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        removeToken()
        resetRouter()

        // reset visited views and cached views
        // to fixed https://github.com/PanJiaChen/vue-element-admin/issues/2485
        dispatch('tagsView/delAllViews', null, { root: true })

        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken()
      resolve()
    })
  },

  // dynamically modify permissions
  changeRoles({ commit, dispatch }, role) {
    return new Promise(async resolve => {
      const token = role + '-token'

      commit('SET_TOKEN', token)
      setToken(token)

      const { roles } = await dispatch('getInfo')

      resetRouter()

      // generate accessible routes map based on roles
      const accessRoutes = await dispatch('permission/generateRoutes', roles, { root: true })

      // dynamically add accessible routes
      router.addRoutes(accessRoutes)

      // reset visited views and cached views
      dispatch('tagsView/delAllViews', null, { root: true })

      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
