<!--
 * @Author: your name
 * @Date: 2022-03-24 17:47:16
 * @LastEditTime: 2022-12-09 11:28:10
 * @LastEditors: zyk 997610780@qq.com
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \zyk-music-h5\template.vue
-->
<template>
  <div class="page h-100vh bg-black flex flex-col justify-center ">
    <div class="page_hd px-10px flex items-center pt-10px">
      <div @click="router.back()">
        <var-icon name="chevron-down" :size="tool.px2vw(32)" color="#fff" />
      </div>
      <div class="text-white flex-1 text-center">
        <div class="text-15px truncate ">{{ songStore.curSong?.name }}</div>
        <div class="text-[#999] text-12px mt-5px">
          <span v-for="(ar, index) in songStore.curSong?.ar" :key="index">{{ ar.name }}<span v-if="(index<songStore.curSong.ar.length-1)">/</span></span>
        </div>
      </div>
    </div>

    <div class="page_bd flex flex-1 justify-center  items-center">
      <div class="song_poster relative w-200px h-200px">
        <template class="absolute h-full w-full" v-for="(item, index) in ripple_ls" :key="index">
          <div class="halo w-full h-full" v-show="item.show" :style="{ 'animation-delay': `${index + 0.3}s` }"></div>
        </template>

        <img :src="songStore.curSong?.al.picUrl" :alt="songStore.curSong?.name" :class="{ pause_status: songStore.paused }"
          class="song_poster_img rounded-1/2 w-full h-full fit_cover border-3px border-[#333]">
      </div>
    </div>

    <div class="page_ft pb-20px px-20px">
      <div class="page_ft_top flex justify-around">
        <div>
          <var-icon name="heart-outline" color="#ccc" :size="tool.px2vw(26)" />
        </div>
        <div>
          <var-icon name="message-text-outline" color="#ccc" :size="tool.px2vw(26)" />
        </div>
        <div>
          <var-icon namespace="kdy-icon" name="androidgengduo" color="#ccc" :size="tool.px2vw(26)"></var-icon>
        </div>
      </div>
      <div class="progress mt-20px">
        <var-progress :value="20" :line-width="1" />
      </div>
      <div class="page_ft_bottom flex justify-around items-center mt-20px">
        <!-- 播放顺序 -->
        <div @click="toggleCycle" ripple>
          <var-icon namespace="kdy-icon" :size="tool.px2vw(24)" :name="cycle_types[songStore.cycleIndex].icon"
            color="#fff" />
        </div>
        <!-- 上一首 -->
        <div @click="songStore.playPrve">
          <var-icon namespace="kdy-icon" :size="tool.px2vw(24)" name="shangyishoushangyige" color="#fff" />
        </div>
        <!-- 暂停或播放 -->
        <div class="w-40px h-40px border-1px border-[#fff] rounded-1/2 flex justify-center items-center" v-ripple
          @click="playHandle">
          <var-icon namespace="kdy-icon" :size="tool.px2vw(20)"
            :name="songStore.paused ? 'bofang' : 'shipinbofangshizanting'" color="#fff" />
        </div>
        <!-- 下一首 -->
        <div @click="songStore.playNext">
          <var-icon namespace="kdy-icon" :size="tool.px2vw(24)" name="xiayigexiayishou" color="#fff" />
        </div>
        <!-- 播放的歌单 -->
        <div>
          <var-icon namespace="kdy-icon" :size="tool.px2vw(24)" name="bofangliebiao" color="#fff" />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import useSongStore from "@/store/song"
import mitt from "@/assets/lib/bus"
let tool = useTool()
let router = useRouter()
let songStore = useSongStore()
let route = useRoute()
// 歌曲id
let songId = (route.params.id as number | string)

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



// 播放或暂停处理
const playHandle = () => {
  // songStore.getSong(songStore.curSongUrl)
  if (songStore.paused) {
    // kdy_audio.value?.play()
    mitt.emit('playAudio')
    songStore.setSongPaused(false)
  } else {
    mitt.emit('pausedAudio')
    songStore.setSongPaused(true)
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
// 播放上一首
const playPrevi = () => {
  
}


</script>

<style scoped lang="scss">
.page {
  &_bd {
    .song_poster {
      .pause_status {
        animation-play-state: paused;
      }

      .halo {
        position: absolute;
        left: 0;
        top: 0;
        border: 1px solid #ccc;
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