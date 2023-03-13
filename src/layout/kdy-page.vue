<!--
 * @Author: your name
 * @Date: 2022-03-24 18:43:59
 * @LastEditTime: 2023-03-13 18:18:56
 * @LastEditors: zyk 997610780@qq.com
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \zyk-music-h5\src\layouts\kdy-page.vue
-->
<template>
  <div class="kdy_page"
    :class="{ 'pb-100px': show && showPlayer, 'pb-60px': show && !showPlayer, 'pb-40px': showPlayer && !show }">
    <router-view #="{ Component, route }">
      <transition mode="out-in" enter-active-class="animate-animated animate-bounceInLeft"
        leave-active-class="animate-animated animate-bounceOutDown">
        <KeepAlive :include="includes">
          <component :is="Component"></component>
        </KeepAlive>
      </transition>
    </router-view>
    <div class="page_foot">
      <kdyBottomPlay v-show="showPlayer" @openPopup="openPlayList" />
      <kdyTabbar :list="tabBarList" :show="show"></kdyTabbar>
    </div>

    <playListPopup v-model:show="showPlayList"></playListPopup>
    <musicDetailPopup v-model:show="show_single_detail" :music-id="single_id"></musicDetailPopup>
    <!-- 分享弹窗 -->
    <sharePopup v-model:show="show_share" :shareOption="shareOption"></sharePopup>
    <!-- 侧边栏 -->
    <kdySidebar v-model:show="showSide"></kdySidebar>
  </div>
</template>
<script setup lang="ts">
import kdySidebar from 'cmp/kdy-sidebar/kdy-sidebar.vue';
import kdyTabbar from 'cmp/kdy-tabbar/kdy-tabbar.vue';
import kdyBottomPlay from 'cmp/kdy-bottom-play/kdy-bottom-play.vue';
import playListPopup from "./components/play-list-popup.vue";
import { tabBarList as tabbar, TabBar } from '@/enum-file/tabbar';
import { RouteRecordRaw } from "vue-router"
import mitt from "@/assets/lib/bus";
let tabBarList = ref(tabbar)

let tool = useTool()
// 底部tab开关
let show = ref(tool.getStorage('is_tab'))
// 播放列表弹层开关
let showPlayList = ref(false)
let router = useRouter()
let route = useRoute()
let showPlayer = ref(route.meta.showPlayer)

let list: string[] = []

// 音乐详情弹窗
let show_single_detail = ref(false)
let single_id = ref(0)

// 侧边栏开关
let showSide = ref(false)

// 分享弹窗
let show_share = ref(false)
// 分享配置
let shareOption = reactive({
  title: "",
  link: "",
  desc: "",
})

const getKeepAliveRouteNames = (routes: readonly RouteRecordRaw[]): string[] => {
  routes.forEach(item => {
    if (tool.hasOwn(item, 'meta') && item.meta?.KeepAlive) {
      list.push(item.name as string)
    }
    if (item.children?.length) {
      getKeepAliveRouteNames(item.children)
    }
  })

  return list
}

// 组件缓存
let includes = ref<string[]>(getKeepAliveRouteNames(router.options.routes))

onMounted(() => {
  mitt.on('openPlayList', () => {
    openPlayList()
  })
  onOpenSongDetail()
  onOpenSharePopup()
  onOpenSidebar()
})

router.beforeEach((to, from) => {
  showPlayer.value = to.meta.showPlayer
  // console.log(showPlayer, "播放器");
  show.value = tabBarList.value.findIndex((item: TabBar) => to.path == item.pagePath) != -1
})

const openPlayList = () => {
  showPlayList.value = true
}
// 监听侧边栏弹窗
const onOpenSidebar = ()=>{
  mitt.on('openSidebar',()=>{
    showSide.value = true
  })
}

// 监听单曲详情弹窗
const onOpenSongDetail = () => {
  mitt.on('oepnSongDetail', (id) => {
    show_single_detail.value = true
    single_id.value = id as number
  })
}

// 监听分享弹窗
const onOpenSharePopup = () => {
  mitt.on('openSharePopup', (params: any) => {
    show_share.value = true
    shareOption = params
  })
}

</script>

<style scoped lang="scss">
.kdy_page {
  // overflow: hidden auto;
}

.page_foot {
  position: fixed;
  bottom: 0;
  z-index: 2000;
  width: 100%;
}
</style>