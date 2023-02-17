<!--
 * @Author: your name
 * @Date: 2022-03-24 17:47:16
 * @LastEditTime: 2023-02-17 17:12:59
 * @LastEditors: zyk 997610780@qq.com
 * @Description: 歌单列表
 * @FilePath: \zyk-music-h5\template.vue
-->
<template>
  <div class="song">
    <var-list :finished="finished" v-model:loading="loading" @load="load" :offset="200">
      <div class="song_list bg-white">
          <div class="song_item border_b_solid_1 p-10px flex" v-for="(item, index) in playlists" :key="item.id" v-ripple @click="router.push({ name: 'playlistDetail', params: { id: item.id } })">
          <img :src="item.coverImgUrl" class="w-50px rounded-5px">
          <div class="ml-8px">
            <div class="text-[#333] text-14px">{{item.name}}</div>
            <div class="text-[#666] text-12px mt-5px">{{item.trackCount}}首,播放{{tool.numFormat(item.playCount)}}次</div>
            <div class="text-[#888] text-12px mt-5px">歌单所属:{{item.creator.nickname}}</div>
          </div>
        </div>
      </div>
    </var-list>
  </div>
</template>
<script setup lang="ts">
import useSearchStore from "@/store/search";
import {Playlist} from "@/types/song";
let router = useRouter()
let prop = withDefaults(defineProps<{
  isLoadMore?: boolean
  list?: Playlist[]
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
let playlists = computed<Playlist[]>(()=>{
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
  .song{
    &_item{
      &:first-child{
        padding-top: 0;
      }
      &:last-child{
        border: none;
      }
    }
  }
</style>