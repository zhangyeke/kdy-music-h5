<!--
 * @Author:kkk
 * @Date: 2022-03-24 17:47:16
 * @LastEditTime: 2023-03-28 14:18:36
 * @LastEditors: zyk 997610780@qq.com
 * @Description: 用户歌单
 * @FilePath: \zyk-music-h5\template.vue
-->
<template>
  <div>
    <KdyNavBar :title="`${nickname}的歌单`" :is-fixed="true"></KdyNavBar>
    <var-tabs  v-model:active="cur_tab" @change="tabChange">
      <var-tab v-for="(item, index) in tab_list" :name="index">{{ item }}</var-tab>
    </var-tabs>

    <div class="px-15px mt-20px" v-if="playlists.length">
      <var-list :finished="paging.finish" v-model:loading="paging.loading" :immediate-check="false" @load="loadData">
        <div class="kdy_tab_item" v-ripple v-for="(item, index) in playlists" :key="index" @click="toPlaylistDetail(item.id)">
          <img :src="item.coverImgUrl" class="kdy_tab_item_left">
          <div class="kdy_tab_item_right">
            <div class="kdy_tab_item_name">{{ item.name }}</div>
            <div class="kdy_tab_item_total">{{ item.trackCount }}首,播放{{ item.playCount }}次</div>
          </div>
        </div>
      </var-list>
    </div>

    <KdyEmpty v-else :loading="loading_status" margin-top="200"></KdyEmpty>

  </div>
</template>
<script setup lang="ts">
import { getUserPlaylist } from "@/api/my/index";
import { Playlist } from "@/types/song";
const route = useRoute()
const router = useRouter()
const nickname = route.params.nickname
const user_id = route.params.id as string
let loading_status = ref(true)
let cur_tab = ref<number>(Number(route.params.type) || 0)

const tab_list = reactive(['创建的歌单', '收藏的歌单'])

let playlists = ref<Playlist[]>([])

let paging = reactive({
  page: 1,
  loading: false,
  finish: false,
})

const initPaging = () => {
  paging = {
    page: 1,
    loading: false,
    finish: false,
  }
  loading_status.value = true
  playlists.value.length = 0

}

const tabChange = () => {
  initPaging()
  loadData()
}

// 跳转歌单详情
const toPlaylistDetail = (id: number) => {
  router.push({ name: "playlistDetail", params: { id } })
}

const getPlaylist = async () => {
  let res: any = await getUserPlaylist(user_id, paging.page)
  if (!cur_tab.value) {
    playlists.value.push(...res.playlist.filter((item: Playlist) => item.creator!.userId == user_id));
  } else {
    playlists.value.push(...res.playlist.filter((item: Playlist) => item.creator!.userId != user_id));
  }
  paging.finish = !res.more
  paging.loading = false
  loading_status.value = false
  paging.page++
}

const loadData = () => {
  if (!paging.finish) {
    getPlaylist()
  }
}

loadData()

</script>

<style scoped lang="scss"></style>