import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'
import modules from './modules'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  plugins: debug ? [createLogger()] : [],
  modules,
  strict: debug,
  state: {
    drawer: false
  },
  getters: {
    getDrawer (state) {
      return state.drawer
    }
  },
  mutations: {
    setDrawer (state, payload) {
      state.drawer = payload
    }
  }
})
