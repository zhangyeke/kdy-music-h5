<!--
 * @Author: your name
 * @Date: 2022-03-29 22:03:07
 * @LastEditTime: 2022-11-03 14:24:47
 * @LastEditors: zyk 997610780@qq.com
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \zyk-music-h5\src\components\row-song-list\row-song-list.vue
-->
<template>
  <div>
    <div v-for="(v, i) in list" :key="v.resourceId" @click="clickHandle(v)">
      <div class="relative">
        <var-image
          :width="kdy.px2vw(100)"
          :radius="kdy.px2vw(10)"
          :hieght="kdy.px2vw(100)"
          :lazy="true"
          :src="v.uiElement.image.imageUrl"
        />
        <div
          class="absolute text-white text-12px right-5px top-5px bg-[rgba(0,0,0,.7)] px-5px py-3px rounded-20px"
        >
          <var-icon namespace="kdy-icon" name="bofang" :size="kdy.px2vw(10)" color="#fff" />
          <span class="ml-3px">{{ kdy.numFormat(v.resourceExtInfo.playCount) }}</span>
        </div>
      </div>
      <span
        class="mt-5px text-12px text-[#333] font-500 truncate w-100px"
      >{{ v.uiElement?.mainTitle?.title }}</span>
    </div>
  </div>
</template>
<script setup lang="ts">
interface SongList{
  resourceId:string,
  resourceExtInfo:{
    playCount:number | string,
  },
  uiElement:{
    mainTitle:{
      title:string,
    },
    image:{
      imageUrl:string,
    }
  },
  [key:string]:any
}

let prop = defineProps<{
  list:SongList[]
}>()

let emits = defineEmits(['click'])

const kdy = useTool()


const clickHandle = (v:SongList)=>{
  emits('click',v)
}

</script>

<style scoped lang="scss">
</style>