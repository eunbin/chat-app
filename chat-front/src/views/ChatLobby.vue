<template>
  <div class="chat-lobby-page">
    <app-drawer/>
    <app-toolbar>
      <v-btn
        class="logout-button"
        icon
        @click="onClickLogout">
        <v-icon>logout</v-icon>
      </v-btn>
    </app-toolbar>
    <chat-room-list
      v-if="chatRoomList && chatRoomList.length > 0"
      class="chat-room-list"
      :list="chatRoomList"
      @select-room="joinRoom"/>

    <v-layout row justify-center>
      <v-dialog
        v-model="showDialog"
        max-width="290"
      >
        <v-card>
          <v-card-title class="title">초대 메시지 수신</v-card-title>
          <v-card-text>
            {{ invitationMessage }}
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="green darken-1"
              flat="flat"
              @click="onClickAgreeToJoin"
            >
              동의
            </v-btn>
            <v-btn
              color="green darken-1"
              flat="flat"
              @click="showDialog = false"
            >
              무시
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>
  </div>
</template>

<script>
import ChatRoomList from '@/components/chat/ChatRoomList'
import AppToolbar from '@/components/layout/AppToolbar'
import AppDrawer from '@/components/layout/AppDrawer'
import { createNamespacedHelpers } from 'vuex'
const userStore = createNamespacedHelpers('user')
const chatStore = createNamespacedHelpers('chat')

export default {
  name: 'ChatLobby',
  components: {
    AppDrawer,
    AppToolbar,
    ChatRoomList
  },
  data () {
    return {
      items: [
        { title: 'Home', icon: 'dashboard' },
        { title: 'About', icon: 'question_answer' }
      ],
      right: null,
      showDialog: false,
      invitation: null
    }
  },
  computed: {
    ...chatStore.mapGetters(['getRoomList']),
    ...userStore.mapGetters(['loggedUser']),
    chatRoomList () {
      return this.getRoomList
    },
    invitationMessage () {
      if (!this.invitation) {
        return ''
      }
      const { from: { userId: fromUserId }, to: { userId: toUserId }, room: { roomId } } = this.invitation
      return `${fromUserId}님이 ${toUserId}님을 ${roomId}에 초대했습니다. 초대받은 채팅방으로 이동할까요?`
    }
  },
  created () {
    this.$socketEvents.onInviteMessage(data => {
      this.showDialog = true
      console.error('invited', data)
      this.invitation = data
    })
  },
  methods: {
    ...userStore.mapMutations(['setLoginUser']),
    onClickLogout () {
      if (this.loggedUser) {
        this.$socketEvents.logout(this.loggedUser.userId, (data) => {
          if (data.isSuccess) {
            this.setLoginUser(null)
            this.$router.push('/')
          }
        })
      }
    },
    onClickAgreeToJoin () {
      this.joinRoom(this.invitation.room)
    },
    joinRoom ({ roomId }) {
      this.$router.push(`/chat-room/${roomId}`)
    }
  }
}
</script>

<style lang="stylus" scoped>
  .logout-button
    transform: rotate(180deg)
</style>
