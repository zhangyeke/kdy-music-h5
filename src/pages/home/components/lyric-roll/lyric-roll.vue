<!--
 * @Author: zyk 997610780@qq.com
 * @Date: 2023-02-01 14:16:08
 * @LastEditors: zyk 997610780@qq.com
 * @LastEditTime: 2023-02-07 14:46:26
 * @FilePath: \zyk-music-h5\src\pages\home\components\lyric-roll\lyric-roll.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->

<template>
  <!--  -->
  <div class="lyric-roll" :class="{ 'no-lyric': list.length == 1 }" ref="lyricRollEl" @touchmove="lyricSlide"
    @touchend="slideEnd">
    <div class="lyric-list" ref="lyricListEl">
      <div v-for="(item, index) in props.list" :key="index" class="lyric-item" :class="{ highlight: index == cur_line }" :data-index="index">
        <span
          :style="[cur_line == index ? { animationDuration: `${cur_line_play_duration}s`, backgroundSize: `${cur_line_play_progress}% 100%` } : '']"
          :class="{ animation_paused: songStore.paused }">{{
            item.txt
          }}</span>
      </div>
    </div>
    <!-- <div class="lyric-roll-mask"></div> -->
  </div>
</template>
<script setup lang="ts">
import { Lyric } from "@/types/song"
import useSongStore from "@/store/song"
let props = withDefaults(defineProps<{
  list: Lyric[]
}>(), {

})
let tool = useTool()
let songStore = useSongStore()
// 元素实例
let lyricRollEl = ref<HTMLElement | null>(null)
let lyricListEl = ref<HTMLElement | null>(null)
// 当前播放的行数
let cur_line = ref(0)

// 当前行数的播放进度
let cur_line_play_progress = ref(0)
// 当前行数的持续播放时间
let cur_line_play_duration = ref(0)


// 预览歌词
const is_preview = ref(false)

const lyricSlide = () => {
  console.log("歌词滑动");
  is_preview.value = true
}

const slideEnd = () => {
  console.log("结束滑动");
  is_preview.value = false
}

// 获取单个歌词盒子的高度
const getLyricItemRect = () => {
  setCurrentLine(songStore.currentTime)
  cur_line_play_progress.value = getCurrentLinePlayProgress()
  cur_line_play_duration.value = getCurrentLinePlayDuration()
  // console.log(cur_line_play_progress.value, "播放的进度",cur_line.value);
  // console.log(props.list[cur_line.value],"当前行数的播放持续时间", (props.list[cur_line.value + 1].start_time - songStore.currentTime));
}



// 设置当前播放行数
const setCurrentLine = (time: number) => {
  for (let i = cur_line.value; i < props.list.length; i++) {
    if (time <= 0) {
      continue;
    }
    if (i >= props.list.length - 1) {
      cur_line.value = props.list.length - 1
      break;
    }

    if (time < props.list[i + 1].start_time && time > props.list[i].start_time) {
      cur_line.value = i
      break;
    }
  }

  // console.log(`当前歌词行数`, cur_line.value);
}

// 获取当前行数播放进度
const getCurrentLinePlayProgress = (): number => {
  return Math.floor((songStore.currentTime / (songStore.duration - (props.list[cur_line.value].start_time + props.list[cur_line.value].duration))) * 100)
}

// 获取当前行数播放持续时间
const getCurrentLinePlayDuration = () => {
  return ((props.list[cur_line.value].start_time + props.list[cur_line.value].duration) - songStore.currentTime)
}
// 获取滚动TOP值
const getOffsetY = (): number => {
  let lyricEl = lyricListEl.value?.children[cur_line.value] as HTMLElement
  console.dir(lyricEl.offsetTop,"离开家离开")
  return lyricEl.offsetTop - (lyricEl.offsetHeight + 50)
}

// 拖拽进度条处理
const progressBarDrag = () => {
  cur_line.value = 0
  // is_preview.value = true
  // setTimeout(() => {
  //   is_preview.value = false
  // }, 10);
}



watch(() => songStore.currentTime, (v) => {
  // console.log(v,"播放时间发生变化");
  setCurrentLine(v)
})

watch(() => cur_line.value, (v) => {
  // console.log(`歌词行数发生变化`, v);

  if (!songStore.paused) {
    cur_line_play_progress.value = 0
    cur_line_play_duration.value = props.list[cur_line.value].duration
  }

  if (!is_preview.value) {
    lyricRollEl.value && lyricRollEl.value.scrollTo({
      top:getOffsetY(),
      behavior:"smooth"
    })
  }
})


onMounted(() => {
  getLyricItemRect()
})


defineExpose({
  progressBarDrag
})

</script>

<style scoped lang="scss">
.lyric-roll {
  @apply w-full text-center;
  height: 520px;
  // height: 72vh;
  overflow: hidden scroll;

  &.no-lyric {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  &-mask {
			position: absolute;
			left: 0;
			bottom: 0px;
			width: 100%;
			height: 50px;
			background: linear-gradient(90deg, #000, hsla(0, 0%, 100%, 0));
			// background-color: rgba(249,248,254,0.8);
			// filter: blur(30rpx);
			z-index: 99;
		}

  .lyric-item {
    word-wrap: break-word;
    span {
      background: #a1a1a1 -webkit-linear-gradient(left, #FF4081, #8F78AE,#ADD8E6) no-repeat 0 0;
      -webkit-background-clip: text;
      /* 文字填充颜色变透明 */
      -webkit-text-fill-color: transparent;
      background-size: 0 100%;
      font-size: 18px;
      font-weight: 700;
    }
  }

  .highlight {
    span {
      background-size: 100% 100%;
      animation-name: Highlight;
      animation-timing-function: ease-out;
      animation-fill-mode: forwards;
    }


  }
}

@keyframes Highlight {

  0% {
    // background-size: 0 100%;
  }

  100% {
    background-size: 100% 100%;

  }
}
</style>