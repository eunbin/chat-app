const user = {
  namespaced: true,
  state: {
    user: null
  },
  getters: {
    loggedUser (state) {
      return state.user
    },
    isAuthenticated (state) {
      return !!(state.user && (state.user.userId && state.user.socketId))
    }
  },
  mutations: {
    setLoginUser (state, data) {
      state.user = data
    }
  }
}

export default user
