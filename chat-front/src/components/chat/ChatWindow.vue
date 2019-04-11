<template>
  <v-card
    class="chat-window"
    flat>
    <v-card-text
      v-chat-scroll="{always: false, smooth: true}"
      class="chat-window__content">
      <template
        v-for="(item, index) in messageDatas">
        <chat-messaging
          :key="index"
          :item="item">
        </chat-messaging>
      </template>
    </v-card-text>
    <v-card-actions
      class="chat-window__bottom elevation-5 pa-0">
      <photo-upload
        class="ml-2"
        @change="sendPhoto"></photo-upload>
      <v-text-field
        v-model="message"
        append-icon="send"
        full-width
        autofocus
        flat
        clearable
        solo
        single-line
        hide-details
        label="메시지를 입력하세요"
        @keypress.enter.prevent="onEnterMessage">
      </v-text-field>
    </v-card-actions>
  </v-card>
</template>

<script>
import PhotoUpload from '@/components/chat/PhotoUpload'
import ChatMessaging from './ChatMessaging'

export default {
  name: 'ChatWindow',
  components: {
    ChatMessaging,
    PhotoUpload
  },
  props: {
    messageDatas: {
      type: Array,
      default: () => []
    }
  },
  mounted () {
  },
  data () {
    return {
      message: null,
      dialog: false
    }
  },
  methods: {
    onEnterMessage () {
      if (!this.message) {
        return
      }
      this.$emit('send-message', this.message)
    },
    clearMessage () {
      this.message = ''
    },
    sendPhoto (e) {
      const files = e.target.files || e.dataTransfer.files
      if (files.length > 0) {
        const { length } = files
        for (let i = 0; i < length; i++) {
          this.$emit('send-photo', files[i])
        }
      }
    },
    onClickInvite () {
    }
  }
}
</script>
