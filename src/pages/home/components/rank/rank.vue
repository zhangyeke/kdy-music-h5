<!--
 * @Author: your name
 * @Date: 2022-03-24 17:47:16
 * @LastEditTime: 2022-05-18 14:06:53
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \zyk-music-h5\template.vue
-->
<template>
  <div class="rank" :style="{ width: tool.addUnit(width) }">
    <div class="rank-list">
      <div class="rank-item " :class="singleRow?['flex','justify-between']:''" :style="{ width: singleRow ? '100%' : '50%' }" v-for="(item, index) in list" :key="index"
        v-ripple>
        <div class="flex items-center">
          <span class="rank-no"
            :style="{ fontSize: tool.addUnit(indexSize), color: index > 2 ? indexColor : frontThreeColor }">{{ index + 1
            }}</span>
          <span :class="{ 'font-700': index <= 2 }" class="truncate" :style="{ color, fontSize: tool.addUnit(size) }">{{
              item[textKey]
          }}</span>
          <img v-if="item[iconKey]" :src="item[iconKey]" class="w-15px  ml-10px">
        </div>
        <div v-if="singleRow" class="text-[#999] text-10px">
          {{tool.numFormat(item[rightTextKey])}}热度
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { Rank } from "@/types/rank";
let tool = useTool()
let prop = withDefaults(defineProps<{
  // 宽度
  width?: number | string,
  // 榜单
  list: Array<Rank>,
  // 文本颜色
  color?: string,
  // 文本大小
  size?: number,
  // 数字文本大小
  indexSize?: number,
  // 数字文本颜色
  indexColor?: string,
  // 前三的文本颜色
  frontThreeColor?: string,
  // 文本的映射键名
  textKey?: string,
  // 图标的映射键名
  iconKey?: string,
  // 是否单列
  singleRow?: boolean;
  // 单列 右边展示的文本
  rightTextKey?:string
}>(), {
  list: () => [],
  color: "#333",
  size: 12,
  indexSize: 16,
  indexColor: "#666",
  frontThreeColor: "var(--color-primary)",
  width: '100%',
  textKey: "title",
  iconKey: "iconUrl",
  singleRow: false,
  rightTextKey:""
})

</script>

<style scoped lang="scss">
.rank {
  padding: 0 10px;
  &-list {
    @apply flex flex-wrap;
  }

  &-item {
    @apply font-500 text-[#333];
    padding: 3px 0;
  }

  &-no {
    width: 30px;
  }
}
</style>