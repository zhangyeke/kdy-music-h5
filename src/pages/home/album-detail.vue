
<!--
 * @Author: your name
 * @Date: 2022-03-24 17:47:16
 * @LastEditTime: 2023-02-27 20:37:10
 * @LastEditors: 可达鸭 997610780@qq.com
 * @Description: 专辑详情
 * @FilePath: \zyk-music-h5\template.vue
-->
<template>
  <div class="page" v-if="album">
    <div class="page_head relative overflow-hidden h-210px">
      <div class="page_back_btn absolute z-index-3">
        <var-button round text color="transparent" text-color="#fff" @click="router.back()">
          <div class="flex items-center font-700 text-14px">
            <var-icon name="chevron-left" :size="tool.px2vw(30)" />
            <span>专辑</span>
          </div>
        </var-button>
      </div>
      <div class="page_head_bg w-full absolute h-full " :style="{ backgroundImage: `url(${album.picUrl})` }"></div>


      <div class="album relative z-index-5 mt-50px px-15px flex">
        <img :src="album.picUrl" class="w-120px h-120px rounded-10px" />
        <div class="album_info ml-20px flex-1 text-white mt-7px">
          <div class=" truncate_2 font-600 text-15px leading-20px">{{ album.name }}<span class=""
              v-if="album.alias.length">({{ album.alias[0] }})</span></div>
          <div class="mt-10px  opacity-60 text-12px flex items-center" v-if="album.artist" v-ripple
            @click="router.push({ name: 'singerDetail', params: { id: album!.artist!.id, type: 1 } })">
            <span>歌手:{{ album.artist.name }}</span>
            <var-icon name="chevron-right" :size="tool.px2vw(16)" color="#747573" />
          </div>

          <div class="mt-15px text-12px opacity-50 flex flex-col" v-ripple @click="show = true">
            <div>发行时间:{{ tool.timeFormat(album.publishTime) }}</div>
            <div class="flex items-center" v-if="album.description">
              <div v-html="album.description" class="truncate mt-5px w-180px"></div>
              <var-icon name="chevron-right" :size="tool.px2vw(20)" />
            </div>
          </div>
        </div>
      </div>
    </div>


    <div class="page_body">
      <!-- 工具栏 收藏 查看评论 分享 -->
      <div class="util">
        <KdyToolbar :tools="toolBar" @click="toolBarHandle" icon-size="18"></KdyToolbar>
      </div>

      <div class="single_list pb-20px px-15px rounded-10px bg-white relative z-index-10 mx-15px pt-10px">
        <KdyPlayAllHeader :ids="single_list.map(item => item.id)"></KdyPlayAllHeader>
        <KdySingle v-ripple v-for="(item, index) in single_list" :key="item.id" :item="item" mvKey="mv" :show-rank="true"
          :rank="index + 1"></KdySingle>
      </div>
    </div>

    <KdyDetailPopup v-model="show" v-bind="popupConfig"></KdyDetailPopup>
  </div>
</template>
<script setup lang="ts">
import { getAlbumDetail, collectAlbum, albumInfo } from "@/api/public/album";
import { ToolBar } from "@/types/public";
import { detailPopupProps } from "@/components/kdy-detail-popup/props";
import { Album, Song } from "@/types/song";
import { Dialog } from '@varlet/ui';
import useSongStore from "@/store/song";
import mitt from "@/assets/lib/bus";
import KdyPlayAllHeader from "@/components/kdy-play-all-header/kdy-play-all-header.vue";
import useCommentStore from "@/store/comment";
const commentStore = useCommentStore()
const songStore = useSongStore()
let route = useRoute()
let router = useRouter()
let tool = useTool()
// 专辑id
let a_id = Number(route.params.id)
// 专辑详情
let album = ref<Album | null>(null)
// 专辑动态信息
let album_info = reactive({
  isSub: false,//是否关注
  subCount: 0,//关注数量
  commentCount: 0,//评论数
  shareCount: 0,//分享数
})
// 显示专辑详情富文本
let show = ref(false)
let popupConfig = ref<detailPopupProps>({})

