<!--
 * @Author: your name
 * @Date: 2022-03-24 18:43:59
 * @LastEditTime: 2022-03-24 18:48:51
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \zyk-music-h5\src\layouts\kdy-page.vue
-->
<template>
  <div>
    <router-view/>
    <div class="tabbar">
      <kdyTabbar :list="tabBarList"></kdyTabbar>
    </div>
  </div>
</template>
<script setup lang="ts">
import kdyTabbar from 'cmp/kdy-tabbar/kdy-tabbar.vue';
import { tabBarList as tabbar,TabBar } from '@/enum-file/tabbar';
let tabBarList = ref(tabbar)
</script>

<style scoped lang="scss">
.tabbar{
  position: fixed;
  bottom: 0;
  z-index: 9999;
}
</style>