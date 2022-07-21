/*
 * @Author: your name
 * @Date: 2021-06-29 18:47:53
 * @LastEditTime: 2021-08-18 18:11:41
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \c2matica-ui\src\store\modules\planInfo.js
 */

const tableRow = {
  state: {
    currentRow: {},
    teaTableList: [],
    teaTableId: null
  },

  mutations: {
    SET_TEA_TABLE_LIST: (state, list) => {
      state.teaTableList = list
    },
    SET_TABLE_ROW: (state, info) => {
      state.currentRow = info
    },
    SET_TEA_TABLE_ID: (state, id) => {
      state.teaTableId = id
    }
  },
  actions: {
    // 存放当前行数据
    setTableRow({
      commit
    }, info) {
      commit('SET_TABLE_ROW', info)
    },
    setTeaTabList({
      commit
    }, list) {
      commit('SET_TEA_TABLE_LIST', list)
    }
  }
}

export default tableRow
