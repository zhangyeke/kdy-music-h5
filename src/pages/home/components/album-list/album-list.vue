<!--
 * @Author: your name
 * @Date: 2022-03-24 17:47:16
 * @LastEditTime: 2022-05-30 22:40:44
 * @LastEditors: [you name]
 * @Description: 专辑列表
 * @FilePath: \zyk-music-h5\template.vue
-->
<template>
  <div class="album">
    <var-list :finished="finished" v-model:loading="loading" @load="load" :offset="200">
      <div class="album_list bg-white">
        <div class="album_item flex items-center border_b_solid_1 p-10px flex items-center" v-for="(item, index) in album_list"
          :key="item.id" v-ripple>
          <div class="w-50px h-50px album_cover relative">
            <img :src="item.picUrl" class="w-full h-full rounded-5px ">
          </div>
          <div class="ml-10px flex-1 ">
            <div class="text-[#333] text-14px truncate_2">{{item.name}}</div>
            <div class="text-[#888] text-10px mt-10px">
              <span class="mr-10px">{{item.artist.name}}</span>
              <span>{{tool.timeFormat(item.publishTime)}}</span>
            </div>
          </div>
        </div>
      </div>
    </var-list>
  </div>
</template>
<script setup lang="ts">
import useSearchStore from "@/store/search";
import { Album } from "@/types/song";

let prop = withDefaults(defineProps<{
  isLoadMore?: boolean
  list?: Album[]
}>(), {
  isLoadMore: true
})
let tool = useTool()
let searchStore = useSearchStore()
// 是否加载完成
let finished = ref(false)
// 加载状态
let loading = ref(false)
// 列表
let album_list = computed<Album[]>(() => {
  return prop.list?.length ? prop.list : searchStore.list
})
// 加载处理
const load = () => {
  if (prop.isLoadMore && searchStore.page <= searchStore.pageCount) {
    searchStore.page++
    searchStore.getList().then((r: boolean) => {
      loading.value = false
    })
  } else {
    loading.value = false
    finished.value = true
  }
}

</script>

<style scoped lang="scss">
.album {
  &_item {
    &:last-child {
      border: none;
    }
  }
  &_cover{
    &::before{
      content: "";
      position: absolute;
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background: #000;
      transform: translateY(-5px);
    }
    img{
      position: relative;
      z-index: 2;
    }
  }
}
</style>