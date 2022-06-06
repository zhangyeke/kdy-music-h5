<!--
 * @Author: your name
 * @Date: 2022-03-24 17:47:16
 * @LastEditTime: 2022-06-06 22:54:50
 * @LastEditors: [you name]
 * @Description: 歌手详情
 * @FilePath: \zyk-music-h5\template.vue
-->
<template>
  <div class="page">
    <div class="page_head" v-if="singer">
      <kdyHeader :userInfo="singer" :other="other_info" :bgImgSrc="user_info?.backgroundUrl || singer?.cover">
        <template #bottom>
          <div class="text-[#333] font-700 text-16px flex items-center">
            <span>{{singer.name}}</span>
            <img :src="other_info.imageUrl" class="w-15px h-15px fit_cover ml-5px" alt="" v-if="other_info.imageUrl" />
          </div>
          <div v-if="fans_count" class="mt-10px">
            <span>{{tool.numFormat(fans_count)}}</span>
            <span class="text-12px ml-5px">粉丝</span>
          </div>
          <div class="mt-10px">
            {{user_info ? user_info.description : other_info.imageDesc}}
          </div>
          <div v-if="user_info" class="focus_btn text-12px font-500 mt-10px" :class="{ in_focus: user_info.followed }"
            v-ripple @click="focusHandle">
            {{ user_info.followed ? '已关注' : '关注' }}
          </div>
        </template>
      </kdyHeader>
    </div>

    <div class="page_body px-20px">
      <var-tabs v-model:active="tab_cur" color="transparent">
        <var-tab v-for="(item, index) in tab_list" :key="index">{{item.name}}</var-tab>
      </var-tabs>

      <div v-if="singer">
        <div class="mt-20px">
          <homePage v-show="tab_cur == 0" :userInfo="user_info" :artist="singer" :otherInfo="other_info"
            :artistDes="des_list"></homePage>
        </div>
        <div class="pt-15px bg-white rounded-10px" v-show="tab_cur == 1">
          <singleList :isLoadMore="false" :list="hot_songs" :showIndex="true"></singleList>
          <div class="text-10px text-[#999] bg-white text-center py-10px" v-ripple @click="">
            <span>查看更多歌曲</span>
            <var-icon name="chevron-right" color="#999" :size="tool.px2vw(12)" />
          </div>
        </div>

        <div v-show="tab_cur == 2">
          <albumList :list="album_list" :isLoadMore="false"></albumList>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import homePage from "@/pages/home/components/home-page/home-page.vue";
import singleList from "@/pages/home/components/single-list/single-list.vue";
import albumList from "@/pages/home/components/album-list/album-list.vue";
import kdyHeader from "cmp/kdy-header/kdy-header.vue";
import {getSingerDetail,getSingerDes,getSingerHotSong,getSingerAlbum} from "@/api/my/singer";
import {getUserFans,focusUser} from "@/api/my/index";
import {Artist,User} from "@/types/user";
import {Song,Album} from "@/types/song";
import { Dialog } from '@varlet/ui';
import {tab_list} from "@/enum-file/singer-tab";
let tool = useTool()
let route = useRoute()
// 歌手id
let sid = Number(route.params.id)
// 歌手信息
let singer = ref<Artist | null>()
// 其他信息
let other_info = ref<any>({})
// 用户信息
let user_info = ref<User | null>()
// 粉丝数量
let fans_count = ref(0)
// 当前tab
let tab_cur = ref(2)
// 歌手的其他描述信息
let des_list = ref<{ti:string,txt:string}[]>([])
// 歌手热门歌曲
let hot_songs = ref<Song[]>([])
// 歌手专辑
let album_list = ref<Album[]>([])

// 获取歌手信息
const getSinger = async ()=>{
  let res:any = await getSingerDetail(sid)
  singer.value = res.data.artist
  other_info.value = res.data.identify
  user_info.value = res.data.user
  if(user_info.value){
    getFocusList(user_info.value.userId)
  }
}

// 获取歌手描述
const getDes = async () => {
 let res:any = await getSingerDes(sid)
 des_list.value = res.introduction
}

// 获取歌手热门歌曲
const getHotSong = async ()=>{
  let res:any = await getSingerHotSong(sid)
  hot_songs.value = res.songs
}

// 获取歌手专辑
const getAlbum = async ()=>{
  let res:any = await getSingerAlbum(sid)
  console.log(res,"歌手专辑");
  album_list.value = res.hotAlbums
}

const initData = ()=>{
  getSinger()
  getDes()
  getHotSong()
  getAlbum()
}

// 关注处理
const focusHandle = ()=>{
  if(user_info.value?.followed){
    Dialog({
      message: `是否要取消关注${user_info.value.nickname}?取消关注后[关注时长]将重新计算！`,
      messageAlign:'center',
      confirmButtonText:"仍然取消",
      cancelButtonText:"继续关注",
      confirmButtonTextColor:'#fff',
      confirmButtonColor:'var(--color-danger)',
      cancelButtonTextColor:'#fff',
      cancelButtonColor:'var(--color-primary)',
      onConfirm: () => {
        focusUser((user_info.value?.userId as number), 0)
      },
    })
  }else{
    focusUser((user_info.value?.userId as number), 1).then((res:any)=>{
      tool.toast({ type: 'success', content: res.followContent })
    })
  }

  if(user_info.value) user_info.value.followed = !user_info.value.followed 
}

// 获取用户粉丝量
const getFocusList = async(id:number)=>{
  let res:any = await getUserFans(id)
  fans_count.value = res.size
}

initData()
watch(()=>route.params.id,()=>{
  initData()
})
</script>

<style scoped lang="scss">
  .focus_btn {
    @apply px-20px py-8px rounded-20px text-white;
    background-color: var(--color-primary);
    &.in_focus {
      background: #ccc;
      color: #999;
    }
    }

    ::v-deep .var-list__finished {
  display: none !important;
}

::v-deep .var-list__loading {
  display: none !important;
}
</style>