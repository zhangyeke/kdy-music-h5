<!--
 * @Author: your name
 * @Date: 2022-03-24 17:47:16
 * @LastEditTime: 2023-02-08 15:31:26
 * @LastEditors: zyk 997610780@qq.com
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \zyk-music-h5\template.vue
-->
<template>
  <div class="page">
    <div class="page_hd relative">
      <var-app-bar class="absolute top-0 left-0" title="每日推荐" text-color="#fff" :elevation="false" color="transparent">
        <template #left>
          <var-icon name="chevron-left" :size="tool.px2vw(32)" color="#fff" @click="() => router.back" />
        </template>
      </var-app-bar>
      <div class="absolute bottom-40px left-20px text-white ">
        <span class="text-22px font-700 align-middle">{{ now_date.day }}</span>
        <span class="text-12px align-bottom mb-2px inline-block">
          <span class="mx-3px">/</span>
          <span>{{ now_date.month }}</span>
        </span>
      </div>
      <var-image fit="cover" src="https://source.unsplash.com/random/750x200" width="100%" height="100%"
        @error="bannerError" v-if="show_banner" />
    </div>

    <div class="page_by bg-white pt-10px">
      <singleList :list="song_list" :is-load-more="false" mvKey="mv" alias-key="alia" artists-key="ar"></singleList>
    </div>
  </div>
</template>
<script setup lang="ts">
import { getEveryRmdMusic, getRmdSongList } from "@/api/public/recommend";
import { getSongListAll } from "@/api/public/playlist";
import useUserStore from "@/store/user";
import useTodayRmd from "@/store/todayRmd";
import singleList from "./components/single-list/single-list.vue";
import { Song } from "@/types/song"
let router = useRouter()
let userStore = useUserStore()
let todayRmdStore = useTodayRmd()
let tool = useTool()
let now_date = tool.getNowDate()
// 显示banner图片
let show_banner = ref(true)
// 是否加载更多
let is_more = ref(false)
let page_option = ref({
  limit: 30,
  offset: 0
})
let song_list = ref<Song[]>([])

// banner图片报错处理
const bannerError = (e: Event) => {
  show_banner.value = false
}

const getMusicList = () => {
  if (todayRmdStore.todayDate != now_date.today) {
    todayRmdStore.setTodayDate(now_date.today)
    todayRmdStore.clearRmdSongList()
    if (userStore.token) {
      getRmdMusic()
    } else {
      getRmdMusicList()
    }
  } else {
    song_list.value.push(...todayRmdStore.rmdSongList)
  }

}
// 获取每日推荐歌曲
const getRmdMusic = async () => {
  let res = await getEveryRmdMusic()
  console.log(res, "每日推荐歌曲");
}
// 获取推荐歌单
const getRmdMusicList = async () => {
  let res: any = await getRmdSongList(1)
  let pid: number = res.result[0].id
  let result: any = await getSongListAll({
    id: pid,
    ...page_option.value
  })
  is_more.value = result.songs.length < page_option.value.offset ? false : true
  song_list.value.push(...result.songs)
  todayRmdStore.pushRmdSongList(result.songs)
  console.log("推荐歌单所有歌曲", song_list.value);
}

getMusicList()
</script>

<style scoped lang="scss">
.page {
  &_hd {
    height: 200px;
    background: linear-gradient(45deg, skyblue, yellow);
  }

  &_by {
    border-radius: 20px 20px 0 0;
    transform: translateY(-20px);
    overflow: hidden;
  }
}
</style>