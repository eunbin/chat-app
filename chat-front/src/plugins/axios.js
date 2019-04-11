import Vue from 'vue'
import axios from 'axios'

Vue.use({
  install (vue) {
    Vue.prototype.$http = axios
  }
})
