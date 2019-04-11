<template>
  <v-toolbar
    color="primary"
    dark
    flat
    scroll-off-screen
    scroll-target="#scrolling-techniques"
  >
    <slot></slot>

    <v-toolbar-title>{{ title }}</v-toolbar-title>

    <v-spacer></v-spacer>

    <slot name="right"></slot>
  </v-toolbar>
</template>

<script>
export default {
  name: 'AppToolbar',
  props: {
    title: {
      type: String,
      default: '채팅'
    }
  }
}
</script>
