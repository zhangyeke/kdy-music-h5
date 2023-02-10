<!--
 * @Author: your name
 * @Date: 2022-03-29 22:03:07
 * @LastEditTime: 2023-02-10 15:55:39
 * @LastEditors: zyk 997610780@qq.com
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \zyk-music-h5\src\components\row-song-list\row-song-list.vue
-->
<template>
  <div class="flex ">
    <div v-for="(v, i) in list" class="mr-10px" :key="v.resourceId" @click="clickHandle(v)">
      <kdy-song :cover="getCover(v)" :name="getName(v)" :play-count="getPlayCount(v)"></kdy-song>
    </div>
  </div>
</template>
<script setup lang="ts">
import { Song } from "@/types/song"
import { SongsList } from "@/types/songList"
interface SongList {
  resourceId: string,
  resourceExtInfo: {
    playCount: number | string,
  },
  uiElement: {
    mainTitle: {
      title: string,
    },
    image: {
      imageUrl: string,
    }
  },
  [key: string]: any
}

let prop = defineProps<{
  list: Song[] | SongsList[] | SongList[]
}>()

let emits = defineEmits(['click'])

const getCover = (v: Song | SongsList | SongList) => {
  if ((v as SongList).uiElement) {
    return v.uiElement.image.imageUrl
  } else {
    return v.picUrl
  }
}


const getName = (v: Song | SongsList | SongList) => {
  if ((v as SongList).uiElement) {
    return v.uiElement.mainTitle?.title
  } else {
    return v.name
  }
}

const getPlayCount = (v: Song | SongsList | SongList)=>{
  if ((v as SongList).uiElement) {
    return v.resourceExtInfo.playCount
  } else {
    return v.playcount || 0
  }
}

const clickHandle = <T>(v: T) => {
  emits('click', v)
}

</script>

<style scoped lang="scss">

</style>