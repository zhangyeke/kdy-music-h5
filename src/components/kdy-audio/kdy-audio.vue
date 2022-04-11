<template>
  <div>
    <audio></audio>
  </div>
</template>
<script setup lang="ts">
  let prop = defineProps({
    src:{
      type:String,
      default:'http://m7.music.126.net/20220411182251/65f1cec2b2b61e12a562382526b05e60/ymusic/040f/035c/065e/3e1767e17b466f761879143786275be0.mp3'
    }
  })
</script>

<style scoped lang="scss"></style>