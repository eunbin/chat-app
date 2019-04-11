<template>
  <div>
    <v-list>
      <v-list-tile>
        <v-list-tile-title class="title">
          {{ title }}
        </v-list-tile-title>
      </v-list-tile>
    </v-list>

    <v-divider></v-divider>

    <v-list dense class="pt-0">
      <v-list-tile
        v-for="(item, index) in datas"
        :key="index"
        @click="$emit('select-user', item)"
      >
        <v-list-tile-content>
          <v-list-tile-title>{{ item.userId }}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </div>
</template>

<script>
export default {
  name: 'UserList',
  props: {
    title: {
      type: String,
      default: '초대 가능한 사용자 목록'
    },
    datas: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
    }
  }
}
</script>
