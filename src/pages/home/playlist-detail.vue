<!--
 * @Author: your name
 * @Date: 2022-03-24 17:47:16
 * @LastEditTime: 2023-02-16 17:55:43
 * @LastEditors: zyk 997610780@qq.com
 * @Description: 歌单详情
 * @FilePath: \zyk-music-h5\template.vue
-->
<template>
  <div class="page">
    <div class="page_hd">
      <KdyNavBar :title="route.meta.title"></KdyNavBar>
    </div>
  </div>
</template>
<script setup lang="ts">
import {getSongListDetail,getSongListAll} from "@/api/public/playlist";
let route = useRoute()
let router = useRouter()
</script>

<style scoped lang="scss"></style>