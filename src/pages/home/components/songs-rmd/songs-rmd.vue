<!--
 * @Author: your name
 * @Date: 2022-03-24 17:47:16
 * @LastEditTime: 2023-02-16 17:14:24
 * @LastEditors: zyk 997610780@qq.com
 * @Description: 歌单广场推荐
 * @FilePath: \zyk-music-h5\template.vue
-->
<template>
  <div class="songs-rmd">
    <div class="my-20px" v-if="radar_songs.length">
      <div class="column_title flex items-center">
        <div :class="{ refresh: refresh_radar }" @click="refreshRadar">
          <var-icon namespace="kdy-icon" name="shuaxin1"></var-icon>
        </div>
        <span class="ml-5px">云音乐雷达推荐</span>
      </div>
      <KdyTransition>
        <div class="flex flex-wrap justify-around mt-10px" :key="radar_key">
          <KdySong class="mb-10px" v-for="(item, index) in getRandomSongs(radar_songs)" :key="index" :name="item.name"
            :cover="item.coverImgUrl" :play-count="item.playCount" @click="router.push({name:'playlistDetail',params:{id:item.id}})"></KdySong>
        </div>
      </KdyTransition>

    </div>

    <!-- 推荐 -->
    <div class="mb-20px">
      <div v-if="userStore.token">
        <div class="column_title">歌单甄选</div>
        <div class="flex x_slide mt-10px w-full">
          <RowSongList :list="songs_rmd" @click="jumpDetail"></RowSongList>
        </div>
      </div>

      <div v-else>
        <div class="flex flex-wrap justify-around mt-10px">
        <KdySong class="mb-10px" v-for="(item, index) in songs_rmd" :key="item.id" :name="item.name"
          :cover="item.picUrl" :play-count="item.playCount" @click="router.push({name:'playlistDetail',params:{id:item.id}})"></KdySong>
      </div>
      </div>
    </div>

    <!-- 推荐歌单 --猜你喜欢 -->
    <div class="mb-20px" v-if="rmd_songs_list.length">
      <div class="column_title">你是否也喜欢</div>
      <div class="flex flex-wrap justify-around mt-10px">
        <KdySong class="mb-10px" v-for="(item, index) in rmd_songs_list" :key="item.id" :name="item.name"
          :cover="item.picUrl" :play-count="item.playcount" @click="router.push({name:'playlistDetail',params:{id:item.id}})"></KdySong>
      </div>
    </div>

  </div>
</template>
<script setup lang="ts">
import { SongsList } from "@/types/songList";
import { getRmdSongs, getRmdSongList } from "@/api/public/recommend";
import { getUserPlaylist } from "@/api/my/index";
import RowSongList from '@/components/row-song-list/row-song-list.vue';
import useUserStore from "@/store/user";
let router = useRouter()
let userStore = useUserStore()
// 歌单推荐
let songs_rmd = ref<SongsList[]>([])
// 私人雷达歌单列表
let radar_songs = ref<SongsList[]>([])
let refresh_radar = ref(false)
let radar_key = ref("radar")
// 推荐歌单列表 -- 猜你喜欢
let rmd_songs_list = ref<SongsList[]>([])

// 获取歌单推荐
const getSongsRmd = async () => {
  let res: any = await getRmdSongList(userStore.token ? 6 : 60)
  songs_rmd.value.push(...res.result)
  console.log(res, "歌单推荐");
}
// 获取随机歌单
const getRandomSongs = (list: SongsList[], limit: number = 6): SongsList[] => {
  let new_arr = new Array<SongsList>()
  for (let i = 0; i < limit; i++) {
    let random_index = Math.floor(Math.random() * list.length - 1)

    if (new_arr.length && new_arr.some(item => item.id == list[random_index].id)) {
      i--
      continue;
    }
    new_arr.push(list[random_index])
  }

  setTimeout(() => {
    refresh_radar.value = false
  }, 1000);
  return new_arr
}

// 获取猜你喜欢的歌单 -- 需要登录
const getRmdSong = async () => {
  let res: any = await getRmdSongs()
  if (res.featureFirst) {
    getUserSongs(res.recommend[0].creator.userId)
    res.recommend = res.recommend.filter((item: SongsList, index: number) => index > 0)
  }
  rmd_songs_list.value.push(...res.recommend)
  // console.log(rmd_songs_list.value, "推荐歌单");
}
const getUserSongs = async (id: number) => {
  let res: any = await getUserPlaylist(id, 1, 100)
  radar_songs.value = res.playlist
}
// 刷新雷达歌单
const refreshRadar = () => {
  if (!refresh_radar.value) {
    refresh_radar.value = true
    radar_key.value += new Date().getTime()
  }

}

// 跳转详情
const jumpDetail = (item:SongsList)=>{
  console.log(item);
  router.push({name:'playlistDetail',params:{id:item.id}})
}


const load = () => {
  getSongsRmd()
  if (userStore.token) {
    getRmdSong()
  }
}

load()
</script>

<style scoped lang="scss">
.column_title {
  @apply font-700 text-18px;
  color: var(--color-text);
}

.refresh {
  animation: refresh .5s ease-out infinite;
  animation-fill-mode: forwards;
}

@keyframes refresh {
  0% {}

  100% {
    transform: rotate(360deg);
  }
}
</style>