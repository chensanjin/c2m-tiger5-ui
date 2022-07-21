/*
 * @Author: your name
 * @Date: 2021-06-16 16:56:47
 * @LastEditTime: 2021-06-29 16:49:34
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \c2matica-ui\src\store\index.js
 */
import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import planInfo from './modules/planInfo'
import tableRow from './modules/tableRow'
import user from './modules/user'
import tagsView from './modules/tagsView'
import permission from './modules/permission'
import settings from './modules/settings'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    user,
    tagsView,
    permission,
    settings,
    planInfo,
    tableRow
  },
  getters
})

export default store
