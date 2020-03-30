const state = {
  data: [
    { key: 'dashboard', val: '首页' },
    { key: 'grading', val: '分类分级' },
    { key: 'scan', val: '合规检测' },
    { key: 'audit', val: '内容管控' },
    { key: 'permission', val: '数据鉴权' },
    { key: 'treating', val: '数据脱敏' },
    { key: 'analyze', val: '行为分析' },
    { key: 'data', val: '信息源' },
    { key: 'rule', val: '数据规则' }
  ],
  current: 0
}

const mutations = {
  SET_NAV_INDEX: (state, n) => {
    state.current = n
  },

  SET_NAV_INDEX_BY_KEY: (state, k) => {
    let n = 0
    for (let i = 0; i < state.data.length; i++) {
      if (state.data[i].key === k) {
        n = i
        break
      }
    }
    state.current = n
  }
}

export default {
  namespaced: true,
  state,
  mutations
}
