<!--
 * @Author: zyk 997610780@qq.com
 * @Date: 2022-06-27 16:49:17
 * @LastEditors: 可达鸭 997610780@qq.com
 * @LastEditTime: 2023-03-01 23:33:49
 * @FilePath: \zyk-music-h5\src\pages\index\center.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE{}
-->
<template>
  <div class="page">
    <div class="page_hd" ref="pageHander">
      <div class="flex items-center justify-between px-15px pt-10px">
        <div @click="mitt.emit('openSidebar')">
          <var-icon name="menu" :size="tool.px2vw(30)" color="var(--text-color)" />
        </div>
        <div @click="router.push('/search')">
          <var-icon name="magnify" color="var(--text-color)" :size="tool.addUnit(26)" />
        </div>
      </div>
    </div>

    <div class="page_by px-20px mt-20px">
      <!-- 用户信息 -->
      <div v-if="user" class="user flex flex-col items-center " >
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
      <div class="flex flex-wrap bg-white mt-20px rounded-5px pt-10px">
        <div v-for="(item, index) in myTools" :key="index" v-ripple
          class="flex flex-col justify-center items-center w-3/10 mb-10px">
          <var-icon color="var(--color-primary)" :name="item.iconName" namespace="kdy-icon"
            :size="tool.px2vw(24)"></var-icon>
          <span class="text-12px text-[var(--text-color)] mt-5px">{{ item.name }}</span>
        </div>
      </div>
      <!-- 喜欢的音乐 -->
      <div class="bg-white tab_item mt-20px p-10px rounded-5px" v-ripple v-for="(item, index) in love_songs" :key="index">
        <img :src="item.coverImgUrl" class="tab_item_left">
        <div class="tab_item_right">
          <div class="tab_item_name">我喜欢的音乐</div>
          <div class="tab_item_total">{{item.trackCount}}首</div>
        </div>
      </div>

      <!-- 我的歌单 -->
      <div>
        <var-tabs v-model:active="tab_cur" color="transparent">
          <var-tab v-for="(item, index) in tab_list" :key="index">{{ item.name }}</var-tab>
        </var-tabs>

        <!-- 创建歌单 -->
        <div class="bg-white mt-10px px-10px rounded-5px pb-10px">
          <div class="tab_hd">
            <span class="tab_hd_left">创建歌单({{create_songs.length}}个)</span>
            <div class="tab_hd_right">
              <var-icon name="plus" color="#999" class="mr-10px" :size="tool.addUnit(14)" v-ripple />
              <var-icon name="dots-vertical" color="#999" :size="tool.addUnit(14)" v-ripple />
            </div>
          </div>
          <div>
            <div class="tab_item" v-ripple v-for="(item, index) in create_songs" :key="index">
              <img :src="item.coverImgUrl" class="tab_item_left">
              <div class="tab_item_right">
                <div class="tab_item_name">{{ item.name }}</div>
                <div class="tab_item_total">{{item.trackCount}}首</div>
              </div>
              <div class="tab_item_action">
                <var-icon name="dots-vertical" color="#999" :size="tool.addUnit(14)"  />
              </div>
            </div>
          </div>
        </div>

        <!-- 收藏歌单 -->
        <div class="bg-white mt-10px px-10px rounded-5px pb-10px">
          <div class="tab_hd">
            <span class="tab_hd_left">收藏歌单({{collect_songs.length}}个)</span>
            <div class="tab_hd_right">
              <var-icon name="plus" color="#999" class="mr-10px" :size="tool.addUnit(14)" v-ripple />
              <var-icon name="dots-vertical" color="#999" :size="tool.addUnit(14)" v-ripple />
            </div>
          </div>
          <div>
            <div class="tab_item" v-ripple v-for="(item, index) in collect_songs" :key="index">
              <img :src="item.coverImgUrl" class="tab_item_left">
              <div class="tab_item_right">
                <div class="tab_item_name">{{ item.name }}</div>
                <div class="tab_item_total">{{item.trackCount}}首,by {{ item.creator?.nickname }}</div>
              </div>
              <div class="tab_item_action">
                <var-icon name="dots-vertical" color="#999" :size="tool.addUnit(14)"  />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import mitt from "@/assets/lib/bus";
import { myTools } from "@/enum-file/public";
import { userDetail,getUserPlaylist } from "@/api/my/index";
import useUserStore from "@/store/user";
import { User } from "@/types/user";
import { SongsList } from "@/types/songList";
let tab_cur = ref(0)
let tab_list = reactive([{ name: "创建歌单" }, { name: "收藏歌单" }, { name: "歌单助手" }])
const tool = useTool()
const router = useRouter()
const userStore = useUserStore()
let user_level = ref(0)
let user = ref<User | null>(null)

let userNameEl = ref<HTMLElement | null>(null)

let show_navbar_top = ref(0)

// 喜欢的歌单
let love_songs = reactive<SongsList[]>([])
// 收藏的歌单
let collect_songs = reactive<SongsList[]>([])
// 创建的歌单
let create_songs = reactive<SongsList[]>([])

// 获取用户详情信息
const getUserDetail = async () => {
  let res: any = await userDetail(userStore.userId)
  console.log(res, "用户信息");
  user.value = res.profile
  user_level.value = res.level

  nextTick(()=>{
    show_navbar_top.value = Math.floor(userNameEl.value!.getBoundingClientRect().bottom)
    console.log(show_navbar_top.value,"lllll");
    
  })
}
// 获取用户歌单
const getPlaylist = async()=>{
  let res:any = await getUserPlaylist(userStore.userId,1,300)
  console.log(res,"看看看");
  res.playlist.forEach((item:SongsList) => {
    if(item.specialType == 5 && !item.subscribed){
      love_songs.push(item)
      console.log(love_songs,"我喜欢的歌单");
      
    }else if(item.subscribed){
      collect_songs.push(item)
    }else{
      create_songs.push(item)
    }
  });
}

window.addEventListener('scroll',(e)=>{

})


getPlaylist()
getUserDetail()
</script>

<style scoped lang="scss">
.page {
  min-height: 100vh;
  background-color: #eee;
  &_hd{
    position: sticky;
    top: 0;
    left: 0;
  }
  .user_info{
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
    &_action{
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