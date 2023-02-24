<!--
 * @Author: zyk 997610780@qq.com
 * @Date: 2023-02-15 17:45:32
 * @LastEditors: zyk 997610780@qq.com
 * @LastEditTime: 2023-02-24 18:26:17
 * @FilePath: \zyk-music-h5\src\pages\home\playlist-detail.vue
 * @Description: 歌单详情
-->
<template>
  <div class="page">
    <div class="page_hd  relative" :class="{ show_simi_songs }"
      :style="{ backgroundImage: `url(${playlist?.coverImgUrl})` }">
      <KdyNavBar class="relative z-2 px-5px" bgcolor="transparent" left-icon-color="#fff" title-icon-color="#fff"
        :title="route.meta.title">
      </KdyNavBar>

      <!-- 歌单信息 -->
      <div class="relative z-2 px-15px mt-10px flex" v-if="playlist">
        <!-- 歌单封面 -->
        <div class="songs_cover w-100px h-100px rounded-10px overflow-hidden">
          <img class="w-full h-full" :src="playlist.coverImgUrl" />
        </div>
        <div class="songs_info ml-10px pt-5px flex-1">
          <!-- 歌单名称 -->
          <div class=" text-white text-16px flex">
            <span class="truncate_2 flex-1 leading-20px">{{ playlist.name }}</span>
            <div class="rounded-1/2 border-1px border-white w-15px h-15px flex items-end justify-center mt-5px"
              @click="show_simi_songs = !show_simi_songs" v-if="simi_songs.length">
              <var-icon :name="show_simi_songs ? 'chevron-up' : 'chevron-down'" color="#fff" :size="tool.addUnit(5)"
                transition="250" />
            </div>
          </div>
          <!-- 创建歌单的用户 -->
          <div class="mt-10px flex items-center" v-show="!show_simi_songs">
            <img :src="playlist.creator.avatarUrl" class="w-20px h-20px rounded-1/2" />
            <span class="text-[#ddd] text-10px ml-5px">{{ playlist.creator.nickname }}</span>
            <div @click.stop="clickFollowed" v-if="!playlist.creator.followed">
              <var-chip class="ml-5px" plain text-color="#ddd" size="mini">关注</var-chip>
            </div>
            <var-icon v-else name="chevron-right" color="#ddd" :size="tool.addUnit(18)" transition="250" />
          </div>
          <!-- 歌单简介 -->
          <div class="flex items-center mt-10px" v-if="playlist.description" v-show="!show_simi_songs">
            <span class="truncate text-[#ddd] text-10px w-200px">{{ playlist.description }}</span>
            <var-icon name="chevron-right" color="#ddd" :size="tool.addUnit(15)" transition="250" />
          </div>

        </div>
      </div>

      <!-- 相似歌单 -->
      <KdyTransition enter-class="animate-fadeInLeft" leave-class="animate-fadeOutRight" delay="150">
        <div class=" relative z-2 px-15px mt-20px" v-show="show_simi_songs" v-if="simi_songs.length">
          <div class="simi_songs_warp">
            <div class="text-10px text-[#ddd]">为您找到类似歌单</div>
            <div class="flex mt-10px">
              <KdySong @click="router.push({ name: 'playlistDetail', params: { id: item.id } })" width="90"
                class="mr-10px" color="#fff" height="90" v-for="(item, index) in simi_songs" :key="item.id"
                :name="item.name" :cover="item.coverImgUrl" :play-count="item.playCount"></KdySong>
            </div>
          </div>
        </div>
      </KdyTransition>

      <!-- 收藏、分享、评论 -->
      <div class="tools absolute z-2 -bottom-20px  w-full">
        <KdyToolbar :tools="toolBar" @click="toolBarHandle"></KdyToolbar>
      </div>
    </div>

  </div>
</template>
<script setup lang="ts">
import { getSongListDetail, getSongListAll, simiSongs } from "@/api/public/playlist";
import { focusUser } from "@/api/my/index";
import KdyTransition from "@/components/kdy-transition/kdy-transition.vue";
import { ToolBar } from "@/types/public";
import { SongsList } from "@/types/songList";
import mitt from "@/assets/lib/bus";

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

// 工具条
let toolBar = reactive<ToolBar[]>([{ namespace: "kdy-icon", iconName: "tianjiashoucang" }, { namespace: "var-icon", iconName: "message-text-outline" }, { namespace: "kdy-icon", iconName: "fenxiang" }])

// 获取歌单详情
const getSongsDetail = async () => {
  let res: any = await getSongListDetail({
    id: playlist_id.value,
    s: 0
  })
  playlist.value = res.playlist
  simi_song_id = res.privileges[Math.floor(Math.random() * res.privileges.length)].id
  console.log(res, "获取歌单详情", simi_song_id);
  toolBar.forEach((item, index) => {
    switch (index) {
      case 0:
        item.text = playlist.value!.subscribedCount;
        break;
      case 1:
        item.text = playlist.value!.commentCount;
        break;
      case 2:
        item.text = playlist.value!.shareCount
        break;
    }
  })
  getSimiSongs()
}
// 获取相似歌单
const getSimiSongs = async () => {
  let res: any = await simiSongs(simi_song_id)
  simi_songs.value = res.playlists.filter((item: SongsList) => item.id.toString() != playlist_id.value)
  console.log(res, "相似歌单");
}
// 工具栏点击处理
const toolBarHandle = (i: number) => {
  switch (i) {
    case 0:
      break;
    case 1:
      router.push({ name: 'comment', params: { id: playlist_id.value, type: 2 } })
      break;
    case 2:
      shareHandle()
      break;
  }
}
// 分享处理
const shareHandle = () => {
  shareOption = {
    desc: playlist.value!.name,
    title: playlist.value!.description,
    link: location.href,
    icon: playlist.value!.coverImgUrl
  }
  mitt.emit('openSharePopup', shareOption)
}

// 点击关注
const clickFollowed = async () => {
  let res: any = focusUser(playlist.value!.creator.userId, 1)
  tool.toast({ type: 'success', content: res.followContent })
  playlist.value!.creator!.followed = !playlist.value!.creator!.followed
}


getSongsDetail()
</script>

<style scoped lang="scss">
.page {
  &_hd {
    height: 200px;
    background-size: cover;
    background-position: left bottom;
    transition: height .5s linear;

    .songs_cover {
      transition: width .75s linear, height .75s linear;
    }

    .songs_info {
      transition: .75s linear;
    }

    &.show_simi_songs {
      height: 300px;

      .songs_cover {
        width: 50px;
        height: 50px;
      }
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