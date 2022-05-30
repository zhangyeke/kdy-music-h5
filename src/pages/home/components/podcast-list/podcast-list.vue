<!--
 * @Author: your name
 * @Date: 2022-03-24 17:47:16
 * @LastEditTime: 2022-05-30 21:20:55
 * @LastEditors: [you name]
 * @Description: 播客列表
 * @FilePath: \zyk-music-h5\template.vue
-->
<template>
  <div class="podcast">
    <var-list :finished="finished" v-model:loading="loading" @load="load" :offset="200">
      <div class="podcast_list bg-white">
        <div class="podcast_item flex items-center border_b_solid_1 p-10px" v-for="(item, index) in podcast_list"
          :key="item.id" v-ripple>
          <img :src="item.picUrl" class="w-50px h-50px fit_cover rounded-5px">
          <div class="ml-10px">
            <div class="text-[#333] text-14px">{{ item.name }}</div>
            <div class="text-[#666] text-12px mt-5px">主播：{{ item.dj.nickname }}</div>
            <div class="text-[#999] text-10px mt-5px">
              <div v-if="item.category"
                class="category_tag bg-warning-light inline-block py-2px px-4px text-8px text-warning mr-5px">
                {{ item.category }}</div>
              <span>播放{{ tool.numFormat(item.playCount) }}次</span>
              <span>&nbsp;by&nbsp;{{ item.dj.nickname }}</span>
            </div>
          </div>
        </div>
      </div>
    </var-list>
  </div>
</template>
<script setup lang="ts">
import useSearchStore from "@/store/search";
import { Podcast } from "@/types/song";
let prop = withDefaults(defineProps<{
  isLoadMore?: boolean
  list?: Podcast[]
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
let podcast_list = computed<Podcast[]>(() => {
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
.podcast {
  &_item {
    &:last-child {
      border: none;
    }
  }
}
</style>