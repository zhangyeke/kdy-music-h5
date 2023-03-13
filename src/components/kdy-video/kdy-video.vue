<!--
 * @Author: your name
 * @Date: 2022-03-24 17:47:16
 * @LastEditTime: 2023-03-13 22:59:56
 * @LastEditors: 可达鸭 997610780@qq.com
 * @Description: 视频单项
 * @FilePath: \zyk-music-h5\template.vue
-->
<template>
  <div class="kdy-video">
    <div class="kdy-video-cover">
      <var-image :src="item.coverUrl" :width="tool.addUnit(120)"></var-image>
      <span class="kdy-video-duration">{{ tool.getTime(item.durationms).time }}</span>
    </div>
    <div class="kdy-video-info">
      <div class="kdy-video-title">{{ item.title }}</div>
      <div class="kdy-video-author">
        <span v-for="(author,index) in item.creator" :key="index">{{ author.userName }}</span>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts" name="kdyVideo">
import {Video} from "@/types/video";
const props = withDefaults(defineProps<{
  item: Video,
}>(), {
  
})

console.log(props.item.creator,"klkl离开家");

const tool = useTool()
</script>

<style scoped lang="scss">
.kdy-video{
  @apply flex ;
  &-cover{
    @apply overflow-hidden relative;
    border-radius: 5px;
  }
  &-duration{
    @apply absolute right-5px bottom-5px text-12px text-white;
  }
  &-title{
    @apply font-600 text-[var(--text-color)];
    font-size: 16px;
  }
  &-author{
    @apply text-[#666];
    font-size: 12px;
  }
  &-info{
    
    margin-left: 10px;
  }
}

</style>