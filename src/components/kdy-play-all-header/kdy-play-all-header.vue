<!--
 * @Author: your name
 * @Date: 2022-03-24 17:47:16
 * @LastEditTime: 2023-02-27 18:07:12
 * @LastEditors: zyk 997610780@qq.com
 * @Description: 头部播放全部
 * @FilePath: \zyk-music-h5\template.vue
-->
<template>
  <div class=" flex items-center pt-5px">
    <div class="flex items-center flex-1" v-ripple @click="playAll">
      <var-icon name="bofang2" namespace="kdy-icon" color="var(--color-primary)" :size="tool.px2vw(24)" />
      <span class="ml-5px font-700 text-16px">播放全部</span>
      <span class="text-[#666] text-12px ml-5px" v-if="total">({{ total }})</span>
    </div>
    <slot name="right"></slot>
  </div>
</template>
<script setup lang="ts">
import useSongStore  from '@/store/song';

const props = defineProps({
  ids:{
    type:Array,
    required:true,
  },
  total:{
    type:Number,
    default:0,
  }
})
const songStore = useSongStore()
const tool = useTool()

// 播放全部
const playAll = () => {
  songStore.clearSongList()
  songStore.getSongList(props.ids.toString()).then(_ => {
    songStore.setSongPaused(false)
    songStore.getSong(songStore.songList[0].id)
  })
}
</script>

<style scoped lang="scss"></style>