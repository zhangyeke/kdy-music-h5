
<!--
 * @Author: zyk 997610780@qq.com
 * @Date: 2023-02-15 17:45:32
 * @LastEditors: zyk 997610780@qq.com
 * @LastEditTime: 2023-04-11 14:40:27
 * @FilePath: \zyk-music-h5\src\pages\home\playlist-detail.vue
 * @Description: 歌单详情
-->
<template>
  <div class="page">
    <div class="page_hd  relative" :class="{ show_simi_songs }"
      :style="{ backgroundImage: `url(${playlist?.coverImgUrl})` }">
      <KdyNavBar class="navbar relative z-2 px-5px" bgcolor="transparent" left-icon-color="#fff" title-color="#fff"
        :title="route.meta.title">
        <template #default>
          <div class="flex justify-end items-center">
            <KdyTransition enter-class="search_show" leave-class="search_hidden">
              <div class="w-70/100 border-b-1px border-white mr-10px" v-show="show_search" @keydown.enter="searchClick">
                <KdySearch placeholder="搜索歌单内歌曲" color="#fff" v-model="keyword" bg-color="transparent" :height="26"
                  icon-size="18" font-size="14">
                </KdySearch>
              </div>
            </KdyTransition>

            <div class="mr-10px" @click="searchClick" v-if="song_list.length">
              <var-button type="primary" v-show="show_search" size="mini">搜索</var-button>
              <var-icon name="magnify" color="#fff" :size="tool.addUnit(22)" v-show="!show_search" />
            </div>
          </div>
        </template>
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
            <div class="rounded-1/2 border-1px border-white w-15px h-15px flex items-end justify-center"
              @click="show_simi_songs = !show_simi_songs" v-if="!is_my && simi_songs.length">
              <var-icon :name="show_simi_songs ? 'chevron-up' : 'chevron-down'" color="#fff" :size="tool.addUnit(12)"
                transition="250" />
            </div>
          </div>
          <!-- 创建歌单的用户 -->
          <div class="mt-10px flex items-center" v-show="!show_simi_songs"
            @click="router.push({ name: 'userDetail', params: { id: playlist?.creator?.userId } })">
            <img :src="playlist.creator!.avatarUrl" class="w-20px h-20px rounded-1/2" />
            <span class="text-white text-10px ml-5px">{{ playlist.creator!.nickname }}</span>
            <div v-if="!is_my && !playlist.creator!.followed" class="ml-5px leading-0">
              <KdyFollowedBtn :user-id="playlist.creator!.userId" v-model="playlist.creator!.followed" plain
                text-color="#ddd" size="mini"></KdyFollowedBtn>
            </div>
            <var-icon v-else name="chevron-right" color="#ddd" :size="tool.addUnit(18)" transition="250" />
          </div>
          <!-- 歌单简介 -->
          <div class="flex items-center mt-10px" v-if="playlist.description" v-show="!show_simi_songs"
            @click="show_popup = true" v-ripple>
            <span class="truncate text-white text-10px max-w-200px">{{ playlist.description }}</span>
            <var-icon name="chevron-right" color="#ddd" :size="tool.addUnit(15)" />
          </div>

          <div v-else-if="is_my" class="flex items-center mt-10px" v-ripple
            @click="router.push({ name: 'editPlaylist', params: { id: playlist_id } })">
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
      <template v-if="song_list.length">
        <div v-show="search_status" :key="search_songs.length">
          <div class="play_all_header">
            <KdyPlayAllHeader :ids="search_songs.map(item => item.id)" :total="search_songs.length">
            </KdyPlayAllHeader>
          </div>
          <div>
            <KdySingle v-for="(item, index) in search_songs" :key="item.id" :item="item" :show-rank="true"
              :rank="index + 1" v-ripple></KdySingle>
          </div>
        </div>

        <div v-show="!search_status" v-if="song_list.length">
          <div class="play_all_header">
            <KdyPlayAllHeader :ids="song_list.map(item => item.id)" :total="song_list.length">
              <template #right>
                <div class="flex items-center">
                  <div v-if="is_my" class="mr-10px"
                    @click="router.push({ name: 'pushSong', params: { id: playlist_id } })">
                    <var-icon namespace="kdy-icon" color="var(--text-color)" name="icon_tianjiayinle-hei"
                      :size="tool.addUnit(18)"></var-icon>
                  </div>
                  <div>
                    <var-icon namespace="kdy-icon" color="var(--text-color)" name="bofangduilie" :size="tool.addUnit(18)"
                      @click.stop="router.push({ name: 'batchHandleSong', params: { id: playlist_id, uid: playlist?.creator!.userId } })"></var-icon>
                  </div>
                </div>
              </template>
            </KdyPlayAllHeader>
          </div>
          <div>
            <KdySingle v-for="(item, index) in song_list" :key="item.id" :item="item" :show-rank="true" :rank="index + 1"
              mv-key="mv">
            </KdySingle>
          </div>
        </div>

      </template>

      <KdyEmpty v-else :loading="loading_status">
        <div class="w-1/2" @click="router.push({ name: 'pushSong', params: { id: playlist_id } })" v-if="is_my">
          <var-button block type="primary" outline text loading-type="circle" loading-radius="10">添加歌曲</var-button>
        </div>
        <var-image class="mt-100px" v-else :src="tool.getAssetsImages('image/data_empty.png')"
          :width="tool.px2vw(128)"></var-image>

      </KdyEmpty>

    </div>
    <var-back-top :duration="50" bottom="100" right="20" />
    <KdyDetailPopup v-model="show_popup" v-bind="popupConfig" @btn-click="btnClickHandle"></KdyDetailPopup>
  </div>
