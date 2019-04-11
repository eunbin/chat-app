const chat = {
  namespaced: true,
  state: {
    roomList: []
  },
  getters: {
    getRoomList (state) {
      return state.roomList
    },
    getRoomListById: state => (id) => {
      return state.roomList.find(room => room.roomId === id)
    }
  },
  mutations: {
    setRoomList (state, data) {
      state.roomList = data
    }
  },
  actions: {
  }
}

export default chat
