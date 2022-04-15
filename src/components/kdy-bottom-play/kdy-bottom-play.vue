<!--
 * @Author: your name
 * @Date: 2022-04-07 20:35:32
 * @LastEditTime: 2022-04-15 17:54:32
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \zyk-music-h5\src\components\kdy-bottom-play\kdy-bottom-play.vue
-->
<template>
  <div class="relative">
    <div class="audio">
      <kdyAudio ref="kdy_audio" @ended="playEnd" @timeupdate="timeupdate" @loadedmetadata="loadedmetadata"></kdyAudio>
    </div>

    <div class="player" :style="[{ backgroundColor: bgColor, }]">
      <img class="music_poster" :src="tool.getAssetsImages('image/kdy.png')" />
      <div class="music">
        <span class="music_name">歌曲名称</span>
        <span class="mx-5px">-</span>
        <span class="music_author">作者名字</span>
      </div>
      <div class="player_btn" @click="clickHandle">
        <var-progress :value="progress" mode="circle" :size="25" :line-width="1" :label="true">
          <template #>
            <div class="flex items-center">
              <var-icon namespace="kdy-icon" :name="paused ? 'bofang' : '24gf-pause2'" size="5" />
            </div>
          </template>
        </var-progress>
      </div>
      <div class="list_btn" @click="showSongList = true">
        <var-icon namespace="kdy-icon" name="bofangliebiao" :size="tool.px2vw(20)" />
      </div>
    </div>
    <var-style-provider :style-vars="{ '--popup-content-background-color': 'transparent' }">
      <var-popup v-model:show="showSongList" position="bottom">
        <div class="song h-400px bg-white  flex flex-col">
          <div class="popup_head py-10px px-15px">
            <div class="song_title">
              <span class="text-[#333] text-16px font-700 tracking-wide">当前播放</span>
              <span class="text-[#999] text-12px">(12)</span>
            </div>
            <div class="tool_bar flex justify-between mt-10px">
              <div class="flex items-center">
                <var-icon namespace="kdy-icon" :name="cycle_types[cycle_cur].icon" />
                <span class="text-14px text-[#333] ml-5px">{{ cycle_types[cycle_cur].name }}</span>
              </div>
              <div class="flex items-center">
                <div v-for="(item, index) in tool_bars" :key="index" class="mr-15px">
                  <var-icon namespace="kdy-icon" :name="item.icon" :size="tool.px2vw(20)" />
                </div>
              </div>
            </div>
          </div>
          <div class="popup_body flex-1 overflow-y-scroll mt-10px  px-15px">
            <div class="song_list">
              <div v-for="(item, index) in 15" :key="index">第{{item}}项</div>
            </div>
          </div>
          <div class="bg-warning-dark h-40px text-14px flex items-center px-20px">
            <span class="bg-[#000] rounded-10px py-3px px-10px  text-warning">vip</span>
            <span class="flex-1 ml-5px text-[#333]">含1首VIP专享歌曲</span>
            <span class="text-danger font-700">VIP首月3.8元</span>
          </div>
        </div>
      </var-popup>
    </var-style-provider>
  </div>
</template>
<script setup lang="ts">
import kdyAudio from "cmp/kdy-audio/kdy-audio.vue"
import useSongListStore from "@/store/songList"
let songListStore = useSongListStore()

songListStore.$state.id = 555
songListStore.id++
console.log(songListStore.id,"g'g'g");

// songListStore.$reset()
// console.log(songListStore.id);

let prop = defineProps({
  bgColor: {
    type: String,
    default: '#fff'
  },

})
let tool = useTool()
// 进度
let progress = ref(0)
// 音频的长度
let audio_length = ref(0)
// 播放器组件
let kdy_audio = ref<typeof kdyAudio | null>(null)
// 显示歌单
let showSongList = ref(false)
// 循环类型
let cycle_types = ref([
  {
    name: "列表循环",
    icon: "liebiaoxunhuan",
    value: 1,
  }, {
    name: "随机播放",
    icon: "suijibofang1",
    value: 2
  }, {
    name: "单曲循环",
    icon: "danquxunhuan",
    value: 1,
  }
])
// 单曲循环类型
let cycle_cur = 0

// 下载 收藏歌单 清空播放列表
let tool_bars = [
  {
    icon: "xiazai"
  },
  {
    icon: "tianjiashoucang"
  },
  {
    icon: "lajixiang"
  }
]

onMounted(() => {

})

let paused = ref(true)

const clickHandle = () => {
  if (paused.value) {
    kdy_audio.value?.play()
  } else {

    kdy_audio.value?.pause()
  }
  paused.value = !paused.value
}
// 音频元数据加载完成
const loadedmetadata = (e: any) => {
  audio_length.value = e.target.duration
}

// 播放结束
const playEnd = () => {
  console.log("播放结束");
  progress.value = 0
}
// 进度监听
const timeupdate = (e: any) => {
  progress.value = calcProgress(audio_length.value, e.target.currentTime)
}
// 计算进度
const calcProgress = (total: number, cur_time: number) => {
  return (cur_time / total) * 100
}


</script>

<style scoped lang="scss">
.song {
  border-radius: 20px 20px 0 0;
}

.audio {
  @apply absolute w-full left-0 top-0 z-index-0;
}

.player {
  display: flex;
  align-items: center;
  padding: 0 20px;

  .list_btn {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 20px;
  }


  .music {
    flex: 1 1 0%;
    margin-left: 8px;
    vertical-align: middle;
    font-size: 10px;

    color: #666;

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
    animation: rotating 10s linear infinite;

    @keyframes rotating {
      0% {}

      100% {
        transform: rotate(360deg);
      }
    }
  }
}
</style>