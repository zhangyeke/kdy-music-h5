<!--
 * @Author: your name
 * @Date: 2022-03-24 17:47:16
 * @LastEditTime: 2023-03-07 10:02:55
 * @LastEditors: zyk 997610780@qq.com
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
      <KdyPlayAllHeader :ids="search_results.map(item => item.id)" v-show="!tab_cur"></KdyPlayAllHeader>
      <var-list :finished="search_paging.finished" v-model:loading="search_paging.loading" @load="loadResult"
        :offset="50">
        <template v-if="search_results.length">
          <component :is="tab_list[tab_cur].component_name" :item="item" v-for="(item, index) in search_results" v-ripple
             :key="item.id" v-model:followed="item.followed" v-model:an="item.t">
          </component>
        </template>
      </var-list>
    </div>
  </div>
</template>
<script lang="ts">
import kdySingle from "@/components/kdy-single/kdy-single.vue";
import kdyPlaylist from "@/components/kdy-playlist/kdy-playlist.vue";
import kdySinger from "@/components/kdy-singer/kdy-singer.vue";
import kdyPodcast from "@/components/kdy-podcast/kdy-podcast.vue";
import kdyLyric from "@/components/kdy-lyric/kdy-lyric.vue";
import kdyAlbum from "@/components/kdy-album/kdy-album.vue";
import kdyUser from "@/components/kdy-user/kdy-user.vue";
export default {
  components: {
    kdySingle,
    kdyPlaylist,
    kdySinger,
    kdyPodcast,
    kdyLyric,
    kdyAlbum,
    kdyUser
  }
}

</script>


<script setup lang="ts">
import {onBeforeRouteUpdate} from "vue-router";
import { searchTypes as tab_list, } from "@/enum-file/search-types";
import { SearchResult } from "@/types/search";
import { searchAdvice,searchResult } from "@/api/home/search";
import useSongStore from "@/store/song";

let router = useRouter()
let route = useRoute()
let tool = useTool()
let appBarStyle = {
  '--app-bar-title-padding': `0 ${tool.px2vw(30)}`,
  "--app-bar-color": "transparents"
}

let songStore = useSongStore()
// 搜索的关键词
let keyword = ref(route.params.keyword.toString())
// 当前tab
let tab_cur = ref(0)
let search_results = ref<any[]>([])

// 分页
let search_paging = reactive({
  page: 1,
  limit: 30,
  finished: false,
  loading: false
})

const keywords = computed(() => {
  return keyword.value
})

const paging_type = computed(() => {
  return tab_list[tab_cur.value].value
})
const offset = computed(() => {
  return (search_paging.page - 1) * search_paging.limit
})
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
    type: paging_type.value,
    keywords:keywords.value,
  }
  let res: any = await searchResult(params);
  let list = res.result[tab_list[tab_cur.value].listKey]
  console.log(res, "搜索结果", list);
  if (list.length < search_paging.limit) {
    search_paging.finished = true
  } else {
    search_paging.page++
    search_paging.finished = false
  }
  search_paging.loading = false
  search_results.value.push(...list)
}

// 加载更多搜索结果
const loadResult = () => {
  if (!search_paging.finished) {
    getSearchResult()
  }
}

onBeforeRouteUpdate((newRoute)=>{
  keyword.value = newRoute.params.keyword as string
  initPaging()
  getSearchResult()
})


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