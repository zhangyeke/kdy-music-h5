<!--
 * @Author: your name
 * @Date: 2022-03-24 18:43:59
 * @LastEditTime: 2022-05-23 10:31:07
 * @LastEditors: [you name]
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \zyk-music-h5\src\layouts\kdy-page.vue
-->
<template>
  <div class="kdy_page">
    <router-view #="{ Component, route }">
      <transition
        mode="out-in"
        enter-active-class="animate-animated animate-bounceInLeft"
        leave-active-class="animate-animated animate-bounceOutDown"
      >
        <KeepAlive :include="include_tab">
          <component :is="Component"></component>
        </KeepAlive>
      </transition>
    </router-view>
    <div class="page_foot">
      <kdyBottomPlay />
      <kdyTabbar :list="tabBarList" :show="show"></kdyTabbar>
    </div>
  </div>
</template>
<script setup lang="ts">
import kdyTabbar from 'cmp/kdy-tabbar/kdy-tabbar.vue';
import kdyBottomPlay from 'cmp/kdy-bottom-play/kdy-bottom-play.vue';
import { tabBarList as tabbar, TabBar } from '@/enum-file/tabbar';
let tabBarList = ref(tabbar)
let include_tab = tabBarList.value.map(item=>{
  return item.pagePath.split('/')[1]
})
let tool = useTool()
let show = ref(tool.getStorage('is_tab'))
let router = useRouter()
router.beforeEach((to,from)=>{
  show.value = tabBarList.value.findIndex((item:TabBar)=>to.path == item.pagePath) != -1
})
</script>

<style scoped lang="scss">
.kdy_page {
  padding-bottom: 100px;
}
.page_foot {
  position: fixed;
  bottom: 0;
  z-index: 2000;
  width: 100%;
}
</style>