<template>
  <v-layout
    row
    :class="[isMyMessage ? 'reverse' : '']"
    class="my-2">
    <v-layout
      column
      class="messaging__body mx-2">
      <div
        v-if="!isMyMessage"
        class="pl-1 body-1 text-xs-left">{{ item.userId }}</div>
      <div
        v-if="item.type === 'image'"
        class="messaging__image">
        <img
        :src="item.fileBase64Str"
        :alt="item.fileName">
      </div>
      <span
        v-else
        :class="[isMyMessage ? 'primary white--text' : 'secondary lighten-1 white--text']"
        class="pa-2">
        {{ item.message }}
      </span>
      <div
        :class="[isMyMessage ? 'text-xs-right' : 'text-xs-left']"
        class="pa-2 caption text--secondary">{{ new Date(item.createdTime).toLocaleString() }}</div>
    </v-layout>
    <v-spacer></v-spacer>
  </v-layout>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'ChatMessaging',
  props: {
    item: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    ...mapGetters('user', ['loggedUser']),
    isMyMessage () {
      return this.item && this.item.userId === this.loggedUser.userId
    }
  }
}
</script>

<style lang="stylus" scoped>
  .messaging__image > img
    max-width: 100px
    max-height: 100px
</style>
