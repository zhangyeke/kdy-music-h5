<!--
 * @Author: your name
 * @Date: 2022-03-24 17:47:16
 * @LastEditTime: 2023-03-10 13:40:09
 * @LastEditors: zyk 997610780@qq.com
 * @Description: 专辑项
 * @FilePath: \zyk-music-h5\template.vue
-->
<template>
  <div class="kdy-album flex items-center border_b_solid_1 p-10px flex items-center"  @click="clickHandle">
    <div class="w-50px h-50px kdy-album-cover relative">
      <img :src="item.picUrl" class="w-full h-full rounded-5px ">
    </div>
    <div class="ml-10px flex-1 ">
      <div class="text-[#333] text-14px truncate_2">{{ item.name }}</div>
      <div class="text-[#888] text-10px mt-10px">
        <span class="mr-10px">{{ item.artist!.name }}</span>
        <span>{{ tool.timeFormat(item.publishTime) }}</span>
        <span class="ml-10px">{{ item.size }}首</span>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts" name="kdyAlbum ">
import { Album } from "@/types/song";
const tool = useTool()
const router = useRouter()
const props = withDefaults(defineProps<{
  item: Album,
  border?: boolean
}>(), {
  border: true
})

const emit = defineEmits(['click'])


const clickHandle = () => {
  router.push({ name: "albumDetail", params: { id:props.item.id } })
}

</script>

<style scoped lang="scss">
.kdy-album {
  &_cover {
    &::before {
      content: "";
      position: absolute;
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background: #000;
      transform: translateY(-5px);
    }

    img {
      position: relative;
      z-index: 2;
    }
  }
}
</style>