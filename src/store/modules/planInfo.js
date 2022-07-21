const planInfo = {
  state: {
    info: {},
    time: '',
    currentRow: {}
  },

  mutations: {
    SET_INFO: (state, info) => {
      state.info = {
        ...info
      }
    },
    SET_TIME: (state, info) => {
      state.time = info
    },
    SET_TABLE_ROW: (state, info) => {
      state.currentRow = info
    }
  },
  actions: {
    // 存放当前计划信息
    setPlanInfo({
      commit
    }, info) {
      commit('SET_INFO', info)
    },
    // 存放当前计划信息
    setTime({
      commit
    }, info) {
      commit('SET_TIME', info)
    },
    // 存放当前行数据
    setTableRow({
      commit
    }, info) {
      commit('SET_TABLE_ROW', info)
    }
  }
}

export default planInfo
