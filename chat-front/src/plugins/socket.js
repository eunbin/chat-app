import Vue from 'vue'
import socketEvents from '@/socket'

Vue.use({
  install (vue) {
    vue.prototype.$socketEvents = socketEvents
  }
})
