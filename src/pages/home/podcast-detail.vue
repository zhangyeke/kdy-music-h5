
<!--
 * @Author: zyk 997610780@qq.com
 * @Date: 2023-02-15 17:45:32
 * @LastEditors: zyk 997610780@qq.com
 * @LastEditTime: 2023-04-11 14:33:58
 * @FilePath: \zyk-music-h5\src\pages\home\playlist-detail.vue
 * @Description: 播客详情
-->
<template>
  <div class="page">
    <div class="page_hd  relative" :class="{ show_simi_songs }" :style="{ backgroundImage: `url(${radio?.picUrl})` }">
      <KdyNavBar class="navbar relative z-2 px-5px" bgcolor="transparent" left-icon-color="#fff" title-icon-color="#fff">
      </KdyNavBar>

      <!-- 歌单信息 -->
      <div class="relative z-2 px-15px mt-10px flex" v-if="radio">
        <!-- 歌单封面 -->
        <div class="songs_cover w-100px h-100px rounded-10px overflow-hidden">
          <img class="w-full h-full object-cover" :src="radio.picUrl" />
        </div>
        <div class="songs_info ml-10px pt-5px flex-1">
          <!-- 歌单名称 -->
          <div class=" text-white text-16px flex">
            <span class="truncate_2 flex-1 leading-20px">{{ radio.name }}</span>
            <div class="rounded-1/2 border-1px border-white w-15px h-15px flex items-end justify-center"
              @click="show_simi_songs = !show_simi_songs" v-if="!is_my && simi_songs.length">
              <var-icon :name="show_simi_songs ? 'chevron-up' : 'chevron-down'" color="#fff" :size="tool.addUnit(12)"
                transition="250" />
            </div>
          </div>
          <!-- 创建歌单的用户 -->
          <div class="mt-10px flex items-center" v-show="!show_simi_songs"
            @click="router.push({ name: 'userDetail', params: { id: radio?.dj.userId } })">
            <img :src="radio.dj.avatarUrl" class="w-20px h-20px rounded-1/2" />
            <span class="text-white text-10px ml-5px">{{ radio.dj.nickname }}</span>
            <div v-if="!is_my && !radio.dj.followed" class="ml-5px leading-0">
              <KdyFollowedBtn :user-id="radio.dj.userId" v-model="radio.dj.followed" plain text-color="#ddd" size="mini">
              </KdyFollowedBtn>
            </div>
            <var-icon v-else name="chevron-right" color="#ddd" :size="tool.addUnit(18)" transition="250" />
          </div>
          <!-- 歌单简介 -->
          <div class="flex items-center mt-10px" v-if="radio.desc" v-show="!show_simi_songs" @click="show_popup = true"
            v-ripple>
            <span class="truncate text-white text-10px max-w-200px">{{ radio.desc }}</span>
            <var-icon name="chevron-right" color="#ddd" :size="tool.addUnit(15)" />
          </div>

          <div v-else-if="is_my" class="flex items-center mt-10px" v-ripple
            @click="router.push({ name: 'editPlaylist', params: { id: pid } })">
            <span class="truncate text-white text-10px">编辑信息</span>
            <var-icon name="chevron-right" color="#ddd" :size="tool.addUnit(15)" />
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


  <div class="page_by mt-30px px-15px">
    <div v-if="program_list.length">
      <div class="play_all_header">
        <KdyPlayAllHeader :ids="program_list.map(item => item.id)" :total="paging.count">
          <!-- <template #right>
                <div class="flex items-center">
                  <div v-if="is_my" class="mr-10px" @click="router.push({ name: 'pushSong', params: { id: pid } })">
                      <var-icon namespace="kdy-icon" color="var(--text-color)" name="icon_tianjiayinle-hei"
                        :size="tool.addUnit(18)"></var-icon>
                    </div>
                    <div>
                      <var-icon namespace="kdy-icon" color="var(--text-color)" name="bofangduilie" :size="tool.addUnit(18)"
                        @click.stop="router.push({ name: 'batchHandleSong', params: { id: pid, uid: radio?.creator!.userId } })"></var-icon>
                    </div>
                  </div>
                </template> -->
          </KdyPlayAllHeader>
        </div>
        <div>
          <var-list v-model:loading="paging.loading" :finished="paging.finish" :immediate-check="false"
            @load="loadProgram">
            <KdySound v-for="(item, index) in program_list" :key="item.id" :item="item" v-ripple></KdySound>
          </var-list>

        </div>
      </div>



      <KdyEmpty v-else :loading="loading_status">
        <div class="w-1/2" @click="router.push({ name: 'pushSong', params: { id: pid } })" v-if="is_my">
          <var-button block type="primary" outline text loading-type="circle" loading-radius="10">添加歌曲</var-button>
        </div>
      </KdyEmpty>

    </div>
    <var-back-top :duration="50" bottom="100" right="20" />
    <!-- <playlistPopup v-model="show_popup" :playlist="radio" v-if="radio" :isMy="is_my"></playlistPopup> -->
  </div>
