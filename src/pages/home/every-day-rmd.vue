<!--
 * @Author: your name
 * @Date: 2022-03-24 17:47:16
 * @LastEditTime: 2023-02-07 22:43:18
 * @LastEditors: 可达鸭 997610780@qq.com
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \zyk-music-h5\template.vue
-->
<template>
  <div class="page">
    <div class="page_hd"></div>

    <div class="page_by">
      <singleList :list="song_list" :is-load-more="false" mvKey="mv"></singleList>
    </div>
  </div>
</template>
<script setup lang="ts">
import { getEveryRmdMusic, getRmdSongList } from "@/api/public/recommend";
import {getSongListAll} from "@/api/public/playlist";
import useUserStore from "@/store/user";
import singleList from "./components/single-list/single-list.vue";
import {Song} from "@/types/song"
let userStore = useUserStore()

// 是否加载更多
let is_more = ref(false)
let page_option = ref({
  limit:30,
  offset:0
})
let song_list = ref<Song[]>([])

const getMusicList = () => {
  if (userStore.token) {
    getRmdMusic()
  } else {
    getRmdMusicList()
  }
}
// 获取每日推荐歌曲
const getRmdMusic = async () => {
  let res = await getEveryRmdMusic()
  console.log(res, "每日推荐歌曲");
}
// 获取推荐歌单
const getRmdMusicList = async () => {
  let res:any = await getRmdSongList(1)
  let pid:number = res.result[0].id
  let result:any = await getSongListAll({
    id:pid,
    ...page_option.value
  })
  console.log(res, "推荐歌单");
  is_more.value = result.songs.length < page_option.value.offset ? false : true
  song_list.value.push(...result.songs)
  console.log("推荐歌单所有歌曲",song_list.value);
}

getMusicList()
</script>

<style scoped lang="scss">
.page {
  &_hd {
    height: 200px;
    background: linear-gradient(45deg, skyblue, yellow);
  }
}
</style>