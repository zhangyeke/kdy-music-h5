<!--
 * @Author: your name
 * @Date: 2022-03-24 17:47:16
 * @LastEditTime: 2023-02-19 01:26:05
 * @LastEditors: 可达鸭 997610780@qq.com
 * @Description: 歌单详情
 * @FilePath: \zyk-music-h5\template.vue
-->
<template>
  <div class="page">
    <div class="page_hd  relative" :style="{ backgroundImage: `url(${playlist?.coverImgUrl})` }">
      <KdyNavBar class="relative z-2 px-5px" bgcolor="transparent" left-icon-color="#fff" title-icon-color="#fff"
        :title="route.meta.title">
      </KdyNavBar>

      <!-- 歌单信息 -->
      <div class="relative z-2 px-15px mt-10px flex" v-if="playlist">
        <!-- 歌单封面 -->
        <div class="w-100px h-100px rounded-10px overflow-hidden">
          <img class="w-full h-full" :src="playlist.coverImgUrl" />
        </div>
        <div class="ml-10px pt-5px flex-1">
          <!-- 歌单名称 -->
          <div class=" text-white text-16px flex">
            <span class="truncate_2 flex-1 leading-20px">{{ playlist.name }}</span>
            <div class="rounded-1/2 border-1px border-white w-15px h-15px flex items-end justify-center mt-5px">
              <var-icon name="chevron-down" color="#fff" :size="tool.addUnit(5)" transition="250" />
            </div>
          </div>
          <!-- 创建歌单的用户 -->
          <div class="mt-10px flex items-center">
            <img :src="playlist.creator.avatarUrl" class="w-20px h-20px rounded-1/2" />
            <span class="text-[#ddd] text-10px ml-5px">{{ playlist.creator.nickname }}</span>
            <var-chip class="ml-5px" plain text-color="#ddd" size="mini" v-if="!playlist.creator.followed">关注</var-chip>
            <var-icon v-else name="chevron-right" color="#ddd" :size="tool.addUnit(18)" transition="250" />

          </div>
          <!-- 歌单简介 -->
          <div class="flex items-center mt-10px" v-if="playlist.description">
            <span class="truncate text-[#ddd] text-10px w-200px">{{ playlist.description }}</span>
            <var-icon name="chevron-right" color="#ddd" :size="tool.addUnit(15)" transition="250" />
          </div>

        </div>
      </div>

      <!-- 相似歌单 -->
      <div class="relative z-2 px-15px mt-20px" v-if="show_simi_songs">
        <div class="text-10px text-[#ddd]">为您找到类似歌单</div>
        <div class="flex mt-10px">
          <KdySong @click="router.push({ name: 'playlistDetail', params: { id: item.id } })" width="90" class="mr-10px"
            color="#fff" height="90" v-for="(item, index) in simi_songs" :key="item.id" :name="item.name"
            :cover="item.coverImgUrl" :play-count="item.playCount"></KdySong>
        </div>
      </div>

      <!-- 收藏、分享、评论 -->
      <div class="tools">
        <div class="flex items-center text-[var(--color-text)] text-14px" @click="">
          <var-icon name="tianjiashoucang" namespace="kdy-icon" color="#333" :size="tool.px2vw(20)" />
          <span class="ml-5px font-700">{{ playlist?.subscribedCount }}</span>
        </div>
        <div class="flex items-center text-[var(--color-text)] text-14px"
          @click="router.push({ name: 'comment', params: { id: playlist_id, type: 2 } })">
          <var-icon name="message-text-outline" color="#333" :size="tool.px2vw(20)" />
          <span class="ml-5px font-700">{{ playlist?.commentCount }}</span>
        </div>
        <div class="flex items-center text-[var(--color-text)] text-14px" @click="shareHandle">
          <var-icon name="fenxiang" color="#333" namespace="kdy-icon" :size="tool.px2vw(20)" />
          <span class="ml-5px font-700">{{ playlist?.shareCount }}</span>
        </div>
      </div>
    </div>
    <!-- 分享弹窗 -->
    <sharePopup v-model:show="share_show" :shareOption="shareOption"></sharePopup>
  </div>
</template>
<script setup lang="ts">
import { getSongListDetail, getSongListAll, simiSongs } from "@/api/public/playlist";
import { ToolBar } from "@/types/public";
import { SongsList } from "@/types/songList";
let tool = useTool()
let route = useRoute()
let router = useRouter()

// 歌单id
let playlist_id = ref<string>(route.params.id as string)
// 歌单详情
let playlist = ref<SongsList | null>(null)
// 相似歌单
let simi_songs = ref<SongsList[]>([])
// 相似歌单id
let simi_song_id = 0
// 是否显示相似歌单
let show_simi_songs = ref(false)
// 分享的内容
let shareOption = reactive({
  desc: "",
  title: "",
  link: "",
  icon: "",
})
// 分享弹窗开关
let share_show = ref(false)

// 工具条
let toolBar = ref<ToolBar[]>([{ text: "", namespace: "kdy-icon", iconName: "tianjiashoucang" }, { text: "", namespace: "var-icon", iconName: "message-text-outline" }, { text: "", namespace: "kdy-icon", iconName: "fenxiang" }])

// 获取歌单详情
const getSongsDetail = async () => {
  let res: any = await getSongListDetail({
    id: playlist_id.value,
    s: 0
  })
  playlist.value = res.playlist 
  simi_song_id = res.privileges[Math.floor(Math.random() * res.privileges.length)].id
  console.log(res, "获取歌单详情", simi_song_id);
  getSimiSongs()
}
// 获取相似歌单
const getSimiSongs = async () => {
  let res: any = await simiSongs(simi_song_id)
  simi_songs.value = res.playlists.filter((item: SongsList) => item.id.toString() != playlist_id.value)
  console.log(res, "相似歌单");
}

const shareHandle = () => {
  shareOption = {
    desc: playlist.value!.name,
    title: playlist.value!.description,
    link: "www.baidu.com",
    icon: playlist.value!.coverImgUrl
  }

  share_show.value = true
}


getSongsDetail()
</script>

<style scoped lang="scss">
.page {
  &_hd {
    height: 200px;
    background-size: cover;
    background-position: left bottom;

    &.an {
      height: 350px;
    }

    &::after {
      content: "";
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      backdrop-filter: blur(100px);
    }

  }
}
</style>