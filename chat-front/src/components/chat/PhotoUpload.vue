<template>
  <div class="photo-upload">
    <input
      ref="inputFile"
      type="file"
      accept=".jpg, .jpeg, .png"
      @change="onChangeFile">
    <v-icon
      icon
      @click="$refs.inputFile.click()">
      photo
    </v-icon>
  </div>
</template>

<script>
export default {
  name: 'PhotoUpload',
  methods: {
    onChangeFile (e) {
      this.$emit('change', e)
    }
  }
}
</script>

<style lang="stylus" scoped>
  .photo-upload > input
    display none
</style>
