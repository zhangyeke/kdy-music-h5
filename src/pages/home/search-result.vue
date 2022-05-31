<!--
 * @Author: your name
 * @Date: 2022-03-24 17:47:16
 * @LastEditTime: 2022-05-31 20:25:50
 * @LastEditors: [you name]
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \zyk-music-h5\template.vue
-->
<template>
  <div class="page">
    <div class="page_head bg-white pb-5px sticky" @keydown.enter="clickSearch()">
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
      <div class="tab flex bg-white x_slide" v-if="!search_result?.length">
        <div class="tab_item px-10px text-[#666] text-14px pb-5px" :class="{ tab_active: index == tab_cur }"
          v-for="(item, index) in tab_list" :key="index" @click="toggleTab(index, $event, true)" v-ripple>
          {{ item.name }}
        </div>
        <div class="tab_bar"
          :style="{ width: `${bar_width}px`, transform: tab_cur > 0 ? `translateX(${offsetX}px)` : `translateX(${bar_width / 2}px)` }">
        </div>
      </div>
    </div>
    <!-- 搜索结果 -->
    <div class="search_result bg-white" v-if="search_result?.length" @click="pageBack">
      <div class="search_result_item border_b_solid_1 py-5px px-10px text-14px text-[#333] flex items-center"
        v-for="(item, index) in search_result" :key="index" @click.stop="clickSearch(item.keyword)">
        <var-icon name="magnify" color="#dedede" :size="20" />
        <span class="ml-5px">{{ item?.keyword }}</span>
      </div>
    </div>
    <div class="page_main" v-else>
      <component :is="tab_list[tab_cur].component"></component>
    </div>
  </div>
</template>
<script setup lang="ts">
import { searchTypes as tab_list, searchType } from "@/enum-file/search-types";
import { SearchResult } from "@/types/search";
import { searchAdvice } from "@/api/home/search";
import useSearchStore from "@/store/search";
let router = useRouter()
let route = useRoute()
let tool = useTool()
let appBarStyle = {
  '--app-bar-title-padding': `0 ${tool.px2vw(30)}`,
  "--app-bar-color": "transparents"
}
let searchStore = useSearchStore()
// 搜索的关键词
let keyword = ref(route.params.keyword.toString())
// 当前tab
let tab_cur = ref(0)
// bar的x轴偏移量
let offsetX = ref(0)
// bar的宽度
let bar_width = ref(24)
searchStore.keyword = keyword.value
searchStore.type = tab_list[tab_cur.value].value

// 输入关键字 搜索建议列表
let search_result = ref<SearchResult[]>([])

// 切换tab
const toggleTab = (i: number, e: MouseEvent | Element, isclick?: boolean) => {
  if (i == tab_cur.value && isclick) return
  tab_cur.value = i
  if (e instanceof Element) {
    offsetX.value = (e as HTMLElement).offsetLeft + bar_width.value / 2
  } else {
    offsetX.value = (e.target as HTMLElement).offsetLeft + bar_width.value / 2
  }
  searchStore.type = tab_list[tab_cur.value].value
  searchStore.initParams()
  if (tab_cur.value == 0) searchStore.getList()
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

watch(() => searchStore.type, (v) => {
  initBarPot(v)
})

// 监听路由参数变化
watch(() => route.params, (toParams, previousParams) => {
  searchStore.initParams()
  searchStore.getList()
})

const initBarPot = (v?: number) => {
  let i = tab_list.findIndex((item: searchType) => item.value == (v ? v : tab_list[tab_cur.value].value))
  let tab_item: Element = document.querySelectorAll('.tab .tab_item')[i]
  toggleTab(i, tab_item)
}

onMounted(() => {
  initBarPot()
})
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