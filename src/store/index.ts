import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // for later potential momment.js use
    timezone: 'Europe/Ljubljana',
    dateTimeSecondsFormat: 'DD.MM.YYYY HH:mm:ss',
    dateTimeFormat: 'DD.MM.YYYY HH:mm',
    dateFormat: 'DD.MM.YYYY',
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
