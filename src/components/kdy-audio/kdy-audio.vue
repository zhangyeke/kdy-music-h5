<!--
 * @Author: zyk 997610780@qq.com
 * @Date: 2022-06-27 16:49:17
 * @LastEditors: zyk 997610780@qq.com
 * @LastEditTime: 2023-02-02 10:15:31
 * @FilePath: \zyk-music-h5\src\components\kdy-audio\kdy-audio.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="h-full">
    <audio id="kdy-audio" ref="kdyAudio" :src="src" :autoplay="autoplay" :controls="controls" :preload="preload"
      @play="play" @pause="pause" :loop="loop" @loadedmetadata="loadedmetadata" @ended="ended" @playing="playing"
      @suspend="suspend" @timeupdate="timeupdate" @canplaythrough="canplaythrough" :muted="muted" :currentTime="currentTime"></audio>
  </div>
</template>
<script setup lang="ts">
let kdyAudio = ref<HTMLAudioElement | null>(null)

let prop = defineProps({
  // 是否静音
  muted:{
    type: Boolean,
    default: true,
  },
  // 是否自动播放
  autoplay: {
    type: Boolean,
    default: false,
  },
  //是否循环播放
  loop: {
    type: Boolean,
    default: false,
  },
  // 显示音频控制器
  controls: {
    type: Boolean,
    default: true,
  },
  // 多媒体资源路径
  src: {
    type: String,
    default: ''
  },
  // 音频加载方式
  preload: {
    type: String,
    default: "auto",//可选none：该音频不会被缓存 metadata：示意即使用户可能不会播放该音频，但获取元数据 (例如音频长度) 还是有必要的。 auto
  },
  // 当前播放进度
  currentTime:{
    type:Number,
    default:0
  }
})

let emit = defineEmits(['ended', 'playing', 'loadedmetadata', 'timeupdate','canplaythrough'])

// 播放
const play = () => {
  kdyAudio.value?.play()
}
//暂停
const pause = (e: any) => {
  kdyAudio.value?.pause()
}

// 媒体加载挂起。
const suspend = (e: any) => {
  // console.log(e, "	媒体加载挂起。");
}

// 进度监听
const timeupdate = (el: any) => {
  emit('timeupdate', el)
}

//播放结束
const ended = (e: any) => {
  emit('ended', e)
}
// 当播放准备开始时(之前被暂停或者由于数据缺乏被暂缓)被触发 
const playing = (e: any) => {
  emit('playing', e)
}
// 元数据加载完成。
const loadedmetadata = (e: any) => {
  if (e.returnValue) {
    emit('loadedmetadata', e)
  }
}
// 浏览器预测已经可以在不暂停的前提下将媒体播放到结束。
const canplaythrough = (e:any) =>{
  emit('canplaythrough',e)
}

// 暴露给父组件的数据
defineExpose({
  play,
  pause,
})
</script>

<style scoped lang="scss">
</style>