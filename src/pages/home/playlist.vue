<!--
 * @Author: your name
 * @Date: 2022-03-24 17:47:16
 * @LastEditTime: 2023-02-15 18:29:11
 * @LastEditors: zyk 997610780@qq.com
 * @Description:某分类的歌单
 * @FilePath: \zyk-music-h5\template.vue
-->
<template>
  <div class="page">
    <div class="page_hd">
      <KdyNavBar :title="page_title"></KdyNavBar>
    </div>
    <div class="page_by mt-10px">
      <var-list :finished="finished" v-model:loading="loading" @load="loadSongs">

        <div class="flex flex-wrap justify-around">
          <KdySong v-for="(songs, index) in songs_list" :key="songs.id" class="mb-10px" :cover="songs.coverImgUrl"
            :name="songs.name" :play-count="songs.playCount" @click="router.push({name:'playlistDetail',params:{id:songs.id}})">
          </KdySong>
        </div>
      </var-list>
    </div>
  </div>
</template>
<script setup lang="ts">
import { selectSongs } from "@/api/public/playlist";
import { SongsList } from "@/types/songList";
let tool = useTool()
let route = useRoute()
let router = useRouter()
let page_title = ref(route.params.name)
let page_option = reactive({
  limit: 15,
  page: 1,
  cat: page_title.value,
})
let finished = ref(false)
let loading = ref(false)

let songs_list = ref<SongsList[]>([])

// 分页的偏移量
const offset = computed(() => {
  return (page_option.page - 1) * page_option.limit
})

// 获取精选歌单
const getSelectSongs = async () => {
  let res: any = await selectSongs({
    ...page_option,
    offset: offset.value,
  });

  console.log(res, "精选歌单");
  songs_list.value.push(...res.playlists)
  finished.value = !res.more
  loading.value = false
  page_option.page++
}

const loadSongs = () => {
  if (!finished.value) {
    getSelectSongs()
  }
}
</script>

<style scoped lang="scss">

</style>