import io from 'socket.io-client'

const socket = io('http://localhost:3000')

const EVENTS = {
  LOGIN: 'login',
  LOGOUT: 'logout',
  JOIN: 'join',
  LEAVE: 'leave',
  IMAGE: 'image',
  CHAT: 'chat',
  INVITE_AVAILABLE_USERS: 'inviteAvailableUsers',
  INVITE: 'invite'
}

const socketEvents = {
  login: (userId, callback) => {
    socket.emit(EVENTS.LOGIN, userId, callback)
  },
  logout: (userId, callback) => {
    socket.emit(EVENTS.LOGOUT, userId, callback)
  },
  joinRoom: (roomId, callback) => {
    socket.emit(EVENTS.JOIN, roomId, callback)
  },
  leaveRoom: () => {
    socket.emit(EVENTS.LEAVE)
  },
  sendMessage: (message) => {
    socket.emit(EVENTS.CHAT, message)
  },
  sendImage: (fileData) => {
    socket.emit(EVENTS.IMAGE, fileData)
  },
  onJoinRoom: (callback) => {
    socket.on(EVENTS.JOIN, callback)
  },
  onLeaveRoom: (callback) => {
    socket.on(EVENTS.LEAVE, callback)
  },
  onChatImage: (callback) => {
    socket.on(EVENTS.IMAGE, callback)
  },
  onChatMessage: (callback) => {
    socket.on(EVENTS.CHAT, callback)
  },
  inviteUser: (userInfo, roomId) => {
    socket.emit(EVENTS.INVITE, userInfo, roomId)
  },
  onInviteMessage: (callback) => {
    socket.on(EVENTS.INVITE, callback)
  },
  getInviteAvailableUsers: (roomId, callback) => {
    socket.emit(EVENTS.INVITE_AVAILABLE_USERS, roomId, callback)
  }
}

export default socketEvents
