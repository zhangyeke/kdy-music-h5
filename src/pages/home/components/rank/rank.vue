<!--
 * @Author: your name
 * @Date: 2022-03-24 17:47:16
 * @LastEditTime: 2022-05-13 17:59:32
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \zyk-music-h5\template.vue
-->
<template>
  <div class="rank" :style="{borderRadius:tool.addUnit(borderRadius),width:tool.addUnit(width)}">
    <div class="rank-title" :class="{ 'font-700': titleBold}" :style="{fontSize:tool.addUnit(titleSize)}">
      {{ title }}
    </div>
    <div class="rank-list">
      <div class="rnak-item" v-for="(item, index) in list" :key="index" v-ripple>
        <span :style="{fontSize:tool.addUnit(indexSize),color:index>2?indexColor:frontThreeColor}">{{ index + 1 }}</span>
        <span class="ml-10px" :style="{color,fontSize:tool.addUnit(size)}">{{ item.searchWord }}</span>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { Rank } from "@/types/rank";
let tool = useTool()
let prop = withDefaults(defineProps<{
  width?:number | string,
  title?: string,
  list: Array<Rank>,
  titleBold?: boolean,
  titleSize?: number,
  borderRadius?:number,
  color?:string,
  size?:number,
  indexSize?:number,
  indexColor?:string,
  frontThreeColor?:string,
}>(), {
  title: "",
  list: () => [],
  titleBold: true,
  titleSize: 18,
  borderRadius:5,
  color:"#333",
  size:12,
  indexSize:16,
  indexColor:"#666",
  frontThreeColor:"var(--color-primary)",
  width:'70%',
})

</script>

<style scoped lang="scss">
.rank{
  padding: 10px;
  background-color: #fff;
  &-title{
    padding-bottom: 10px;
    border-bottom: 1px solid $border-color;
  }
  &-list{
    margin-top: 10px;
  }
  &-item{
    font-weight: 500;
  }
}
</style>