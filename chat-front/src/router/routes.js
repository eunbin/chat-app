import Login from '@/views/Login.vue'
import ChatRoom from '@/views/ChatRoom.vue'
import ChatLobby from '@/views/ChatLobby.vue'
import NotFound from '@/views/404.vue'

export default [
  {
    path: '*',
    meta: {
      public: true
    },
    redirect: {
      path: '/404'
    }
  },
  {
    path: '/404',
    meta: {
      public: true
    },
    name: 'notFound',
    component: NotFound
  },
  {
    path: '/',
    name: 'login',
    component: Login
  },
  {
    path: '/chat-lobby',
    name: 'chatLobby',
    component: ChatLobby
  },
  {
    path: '/chat-room/:id',
    name: 'chatRoom',
    component: ChatRoom
  }
]