</template>
<script setup lang="ts">
import playlistPopup from "./components/playlist-popup/playlist-popup.vue";
import { getSongListDetail, songListAllSong, simiSongs, subPlaylist } from "@/api/public/playlist";
import { radioDetail, programList } from "@/api/public/podcast";
import { ToolBar } from "@/types/public";

import { Sound, Podcast } from "@/types/song";
import useUserStore from "@/store/user";
import useCommentStore from "@/store/comment";
let tool = useTool()
let route = useRoute()
let router = useRouter()
const userStore = useUserStore()
const commentStore = useCommentStore()
let loading_status = ref(true)
// 歌单id
let pid = ref<string>(route.params.id as string)
// 电台详情
let radio = ref<Podcast | null>(null)
// 相似歌单
let simi_songs = ref<Podcast[]>([])
// 相似歌单id
let simi_song_id = 0
// 是否显示相似歌单
let show_simi_songs = ref(false)

let paging = reactive({
  loading: false,
  finish: false,
  page: 1,
  limit: 30,
  count: 0,
})

// 分享的内容
let shareOption = reactive({
  desc: "",
  title: "",
  link: "",
  icon: "",
})

// 创建人是否是我
let is_my = ref(false)

// 电台节目列表
let program_list = ref<Sound[]>([])


// 歌单详情弹窗
let show_popup = ref(false)

// 工具条
let toolBar = reactive<ToolBar[]>([{ namespace: "kdy-icon", iconName: "tianjiashoucang" }, { namespace: "var-icon", iconName: "message-text-outline" }, { namespace: "kdy-icon", iconName: "fenxiang" }])

// 获取电台详情
const getRadioDetail = async () => {
  let res: any = await radioDetail(pid.value)
  console.log(res, "电台");
  radio.value = res.data

  is_my.value = userStore.userId == radio.value!.dj.userId
  // if( res.privileges) simi_song_id = res.privileges[Math.floor(Math.random() * res.privileges.length)].id
  // console.log(res, "获取歌单详情", simi_song_id);
  // if (!is_my.value) {
  //   getSimiSongs()
  // }
}



watch(() => radio.value?.subed, (v: boolean) => {
  toolBar.forEach((item, index) => {
    switch (index) {
      case 0:
        item.iconName = v ? "yishoucang_huaban1" : "tianjiashoucang"
        item.text = radio.value!.subCount;
        break;
      case 1:
        item.text = radio.value!.commentCount;
        break;
      case 2:
        item.text = radio.value!.shareCount
        break;
    }
  })
})

// 获取相似歌单
const getSimiSongs = async () => {
  let res: any = await simiSongs(simi_song_id)
  simi_songs.value = res.playlists.filter((item: Podcast) => item.id.toString() != pid.value)
  console.log(res, "相似歌单");
}
// 工具栏点击处理
const toolBarHandle = (i: number) => {
  switch (i) {
    case 0:
      !is_my.value && subHandle()
      break;
    case 1:
      // commentStore.setCommentObj(radio.value!, 2)
      router.push({ name: 'comment', params: { id: pid.value, type: 2 } })
      break;
    case 2:
      shareHandle()
      break;
  }
}
// 分享处理
const shareHandle = () => {
  shareOption = {
    desc: radio.value!.name,
    title: radio.value!.desc,
    link: location.href,
    icon: radio.value!.coverImgUrl
  }
  tool.share(shareOption)
}


// 收藏歌单
const subHandle = async () => {
  let res: any = await subPlaylist({
    id: pid.value,
    t: radio.value!.subed ? 2 : 1
  })
  radio.value!.subed ? radio.value!.subCount-- : radio.value!.subCount++
  tool.toast({ type: 'success', content: radio.value!.subed ? "取消收藏成功😢" : "收藏成功❤️" })
  radio.value!.subed = !radio.value!.subed
  console.log(res, "收藏歌单");
}

// 获取电台节目
const getProgramList = async () => {
  let res: any = await programList(pid.value, paging)
  console.log(res, "所有节目");
  program_list.value = res.programs
  paging.page++
  paging.loading = false
  paging.finish = !res.more
  paging.count = res.count
  loading_status.value = false
}

const loadProgram = () => {
  if (!paging.finish) {
    getProgramList()
  }
}

loadProgram()
getRadioDetail()
</script>

<style scoped lang="scss">
.page {
  &_hd {
    height: 200px;
    background-size: cover;
    background-position: left bottom;
    transition: height .5s linear;

    &::after {
      content: "";
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      backdrop-filter: blur(100px);
    }

    .search_show {
      width: 70%;
      opacity: 1;
      animation: searchToggle .5s linear;
    }

    .search_hidden {
      width: 0;
      opacity: 0;
      animation: searchToggle .5s linear reverse;
    }


    @keyframes searchToggle {
      0% {
        opacity: 0;
        width: 0;
      }

      100% {
        opacity: 1;
        width: 70%;
      }
    }

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


  }
}</style>