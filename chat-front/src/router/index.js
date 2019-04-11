import Vue from 'vue'
import Router from 'vue-router'
import routes from './routes'
import store from '../store'

Vue.use(Router)
const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  linkActiveClass: 'active',
  routes
})

/**
 * Navigation Guard
 */
router.beforeEach((to, from, next) => {
  const urlRequiresAuth = /^\/chat/.test(to.fullPath)
  if (urlRequiresAuth && !store.getters['user/isAuthenticated']) {
    router.push('/')
  } else {
    next()
  }
})

router.afterEach((to, from) => {
})

export default router
