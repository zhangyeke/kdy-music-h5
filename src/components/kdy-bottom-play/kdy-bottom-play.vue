<!--
 * @Author: your name
 * @Date: 2022-04-07 20:35:32
 * @LastEditTime: 2023-02-26 20:14:36
 * @LastEditors: 可达鸭 997610780@qq.com
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \zyk-music-h5\src\components\kdy-bottom-play\kdy-bottom-play.vue
-->
<template>
  <div class="relative" v-if="songStore.songList.length">
    <div class="audio ">
      <kdyAudio ref="kdy_audio" @ended="playEnd" @timeupdate="timeupdate" :loop="songStore.cycleIndex == 2"
        :autoplay="songStore.songList.length > 0 && !songStore.paused" :muted="!songStore.songList.length"
        :src="songStore.curSongUrl" :currentTime="currentTime" @loadedmetadata="loadedmetadata"
        @canplaythrough="canplaythrough"></kdyAudio>
    </div>

    <div class="player flex items-center border_t_solid_1" v-ripple :style="[{ backgroundColor: bgColor, }]"
      @click="router.push({ name: 'songDetail', params: { id: songStore.curSong.id } })">
      <img class="music_poster" :class="{ animation_paused: songStore.paused }" :src="songStore.curSong.al.picUrl" />
      <div class="music truncate">
        <span class="music_name">{{ songStore.curSong.name }}</span>
        <span class="mx-5px">-</span>
        <span class="music_author" v-for="(author, idx) in songStore.curSong.ar" :key="idx"><span
            v-if="idx > 0">/</span>{{ author.name }}</span>
      </div>
      <!-- 播放按钮 -->
      <div class="player_btn rounded-1/2" v-ripple @click.stop="clickPlayHandle">
        <var-progress :value="songStore.progress" mode="circle" :size="25" :line-width="1" :label="true">
          <template #>
            <div class="flex items-center ">
              <var-icon namespace="kdy-icon" :name="songStore.paused ? 'bofang' : '24gf-pause2'" :size="tool.px2vw(5)" />
            </div>
          </template>
        </var-progress>
      </div>
      <div class="list_btn" @click.stop="openPlayList">
        <var-icon namespace="kdy-icon" name="bofangliebiao" :size="tool.px2vw(20)" />
      </div>
    </div>

  </div>
</template>
<script setup lang="ts">
import kdyAudio from "@/components/kdy-audio/kdy-audio.vue"
import useSongStore from "@/store/song"
import mitt from "@/assets/lib/bus"

let songStore = useSongStore()
let prop = defineProps({
  bgColor: {
    type: String,
    default: 'rgba(255,255,255,.8)'
  },

})
let router = useRouter()
let emit = defineEmits(['openPopup'])
let tool = useTool()

// 播放器组件
let kdy_audio = ref<typeof kdyAudio | null>(null)

let currentTime = ref(songStore.currentTime)

// 点击播放按钮处理
const clickPlayHandle = () => {
  if (songStore.paused) {
    songStore.getSong(songStore.curSong.id)
    kdy_audio.value?.play()
  } else {
    kdy_audio.value?.pause()
  }
  songStore.setSongPaused(!songStore.paused)
}

//创建监听播放事件
const playAudio = () => {
  mitt.on("playAudio", () => {
    kdy_audio.value?.play()
  });
}
// 监听暂停事件
const pausedAudio = () => {
  mitt.on("pausedAudio", () => {
    kdy_audio.value?.pause()
  })
}
const updateCurrentTime = () => {
  mitt.on("updateCurrentTime", () => {
    currentTime.value = songStore.currentTime
  })
}

// 音频元数据加载完成
const loadedmetadata = (e: any) => {
  songStore.duration = e.target.duration
  mitt.emit("musicLoadFinish")
  // console.log(e,"音频元素",songStore.duration);
}
// 已经可以在不暂停的前提下将媒体播放到结束。
const canplaythrough = (e: any) => {

  playAudio()
  pausedAudio()
  updateCurrentTime()
}


// 播放结束
const playEnd = (e: any) => {
  songStore.progress = 0
  if (songStore.cycleIndex == 0) {
    songStore.loopPlay()
    return
  }
  if (songStore.cycleIndex == 1) {
    songStore.randomPlay()
  }
}

// 进度监听
const timeupdate = (e: any) => {
  songStore.currentTime = e.target.currentTime
  if (songStore.isCalcProgress) {
    songStore.progress = calcProgress(songStore.duration, e.target.currentTime)
  }
}
// 计算进度
const calcProgress = (total: number, cur_time: number) => {
  return (cur_time / total) * 100
}

const openPlayList = () => {
  emit('openPopup')
}


// defineExpose
</script>

<style scoped lang="scss">
.audio {
  @apply w-full h-full left-0 top-0 absolute opacity-0 overflow-hidden;
  z-index: -1;
}

.player {

  padding: 5px 20px;

  .list_btn {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 20px;
  }


  .music {
    flex:1;
    margin-left: 8px;
    vertical-align: middle;
    font-size: 10px;
    color: #666;
    margin-right: 30px;

    &_name {
      font-size: 14px;
      font-weight: 700;
      color: var(--color-text);
    }
  }

  .music_poster {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    border: 5px solid #000;
    @include rotating(0, 360, 10);
  }
}
</style>