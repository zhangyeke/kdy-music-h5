<!--
 * @Author: your name
 * @Date: 2022-03-24 18:43:59
 * @LastEditTime: 2023-01-17 17:20:49
 * @LastEditors: zyk 997610780@qq.com
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \zyk-music-h5\src\layouts\kdy-page.vue
-->
<template>
  <div class="kdy_page" :class="{'pb-100px':show && showPlayer,'pb-60px':show && !showPlayer,'pb-40px':showPlayer && !show}">
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
      <kdyBottomPlay v-show="showPlayer" @openPopup="openPlayList"/>
      <kdyTabbar :list="tabBarList" :show="show"></kdyTabbar>
    </div>

    <playListPopup v-model:show="showPlayList"></playListPopup>
  </div>
</template>
<script setup lang="ts">
import kdyTabbar from 'cmp/kdy-tabbar/kdy-tabbar.vue';
import kdyBottomPlay from 'cmp/kdy-bottom-play/kdy-bottom-play.vue';
import playListPopup from "./components/play-list-popup.vue";
import { tabBarList as tabbar, TabBar } from '@/enum-file/tabbar';
import mitt from "@/assets/lib/bus";
let tabBarList = ref(tabbar)
let include_tab = tabBarList.value.map(item=>{
  return item.pagePath.split('/')[1]
})
let tool = useTool()
// 底部tab开关
let show = ref(tool.getStorage('is_tab'))
// 播放列表弹层开关
let showPlayList = ref(false)
let router = useRouter()
let route = useRoute()
let showPlayer = ref(route.meta.showPlayer)

onMounted(()=>{
  mitt.on('openPlayList',()=>{
    openPlayList()
  })
})

router.beforeEach((to,from)=>{
  showPlayer.value = to.meta.showPlayer
  console.log(showPlayer,"播放器");
  show.value = tabBarList.value.findIndex((item:TabBar)=>to.path == item.pagePath) != -1
})

const openPlayList = ()=>{
  showPlayList.value = true
}


</script>

<style scoped lang="scss">

.page_foot {
  position: fixed;
  bottom: 0;
  z-index: 2000;
  width: 100%;
}
</style>