<template>
  <v-container
    class="login-page"
    fluid
    fill-height>
    <v-layout
      justify-center
      align-center>
      <v-flex
        xs12
        md4>
      <v-img
        :src="require('@/assets/kakao_logo.png')"
        class="my-3"
        contain
        height="200"
      ></v-img>
      <v-alert
        class="mb-3"
        :value="!!errorMessage"
        type="error">
        {{ errorMessage }}
      </v-alert>
      <v-form>
        <v-text-field
          v-model="userId"
          autofocus
          solo
          label="아이디"
          @input="clearErrorMessage"
          @keypress.enter.prevent="onClickLogin">
        </v-text-field>
        <v-btn
          block
          color="secondary"
          :disabled="!userId"
          :loading="loading"
          @click="onClickLogin">
          입력한 아이디로 채팅하기
        </v-btn>
      </v-form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const userStore = createNamespacedHelpers('user')
const chatStore = createNamespacedHelpers('chat')

export default {
  name: 'Login',
  data () {
    return {
      loading: false,
      userId: null,
      errorMessage: null
    }
  },
  methods: {
    ...userStore.mapMutations(['setLoginUser']),
    ...chatStore.mapMutations(['setRoomList']),
    async onClickLogin () {
      this.loading = true

      setTimeout(() => {
        this.$socketEvents.login(this.userId, (data) => {
          if (data.isSuccess) {
            this.setLoginUser(data.userInfo)
            this.setRoomList(data.roomList)

            this.$router.replace('chat-lobby')
          } else {
            this.errorMessage = data.description
          }
          this.loading = false
        })
      }, 300)
    },
    clearErrorMessage () {
      this.errorMessage = null
    }
  }
}
</script>
