<!--
 * @Author: your name
 * @Date: 2022-03-24 17:47:16
 * @LastEditTime: 2023-02-06 16:20:01
 * @LastEditors: zyk 997610780@qq.com
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \zyk-music-h5\template.vue
-->
<template>
  <div class="page h-100vh  flex flex-col justify-center "
    :style="{ backgroundImage: `url(${songStore.curSong?.al.picUrl})` }">
    <div class="page_hd relative z-2 px-10px flex items-center pt-10px">
      <div @click="router.back()">
        <var-icon name="chevron-down" :size="tool.px2vw(32)" color="#ccc" />
      </div>
      <div class="text-white flex-1 text-center">
        <div class="text-15px truncate ">{{ songStore.curSong?.name }}</div>
        <div class="text-[#999] text-12px mt-5px">
          <span v-for="(ar, index) in songStore.curSong?.ar" :key="index">{{ ar.name }}<span
              v-if="(index < songStore.curSong.ar.length - 1)">/</span></span>
        </div>
      </div>
    </div>

    <div class="page_bd relative z-2 flex flex-1 justify-center  items-center" @click="openLyrics">
      <div v-if="an_lyrics" class="w-full">
        <lyric-roll :list="lyrics_list" v-if="lyrics_list.length" ref="lyricRollCmp" :key="lyricRollCmpKey"></lyric-roll>
        <div v-else class="text-[#7e7e7e] font-700 text-16px">加载中</div>
      </div>

      <div class="song_poster relative w-200px h-200px" v-else="!an_lyrics">
        <template class="absolute h-full w-full" v-for="(item, index) in ripple_ls" :key="index">
          <div class="halo w-full h-full" v-show="item.show" :style="{ 'animation-delay': `${index + 0.3}s` }"></div>
        </template>

        <img :src="songStore.curSong?.al.picUrl" :alt="songStore.curSong?.name"
          :class="{ animation_paused: songStore.paused }"
          class="song_poster_img rounded-1/2 w-full h-full fit_cover border-3px border-[#333]">
      </div>
    </div>

    <div class="page_ft relative z-2 pb-20px px-20px">
      <div class="page_ft_top flex justify-around">
        <!-- 是否收藏 -->
        <div>
          <var-icon name="heart-outline" color="#ccc" :size="tool.px2vw(26)" />
        </div>
        <!-- 评论 -->
        <div @click="router.push({ name: 'comment', params: { id: songStore.curSong.id, type: 0 } })">
          <var-icon name="message-text-outline" color="#ccc" :size="tool.px2vw(26)" />
        </div>
        <!-- 歌曲详情 -->
        <div>
          <var-icon namespace="kdy-icon" name="androidgengduo" color="#ccc" :size="tool.px2vw(26)"></var-icon>
        </div>
      </div>
      <!-- 进度条 -->
      <div class="py-20px relative text-white text-14px flex items-center">
        <!-- <var-progress :value="songStore.progress" :line-width="2" /> -->
        <span class="mr-10px">{{ currentTime }}</span>
        <div class="flex-1">
          <var-slider v-model="songStore.progress" @start="progressStart" @change="progressChange" @end="progressEnd" active-color="#fff" track-color="#f8f8f8">
            <template #button="{ currentValue }">
              <div class="w-12px h-12px bg-white rounded-1/2" :class="{ drag: !songStore.isCalcProgress }">
              </div>
            </template>
          </var-slider>
        </div>
        <span class="ml-10px">{{ duration }}</span>

      </div>
      <div class="page_ft_bottom flex justify-around items-center">
        <!-- 播放顺序 -->
        <div @click="toggleCycle" ripple>
          <var-icon namespace="kdy-icon" :size="tool.px2vw(24)" :name="cycle_types[songStore.cycleIndex].icon"
            color="#fff" />
        </div>
        <!-- 上一首 -->
        <div @click="playHandle('prve')">
          <var-icon namespace="kdy-icon" :size="tool.px2vw(24)" name="shangyishoushangyige" color="#fff" />
        </div>
        <!-- 暂停或播放 -->
        <div class="w-48px h-48px border-1 border-[#fff] rounded-1/2 flex justify-center items-center" v-ripple
          @click="playHandle()">
          <var-icon namespace="kdy-icon" :size="tool.px2vw(20)"
            :name="songStore.paused ? 'bofang' : 'shipinbofangshizanting'" color="#fff" />
        </div>
        <!-- 下一首 -->
        <div @click="playHandle('next')">
          <var-icon namespace="kdy-icon" :size="tool.px2vw(24)" name="xiayigexiayishou" color="#fff" />
        </div>
        <!-- 播放的歌单 -->
        <div @click="openPlayList">
          <var-icon namespace="kdy-icon" :size="tool.px2vw(24)" name="bofangliebiao" color="#fff" />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { getLyrics } from "@/api/public/music"
import { Lyric } from "@/types/song"
import useSongStore from "@/store/song"
import mitt from "@/assets/lib/bus"
import lyricRoll from "./components/lyric-roll/lyric-roll.vue"
let tool = useTool()
let router = useRouter()
let songStore = useSongStore()
let route = useRoute()

