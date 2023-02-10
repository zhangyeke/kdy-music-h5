<!--
 * @Author: your name
 * @Date: 2022-03-29 22:03:07
 * @LastEditTime: 2023-02-10 10:37:35
 * @LastEditors: zyk 997610780@qq.com
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \zyk-music-h5\src\components\row-song-list\row-song-list.vue
-->
<template>
  <div>
    <div v-for="(v, i) in list" :key="v.resourceId" @click="clickHandle(v)">
      <kdy-song :cover="v.uiElement.image.imageUrl" :name="v.uiElement.mainTitle?.title"
        :play-count="v.resourceExtInfo.playCount"></kdy-song>
    </div>
  </div>
</template>
<script setup lang="ts">
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
  list: SongList[]
}>()

let emits = defineEmits(['click'])

const kdy = useTool()


const clickHandle = (v: SongList) => {
  emits('click', v)
}

</script>

<style scoped lang="scss">

</style>