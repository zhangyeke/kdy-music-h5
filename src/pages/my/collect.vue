<!--
 * @Author: your name
 * @Date: 2022-03-24 17:47:16
 * @LastEditTime: 2023-03-21 21:43:40
 * @LastEditors: 可达鸭 997610780@qq.com
 * @Description: 我的收藏
 * @FilePath: \zyk-music-h5\template.vue
-->
<template>
  <div class="page">
    <div class="page_hd">
      <KdyNavBar :title="route.meta.title" :is-fixed="true"></KdyNavBar>
      <var-tabs v-model:active="cur_tab" @change="tabChange" :sticky="true" offset-top="50">
        <var-tab v-for="(item, index) in collectTabs" :key="index" :name="index">{{ item.name }}</var-tab>
      </var-tabs>
    </div>
    <div class="page_by px-15px mt-10px">
      <div v-if="collect_list.length">
        <var-list v-model:loading="paging.loading" :finished="paging.finish" @load="loadData" :immediate-check="false">
          <component :is="collectTabs[cur_tab].component_name" :item="item" v-for="(item, index) in collect_list"
            :key="item.id" v-ripple></component>

        </var-list>
      </div>

      <KdyEmpty v-else :loading="loading_status" margin-top="200"></KdyEmpty>
    </div>
  </div>
</template>
<script lang="ts">
import kdyAlbum from "@/components/kdy-album/kdy-album.vue";
import kdyVideo from "@/components/kdy-video/kdy-video.vue";

export default {
  components: {
    kdyAlbum,
    kdyVideo
  }
}

</script>
<script setup lang="ts">
import { Album } from '@/types/song';
import { collectTabs } from "@/enum-file/public";
import { collectAlbum, collectMv } from "@/api/my/index";
const route = useRoute()
let paging = reactive({
  page: 1,
  loading: false,
  finish: false
})
let cur_tab = ref(0)
let collect_list = ref<Album[]>([])
let loading_status = ref(true)

const tabChange = (i: number | string) => {
  loading_status.value = true
  paging.page = 1
  paging.finish = false
  collect_list.value.length = 0
  loadData()
}

const getCollectAlbum = async () => {
  let res: any = await collectAlbum(paging.page)
  collect_list.value.push(...res.data)
  loading_status.value = false
  paging.finish = !res.hasMore
  paging.page++
}

const getCollectMv = async () => {
  let res: any = await collectMv()
  collect_list.value.push(...res.data.filter((item:any) => item.type == 0))
  loading_status.value = false
  paging.finish = true
}


const loadData = () => {
  if (!paging.finish) {
    switch (cur_tab.value) {
      case 0:
        getCollectAlbum()
        break;
      case 1:
        getCollectMv()
        break;
    }
  }
}

loadData()

</script>

<style scoped lang="scss"></style>