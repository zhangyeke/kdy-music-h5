<!--
 * @Author: your name
 * @Date: 2022-03-24 17:47:16
 * @LastEditTime: 2023-03-13 20:15:45
 * @LastEditors: 可达鸭 997610780@qq.com
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \zyk-music-h5\template.vue
-->
<template>
  <!-- :style="{ backgroundImage: `url(${songStore.curSong?.al.picUrl})` }"> -->
  <div class="page h-100vh  flex flex-col justify-center">
    <div class="page_bg " :style="{ backgroundImage: `url(${tool.getAssetsImages('image/song_detail_bg.jpg')})` }"></div>
    <div class="page_hd relative z-2 px-10px flex items-center pt-10px">
      <div @click="router.back()">
        <var-icon name="chevron-left" :size="tool.px2vw(32)" color="#ccc" />
      </div>
      <div class="text-white flex-1 text-center">
        <div class="text-15px truncate_2 ">{{ songStore.curSong?.name }}</div>
        <div class="text-[#ddd] text-12px mt-5px">
          <span v-for="(ar, index) in songStore.curSong?.ar" :key="index">{{ ar.name }}<span
              v-if="(index < songStore.curSong.ar.length - 1)">/</span></span>
        </div>
      </div>
      <!-- 评论 -->
      <div @click="router.push({ name: 'comment', params: { id: songStore.curSong.id, type: 0 } })" class="mr-7px">
        <var-icon name="message-text-outline" color="#ccc" :size="tool.px2vw(24)" />
      </div>
    </div>

    <div class="page_bd relative z-2 flex flex-1 justify-center  items-center" @click="openLyrics">
      <div v-if="an_lyrics" class="w-full">
        <lyric-roll class="px-20px" :list="lyrics_list" v-if="lyrics_list.length" ref="lyricRollCmp"
          :key="lyricRollCmpKey"></lyric-roll>
        <div v-else class="text-center">
          <var-loading type="wave" description="加载中"></var-loading>
        </div>
      </div>

      <div class="song_poster" v-else="!an_lyrics">
        <template class="absolute h-full w-full" v-for="(item, index) in ripple_ls" :key="index">
          <div class="halo w-full h-full" v-show="item.show" :style="{ 'animation-delay': `${index + 0.3}s` }"></div>
        </template>

        <img :src="songStore.curSong?.al.picUrl" :alt="songStore.curSong?.name"
          :class="{ animation_paused: songStore.paused }"
          class="song_poster_img rounded-1/2 w-full h-full fit_cover border-3px border-[#333]">
      </div>
    </div>

    <div class="page_ft relative z-2 pb-20px px-20px">
      <!-- 进度条 -->
      <div class="py-20px relative text-white text-14px flex items-center">
        <!-- <var-progress :value="songStore.progress" :line-width="2" /> -->
        <span class="mr-10px">{{ currentTime }}</span>
        <div class="flex-1">
          <var-slider v-model="songStore.progress" @start="progressStart" @change="progressChange" @end="progressEnd"
            active-color="#fff" track-color="#f8f8f8">
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
const progressChange = () => {

}

// 进度条拖动结束
const progressEnd = (v: number | number[]) => {
  songStore.isCalcProgress = true
  songStore.currentTime = ((v as number) / 100) * songStore.duration
  lyricRollCmp.value?.resetLine()
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
  lyrics_list.value = lyrHandle(res.lrc.lyric)
  console.log(lyrHandle(res.lrc.lyric), "歌词列表");

}
// 获取歌词开唱时间
const getLyricsStartTime = (item: string) => {
  let time_arr = item.replace(/\[|]/g, '').split(':')
  let m = parseInt(time_arr[0]) * 60
  let s = parseFloat(time_arr[1])
  return s + m
}

