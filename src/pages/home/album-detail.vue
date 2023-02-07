<!--
 * @Author: your name
 * @Date: 2022-03-24 17:47:16
 * @LastEditTime: 2023-02-07 22:03:55
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
          <div class="mt-10px  opacity-60 text-12px flex items-center" v-ripple
            @click="router.push({ name: 'singerDetail', params: { id: album?.artist.id } })">
            <span>歌手:{{ album.artist.name }}</span>
            <var-icon name="chevron-right" :size="tool.px2vw(16)" color="#747573" />
          </div>

          <div class="mt-15px text-12px opacity-50 flex flex-col" v-ripple @click="show = true">
            <div>发行时间:{{ tool.timeFormat(album.publishTime) }}</div>
            <div class="flex items-center">
              <div v-html="album.description" class="truncate mt-5px w-180px"></div>
              <var-icon name="chevron-right" :size="tool.px2vw(20)" />
            </div>
          </div>
        </div>
      </div>
    </div>


    <div class="page_body">
      <!-- 工具栏 收藏 查看评论 分享 -->
      <div
        class="util bg-white px-25px py-10px w-80/100 mx-auto rounded-40px  text-[#333] text-12px flex justify-around">
        <div class="util_item" v-ripple @click="clickCollect(1)">
          <var-icon name="tianjiashoucang" color="#333" namespace="kdy-icon" :size="tool.px2vw(20)" />
          <span>收藏</span>
        </div>
        <div class="util_item" v-ripple @click="router.push({ name: 'comment', params: { id: a_id, type: 3 } })">
          <var-icon name="message-text-outline" color="#333" :size="tool.px2vw(20)" />
          <span>{{ album.info.commentCount }}</span>
        </div>

        <div class="util_item" v-ripple @click="clickShare">
          <var-icon name="fenxiang" color="#333" namespace="kdy-icon" :size="tool.px2vw(20)" />
          <span>分享</span>
        </div>
      </div>

      <div class="single_list px-10px py-20px  bg-white relative z-index-10">
        <singleList :list="single_list" :isLoadMore="false" :showIndex="true" mvKey="mv" aliasKey="alia" artistsKey="ar"></singleList>
      </div>
    </div>


    <!-- 专辑详情富文本弹窗 -->
    <var-style-provider :style-vars="{ '--popup-content-background-color': 'transparent' }">
      <var-popup v-model:show="show">
        <div class="px-20px mx-20px bg-white rounded-10px h-400px overflow-y-scroll pb-15px">
          <div class="font-700 text-16px text-[#333] py-15px">专辑介绍</div>
          <div class="text-[#333] text-12px">
            <div>发行公司:{{ album.company }}</div>
            <div class="my-10px">专辑类别:{{ album.subType }}</div>
          </div>
          <div class="text-12px leading-20px font-500" v-html="textReplace(album.description)"></div>
        </div>
      </var-popup>
    </var-style-provider>

    <!-- 分享弹窗 -->
    <sharePopup v-model:show="share_show" :shareOption="shareOption"></sharePopup>
  </div>
</template>
<script setup lang="ts">
import singleList from "./components/single-list/single-list.vue";
import { getAlbumDetail, collectAlbum } from "@/api/public/album";
import { Album, Song } from "@/types/song";
import { Dialog } from '@varlet/ui';
let route = useRoute()
let router = useRouter()
let tool = useTool()
// 专辑id
let a_id = Number(route.params.id)
// 专辑详情
let album = ref<Album | null>()
// 显示专辑详情富文本
let show = ref(false)
// 分享配置
let shareOption = ref({
  title: "",
  link: "",
  desc: "",
})
// 专辑歌曲
let single_list = ref<Song[]>([])
// 分享弹窗
let share_show = ref(false)
const getAlbum = async () => {
  let res: any = await getAlbumDetail(a_id)
  album.value = res.album
  console.log(res.album, "专辑详情");
  single_list.value = res.songs
}

// 文本替换
const textReplace = (text: string) => {
  return text.replace(/\n/g, '</br>')
}

// 点击分享
const clickShare = () => {
  shareOption.value.title = `${album.value?.name}` || ""
  shareOption.value.desc = `歌手:${album.value?.artist.name}` || ""
  shareOption.value.link = window.location.href
  share_show.value = true
}
// 点击收藏
const clickCollect = async (t: number) => {
  let res: any = await collectAlbum({ id: a_id, t })
  console.log(res, "收藏");
  if (res.message) {
    Dialog({
      message: "您已经收藏了该专辑,是否要取消收藏?",
      onConfirm: () => {
        clickCollect(0)
      },
      cancelButtonTextColor: '#ccc'
    })
  } else {
    t == 1 ? tool.toast({ type: 'success', content: '收藏成功!' }) : tool.toast({ type: 'success', content: '取消成功!' })
  }
}

getAlbum()
</script>

<style scoped lang="scss">
.page {
  &_head {
    &_bg {
      background-position: top right;
      filter: blur(1px);
    }
  }

  &_body {

    .util {
      box-shadow: 0 0 10px #ddd;
      transform: translateY(-20px);

      &_item {
        @apply flex items-center relative;

        span {
          margin-left: 5px;
        }

        &:nth-child(-n+2) {
          &::after {
            content: "";
            @apply absolute w-1px h-15px;
            top: 50%;
            right: -20px;
            transform: translateY(-50%);
            background-color: #eee;
          }
        }
      }
    }
  }
}


::v-deep .var-list__finished {
  display: none !important;
}

::v-deep .var-list__loading {
  display: none !important;
}
</style>