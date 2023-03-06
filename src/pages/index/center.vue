<!--
 * @Author: zyk 997610780@qq.com
 * @Date: 2022-06-27 16:49:17
 * @LastEditors: 可达鸭 997610780@qq.com
 * @LastEditTime: 2023-03-06 20:33:43
 * @FilePath: \zyk-music-h5\src\pages\index\center.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE{}
-->
<template>
  <div class="page" @touchend.capture="touchendHandle" :type="type">
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
        <img :src="user.avatarUrl" class="w-60px h-60px rounded-1/2 relative z-2">
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
      <div class="flex flex-wrap bg-white mt-20px rounded-5px pt-10px mx-20px">
        <div v-for="(item, index) in myTools" :key="index" v-ripple
          class="flex flex-col justify-center items-center w-3/10 mb-10px">
          <var-icon color="var(--color-primary)" :name="item.iconName" namespace="kdy-icon"
            :size="tool.px2vw(24)"></var-icon>
          <span class="text-12px text-[var(--text-color)] mt-5px">{{ item.name }}</span>
        </div>
      </div>
      <!-- 喜欢的音乐 -->
      <div class="bg-white tab_item mt-20px p-10px rounded-5px mx-20px" @click="toPlaylistDetail(item.id)" v-ripple v-for="(item, index) in userStore.loveSongs"
        :key="index">
        <img :src="item.coverImgUrl" class="tab_item_left">
        <div class="tab_item_right">
          <div class="tab_item_name">我喜欢的音乐</div>
          <div class="tab_item_total">{{ item.trackCount }}首</div>
        </div>
      </div>

      <!-- tab -->
      <div ref="tabEl" :class="{ tab: scroll_top >= tab_top }">
        <var-tabs v-model:active="tab_cur" color="transparent" @change="tabChange">
          <var-tab v-for="(item, index) in tab_list" :key="index">{{ item.name }}</var-tab>
        </var-tabs>
      </div>

      <!-- 创建歌单 -->
      <div class="bg-white mt-10px px-10px rounded-5px pb-10px mx-20px" ref="createSongsEl">
        <div class="tab_hd">
          <span class="tab_hd_left">创建歌单({{ userStore.createSongs.length }}个)</span>
          <div class="tab_hd_right">
            <var-icon name="plus" color="#999" class="mr-10px" :size="tool.addUnit(14)" v-ripple />
            <var-icon name="dots-vertical" color="#999" :size="tool.addUnit(14)" v-ripple />
          </div>
        </div>
        <div>
          <div class="tab_item" v-ripple v-for="(item, index) in userStore.createSongs" :key="index" @click="toPlaylistDetail(item.id)">
            <img :src="item.coverImgUrl" class="tab_item_left">
            <div class="tab_item_right">
              <div class="tab_item_name">{{ item.name }}</div>
              <div class="tab_item_total">{{ item.trackCount }}首</div>
            </div>
            <div class="tab_item_action">
              <var-icon name="dots-vertical" color="#999" :size="tool.addUnit(14)" />
            </div>
          </div>
        </div>
      </div>

      <!-- 收藏歌单 -->
      <div class="bg-white mt-10px px-10px rounded-5px pb-10px mx-20px" ref="collectSongsEl" >
        <div class="tab_hd">
          <span class="tab_hd_left">收藏歌单({{ userStore.collectSongs.length }}个)</span>
          <div class="tab_hd_right">
            <var-icon name="plus" color="#999" class="mr-10px" :size="tool.addUnit(14)" v-ripple />
            <var-icon name="dots-vertical" color="#999" :size="tool.addUnit(14)" v-ripple />
          </div>
        </div>
        <div>
          <div class="tab_item" v-ripple v-for="(item, index) in userStore.collectSongs" :key="index" @click="toPlaylistDetail(item.id)">
            <img :src="item.coverImgUrl" class="tab_item_left">
            <div class="tab_item_right">
              <div class="tab_item_name">{{ item.name }}</div>
              <div class="tab_item_total">{{ item.trackCount }}首,by {{ item.creator?.nickname }}</div>
            </div>
            <div class="tab_item_action">
              <var-icon name="dots-vertical" color="#999" :size="tool.addUnit(14)" />
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>
<script setup lang="ts" name="center">
import mitt from "@/assets/lib/bus";
import { myTools } from "@/enum-file/public";
import { userDetail } from "@/api/my/index";
import useUserStore from "@/store/user";
import { User } from "@/types/user";
let tab_cur = ref(0)
let tab_list = reactive([{ name: "创建歌单", top: 0 }, { name: "收藏歌单", top: 0 }])
const tool = useTool()
const router = useRouter()
const userStore = useUserStore()
let user_level = ref(0)
let user = ref<User | null>(null)

let userNameEl = ref<HTMLElement | null>(null)
let tabEl = ref<HTMLElement | null>(null)
let collectSongsEl = ref<HTMLElement | null>(null)
let createSongsEl = ref<HTMLElement | null>(null)
let tab_top = ref(0)

// 滚动页面 启动navbbar粘性布局的top值
let show_navbar_top = ref(0)
let scroll_top = ref(0)
//  滚动页面启动navbar粘性布局的进度
const progress = computed(() => {
  return parseFloat((scroll_top.value / show_navbar_top.value).toFixed(2))
})

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

// 获取元素布局信息
const getElLayoutInfo = () => {
  nextTick(() => {
    show_navbar_top.value = Math.floor(userNameEl.value!.getBoundingClientRect().bottom)
    tab_top.value = Math.ceil(tabEl.value!.getBoundingClientRect().top)
    tab_list[0].top = Math.ceil(createSongsEl.value!.getBoundingClientRect().top - 90)
    tab_list[1].top = Math.ceil(collectSongsEl.value!.getBoundingClientRect().top - 90)
    // console.log(show_navbar_top.value, "lllll", tab_top.value, tab_list);
  })
}
// tab切换
const tabChange = (i: number | string) => {
  setScrollTop(tab_list[i as number].top)
}

window.addEventListener('scroll', (e) => {
  scroll_top.value = window.scrollY
})

// 跳转歌单详情
const toPlaylistDetail = (id:number)=>{
  router.push({name:"playlistDetail",params:{id}})
}

// 触屏结束
const touchendHandle = (e: Event) => {
  let is_tab = (e.target as HTMLElement).classList.contains('var-tab')
  if (!is_tab && window.scrollY < show_navbar_top.value) {
    setTimeout(() => {
      setScrollTop(0)
    }, 50)
  }
}

// 设置滚动top值
const setScrollTop = (top: number) => {
    window.scrollTo({
      top,
      behavior: "smooth"
    })
}

getUserDetail()
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

    &_right {}
  }

  .tab_item {
    @apply flex items-center relative;
    margin-bottom: 10px;

    &_left {
      width: 50px;
      height: 50px;
      border-radius: 5px;
    }

    &_right {
      width: 100%;
      margin-left: 10px;
    }

    &_name {
      @apply truncate w-[calc(100%-90px)];
      color: var(--text-color);
      font-size: 14px;
    }

    &_total {
      @apply truncate w-[calc(100%-90px)];
      color: #666;
      font-size: 10px;
      margin-top: 5px;
    }

    &_action {
      position: absolute;
      right: 10px;
      top: 50%;
      transform: translateY(-50%);
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