// 歌曲id
let musicId = (route.params.id as number | string)
// 是否展开歌词
let an_lyrics = ref(false)
// 歌词列表
let lyrics_list = ref<Lyric[]>([])
// 歌曲总时长
let duration = ref(tool.getTime(songStore.duration * 1000).time)
// 歌曲已播放时长
let currentTime = ref(tool.getTime(songStore.currentTime * 1000).time)
// 歌词滚动组件
let lyricRollCmp = ref<typeof lyricRoll | null>(null)
// 歌词滚动组件的key 用于更新歌词
let lyricRollCmpKey = ref('lyricRoll')

watch(() => songStore.currentTime, (v) => {
  currentTime.value = tool.getTime(v * 1000).time
})
watch(() => songStore.duration, (v) => {
  duration.value = tool.getTime(v * 1000).time
})



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

let ripple_ls = ref<any>([])
for (let i = 0; i < 3; i++) {
  ripple_ls.value.push({ show: !songStore.paused })
}


// 歌曲循环切换
const toggleCycle = () => {
  if (songStore.cycleIndex != (cycle_types.value.length - 1)) {
    songStore.setCycle(++songStore.cycleIndex)
  } else {
    songStore.setCycle(0)
  }
}
// 进度条进度变换
const progressChange = ()=>{

}

// 进度条拖动结束
const progressEnd = (v: number | number[]) => {
  songStore.isCalcProgress = true
  lyricRollCmp.value?.progressBarDrag()
  songStore.currentTime = ((v as number) / 100) * songStore.duration
  mitt.emit('updateCurrentTime')
}
// 进度条拖动开始
const progressStart = () => {
  songStore.isCalcProgress = false
}
// 打开歌词
let openLyrics = () => {
  an_lyrics.value = !an_lyrics.value
}

const getMusicLyrics = async () => {
  let res: any = await getLyrics(songStore.curSong.id)
  lyrics_list.value = lyricsHandle(res.lrc.lyric)
  console.log(lyrics_list.value);
}
// 获取歌词开唱时间
const getLyricsStartTime = (item: string) => {
  let time_arr = item.replace(/\[|]/g, '').split(':')
  let m = parseInt(time_arr[0]) * 60
  let s = parseFloat(time_arr[1])
  return s + m
}

// 歌词的处理
const lyricsHandle = (lyric: string): Lyric[] => {
  let list: string[][] = []
  let reg = /([[\d{2}:\d{2}\.\d{2,3}]+])/g;
  lyric.split('\n').forEach(item => {
    item = item.replace(/\s+/g, '')
    list.push(item.split(reg).filter(item => item != ''))
  })

  let lyrics_list: Lyric[] = []

  list.forEach((item, index) => {
    let start_time = 0;
    let duration = 0;
    if (item[0]) {
      start_time = getLyricsStartTime(item[0])
    }
    if (index != 0 && index < list.length - 2) {
      duration = parseFloat((getLyricsStartTime(list[index + 1][0]) - start_time).toFixed(2))
    }
    if (index == list.length - 2) {
      duration = parseFloat((songStore.duration - start_time).toFixed(2))
    }
    
    let obj: Lyric = {
      time: item[0],
      txt: item[1],
      start_time,
      duration,
    }
    obj.txt && lyrics_list.push(obj)
  })
  return lyrics_list
}
// 播放或暂停处理
const playHandle = (action?: string) => {
  if (action) {
    switch (action) {
      case 'next':
        songStore.playNext()
        break;
      case 'prve':
        songStore.playPrve()
        break;
    }
    songStore.startPlay()
    return
  }

  if (songStore.paused) {
    songStore.startPlay()
  } else {
    songStore.pausePlay()
  }
  delayHide()
}

// 波纹延迟隐藏
const delayHide = () => {
  ripple_ls.value.forEach((item: { show: boolean }, index: number) => {
    if (songStore.paused) {
      setTimeout(() => {
        item.show = false
      }, (index * 1000) + 300);
    } else {
      item.show = true
    }
  });
}

// 打开播放列表
const openPlayList = () => {
  mitt.emit('openPlayList')
}

const onPlayEnd = ()=>{
  mitt.on('playEnd',()=>{
    getMusicLyrics()
    lyricRollCmpKey.value += new Date().getTime()
  })
}
onPlayEnd()
getMusicLyrics()
</script>

<style scoped lang="scss">
.page {
  background-position: top left;

  &::after {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    backdrop-filter: blur(20px);
    z-index: 0;
  }

  .drag {
    transform: scale(1.3);
    box-shadow: 0 0 5px rgba(#fff, .8);
    transition: transform linear .25s;
  }

  &_bd {
    .song_poster {
      .halo {
        position: absolute;
        left: 0;
        top: 0;
        border: 1px solid rgba(#ccc, .8);
        border-radius: 50%;
        animation: haloScale 3s linear infinite;

        @keyframes haloScale {
          0% {
            opacity: 1;
            transform: scale(1);
          }

          100% {
            opacity: 0;
            transform: scale(1.5);
          }
        }
      }

      &_img {
        @include rotating(0, 360, 10);
      }

    }

  }
}
</style>