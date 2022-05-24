<!--
 * @Author: your name
 * @Date: 2022-03-24 17:47:16
 * @LastEditTime: 2022-05-24 17:54:50
 * @LastEditors: [you name]
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \zyk-music-h5\template.vue
-->
<template>
  <div class="page">
    <div class="page_head bg-white pb-5px">
      <var-style-provider :style-vars="appBarStyle">
        <var-app-bar title-position="center" :elevation="false">
          <template #left>
            <div @click="router.back()">
              <var-icon name="chevron-left" color="#333" size="26" />
            </div>
          </template>
          <template #>
            <kdy-search class="mx-10px" bg-color="#ebecec" v-model="keyword"></kdy-search>
          </template>
          <template #right>
            <div class="text-[#333] text-14px font-600">
              搜索
            </div>
          </template>
        </var-app-bar>
      </var-style-provider>
    </div>

    <div class="page_main">
      <div class="tab flex bg-white x_slide">
        <div class="tab_item px-10px text-[#666] text-14px pb-5px" :class="{ tab_active: index == tab_cur }"
          v-for="(item, index) in tab_list" :key="index" @click="toggleTab(index, $event)" v-ripple>
          {{ item.name }}
        </div>
        <div class="tab_bar"
          :style="{ width: `${bar_width}px`, transform: tab_cur > 0 ? `translateX(${offsetX}px)` : `translateX(${bar_width / 2}px)` }">
        </div>
      </div>

      <div>
        <component :is="tab_list[tab_cur].component"></component>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { searchTypes as tab_list, searchType } from "@/enum-file/search-types";
import { getSearchResult } from "@/api/home/search";
let router = useRouter()
let route = useRoute()
let tool = useTool()
let appBarStyle = {
  '--app-bar-title-padding': `0 ${tool.px2vw(30)}`,
  "--app-bar-color": "transparents"
}
// 搜索的关键词
let keyword = ref(route.params.keyword.toString())
// 当前tab
let tab_cur = ref(0)
// // tab列表
// let tab_list = ref(searchTypes)
// bar的x轴偏移量
let offsetX = ref(0)
// bar的宽度
let bar_width = ref(24)

// 第几页
let page = ref(1)
// 一页返回数量
let limit = ref(10)
// 搜索结果列表
let results_list = ref<any>([])
// 滚动是否加载完毕
let finished = ref(false)
// 加载状态
let load_status = ref(false)
// 切换tab
const toggleTab = (i: number, e: MouseEvent) => {
  tab_cur.value = i
  offsetX.value = (e.target as HTMLElement).offsetLeft + bar_width.value / 2
  getList()
}

// 获取搜索结果
const getList = async () => {
  let res = await getSearchResult({
    keywords: keyword.value,
    type: tab_list[tab_cur.value].value,
    page: page.value,
    limit: limit.value,
  })

  console.log(res, "获取搜索结果");
}


// 初始化参数
const initParams = () => {
  page.value = 1
  results_list.value.length = 0
}

getList()
</script>

<style scoped lang="scss">
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