</template>
<script setup lang="ts">
import { getSongListDetail, songListAllSong, simiSongs, subPlaylist } from "@/api/public/playlist";
import { ToolBar } from "@/types/public";
import { SongsList } from "@/types/songList";
import { Song } from "@/types/song";
import { detailPopupProps, ButtonAttr } from "@/components/kdy-detail-popup/props";
import useUserStore from "@/store/user";
import useCommentStore from "@/store/comment";
let tool = useTool()
let route = useRoute()
let router = useRouter()
const userStore = useUserStore()
const commentStore = useCommentStore()
let loading_status = ref(true)
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
let popupConfig = ref<detailPopupProps>({})

// 该歌单是否归属与我
let is_my = ref(false)

// 歌单的所有歌曲
let song_list = ref<Song[]>([])
let search_status = ref(false)
let search_songs = ref<Song[]>([])
// 歌单详情弹窗
let show_popup = ref(false)

// 工具条
let toolBar = reactive<ToolBar[]>([{ namespace: "kdy-icon", iconName: "tianjiashoucang" }, { namespace: "var-icon", iconName: "message-text-outline" }, { namespace: "kdy-icon", iconName: "fenxiang" }])
// 搜索的音乐的关键词
let keyword = ref("")
let show_search = ref(false)
// 获取歌单详情
const getSongsDetail = async () => {
  let res: any = await getSongListDetail({
    id: playlist_id.value,
    s: 0
  })

  playlist.value = res.playlist
  is_my.value = userStore.userId == playlist.value!.creator!.userId
  popupConfig.value = getPopupConfig(playlist.value!)
  if (res.privileges) simi_song_id = res.privileges[Math.floor(Math.random() * res.privileges.length)].id
  console.log(res, "获取歌单详情", simi_song_id);
  if (!is_my.value) {
    getSimiSongs()
  }
}

// 获取弹窗配置
const getPopupConfig = (detail: SongsList): detailPopupProps => {
  let btns: ButtonAttr[] = [{
    type: "primary",
    txt: "保存封面",
  },]

  if (is_my.value) {
    btns.unshift(
      {
        type: "primary",
        txt: "编辑歌单",
      },)
  }

  return {
    showTag: true,
    title: detail.name,
    des: detail.description,
    cover: detail.coverImgUrl,
    tags: detail.tags,
    btns
  }
}

const btnClickHandle = (index:number)=>{
  if(is_my.value && index == 0){
    router.push({name:'editPlaylist',params:{id:playlist.value!.id}})
  }else{
    saveCover()
  }
}

// 保存封面
const saveCover = () => {
  let cutURL: string = playlist.value!.coverImgUrl
  let oA = document.createElement("a"); // 创建一个a标签
  // 正则表达式，这里是把图片文件名分离出来。拿到文件名赋到a.download,作为文件名来使用文本 ,
  // a的download 谷歌浏览器必须同源才能强制下载，否则跳转到图片地址
  oA.download = cutURL.replace(/(.*\/)*([^.]+.*)/ig, "$2").split("?")[0];; // 设置下载的文件名，默认是'下载'
  oA.href = cutURL;
  document.body.appendChild(oA);
  oA.click();
  oA.remove(); // 下载之后把创建的元素删除
}

watch(() => playlist.value?.subscribed, (v: boolean) => {
  toolBar.forEach((item, index) => {
    switch (index) {
      case 0:
        item.iconName = v ? "yishoucang_huaban1" : "tianjiashoucang"
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
})

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
      !is_my.value && subHandle()
      break;
    case 1:
      commentStore.setCommentObj(playlist.value!, 2)
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
  tool.share(shareOption)
}


// 收藏歌单
const subHandle = async () => {
  let res: any = await subPlaylist({
    id: playlist_id.value,
    t: playlist.value!.subscribed ? 2 : 1
  })
  playlist.value!.subscribed ? playlist.value!.subscribedCount-- : playlist.value!.subscribedCount++
  tool.toast({ type: 'success', content: playlist.value!.subscribed ? "取消收藏成功😢" : "收藏成功❤️" })
  playlist.value!.subscribed = !playlist.value!.subscribed
  console.log(res, "收藏歌单");
}

// 获取歌单的所有歌曲
const getSongListAllSong = async () => {
  let res: any = await songListAllSong({
    id: playlist_id.value
  })

  song_list.value = res.songs

  loading_status.value = false
  console.log(res, "所有歌曲");
}
// 点击搜索
const searchClick = () => {
  if (show_search.value) {
    search_status.value = true
    if (keyword.value) {
      search_songs.value = song_list.value.filter(item => item.name.includes(keyword.value))
    } else {
      show_search.value = false
      search_status.value = false
    }
  } else {
    show_search.value = true
  }
}


getSongListAllSong()
getSongsDetail()
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
}
</style>