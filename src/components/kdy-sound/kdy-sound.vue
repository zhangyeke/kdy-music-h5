<!--
 * @Author:kkk
 * @Date: 2022-03-24 17:47:16
 * @LastEditTime: 2023-04-11 14:58:55
 * @LastEditors: zyk 997610780@qq.com
 * @Description: 声音项
 * @FilePath: \zyk-music-h5\template.vue
-->
<template>
  <div class="flex items-center  p-10px" :class="{ border_b_solid_1: border }" @click="clickHandle">
    <div>
      <var-image :width="tool.px2vw(50)" :height="tool.px2vw(50)" fit="cover" :src="item.coverUrl" radius="5"></var-image>
    </div>
    <div class="ml-10px">
      <div class="text-16px text-[var(--color-text)]">{{ item.name }}</div>
      <div class="mt-10px text-[#c1c1c1] text-12px">
        <span class="mr-10px">{{ tool.timeFormat(item.scheduledPublishTime) }}</span>
        <span class="mr-10px">
          <var-icon namespace="kdy-icon" name="bofang" :size="tool.px2vw(10)"></var-icon>
          {{ tool.numFormat(item.listenerCount) }}
        </span>
        <span>
          <var-icon namespace="kdy-icon" name="time" :size="tool.px2vw(10)"></var-icon>
          {{ tool.getTime(item.duration).time }}
        </span>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { Sound } from "@/types/song";
import { programDetail} from "@/api/public/podcast";
const tool = useTool()
const props = withDefaults(defineProps<{
  item: Sound,
  border?: boolean
}>(), {
  border: true
})

const clickHandle = ()=>{
  programDetail(props.item.id).then(res=>{
    console.log(res,"看看看看");
    
  })
}
</script>

<style scoped lang="scss"></style>