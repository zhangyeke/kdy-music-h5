<!--
 * @Author: your name
 * @Date: 2022-04-07 20:35:32
 * @LastEditTime: 2022-04-12 18:00:14
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \zyk-music-h5\src\components\kdy-bottom-play\kdy-bottom-play.vue
-->
<template>
  <div>
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
      <div class="list_btn">
        <var-icon namespace="kdy-icon" name="bofangliebiao" :size="tool.px2vw(20)" />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import kdyAudio from "cmp/kdy-audio/kdy-audio.vue"
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
let kdy_audio = ref<typeof kdyAudio | null>(null)

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
const loadedmetadata = (e:any)=>{
  audio_length.value = e.target.duration
}

// 播放结束
const playEnd = () => {
  console.log("播放结束");
  progress.value = 0
}
// 进度监听
const timeupdate = (e:any)=>{
  progress.value = calcProgress(audio_length.value,e.target.currentTime)
}
// 计算进度
const calcProgress = (total:number,cur_time:number)=>{
  return (cur_time/total)*100
}


</script>

<style scoped lang="scss">
.audio {
  // opacity: 0;
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