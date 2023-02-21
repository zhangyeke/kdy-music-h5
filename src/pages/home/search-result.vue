<!--
 * @Author: your name
 * @Date: 2022-03-24 17:47:16
 * @LastEditTime: 2023-02-21 22:37:52
 * @LastEditors: 可达鸭 997610780@qq.com
 * @Description: 搜索结果
 * @FilePath: \zyk-music-h5\template.vue
-->
<template>
  <div class="page">
    <div class="page_head bg-white pb-5px sticky z-index-100" @keydown.enter="clickSearch()">
      <var-style-provider :style-vars="appBarStyle">
        <var-app-bar title-position="center" :elevation="false">
          <template #left>
            <div @click="pageBack">
              <var-icon name="chevron-left" color="#333" size="26" />
            </div>
          </template>
          <template #>
            <kdy-search class="mx-10px" bg-color="#ebecec" v-model="keyword" @input="searchInput" @focus="searchInput">
            </kdy-search>
          </template>
          <template #right>
            <div class="text-[#333] text-14px font-600" @click="clickSearch()">
              搜索
            </div>
          </template>
        </var-app-bar>
      </var-style-provider>

      <var-tabs v-model:active="tab_cur" @click="tabChange">
        <var-tab v-for="(item, index) in tab_list" :key="index">{{ item.name }}</var-tab>
      </var-tabs>
    </div>
    <!-- 搜索结果 -->
    <div class="search_result bg-white" v-if="search_result?.length" @click="pageBack">
      <div class="search_result_item border_b_solid_1 py-5px px-10px text-14px text-[#333] flex items-center"
        v-for="(item, index) in search_result" :key="index" @click.stop="clickSearch(item.keyword)">
        <var-icon name="magnify" color="#dedede" :size="20" />
        <span class="ml-5px">{{ item?.keyword }}</span>
      </div>
    </div>
    <div class="page_main bg-white px-15px" v-else>
      <!-- <component :is="tab_list[tab_cur].component"></component> -->
      <div class="single_head flex items-center" v-if="true">
        <div class="flex items-center flex-1" v-ripple @click="playAll">
          <var-icon name="bofang2" namespace="kdy-icon" color="var(--color-primary)" :size="tool.px2vw(24)" />
          <span class="ml-5px font-700 text-16px">播放全部{{ tab_list[tab_cur].component_name }}</span>
        </div>
        <div class="" v-ripple v-if="false">
          <var-icon name="xuanzhong" namespace="kdy-icon" color="#333" :size="tool.px2vw(20)" />
        </div>
      </div>

      <var-list :finished="search_paging.finished" v-model:loading="search_paging.loading" @load="loadResult"
        :offset="50">
        <template v-if="search_results.length">
          <component :is="tab_list[tab_cur].component_name" :item="item" v-for="(item, index) in search_results"
            alias-key="alia" artists-key="ar" @click="clickHandle(index)" :key="item.id" v-model:followed="item.followed"
            v-model:an="item.t" @more="openDetailPoup(index)">
          </component>
        </template>
      </var-list>
    </div>
    <musicDetailPopup v-model:show="show_single_detail" :music-id="single_id"></musicDetailPopup>
  </div>
</template>
<script lang="ts">
import kdySingle from "@/components/kdy-single/kdy-single.vue";
import kdyPlaylist from "@/components/kdy-playlist/kdy-playlist.vue";
import kdySinger from "@/components/kdy-singer/kdy-singer.vue";
import kdyPodcast from "@/components/kdy-podcast/kdy-podcast.vue";
import kdyLyric from "@/components/kdy-lyric/kdy-lyric.vue";
export default {
  components: {
    kdySingle,
    kdyPlaylist,
    kdySinger,
    kdyPodcast,
    kdyLyric
  }
}

</script>


<script setup lang="ts">
import mitt from "@/assets/lib/bus";
import { searchTypes as tab_list, } from "@/enum-file/search-types";
import { SearchResult } from "@/types/search";
import { Song, Single } from "@/types/song"
import { searchAdvice } from "@/api/home/search";
import { searchResult } from "@/api/home/search";
import useSearchStore from "@/store/search";
import useSongStore from "@/store/song";

