<!--
 * @Author: your name
 * @Date: 2022-03-24 17:47:16
 * @LastEditTime: 2023-03-13 18:15:35
 * @LastEditors: zyk 997610780@qq.com
 * @Description: 最近播放
 * @FilePath: \zyk-music-h5\template.vue
-->
<template>
  <div class="page">
    <div class="page_hd">
      <KdyNavBar :title="route.meta.title" :is-fixed="true"></KdyNavBar>
      <var-tabs v-model:active="cur_tab" @change="tabChange" :sticky="true" offset-top="50">
        <var-tab v-for="(item, index) in latelyPlayedTabs" :key="item.value" :name="index">{{ item.name }}</var-tab>
      </var-tabs>
    </div>
    <div class="page_by px-20px mt-10px">
      <div v-if="play_list.length">
          <KdyPlayAllHeader v-show="!cur_tab" :ids="play_list.map(item => item.id)" :total="play_list.length"></KdyPlayAllHeader>
          <component :is="latelyPlayedTabs[cur_tab].component_name" :item="item" v-for="(item,index) in play_list" :key="item.id"></component>
      </div>

      <KdyEmpty v-else :loading="loading_status" margin-top="200"></KdyEmpty>
    </div>
  </div>
</template>
<script lang="ts">
import kdySingle from "@/components/kdy-single/kdy-single.vue";
import kdyPlaylist from "@/components/kdy-playlist/kdy-playlist.vue";
import kdyPodcast from "@/components/kdy-podcast/kdy-podcast.vue";
import kdyAlbum from "@/components/kdy-album/kdy-album.vue";

export default {
  components: {
    kdySingle,
    kdyPlaylist,
    kdyPodcast,
    kdyAlbum,
  }
}

</script>

<script setup lang="ts" name="latelyPlayed">
import {Single,Playlist,Podcast,Album} from "@/types/song";
import { latelyPlayedTabs } from "@/enum-file/public";
import { latelyPlayed } from "@/api/my/index";
const route = useRoute()
let cur_tab = ref(0)

let play_list = ref<Single[] | Playlist[] | Podcast[] | Album[]>([])
let loading_status = ref(true)
const getLatelyPlayed = async () => {
  let res: any = await latelyPlayed(latelyPlayedTabs[cur_tab.value].value)
  console.log("最近播放", res);
  play_list.value = res.data.list.map((item:any) => item.data)
  loading_status.value = false
}
const tabChange = (i: number | string) => {
  loading_status.value = true
  play_list.value.length = 0
  getLatelyPlayed()
}

getLatelyPlayed()
</script>

<style scoped lang="scss"></style>