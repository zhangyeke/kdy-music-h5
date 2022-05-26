<!--
 * @Author: your name
 * @Date: 2022-03-24 17:47:16
 * @LastEditTime: 2022-05-26 16:43:29
 * @LastEditors: [you name]
 * @Description: 搜索结果单曲列表
 * @FilePath: \zyk-music-h5\template.vue
-->
<template>
  <div class="single bg-white px-10px">
    <div class="single_head flex items-center" v-if="showHead">
      <div class="flex items-center flex-1" v-ripple>
        <var-icon name="bofang2" namespace="kdy-icon" color="var(--color-primary)" :size="tool.px2vw(24)" />
        <span class="ml-5px font-700 text-16px">播放全部</span>
      </div>
      <div class="" v-ripple>
        <var-icon name="kecaozuobumen" namespace="kdy-icon" color="#333" :size="tool.px2vw(20)" />
      </div>
    </div>
    <div class="single_list font-500">
      <var-list :finished="finished" v-model:loading="loading" @load="load" :offset="200">
        <div class="single_item border_b_solid_1 py-10px flex items-center"
          v-for="(item, index) in searchStore.song_list" :key="item.id">
          <div class="w-100/80" v-ripple @click="playMusic(item.id)">
            <div class="text-[#333] text-14px">
              {{ item.name }}
            </div>
            <div class="text-10px text-[#666] mt-5px">
              <div class=" ">
                <span class="inline-block bg-primary  text-white p-3px mr-5px"
                  v-if="item.originCoverType == 1">原唱</span>
                <span class=""><span v-for="(e, i) in item[artistsKey]" :key="i">{{ e.name }}</span></span>
                <span class="mx-5px">-</span>
                <span>{{ item.name }}</span>
              </div>
              <div class=" mt-5px truncate">
                <div class="" v-if="item[aliasKey]?.length"><span v-for="(e, i) in item[aliasKey]" :key="i">{{ e
                }}</span></div>
                <div class="" v-if="item.originSongSimpleData">原唱：{{ item.originSongSimpleData.artists[0].name }}</div>
              </div>
            </div>
          </div>

          <div class="w-20/100 flex items-center justify-end ">
            <div @click.stop="" v-if="item[mvKey]" v-ripple>
              <var-icon name="bofang1" namespace="kdy-icon" color="#333" :size="tool.px2vw(20)" />
            </div>
            <div @click.stop="lookMusicDetail(item.id)" class="px-10px" v-ripple>
              <var-icon name="androidgengduo" namespace="kdy-icon" color="#333" :size="tool.px2vw(20)" />
            </div>
          </div>
        </div>
      </var-list>
    </div>


    <musicDetailPopup v-model:show="show_win" :music-id="cur_music_id"></musicDetailPopup>
  </div>
</template>
<script setup lang="ts">
import useSearchStore from "@/store/search";
import useSongStore from "@/store/song";
import mitt from "@/assets/lib/bus";
import musicDetailPopup from "cmp/music-detail-popup/music-detail-popup.vue";
let prop = withDefaults(defineProps<{
  showHead?: boolean,
  aliasKey?: string,
  artistsKey?: string,
  mvKey?: string,
  isLoadMore?: boolean
}>(), {
  showHead: true,
  aliasKey: "alias",
  artistsKey: "artists",
  mvKey: "mvid",
  isLoadMore: true
})
let searchStore = useSearchStore()
let songStore = useSongStore()
let tool = useTool()
// 是否加载完成
let finished = ref(false)
// 加载状态
let loading = ref(false)
// 音乐详情弹窗
let show_win = ref(false)
// 需要查看详情的音乐id
let cur_music_id = ref(0)

//播放音乐
const playMusic = (id: number) => {
  songStore.getSong(id)
  songStore.setSongPaused(false)
  mitt.emit('playAudio')
}

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
// 查看歌曲详情
const lookMusicDetail = (id:number)=>{
  cur_music_id.value = id
  show_win.value = true
}

</script>

<style scoped lang="scss">
</style>