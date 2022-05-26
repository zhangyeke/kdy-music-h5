<!--
 * @Author: your name
 * @Date: 2022-04-07 20:35:32
 * @LastEditTime: 2022-05-20 22:29:22
 * @LastEditors: [you name]
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \zyk-music-h5\src\components\kdy-bottom-play\kdy-bottom-play.vue
-->
<template>
  <div class="relative" v-if="songStore.songList.length">
    <div class="audio">
      <kdyAudio ref="kdy_audio" @ended="playEnd" @timeupdate="timeupdate" :loop="songStore.cycleIndex == 2"
        :autoplay="songStore.songList.length > 0" :muted="!songStore.songList.length" :src="songStore.curSongUrl"
        @loadedmetadata="loadedmetadata" @canplaythrough="canplaythrough"></kdyAudio>
    </div>

    <div class="player" v-ripple :style="[{ backgroundColor: bgColor, }]">
      <img class="music_poster" :class="{ suspend: songStore.paused }" :src="songStore.curSong.al.picUrl" />
      <div class="music truncate">
        <span class="music_name">{{ songStore.curSong.name }}</span>
        <span class="mx-5px">-</span>
        <div>
          <span class="music_author" v-for="(author, idx) in songStore.curSong.ar" :key="idx"><span
              v-if="idx > 0">/</span>{{ author.name }}</span>
        </div>
      </div>
      <div class="player_btn rounded-1/2" v-ripple @click="clickPlayHandle">
        <var-progress :value="progress" mode="circle" :size="25" :line-width="1" :label="true">
          <template #>
            <div class="flex items-center">
              <var-icon namespace="kdy-icon" :name="songStore.paused ? 'bofang' : '24gf-pause2'" size="5" />
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
              <span class="text-[#999] text-12px">({{ songStore.songList.length }})</span>
            </div>
            <div class="tool_bar flex justify-between mt-10px">
              <div class="flex items-center" @click="toggleCycle" v-ripple>
                <var-icon namespace="kdy-icon" :name="cycle_types[songStore.cycleIndex].icon" />
                <span class="text-14px text-[#333] ml-5px">{{ cycle_types[songStore.cycleIndex].name }}</span>
              </div>
              <div class="flex items-center">
                <div v-for="(item, index) in tool_bars" :key="index" class="mr-15px" v-ripple>
                  <div @click="toolHandle(index)">
                    <var-icon namespace="kdy-icon" :name="item.icon" :size="tool.px2vw(20)" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="popup_body flex-1 overflow-y-scroll mt-10px  px-15px">
            <div class="song_list">
              <div v-for="(item, index) in songStore.songList" :key="item.id" v-ripple
                class="song_item flex items-center justify-between mb-10px text-[#333] font-500"
                :class="{ 'text-primary': item.id == songStore.curSong.id }" @click="playMusic(item.id)">
                <div class="song_item_left w-9/12 truncate flex items-center">
                  <var-icon namespace="kdy-icon" name="zhuzhuangtu" color="var(--color-primary)" :size="tool.px2vw(20)"
                    v-if="item.id == songStore.curSong.id" />
                  <span class="ml-5px text-13px">{{ item.name }}</span>

                  <div class="text-[#666] text-12px" :class="{ 'text-primary': item.id == songStore.curSong.id }"
                    v-for="(author, i) in item.ar" :key="i">
                    <span class="mx-5px">-</span>
                    <span>{{ author.name }}</span>
                  </div>

                </div>
                <div class="song_item_right" v-ripple>
                  <div @click.stop="songStore.deleteSong(item.id)">
                    <var-icon name="window-close" color="#666" :size="tool.px2vw(25)" />
                  </div>
                </div>
              </div>
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
import useSongStore from "@/store/song"
import mitt from "@/assets/lib/bus"
import { Dialog } from '@varlet/ui'
import { relative } from "path";
let songStore = useSongStore()

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
    value: 3,
  }
])

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

// 点击播放按钮处理
const clickPlayHandle = () => {
  if (songStore.paused) {
    kdy_audio.value?.play()
  } else {
    kdy_audio.value?.pause()
  }
  songStore.setSongPaused(!songStore.paused)
}

//创建监听事件
const playAudio = () => {
  mitt.on("playAudio", () => {
    kdy_audio.value?.play()
  });

}

// 音频元数据加载完成
const loadedmetadata = (e: any) => {
  audio_length.value = e.target.duration
  return
}
// 已经可以在不暂停的前提下将媒体播放到结束。
const canplaythrough = (e: any) => {
  playAudio()
}


// 播放结束
const playEnd = (e: any) => {
  progress.value = 0
  if (songStore.cycleIndex == 0) {
    loopPlay()
    return
  }
  if (songStore.cycleIndex == 1) {
    randomPlay()
  }
}

// 歌单循环播放
const loopPlay = () => {
  // 播放下一首
  if (songStore.songList.findIndex((item: any) => item.id == songStore.curSong.id) != (songStore.songList.length - 1)) {
    let nextIndex = songStore.songList.findIndex((item: any) => item.id == songStore.curSong.id) + 1
    songStore.getSongUrl(songStore.songList[nextIndex].id)
    songStore.curSong = songStore.songList[nextIndex]
  } else {
    // 回到第一首
    songStore.getSongUrl(songStore.songList[0].id)
    songStore.curSong = songStore.songList[0]
  }
  console.log("循环播放");

}

// 歌单随机播放
const randomPlay = () => {
  if (songStore.songList.length < 2) return
  let max = songStore.songList.length
  let randomIndex = Math.floor(Math.random() * max)
  if (randomIndex == songStore.songList.findIndex((item: any) => item.id == songStore.curSong.id)) {
    randomPlay()
  } else {
    songStore.getSongUrl(songStore.songList[randomIndex].id)
    songStore.curSong = songStore.songList[randomIndex]
  }
  console.log("随机播放");
}

// 歌曲循环切换
const toggleCycle = () => {
  if (songStore.cycleIndex != (cycle_types.value.length - 1)) {
    songStore.setCycle(++songStore.cycleIndex)
  } else {
    songStore.setCycle(0)
  }
}

// 弹窗播放音乐
const playMusic = (id: number) => {
  songStore.getSong(id)
}

// 进度监听
const timeupdate = (e: any) => {
  progress.value = calcProgress(audio_length.value, e.target.currentTime)
}
// 计算进度
const calcProgress = (total: number, cur_time: number) => {
  return (cur_time / total) * 100
}

// 工具栏处理 下载 收藏 清空
const toolHandle = (i: number) => {
  if (i == 2) {
    showSongList.value = false
    Dialog({
      title: "",
      message: '确定要清空播放列表？',
      confirmButtonText: "清空",
      cancelButtonTextColor: "#666",
      onConfirm: () => {
        songStore.clearSongList()
      },
      onCancel: () => {
        showSongList.value = true
      }
    })
  }
}


</script>

<style scoped lang="scss">
.song {
  border-radius: 20px 20px 0 0;
}

.audio {
  @apply w-full h-full left-0 top-0 absolute opacity-0 overflow-hidden;
  z-index: -1;
}

.player {
  display: flex;
  align-items: center;
  padding: 5px 20px;
  box-shadow: 0 -1px 10px #ccc;
  .list_btn {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 20px;
  }


  .music {
    display: flex;
    flex: 1 1 0%;
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
    animation: rotating 10s linear infinite;

    &.suspend {
      animation-play-state: paused;
    }

    @keyframes rotating {
      0% {}

      100% {
        transform: rotate(360deg);
      }
    }
  }
}
</style>