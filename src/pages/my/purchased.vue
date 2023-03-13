<!--
 * @Author: your name
 * @Date: 2022-03-24 17:47:16
 * @LastEditTime: 2023-03-13 20:34:12
 * @LastEditors: 可达鸭 997610780@qq.com
 * @Description: 已购
 * @FilePath: \zyk-music-h5\template.vue
-->
<template>
  <div class="page">
    <div class="page_hd">
      <KdyNavBar :title="route.meta.title"></KdyNavBar>
    </div>

    <div class="page_by px-15px mt-10px">
      <div v-if="song_list.length">
        <KdyPlayAllHeader :ids="song_list.map(item => item.id)" :total="song_total"></KdyPlayAllHeader>
        <var-list v-model:loading="paging.loading" :finished="paging.finish" @load="loadData" :immediate-check="false">
          <KdySingle v-for="(item, index) in song_list" :key="item.id" :item="item" :show-rank="true" :rank="index + 1">
          </KdySingle>
        </var-list>
      </div>

      <KdyEmpty v-else :loading="loading_status" margin-top="200"></KdyEmpty>
    </div>

  </div>
</template>
<script setup lang="ts">
import { purchased } from "@/api/my/index";
import { Song } from "@/types/song";
const route = useRoute()

let paging = reactive({
  page: 1,
  loading: false,
  finish: false
})
let song_list = ref<Song[]>([])
let loading_status = ref(true)
let song_total = ref(0)

const getGurchased = async () => {
  let res: any = await purchased(paging.page)
  console.log(res, "坎坎坷坷");
  song_list.value.push(...res.data.list.map((item: any) => item.simpleSong))
  song_total.value = res.data.count
  paging.page++
  paging.finish = !res.data.hasMore
  paging.loading = false
  loading_status.value = false
}
const loadData = () => {
  if (!paging.finish) {
    getGurchased()
  }
}

loadData()
</script>

<style scoped lang="scss"></style>