<!--
 * @Author: your name
 * @Date: 2022-03-19 19:58:54
 * @LastEditTime: 2022-05-23 16:40:18
 * @LastEditors: [you name]
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \zyk-music-h5\src\App.vue
-->


<template>
  <router-view />
</template>

<script setup lang="ts">
document.title = import.meta.env.VITE_APP_TITLE
</script>
<style lang="scss">
body {
  background-color: $kdy-bg-color;
}
</style>