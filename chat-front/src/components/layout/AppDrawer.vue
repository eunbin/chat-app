<template>
  <v-navigation-drawer
    v-model="drawer"
    app
    fixed
    right
    temporary>
    <slot></slot>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: 'AppDrawer',
  computed: {
    drawer: {
      get () {
        return this.$store.getters['getDrawer']
      },
      set (val) {
        this.$store.commit('setDrawer', val)
      }
    }
  },
  created () {
  }
}
</script>
