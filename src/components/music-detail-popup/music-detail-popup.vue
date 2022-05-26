<!--
 * @Author: your name
 * @Date: 2022-03-24 17:47:16
 * @LastEditTime: 2022-05-26 16:44:05
 * @LastEditors: [you name]
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \zyk-music-h5\template.vue
-->
<template>
  <div>
    <var-style-provider :style-vars="{ '--popup-content-background-color': 'transparent' }">
      <var-popup :show="show" position="bottom" @close="close" @open="open" @click-overlay="close">
        <div class="window px-15px bg-white">
          <div class="window_head py-15px flex border_b_solid_1">
            <img :src="music?.al.picUrl" class="w-50px rounded-10px">
            <div class="flex-1 ml-10px font-500">
              <div class="text-[#333] text-14px">
                歌曲：{{ music?.name }}{{ music?.alia[0] }}
              </div>
              <div class="text-[#999] text-12px mt-10px">{{ music?.ar[0].name }}</div>
            </div>
          </div>

          <div class="window_main">
            <div class="fun_item" v-ripple @click="nextSong">
              <var-icon name="bofang1" namespace="kdy-icon" color="#333" :size="tool.px2vw(20)" />
              <span>下一首播放</span>
            </div>
            <div class="fun_item" v-ripple>
              <var-icon name="tianjiashoucang" namespace="kdy-icon" color="#333" :size="tool.px2vw(20)" />
              <span>收藏到歌单</span>
            </div>
            <div class="fun_item" v-ripple>
              <var-icon name="message-text-outline" color="#333" :size="tool.px2vw(20)" />
              <span>评论({{ comment_count }})</span>
            </div>
            <div class="fun_item" v-ripple>
              <var-icon name="w_zhiyuan" color="#333" namespace="kdy-icon" :size="tool.px2vw(20)" />
              <span>歌手：{{ music?.ar[0].name }}</span>
            </div>
            <div class="fun_item" v-ripple v-if="music?.al">
              <var-icon name="zhuanjiguangpan" color="#333" namespace="kdy-icon" :size="tool.px2vw(20)" />
              <span>专辑：{{ music.al.name }}</span>
            </div>
            <div class="fun_item" v-ripple >
              <var-icon name="fenxiang" color="#333" namespace="kdy-icon" :size="tool.px2vw(20)" />
              <span>分享</span>
            </div>
          </div>
        </div>
      </var-popup>
    </var-style-provider>
  </div>
</template>
<script setup lang="ts">
import { getMusicDetail, getMusicComment } from "@/api/public/music";
import { Song } from "@/types/song";
import useSongStore  from "@/store/song";
let prop = withDefaults(defineProps<{
  show: boolean,
  musicId: number,
}>(), {
  musicId: 0
})

let emit = defineEmits(['update:show', 'close'])
let tool = useTool()
let songStore = useSongStore()

let music = ref<Song>()
// 评论总数
let comment_count = ref(0)
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

// 下一首播放
const nextSong = ()=>{
  console.log(prop.musicId,"歌曲id");

  songStore.nextSong(prop.musicId)
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
    }
  }
}
</style>