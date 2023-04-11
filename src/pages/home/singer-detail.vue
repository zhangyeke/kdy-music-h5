<!--
 * @Author: your name
 * @Date: 2022-03-24 17:47:16
 * @LastEditTime: 2023-04-11 09:55:44
 * @LastEditors: zyk 997610780@qq.com
 * @Description: 歌手详情
 * @FilePath: \zyk-music-h5\template.vue
-->
<template>
  <div class="page">
    <KdyNavBar :title="singer?.name" :is-fixed="true" :immerse="true" :sticky="true" :screen-top="screen_top" :scroll-y="scrollY"></KdyNavBar>

    <div class="page_head" v-if="singer" ref="page_header">
      <kdyHeader :userInfo="singer" :other="other_info" :bgImgSrc="user_info?.backgroundUrl || singer?.cover"
        @vnode-mounted="headerMounted">
        <template #bottom>
          <div class="text-[#333] font-700 text-16px flex items-center" >
            <span>{{ singer.name }}</span>
            <img :src="other_info.imageUrl" class="w-15px h-15px fit_cover ml-5px" alt=""  v-if="other_info"/>
          </div>
          <div v-if="fans_count" class="mt-10px">
            <span>{{ tool.numFormat(fans_count) }}</span>
            <span class="text-12px ml-5px">粉丝</span>
          </div>
          <div class="mt-10px w-1/2 leading-20px text-center" v-if="other_info || user_info">
            {{ user_info ? user_info.description : other_info.imageDesc }}
          </div>
          <KdyFollowedBtn v-if="user_info" :user-id="sid" v-model="user_info.followed" user-type="singer" :type="user_info.followed? 'default' : 'primary'"></KdyFollowedBtn>
        </template>
      </kdyHeader>
    </div>

    <var-tabs v-model:active="tab_cur" :sticky="scrollY > (screen_top + 44)" :offset-top="50" :color="scrollY > (screen_top + 44) ? '#fff' : 'transparent'">
        <var-tab v-for="(item, index) in tab_list" :key="index">{{ item.name }}</var-tab>
    </var-tabs>


    <div class="page_body px-20px">

      <div>
        <div class="mt-20px" v-show="tab_cur == 0" v-if="singer">
          <homePage :userInfo="user_info" :artist="singer" :otherInfo="other_info" :artistDes="des_list"></homePage>
        </div>
        <div class="pt-15px bg-white rounded-10px mt-10px px-15px" v-show="tab_cur == 1 && hot_songs.length">
          <KdyPlayAllHeader :ids="hot_songs.map(item => item.id)"></KdyPlayAllHeader>
          <KdySingle v-ripple :item="item" v-for="(item, index) in hot_songs" :key="item.id" mvKey="mv" :show-rank="true"
            :rank="index + 1"></KdySingle>
          <div class="text-10px text-[#999] bg-white text-center py-10px" v-ripple
            @click="router.push({ name: 'allSingle', params: { id: sid, type: 'singer' } })">
            <span>查看更多歌曲</span>
            <var-icon name="chevron-right" color="#999" :size="tool.px2vw(12)" />
          </div>
        </div>

        <div class="pt-15px bg-white rounded-10px mt-10px" v-if="tab_cur == 2 && album_list.length">
          <KdyAlbum v-for="(item, index) in album_list" :key="item.id" :item="item"></KdyAlbum>
        </div>
        <KdyEmpty v-if="tab_cur == 2 && !album_list.length"></KdyEmpty>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import homePage from "@/pages/home/components/home-page/home-page.vue";
import kdyHeader from "cmp/kdy-header/kdy-header.vue";
import { getSingerDetail, getSingerDes, getSingerHotSong, getSingerAlbum } from "@/api/my/singer";
import { getUserFans,userDetail } from "@/api/my/index";
import { Artist, User } from "@/types/user";
import { Song, Album } from "@/types/song";
import { tab_list } from "@/enum-file/singer";
import { type } from "os";
let tool = useTool()
let route = useRoute()
let router = useRouter()

const page_header = ref<typeof kdyHeader | null>(null)

let screen_top = ref(0)

const headerMounted = () => {
  screen_top.value = page_header.value!.offsetHeight
}

const scrollY = ref(0)

window.addEventListener('scroll', () => {
  scrollY.value = window.scrollY
})


// 歌手id
let sid = Number(route.params.id)
let stype = Number(route.params.type)
// 歌手信息
let singer = ref<Artist | null>()
// 其他信息
let other_info = ref<any>({})
// 用户信息
let user_info = ref<User | null>()
// 粉丝数量
let fans_count = ref(0)
// 当前tab
let tab_cur = ref(0)
// 歌手的其他描述信息
let des_list = ref<{ ti: string, txt: string }[]>([])
// 歌手热门歌曲
let hot_songs = ref<Song[]>([])
// 歌手专辑
let album_list = ref<Album[]>([])

// 获取歌手信息
const getSinger = async () => {
  let res: any = await getSingerDetail(sid)
  singer.value = res.data.artist
  other_info.value = res.data.identify
  user_info.value = res.data.user
  if (user_info.value) {
    getFocusList(user_info.value.userId)
  }
}

// 获取歌手描述
const getDes = async () => {
  let res: any = await getSingerDes(sid)
  des_list.value = res.introduction
}

// 获取歌手热门歌曲
const getHotSong = async () => {
  let res: any = await getSingerHotSong(sid)
  hot_songs.value = res.songs
}

// 获取歌手专辑
const getAlbum = async () => {
  let res: any = await getSingerAlbum(sid)
  album_list.value = res.hotAlbums
}

// 获取用户详情
const getUserDetail = async () => {
  let res: any = await userDetail(sid)
  if(res.profile.artistId) sid = res.profile.artistId
  initData()
}

const initData = () => {
  getSinger()
  getDes()
  getHotSong()
  getAlbum()
}



// 获取用户粉丝量
const getFocusList = async (id: number | string) => {
  let res: any = await getUserFans(id, 1)
  fans_count.value = res.size
}

if(stype == 1){
  initData()
}else{
  getUserDetail()
}

</script>

<style scoped lang="scss">

:deep(.var-list__finished) {
  display: none !important;
}

:deep(.var-list__loading) {
  display: none !important;
}
</style>