<!--
 * @Author: your name
 * @Date: 2022-03-24 17:47:16
 * @LastEditTime: 2023-02-22 10:41:30
 * @LastEditors: zyk 997610780@qq.com
 * @Description: 歌单项
 * @FilePath: \zyk-music-h5\template.vue
-->
<template>
  <div class="p-10px flex" :class="{border_b_solid_1:border}" v-ripple @click="emit('click','playlistDetail')">
    <img :src="item.coverImgUrl" class="w-50px rounded-5px">
    <div class="ml-8px">
      <div class="text-[#333] text-14px">{{ item.name }}</div>
      <div class="text-[#666] text-12px mt-5px">{{ item.trackCount }}首,播放{{ tool.numFormat(item.playCount) }}次
      </div>
      <div class="text-[#888] text-12px mt-5px">歌单所属:{{ item.creator.nickname }}</div>
    </div>
  </div>
</template>
<script setup lang="ts" name="kdyPlaylist">
import {SongsList} from "@/types/songList"
const tool = useTool()
const props = withDefaults(defineProps<{
  item: SongsList,
  border?:boolean
}>(), {
  border:true
})
// router.push({ name: 'playlistDetail', params: { id: SongsList.id } })
const emit = defineEmits(['click'])

</script>

<style scoped lang="scss">

</style>