<!--
 * @Author: your name
 * @Date: 2022-03-24 17:47:16
 * @LastEditTime: 2022-05-31 21:54:04
 * @LastEditors: [you name]
 * @Description:收藏弹窗
 * @FilePath: \zyk-music-h5\template.vue
-->
<template>
  <div class="collect">
    <var-style-provider :style-vars="{ '--popup-content-background-color': 'transparent' }">
      <var-popup :show="show" position="bottom" @close="close" @open="open" @click-overlay="close">
        <div class="collect_windw  bg-white px-15px">
          <div class="collect_windw_head flex justify-between items-center py-20px">
            <span class="font-700 text-16px">{{ title }}</span>
            <div class="" v-ripple @click="toggleChoice">
              <span v-if="is_choice" :class="{ 'text-primary': choice_list.length }">完成<span
                  v-if="choice_list.length">({{ choice_list.length }})</span></span>
              <var-icon name="duoxuankuang" namespace="kdy-icon" color="#333" :size="tool.px2vw(20)" v-else />
            </div>
          </div>
          <var-list v-model:loading="loading" @load="load" :finished="finished">
            <div class="new_playlist flex items-center font-500 mb-10px" v-ripple @click="clickNewlybuilt">
              <div class="w-50px h-50px rounded-5px bg-[#eee] flex justify-center items-center">
                <var-icon name="plus" color="var(--color-primary)" :size="tool.px2vw(26)" />
              </div>
              <span class="ml-10px text-[#333] text-14px">新建歌单</span>
            </div>

            <div class="playlist bg-white overflow-y-scroll h-250px">
              <div class="playlist_item mb-10px flex items-center" v-for="(item, index) in playlists" :key="item.id"
                v-ripple @click="collectHandle(index)">
                <div class="playlist_cover w-50px h-50px">
                  <img :src="item.coverImgUrl" class="w-full h-full fit_cover rounded-5px">
                </div>
                <div class=" py-5px flex-1 ml-10px text-[#333] text-14px">
                  <div class="truncate_2">{{ index == 0 ? '我喜欢的音乐' : item.name }}</div>
                  <div class="text-[#999] text-12px mt-10px">{{ item.trackCount }}首</div>
                </div>
                <div v-if="is_choice">
                  <var-checkbox unchecked-color="#ccc" checked-color="var(--color-primary)" v-model="item.status"
                    :checked-value="1" :unchecked-value="0" :ripple="false">
                  </var-checkbox>
                </div>
              </div>
            </div>
          </var-list>
        </div>
      </var-popup>
    </var-style-provider>

  </div>
</template>
<script setup lang="ts">
import { getUserPlaylist } from "@/api/my/index";
import { handlePlaylist } from "@/api/public/music";
import useUserStore from "@/store/user";
import { Playlist } from "@/types/song";
let prop = withDefaults(defineProps<{
  show: boolean,
  title?: string,
  ids: number | number[]//音乐id
}>(), {
  title: "收藏到歌单"
})

let emit = defineEmits(['close', 'update:show', 'open','newlyBuilt'])
let userStore = useUserStore()
let tool = useTool()
// 是否在加载中
let loading = ref(true)
// 是否数据已经加载完毕
let finished = ref(false)
let page = ref(0)
const close = () => {
  emit('update:show', false)
  emit('close')
}
// 是否开启多选
let is_choice = ref(false)
// 歌单列表
let playlists = ref<Playlist[]>([])

// 获取用户歌单
const getPlaylist = async () => {
  let res: any = await getUserPlaylist(userStore.userId, page.value)
  playlists.value.push(...res.playlist.filter((item: Playlist) => userStore.userId == item.userId))
  loading.value = false
  if (!res.more) {
    finished.value = true
  }
}

let choice_list = computed(() => {
  return playlists.value.filter((item: Playlist) => item.status == 1)
})

const open = () => {
  emit('open')
  page.value = 1
  playlists.value.length = 0
  getPlaylist()
}


const load = () => {
  if (!finished.value) {
    page.value++
    getPlaylist()
  }
}

// 点击新建歌单
const clickNewlybuilt = ()=>{
  close()
  emit('newlyBuilt')
}
// 切换多选
const toggleChoice = () => {
  is_choice.value = !is_choice.value
  if (!choice_list.value.length) {
    initStatus()
    return
  }

  if (choice_list.value.length && !is_choice.value) {
    choice_list.value.forEach((item: Playlist) => {
      handlePlaylist({ op: 'add', pid: item.id, tracks: prop.ids.toString() })
    })
    tool.toast({ type: "success", content: "已收藏到歌单!" })
    initStatus()
    close()
  }
}

// 收藏处理
const collectHandle = (i: number) => {
  if (is_choice.value) {
    playlists.value[i].status = Number(!playlists.value[i].status)
  } else {
    handlePlaylist({ op: 'add', pid: playlists.value[i].id, tracks: prop.ids.toString() }).then((res: any) => {
      tool.toast({ type: "success", content: "已收藏到歌单!" })
      playlists.value[i].status = 0
      close()
    })
  }
}

// 初始化选中状态
const initStatus = () => {
  playlists.value.forEach((item: Playlist) => {
    item.status = 0
  })
}

</script>

<style scoped lang="scss">
.collect {
  &_windw {
    border-radius: 20px 20px 0 0;
  }
}
</style>