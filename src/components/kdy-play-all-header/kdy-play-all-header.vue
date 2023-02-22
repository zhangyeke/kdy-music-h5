<!--
 * @Author: your name
 * @Date: 2022-03-24 17:47:16
 * @LastEditTime: 2023-02-22 22:10:33
 * @LastEditors: 可达鸭 997610780@qq.com
 * @Description: 头部播放全部
 * @FilePath: \zyk-music-h5\template.vue
-->
<template>
  <div class=" flex items-center pt-5px">
    <div class="flex items-center flex-1" v-ripple @click="playAll">
      <var-icon name="bofang2" namespace="kdy-icon" color="var(--color-primary)" :size="tool.px2vw(24)" />
      <span class="ml-5px font-700 text-16px">播放全部</span>
    </div>
    <div class="" v-ripple v-if="false">
      <var-icon name="xuanzhong" namespace="kdy-icon" color="#333" :size="tool.px2vw(20)" />
    </div>
  </div>
</template>
<script setup lang="ts">
import useSongStore  from '@/store/song';

const props = defineProps({
  ids:{
    type:Array,
    required:true,
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