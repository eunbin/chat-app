<template>
  <div class="chat-room-page">
    <app-drawer>
      <slot>
        <user-list
          :datas="userList"
          @select-user="inviteUser">
        </user-list>
      </slot>
    </app-drawer>
    <app-toolbar>
      <v-btn
        icon
        @click="onClickToPrevious">
        <v-icon>arrow_back</v-icon>
      </v-btn>
      <v-btn
        slot="right"
        @click="onClickInviteUser"
        icon>
        <v-icon>more_vert</v-icon>
      </v-btn>
    </app-toolbar>
    <chat-window
      ref="chatWindow"
      class="chat-window"
      :message-datas="messageDatas"
      @send-message="sendMessage"
      @send-photo="sendPhoto">
    </chat-window>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import ChatWindow from '@/components/chat/ChatWindow'
import AppToolbar from '@/components/layout/AppToolbar'
import AppDrawer from '@/components/layout/AppDrawer'
import UserList from '@/components/chat/UserList'

export default {
  name: 'ChatRoom',
  components: {
    AppToolbar, UserList, AppDrawer, ChatWindow
  },
  props: {
  },
  computed: {
    ...mapGetters('user', ['loggedUser']),
    ...mapGetters('chat', ['getRoomListById']),
    chatRoomInfo () {
      return this.getRoomListById(this.$route.params.id)
    }
  },
  created () {
    this.$socketEvents.joinRoom(this.$route.params.id, (data) => this.pushMessageData(data))

    this.$socketEvents.onJoinRoom(data => this.pushMessageData(data))

    this.$socketEvents.onLeaveRoom(data => this.pushMessageData(data))

    this.$socketEvents.onChatMessage(data => this.pushMessageData(data))

    this.$socketEvents.onChatImage(data => this.pushMessageData(data))
  },
  data () {
    return {
      messageDatas: [],
      userList: [],
      drawer: false
    }
  },
  beforeDestroy () {
    this.leaveRoom()
  },
  methods: {
    ...mapMutations(['setDrawer']),
    leaveRoom () {
      this.$socketEvents.leaveRoom()
    },
    onClickToPrevious () {
      this.leaveRoom()
      this.$router.push('/chat-lobby')
    },
    sendPhoto (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const data = {
          type: 'image',
          userId: this.loggedUser.userId,
          fileBase64Str: e.target.result,
          fileName: file.name
        }
        this.pushMessageData(data)
        this.$socketEvents.sendImage(data)
      }
      reader.readAsDataURL(file)
    },
    sendMessage (message) {
      const data = {
        type: 'text',
        userId: this.loggedUser.userId,
        message
      }
      this.pushMessageData(data)
      this.$socketEvents.sendMessage(data)
      this.$refs.chatWindow.clearMessage()
    },
    pushMessageData (data) {
      this.messageDatas.push({
        ...data,
        createdTime: Date.now()
      })
    },
    inviteUser (userInfo) {
      this.$socketEvents.inviteUser(userInfo, this.chatRoomInfo.roomId)
      alert(`${userInfo.userId}님에게 초대장을 보냈습니다.`)
      this.setDrawer(false)
    },
    onClickInviteUser () {
      if (!this.chatRoomInfo || !this.chatRoomInfo.roomId) {
        return
      }
      this.$socketEvents.getInviteAvailableUsers(this.chatRoomInfo.roomId, (data) => {
        if (data.isSuccess) {
          this.userList = data.userList
        } else {
          this.userList = []
        }
        this.setDrawer(true)
      })
    }
  }
}
</script>
