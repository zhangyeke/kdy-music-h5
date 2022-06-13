<!--
 * @Author: your name
 * @Date: 2022-03-24 17:47:16
 * @LastEditTime: 2022-06-13 21:43:12
 * @LastEditors: [you name]
 * @Description:音乐详情弹窗
  * @FilePath: \zyk-music-h5\template.vue
-->
<template>
  <div>
    <var-style-provider :style-vars="{ '--popup-content-background-color': 'transparent' }">
      <var-popup :show="show" position="bottom" @close="close" @open="open" @click-overlay="close" teleport="body">
        <div class="window px-15px bg-white">
          <div class="window_head py-15px flex border_b_solid_1">
            <img :src="music?.al.picUrl" class="w-50px rounded-10px">
            <div class="flex-1 ml-10px font-500">
              <div class="text-[#333] text-14px">
                歌曲：{{ music?.name }}{{ music?.alia[0] }}
              </div>
              <div class="text-[#999] text-12px mt-10px" v-if="music?.ar.length">
                <span v-for="(item, index) in music.ar" :key="index">{{ item.name }}<span
                    v-if="index != music.ar.length - 1">/</span></span>
              </div>
            </div>
          </div>

          <div class="window_main">
            <div class="fun_item" v-ripple @click="nextSong">
              <var-icon name="bofang1" namespace="kdy-icon" color="#333" :size="tool.px2vw(20)" />
              <span>下一首播放</span>
            </div>
            <div class="fun_item" v-ripple @click="clickCollect">
              <var-icon name="tianjiashoucang" namespace="kdy-icon" color="#333" :size="tool.px2vw(20)" />
              <span>收藏到歌单</span>
            </div>
            <div class="fun_item" v-ripple @click="router.push({ name: 'comment', params: { id: musicId,type:0 } })">
              <var-icon name="message-text-outline" color="#333" :size="tool.px2vw(20)" />
              <span>评论({{ comment_count }})</span>
            </div>

            <div class="fun_item" v-ripple @click="router.push({name:'singerDetail',params:{id:music?.ar[0].id}})">
              <var-icon name="w_zhiyuan" color="#333" namespace="kdy-icon" :size="tool.px2vw(20)" />
              <div class="inline-block singer" v-if="music?.ar.length">
                <span class="ml-10px">歌手：</span>
                <span v-for="(item, index) in music.ar" :key="index">{{ item.name }}<span
                    v-if="index != music.ar.length - 1">/</span></span>
              </div>
            </div>
            <div class="fun_item" v-ripple v-if="music?.al.name && music.single != 1" @click="router.push({name:'albumDetail',params:{id:music?.al.id}})">
              <var-icon name="zhuanjiguangpan" color="#333" namespace="kdy-icon" :size="tool.px2vw(20)" />
              <span>专辑：{{ music.al.name }}</span>
            </div>
            <div class="fun_item" v-ripple @click="clickShare">
              <var-icon name="fenxiang" color="#333" namespace="kdy-icon" :size="tool.px2vw(20)" />
              <span>分享</span>
            </div>
          </div>
        </div>
      </var-popup>
    </var-style-provider>

    <!-- 分享弹窗 -->
    <sharePopup v-model:show="share_show" :shareOption="shareOption"></sharePopup>
    <!-- 收藏弹窗 -->
    <collectPopup v-model:show="collect_show" :ids="musicId" @newlyBuilt="clickNewlyBuilt"></collectPopup>
    <!-- 新建歌单弹窗 -->
    <newPlaylistPopup v-model:show="show_new_window" :playlistName="music?.alia[0] || music?.name"
      @cancel="newPlaylistCancel" @finish="newPlaylistFinish"></newPlaylistPopup>
  </div>
</template>
<script setup lang="ts">
import { getMusicDetail, handlePlaylist } from "@/api/public/music";
import {  getMusicComment } from "@/api/public/comment";
import { Song } from "@/types/song";
import useSongStore from "@/store/song";
import useUserStore from "@/store/user";
import sharePopup from "cmp/share-popup/share-popup.vue";
import collectPopup from "cmp/collect-popup/collect-popup.vue";
import newPlaylistPopup from "cmp/new-playlist-popup/new-playlist-popup.vue";

let router = useRouter()

let prop = withDefaults(defineProps<{
  show: boolean,
  musicId: number,
}>(), {
  musicId: 0
})

let emit = defineEmits(['update:show', 'close'])
let tool = useTool()
let songStore = useSongStore()
let userStore = useUserStore()
let shareOption = ref({
  title: "",
  link: "",
  desc: "",
})
let music = ref<Song>()
// 评论总数
let comment_count = ref(0)
// 分享弹窗
let share_show = ref(false)
// 收藏弹窗
let collect_show = ref(false)
// 新建窗口显示
let show_new_window = ref(false)
// 获取歌曲详情
const getDetail = async () => {
  let res: any = await getMusicDetail(prop.musicId)
  let comment: any = await getMusicComment({ id: prop.musicId })
  music.value = res.songs[0]
  comment_count.value = comment.total
}
const close = () => {
  emit('update:show', false)
  emit('close')
}

const open = () => {
  getDetail()
}

// 点击收藏处理
const clickCollect = () => {
  emit('update:show', false)
  if (!(userStore.token && userStore.userInfo.userId)) {
    tool.toast({ content: "您还没有登录!", type: "error" })
    setTimeout(() => {
      router.push("/login")
    }, 1500);
    return
  }
  collect_show.value = true
}

// 收藏弹窗新建歌单处理
const clickNewlyBuilt = () => {
  show_new_window.value = true
}
// 新建歌单窗口取消
const newPlaylistCancel = () => {
  collect_show.value = true
}
// 新建歌单窗口完成
const newPlaylistFinish = (pid: number) => {
  handlePlaylist({
    op: 'add',
    pid,
    tracks: prop.musicId
  }).then((res: any) => {
    tool.toast({ type: "success", content: "已收藏到歌单!" })
  })
}


// 下一首播放
const nextSong = () => {
  songStore.nextSong(prop.musicId).then(_ => {
    tool.toast({ content: "已添加到下一首播放" })
    close()
  })
}

// 点击分享
const clickShare = () => {
  emit('update:show', false)
  shareOption.value.desc = music.value?.alia[0] || ""
  shareOption.value.title = `${music.value?.name}-${music.value?.ar[0].name}` || ""
  shareOption.value.link = "https://www.baidu.com"
  console.log(shareOption.value, "拉开距离看见");
  share_show.value = true
}
</script>

<style scoped lang="scss">
.window {
  border-radius: 20px 20px 0 0;

  &_main {
    .fun_item {
      display: flex;
      align-items: center;
      padding: 10px 0;
      color: #333;
      font-size: 14px;
      font-weight: 500;

      span {
        margin-left: 10px;
      }

      .singer {
        span:nth-child(n+2) {
          margin-left: 0;
        }
      }
    }
  }
}
</style>