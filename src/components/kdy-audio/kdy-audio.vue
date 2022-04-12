<template>
  <div class="h-50px">
    <audio id="kdy-audio" ref="kdyAudio" :src="src" :autoplay="autoplay" :controls="controls" :preload="preload"
      @play="play" @pause="pause" @loadedmetadata="loadedmetadata" @ended="ended" @playing="playing" @suspend="suspend"
      @timeupdate="timeupdate"></audio>
  </div>
</template>
<script setup lang="ts">
let kdyAudio = ref<HTMLAudioElement | null>(null)

let prop = defineProps({
  // 是否自动播放
  autoplay: {
    type: Boolean,
    default: false,
  },
  // 显示音频控制器
  controls: {
    type: Boolean,
    default: false,
  },
  // 多媒体资源路径
  src: {
    type: String,
    default: 'http://m7.music.126.net/20220412160423/6274d6d178245e6628764e60636e08fe/ymusic/1f48/8f31/0b55/abad2e435556a785187b8588140f0a2d.mp3'
  },
  // 音频加载方式
  preload: {
    type: String,
    default: "auto",//可选none：该音频不会被缓存 metadata：示意即使用户可能不会播放该音频，但获取元数据 (例如音频长度) 还是有必要的。 auto
  },
})

let emit = defineEmits(['ended', 'playing', 'loadedmetadata','timeupdate'])

onMounted(() => {
  
})

// 播放
const play = () => {
  kdyAudio.value?.play()
}
//暂停
const pause = () => {
  kdyAudio.value?.pause()
}


// 媒体加载挂起。
const suspend = (e: any) => {
  // console.log(e, "	媒体加载挂起。");
}

// 进度监听
const timeupdate = (el:any) => {
  emit('timeupdate',el)
}

//播放结束
const ended = () => {
  emit('ended')
}
// 当播放准备开始时(之前被暂停或者由于数据缺乏被暂缓)被触发 
const playing = (e: any) => {
  emit('ended', e)
}
// 元数据加载完成。
const loadedmetadata = (e: any) => {
  if (e.returnValue) {
    emit('loadedmetadata',e)
  }
}
// 暴露给父组件的数据
defineExpose({
  play,
  pause,
})
</script>

<style scoped lang="scss">
</style>