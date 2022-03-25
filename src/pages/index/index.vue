<!--
 * @Author: your name
 * @Date: 2022-03-24 17:47:06
 * @LastEditTime: 2022-03-25 17:59:36
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \zyk-music-h5\src\pages\index.vue
-->
<template>
  <div>
    <var-app-bar>
      <template #left>
        <var-icon name="menu" color="#2b2b2b" size="30"/>
      </template>
      <template #>
        <kdy-search class="w-full" v-model="keyword"></kdy-search>
      </template>
    </var-app-bar>
  </div>
</template>
<script setup lang="ts">
import kdySearch from 'cmp/kdy-search/kdy-search.vue';
let keyword = ref("")
</script>

<style scoped lang="scss"></style>