// 歌词文本切割
const lyricsSplit = (str: string): string[] => {
  const regex = /"t":(-?\d+),"c":\[(.*)\]/g;
  let reg = /([[\d{2}:\d{2}\.\d{2,3}]+])/g;
  let resultArr: string[] = []
  let match;
  if (!!str.match(regex)) {
    while ((match = regex.exec(str)) !== null) {
      const t = match[1];
      const c = JSON.parse(`[${match[2]}]`);
      if (Array.isArray(c)) {
        let str = ""
        c.forEach(item => {
          str += item.tx
        })
        resultArr.push(`[${tool.formatTimestamp(Number(t))}]`)
        resultArr.push(str)
      }
    }
  } else if (!!str.match(reg)) {
    str = str.replace(/\s+/g, '')
    resultArr.push(...str.split(reg).filter(item => item != ''))
  }
  return resultArr
}

// 歌词处理
const lyrHandle = (str: string) => {
  const arr = str.split('\n'); // 将字符串按照换行符进行分割
  const resultArr: string[][] = []
  arr.forEach(item => {
    resultArr.push(lyricsSplit(item))
  })
  return lyricsArrHandle(resultArr)
}

// 歌词处理 以废弃
const lyricsHandle2 = (lyric: string) => {
  const regex = /"t":(\d+),"c":\[(.*)\]/g;
  let match;
  let arr: string[] = []
  let index = 0
  let reg = /\[[0-9]{2}:[0-9]{2}\.[0-9]{1,3}\]/;
  while ((match = regex.exec(lyric)) !== null) {
    index = match.index
    const t = match[1];
    const c = JSON.parse(`[${match[2]}]`);
    console.log(c);
    console.log(t);

    if (Array.isArray(c)) {
      let str = ""
      c.forEach(item => {
        str += item.tx
      })
      arr.push(`[${tool.formatTimestamp(Number(t))}]`)
      arr.push(str)
    }
  }
  let lyrics_list: string[][] = tool.blockSlice(arr)
  console.log(`前一段歌词`, arr);

  let ci = lyric.substring(index)
  match = reg.exec(ci)
  if (match !== null) index = match.index
  let lyrics_arr = lyricsHandle(ci.substring(index), false) as string[][]
  return lyricsArrHandle([...lyrics_list, ...lyrics_arr])
}

// 以废弃 歌词的处理 以[00:01.84]词：柯柯柯啊 开头 
const lyricsHandle = (lyric: string, is_handle: boolean = true): Lyric[] | string[][] => {
  let list: string[][] = []
  let reg = /([[\d{2}:\d{2}\.\d{2,3}]+])/g;
  lyric.split('\n').forEach(item => {
    item = item.replace(/\s+/g, '')
    list.push(item.split(reg).filter(item => item != ''))
  })
  if (is_handle) {
    return lyricsArrHandle(list)
  } else {
    return list
  }
}

// 歌词数组处理 比如：['[00:00.00]', '作词: 梦然']
const lyricsArrHandle = (list: string[][]): Lyric[] => {
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
        lyricRollCmp.value?.resetLine()
        songStore.playNext()
        break;
      case 'prve':
        lyricRollCmp.value?.resetLine()
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

// 监听音乐加载
const onMusicLoadFinish = () => {
  mitt.on('musicLoadFinish', () => {
    getMusicLyrics()
    updateKey()
  })
}

// 刷新歌词滚动组件key
const updateKey = () => {
  lyricRollCmpKey.value += new Date().getTime()
}


onMusicLoadFinish()
getMusicLyrics()
</script>

<style scoped lang="scss">
.page {
  // overflow: hidden;
  // background-position: top left;

  // &::after {
  //   content: "";
  //   position: absolute;
  //   left: 0;
  //   top: 0;
  //   width: 100%;
  //   height: 100%;
  //   backdrop-filter: blur(20px);
  //   z-index: 0;
  // }
  &_bg {
    position: absolute;
    background-position: center;
    background-size: cover;
    z-index: 1;
    width: 100%;
    height: 100vh;
  }


  .drag {
    transform: scale(1.3);
    box-shadow: 0 0 5px rgba(#fff, .8);
    transition: transform linear .25s;
  }

  &_bd {
    .song_poster {
      position: fixed;
      left: 50%;
      top: 50%;
      width: 200px;
      height: 200px;
      transform: translate(-52%, -51%);

      .halo {
        position: absolute;
        left: 0;
        top: 0;
        border: 1px solid #fff;
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