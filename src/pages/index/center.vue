<!--
 * @Author: zyk 997610780@qq.com
 * @Date: 2022-06-27 16:49:17
 * @LastEditors: zyk 997610780@qq.com
 * @LastEditTime: 2023-04-14 15:58:09
 * @FilePath: \zyk-music-h5\src\pages\index\center.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE{}
-->
<template>
  <div class="page" >
    <div class="page_hd" :style="{ backgroundColor: `rgba(255,255,255,${progress})` }">

      <div @click="mitt.emit('openSidebar')">
        <var-icon name="menu" :size="tool.px2vw(30)" color="var(--text-color)" />
      </div>
      <KdyTransition enter-class="animate-fadeInDown">
        <div v-if="user" v-show="progress >= 1" class="flex items-center">
          <img :src="user.avatarUrl" class="w-25px h-25px rounded-1/2">
          <span class="ml-10px text-[var(--text-color)] text-12px font-700">{{ user.nickname }} </span>
        </div>
      </KdyTransition>
      <div @click="router.push('/search')">
        <var-icon name="magnify" color="var(--text-color)" :size="tool.addUnit(26)" />
      </div>
    </div>

    <div class="page_by  mt-20px">
      <!-- 用户信息 -->
      <div v-if="user" class="user flex flex-col items-center px-20px" :style="{ opacity: 1 - progress }">
        <img :src="user.avatarUrl" class="w-60px h-60px rounded-1/2 relative z-2" @click="router.push({name:'userDetail',params:{id:user!.userId}})" />
        <div class="user_info bg-white min-h-90px w-full -mt-30px rounded-5px flex flex-col items-center justify-center">
          <div class="pt-20px text-[var(--text-color)] text-16px font-700" ref="userNameEl">{{ user.nickname }}</div>
          <div class="flex mt-15px text-[#666] text-12px">
            <div class="data_num mr-15px">
              <span>{{ user.follows }}</span>
              <span>关注</span>
            </div>
            <div class="data_num mr-15px">
              <span>{{ user.followeds }}</span>
              <span>粉丝</span>
            </div>
            <div class="data_num">
              <span>Lv.{{ user_level }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 工具栏 -->
      <div class="flex flex-wrap bg-white m-20px rounded-5px ">
        <div v-for="(item, index) in myTools" :key="index" v-ripple 
          class="flex flex-col justify-center items-center w-3/10 mb-10px h-55px"  @click.stop="toolClick(index)">
          <var-icon color="var(--color-primary)" :name="item.iconName" namespace="kdy-icon"
            :size="tool.px2vw(24)"></var-icon>
          <span class="text-12px text-[var(--text-color)] mt-5px">{{ item.name }}</span>
        </div>
      </div>
      <!-- 喜欢的音乐 -->
      <div class="bg-white kdy_tab_item  p-10px rounded-5px mx-20px" @click="toPlaylistDetail(item.id)" v-ripple
        v-for="(item, index) in userStore.loveSongs" :key="index">
        <img :src="item.coverImgUrl" class="kdy_tab_item_left">
        <div class="kdy_tab_item_right">
          <div class="kdy_tab_item_name">我喜欢的音乐</div>
          <div class="kdy_tab_item_total">{{ item.trackCount }}首</div>
        </div>
      </div>

      <!-- tab -->
      <div ref="tabEl" :class="{ tab: scroll_top >= tab_top }">
        <var-tabs v-model:active="tab_cur" color="transparent">
          <var-tab v-for="(item, index) in tab_list" :key="index" @click="tabClick" @touchend.stop>{{ item.name
          }}</var-tab>
        </var-tabs>
      </div>

      <!-- 创建歌单 -->
      <div class="bg-white mt-10px px-10px rounded-5px pb-10px mx-20px" id="createSongs">
        <div class="tab_hd">
          <span class="tab_hd_left">创建的歌单({{ userStore.createSongs.length }}个)</span>
          <div class="tab_hd_right">
              <var-icon name="plus" color="#999" class="mr-10px" :size="tool.addUnit(14)" v-ripple @click="() => show_created_songs = true"/>
              <var-icon name="dots-vertical" color="#999" :size="tool.addUnit(14)" v-ripple @click="openMgtAction('createSongs')"/>
          </div>
        </div>
        <div v-if="userStore.createSongs.length">
          <div class="kdy_tab_item" v-ripple v-for="(item, index) in userStore.createSongs" :key="index"
            @click="toPlaylistDetail(item.id)">
            <div class="kdy_tab_item_left">
              <div class="kdy_tab_item_left_icon" v-if="item.privacy == 10">
                <var-icon name="password" namespace="kdy-icon" color="#666" :size="tool.addUnit(10)" v-ripple />
              </div>
              <img :src="item.coverImgUrl" class="kdy_tab_item_left_img" />
            </div>
            <div class="kdy_tab_item_right">
              <div class="kdy_tab_item_name">{{ item.name }}</div>
              <div class="kdy_tab_item_total">{{ item.trackCount }}首</div>
            </div>
            <div class="kdy_tab_item_action" @click.stop="chooseAction(item, 'createSongs')">
              <var-icon name="dots-vertical" color="#999" :size="tool.addUnit(14)" />
            </div>
          </div>
        </div>
        <div v-else class="text-center text-14px text-[#878787] pb-10px">暂无创建的歌单</div>
      </div>

      <!-- 收藏歌单 -->
      <div class="bg-white mt-10px px-10px rounded-5px pb-10px mx-20px" id="collectSongs">
        <div class="tab_hd">
            <span class="tab_hd_left">收藏的歌单({{ userStore.collectSongs.length }}个)</span>
          <div class="tab_hd_right">
            <var-icon name="plus" color="#999" class="mr-10px" :size="tool.addUnit(14)" v-ripple @click="() => show_created_songs = true"/>
            <var-icon name="dots-vertical" color="#999" :size="tool.addUnit(14)" v-ripple @click="openMgtAction('collectSongs')"/>
          </div>
        </div>
        <div v-if="userStore.collectSongs.length">
          <div class="kdy_tab_item" v-ripple v-for="(item, index) in userStore.collectSongs" :key="index"
            @click="toPlaylistDetail(item.id)">
            <img :src="item.coverImgUrl" class="kdy_tab_item_left">
            <div class="kdy_tab_item_right">
              <div class="kdy_tab_item_name">{{ item.name }}</div>
              <div class="kdy_tab_item_total">{{ item.trackCount }}首,by {{ item.creator?.nickname }}</div>
            </div>
            <div class="kdy_tab_item_action" @click.stop="chooseAction(item, 'collectSongs')">
              <var-icon name="dots-vertical" color="#999" :size="tool.addUnit(14)" />
            </div>
          </div>
        </div>
        <div v-else class="text-center text-14px text-[#878787] pb-10px">暂无收藏的歌单</div>
      </div>
    </div>
    <!-- 操作歌单 -->
    <KdyActionSheet :actions="songs_actions" v-model:show="show_songs_action" :title="`歌单：${action_songs?.name}`"
      @select="actionSelectHandle"></KdyActionSheet>
    <!-- 歌单管理 -->
    <KdyActionSheet :actions="mgt_songs_actions" v-model:show="show_mgt_action" :title="mgt_title"
      @select="mgtSelectHandle"></KdyActionSheet>
    <!-- 新建歌单弹窗 -->
    <newPlaylistPopup v-model:show="show_created_songs"  @finish="getUserDetail()"></newPlaylistPopup>
  </div>
</template>
<script setup lang="ts" name="center">
import mitt from "@/assets/lib/bus";
import { myTools } from "@/enum-file/public";
import { userDetail } from "@/api/my/index";
import useUserStore from "@/store/user";
import { User } from "@/types/user";
import { SongsList } from "@/types/songList";
import {ActionItem} from "@/types/public";

let tab_cur = ref(0)
let tab_list = reactive([{ name: "创建歌单", id: 'createSongs' }, { name: "收藏歌单", id: 'collectSongs' }])
const tool = useTool()
const router = useRouter()
const userStore = useUserStore()
let user_level = ref(0)
let user = ref<User | null>(null)
let userNameEl = ref<HTMLElement | null>(null)
let tabEl = ref<HTMLElement | null>(null)
let tab_top = ref(0)
// 新建歌单弹窗
let show_created_songs = ref(false)
// 歌单操作菜单开关
let show_songs_action = ref(false)
// 歌单操作菜单选项
let songs_actions = reactive<ActionItem[]>([
  { name: "下载", icon: "xiazai", namespace: "kdy-icon" },
  { name: "分享", icon: "fenxiang", namespace: "kdy-icon" },
  { name: "编辑歌单信息", icon: "bianji", namespace: "kdy-icon" },
  { name: "删除", icon: "trash-can-outline" },
])

let action_songs = ref<SongsList | null>(null)

// 歌单管理菜单选项
let mgt_actions = reactive<ActionItem[]>([
  { name: "创建新歌单", icon: "xinjian", namespace: "kdy-icon" ,per:['createSongs']},
  { name: "歌单管理", icon: "wenjianguanli", namespace: "kdy-icon",per:['collectSongs','createSongs'] },
])

let mgt_songs = ref("")
let mgt_songs_actions = computed(():ActionItem[]=>{
  let list:ActionItem[] = []
  if(mgt_songs.value){
    list = mgt_actions.filter(item => item.per?.includes(mgt_songs.value))
  }
  return list
})
// 歌单管理菜单开关
let show_mgt_action = ref(false)
let mgt_title = computed(():string=>{
  let str = ""
  if(mgt_songs.value == 'createSongs'){
    str = "创建歌单"
  }else{
    str = "收藏歌单"
  }
  if(mgt_songs.value) str += `(${userStore.playlist[mgt_songs.value].length}个)`
  return  str
})
// 滚动页面 启动navbbar粘性布局的top值
let show_navbar_top = ref(0)
let scroll_top = ref(0)
//  滚动页面启动navbar粘性布局的进度
const progress = computed(() => {
  return parseFloat((scroll_top.value / show_navbar_top.value).toFixed(2))
})
// 选择歌单进行操作
const chooseAction = (songs: SongsList, listKey: string) => {
  action_songs.value = { ...songs, listKey }
  show_songs_action.value = true
}

// 打开歌单管理
const openMgtAction = (key: string) => {
  mgt_songs.value = key
  show_mgt_action.value = true
}
// 工具栏点击
const toolClick = (i:number)=>{
  myTools[i].path && router.push(myTools[i].path)
}


// 选择操作项
const actionSelectHandle = (i: number) => {
  switch (i) {
    case 0:
      if(action_songs.value!.trackCount){
        router.push({ name: 'batchHandleSong', params: { id: action_songs.value!.id, uid: action_songs.value?.creator?.userId } })
      }else{
        tool.toast({content:"没有歌曲可以下载"})
      }
      break;
    case 1:
      let shareOption = {
        desc: action_songs.value?.description || "",
        title: action_songs.value!.name,
        link: `${location.origin}/playlistDetail/${action_songs.value!.id}`,
      }
      tool.share(shareOption)
      break;
    case 2:
      router.push({ name: 'editPlaylist', params: { id: action_songs.value!.id } })
      break;
    case 3:
      userStore.deletePlaylist(action_songs.value!.id, action_songs.value!.listKey)
      break;
  }
}

// 歌单管理选择操作项
const mgtSelectHandle = (i:number)=>{
  let action:ActionItem = mgt_songs_actions.value[i]
  if(action.name == '创建新歌单'){
    show_mgt_action.value = false
    show_created_songs.value = true
    return
  }
  if(action.name == '歌单管理'){
    router.push({ name: 'batchHandlePlaylist', params: { key:mgt_songs.value }})
    return
  }
}


// 获取用户详情信息
const getUserDetail = async () => {
  let res: any = await userDetail(userStore.userId)
  console.log(res, "用户信息");
  user.value = res.profile
  user_level.value = res.level
  userStore.initPlaylist()
  userStore.getUserPlaylist()
  getElLayoutInfo()
}

onActivated(() => {
  if (userStore.token) {
    getUserDetail()
  } else {
    router.replace("/login")
  }
})

// 获取元素布局信息
const getElLayoutInfo = () => {
  nextTick(() => {
    show_navbar_top.value = Math.floor(userNameEl.value!.getBoundingClientRect().bottom)
    tab_top.value = Math.ceil(tabEl.value!.getBoundingClientRect().top)
    // console.log(show_navbar_top.value, "lllll", tab_top.value, tab_list);
  })
}
// tab点击
const tabClick = (i: number | string, e: Event) => {
  let tab_id = tab_list[i as number].id
  let tabEl = document.getElementById(tab_id)
  setScrollTop(tabEl!.offsetTop)
  e.stopPropagation()
}

window.addEventListener('scroll', (e) => {
  scroll_top.value = window.scrollY
})

// 跳转歌单详情
const toPlaylistDetail = (id: number) => {
  router.push({ name: "playlistDetail", params: { id } })
}

// 设置滚动top值
const setScrollTop = (top: number) => {
  window.scrollTo({
    top,
    behavior: "smooth"
  })
}


</script>

<style scoped lang="scss">
.page {
  min-height: 100vh;
  background-color: #eee;

  &_hd {
    @apply flex items-center justify-between top-0 left-0 z-99 sticky;
    height: 50px;
    padding: 0 10px;
  }

  .tab {
    @apply bg-white left-0 z-99 sticky;
    top: 50px;
  }

  .user_info {
    box-shadow: 0 0 10px #ccc;
  }

  .tab_hd {
    @apply flex justify-between items-center;
    padding: 10px 0;

    &_left {
      color: #999;
      font-size: 12px;
    }
  }

  .data_num {
    position: relative;

    &::after {
      content: "";
      position: absolute;
      right: -8px;
      top: 1px;
      width: 1px;
      height: 10px;
      background-color: rgba(#666, .1);
    }

    &:last-child {
      &::after {
        display: none;
      }
    }
  }
}
</style>