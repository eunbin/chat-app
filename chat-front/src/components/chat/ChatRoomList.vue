<template>
  <v-card>
    <v-list
      two-line>
      <template v-for="(item, index) in list">
        <v-list-tile
          :key="item.index"
          @click="onSelectChatRoom(item)"
        >
          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
            <v-list-tile-sub-title class="text-xs-right">
            </v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-divider
          v-if="index < list.length - 1"
          :key="index">
        </v-divider>
      </template>
    </v-list>
  </v-card>
</template>

<script>
export default {
  name: 'ChatRoomList',
  data () {
    return {
    }
  },
  props: {
    list: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    onSelectChatRoom (item) {
      this.$emit('select-room', item)
    }
  }
}
</script>