let router = useRouter()
let route = useRoute()
let tool = useTool()
let appBarStyle = {
  '--app-bar-title-padding': `0 ${tool.px2vw(30)}`,
  "--app-bar-color": "transparents"
}
let searchStore = useSearchStore()
let songStore = useSongStore()
// 搜索的关键词
let keyword = ref(route.params.keyword.toString())
// 当前tab
let tab_cur = ref(0)
// 单曲详情弹窗
let show_single_detail = ref(false)
// 单曲id
let single_id = ref(0)

let search_results = ref<any[]>([])


// 分页
let search_paging = reactive({
  keywords: keyword.value,
  page: 1,
  limit: 30,
  finished: false,
  loading: false
})
const paging_type = computed(() => {
  return tab_list[tab_cur.value].value
})
const offset = computed(() => {
  return (search_paging.page - 1) * search_paging.limit
})

searchStore.keyword = keyword.value
searchStore.type = tab_list[tab_cur.value].value

// 输入关键字 搜索建议列表
let search_result = ref<SearchResult[]>([])


const initPaging = () => {
  search_paging.page = 1
  search_paging.finished = false
  search_results.value.length = 0
}

// 切换tab
const tabChange = (i: number | string) => {
  console.log(paging_type.value, "打印", tab_cur, i);
  initPaging()
  getSearchResult()
}


// 搜索输入监听
const searchInput = async () => {
  if (keyword.value) {
    let res: any = await searchAdvice(keyword.value)
    search_result.value = res.result.allMatch
  } else {
    pageBack()
  }
}
// 点击搜索
const clickSearch = (v?: string) => {
  if (v) keyword.value = v
  searchStore.keyword = keyword.value
  router.replace({ name: "searchResult", params: { keyword: keyword.value } })
  if (search_result.value.length) pageBack()
}

// 页面返回
const pageBack = () => {
  if (search_result.value.length) {
    search_result.value.length = 0
    return
  }
  router.back()
}

// 获取搜索结果
const getSearchResult = async () => {
  let params = {
    ...search_paging,
    offset: offset.value,
    type: paging_type.value
  }
  let res: any = await searchResult(params);
  let list = res.result[tab_list[tab_cur.value].listKey]
  console.log(res, "搜索结果", list);
  if (list.length < search_paging.limit) {
    search_paging.finished = true
  } else {
    search_paging.finished = false
  }
  search_paging.loading = false
  search_results.value.push(...list)
}

// 打开单曲详情
const openDetailPoup = (i: number) => {
  single_id.value = search_results.value[i].id
  show_single_detail.value = true
}

// 点击处理
const clickHandle = (i: number) => {
  let id = search_results.value[i].id
  let name = tab_list[tab_cur.value].name
  switch (name) {
    case "单曲":
    case "歌词":
      songStore.getSong(id)
      songStore.setSongPaused(false)
      mitt.emit('playAudio')
      break;
    case "歌单":
      router.push({ name: 'playlistDetail', params: { id } })
      break;
    case "歌手":
      router.push({ name: 'singerDetail', params: { id } })
      break;
    case "播客":
      router.push({ name: 'singerDetail', params: { id } })
      break;
  }


}


// 播放全部
const playAll = () => {
  let ids = search_results.value.map((item: Song | Single) => {
    return item.id
  })

  songStore.clearSongList()
  songStore.getSongList(ids.toString()).then(_ => {
    songStore.setSongPaused(false)
    songStore.getSong(songStore.songList[0].id)
  })

}
// 加载更多搜索结果
const loadResult = () => {
  if (!search_paging.finished) {
    search_paging.page++
    getSearchResult()
  }
}

// 监听路由参数变化
// watch(() => route.params, (toParams, previousParams) => {
//   searchStore.initParams()
//   searchStore.getList()
// })


// searchStore.getList()
</script>

<style scoped lang="scss">
.sticky {
  top: 0;
  left: 0;
}

.search_result {
  height: 100vh;

  &_item:last-child {
    border: none;
  }
}

.tab {
  position: relative;

  &_item {
    position: relative;
    z-index: 2;

    &.tab_active {
      @apply text-[#333] font-700;
    }
  }

  &_bar {
    position: absolute;
    left: 0;
    bottom: 0;
    height: 5px;
    border-radius: 3px;
    background-color: var(--color-primary);
    z-index: 1;
    transition: transform .3s ease-out;
  }
}
</style>