<!--
 * @Author: your name
 * @Date: 2022-03-24 17:47:16
 * @LastEditTime: 2022-05-24 17:51:22
 * @LastEditors: [you name]
 * @Description: 搜索结果单曲列表
 * @FilePath: \zyk-music-h5\template.vue
-->
<template>
  <div>
    单曲
  </div>
</template>
<script setup lang="ts">
import {Single} from "@/types/song"
  let prop = withDefaults(defineProps<{
    showHead?:boolean,
    list:Single[],
  }>(),{
    showHead:false,
  })
</script>

<style scoped lang="scss"></style>