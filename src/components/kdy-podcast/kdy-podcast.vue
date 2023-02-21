<!--
 * @Author: your name
 * @Date: 2022-03-24 17:47:16
 * @LastEditTime: 2023-02-21 18:23:33
 * @LastEditors: zyk 997610780@qq.com
 * @Description: 播客项
 * @FilePath: \zyk-music-h5\template.vue
-->
<template>
  <div class="kdy-podcast flex items-center  p-10px" :class="{ border_b_solid_1: border }" v-ripple>
    <img :src="item.picUrl" class="w-50px h-50px fit_cover rounded-5px">
    <div class="ml-10px">
      <div class="text-[#333] text-14px">{{ item.name }}</div>
      <div class="text-[#666] text-12px mt-5px">主播：{{ item.dj.nickname }}</div>
      <div class="text-[#999] text-10px mt-5px">
        <div v-if="item.category"
          class="category_tag bg-warning-light inline-block py-2px px-4px text-8px text-warning mr-5px">
          {{ item.category }}</div>
        <span>播放{{ tool.numFormat(item.playCount) }}次</span>
        <span>&nbsp;by&nbsp;{{ item.dj.nickname }}</span>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts" name="kdyPodcast">
import { Podcast } from "@/types/song";
const tool = useTool()
const props = withDefaults(defineProps<{
  item: Podcast,

  border?: boolean
}>(), {

})
</script>

<style scoped lang="scss"></style>