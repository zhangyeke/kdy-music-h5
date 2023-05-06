<!--
 * @Author: your name
 * @Date: 2022-03-24 17:47:16
 * @LastEditTime: 2023-03-13 22:30:35
 * @LastEditors: 可达鸭 997610780@qq.com
 * @Description: 专辑项
 * @FilePath: \zyk-music-h5\template.vue
-->
<template>
  <div class="kdy-album flex items-center border_b_solid_1 p-10px flex items-center" @click="clickHandle">
    <div class="w-50px h-50px kdy-album-cover relative rounded-5px overflow-hidden">
      <var-image :src="item.picUrl" width="100%" height="100%" :lazy="true" object="cover"/>
    </div>
    <div class="ml-10px flex-1 ">
      <div class="text-[#333] text-14px truncate_2">{{ item.name }}</div>
      <div class="text-[#888] text-10px mt-8px">
        <span class="mr-10px" v-if="item.artist">{{ item.artist.name }}</span>
        <div v-else>
            <span v-for="(ar, idx) in item.artists" :key="idx">{{ ar.name }}<span v-if="idx != item.artists!.length - 1">/</span></span>
        </div>
      </div>
      <div></div>
      <div class="text-[#888] text-10px mt-5px">
        <span>发布时间：{{ tool.timeFormat(item.publishTime) }},</span>
        <span class="ml-10px">共{{ item.size }}首</span>
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
  router.push({ name: "albumDetail", params: { id: props.item.id } })
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