// 分享配置
let shareOption = reactive({
  title: "",
  link: "",
  desc: "",
})
// 专辑歌曲
let single_list = ref<Song[]>([])

// 工具条
let toolBar = reactive<ToolBar[]>([{ namespace: "kdy-icon", iconName: "tianjiashoucang" }, { namespace: "var-icon", iconName: "message-text-outline" }, { namespace: "kdy-icon", iconName: "fenxiang" }])

// 获取弹窗配置
const getPopupConfig = (detail: Album): detailPopupProps => {

  let params = [
  `发行公司：${detail.company}`,
  `发行时间：${tool.timeFormat(detail.publishTime)}`,
  `歌手：${tool.pointsField<string>(detail.artists!,'name').join('/')}`,
  `专辑类型：${detail.subType}`,
  `歌曲数量：${detail.size}首`
]

  return {
    title: detail.name,
    des: detail.description,
    cover: detail.picUrl,
    params
  }
}
// 获取专辑详情
const getAlbum = async () => {
  let res: any = await getAlbumDetail(a_id)
  album.value = res.album
  popupConfig.value =  getPopupConfig(album.value!)
  console.log(res.album, "专辑详情");
  single_list.value = res.songs
}

// 工具栏点击处理
const toolBarHandle = (i: number) => {
  switch (i) {
    case 0:
      clickCollect()
      break;
    case 1:
      commentStore.setCommentObj(album.value!, 3)
      router.push({ name: 'comment', params: { id: a_id, type: 3 } })
      break;
    case 2:
      clickShare()
      break;
  }
}

// 文本替换
const textReplace = (text: string) => {
  return text.replace(/\n/g, '</br>')
}



// 点击分享
const clickShare = () => {
  shareOption.title = album.value!.name
  shareOption.desc = `歌手:${album.value!.artist!.name}`
  shareOption.link = window.location.href
  mitt.emit('openSharePopup', shareOption)
}

// 点击收藏
const clickCollect = async () => {
  let res: any = await collectAlbum({ id: a_id, t: Number(!album_info.isSub) })
  console.log(res, "收藏");
  if (res.message) {
    Dialog({
      message: "您已经收藏了该专辑,是否要取消收藏?",
      onConfirm: () => {
        clickCollect()
      },
      cancelButtonTextColor: '#ccc'
    })
  } else {
    album_info.isSub = !album_info.isSub
    if (album_info.isSub) {
      album_info.subCount += 1
      toolBar[0].iconName = 'yishoucang_huaban1'
      tool.toast({ type: 'success', content: '收藏成功!' })
    } else {
      album_info.subCount -= 1
      toolBar[0].iconName = 'tianjiashoucang'
      tool.toast({ type: 'success', content: '取消成功!' })
    }
    toolBar[0].text = album_info.subCount
  }
}

const getAlbumInfo = async () => {
  let res: any = await albumInfo(a_id)
  album_info = res
  toolBar.forEach((item, index) => {
    switch (index) {
      case 0:
        item.iconName = album_info.isSub ? 'yishoucang_huaban1' : 'tianjiashoucang';
        item.text = album_info.subCount || "收藏";
        break;
      case 1:
        item.text = album_info.commentCount || "评论";
        break;
      case 2:
        item.text = album_info.shareCount || "分享";
        break;
    }
  })

}

getAlbum()
getAlbumInfo()
</script>

<style scoped lang="scss">
.page {
  &_head {
    &_bg {
      background-position: top right;

      &::after {
        content: "";
        @apply absolute left-0 top-0 w-full h-full;
        backdrop-filter: blur(100px);
      }

    }
  }

  &_body {
    .util {
      transform: translateY(-20px);
    }
  }
}


:deep(.var-list__finished) {
  display: none !important;
}

:deep(.var-list__loading) {
  display: none !important;
}
</style>