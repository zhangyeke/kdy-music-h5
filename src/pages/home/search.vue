<!--
 * @Author: your name
 * @Date: 2022-03-24 17:47:16
 * @LastEditTime: 2023-02-07 16:24:17
 * @LastEditors: zyk 997610780@qq.com
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \zyk-music-h5\template.vue
-->
<template>
  <div class="page">
    <div class="page_head bg-white pb-5px" @keydown.enter="clickSearch()">
      <var-style-provider :style-vars="appBarStyle">
        <var-app-bar title-position="center" :elevation="false">
          <template #left>
            <div @click="pageBack">
              <var-icon name="chevron-left" color="#333" size="26" />
            </div>
          </template>
          <template #>
            <kdy-search class="mx-10px" bg-color="#ebecec" v-model="keyword" :placeholder="placeholder"
              @input="searchInput"></kdy-search>
          </template>
          <template #right>
            <div class="text-[#333] text-14px font-600" @click="clickSearch()">
              搜索
            </div>
          </template>
        </var-app-bar>
      </var-style-provider>
    </div>
    <!-- 搜索结果 -->
    <div class="search_result bg-white" v-if="search_result.length" @click="pageBack">
      <div class="search_result_item border_b_solid_1 py-5px px-10px text-14px text-[#333] flex items-center"
        v-for="(item, index) in search_result" :key="index" @click.stop="clickSearch(item.keyword)">
        <var-icon name="magnify" color="#dedede" :size="20" />
        <span class="ml-5px">{{ item?.keyword }}</span>
      </div>
    </div>

    <div class="page_body" v-else>
      <!-- 分类 -->
      <div class="classify flex bg-white pb-10px">
        <div class="classify_item flex items-center justify-center relative w-25/100"
          v-for="(item, index) in classify_list" :key="index" v-ripple>
          <div>
            <var-icon namespace="kdy-icon" :name="item.icon" :size="tool.px2vw(20)" color="var(--color-primary)" />
          </div>
          <div class="text-14px ml-3px text-[#333]">
            {{ item.name }}
          </div>
        </div>
      </div>
      <!-- 搜索历史 -->
      <div class="history text-[#333] mt-20px px-20px" v-if="historyStore.list.length">
        <div class="font-700 text-16px flex justify-between">
          <span>历史</span>
          <div v-ripple @click.stop="clearHistory">
            <var-icon namespace="kdy-icon" name="lajixiang" />
          </div>
        </div>
        <div class="history_list flex mt-10px flex-wrap">
          <div
            class="history_item mr-5px text-12px text-[#666] px-15px py-6px bg-white rounded-30px flex items-center mb-10px"
            v-for="(item, index) in history_list" :key="item.id" v-ripple @click.stop="jump(item.title)">
            {{ item.title }}
          </div>
          <div class="history_more w-24px h-24px bg-white rounded-1/2 flex justify-center items-center"
            @click="an_more_history = !an_more_history" v-if="historyStore.list.length > 4">
            <var-icon :name="an_more_history ? 'chevron-up' : 'chevron-down'" color="#666" :transition="300" />
          </div>
        </div>
      </div>

      <!-- 热榜 -->
      <div class="px-20px">
        <var-style-provider :style-vars="{ '--tabs-padding': '0', '--tab-padding': '0' }">
          <var-tabs v-model:active="tab_cur" color="transparent" active-color="#333" indicator-color="transparent">
            <template v-for="(item, index) in rank_tabs" :key="index">
              <var-tab :name="index" :class="{ 'font-700': index == tab_cur }" v-if="item.list.length">
                {{ item.title }}</var-tab>
            </template>
          </var-tabs>
        </var-style-provider>
        <div class="rank_item w-full bg-white  pt-12px rounded-10px public_shadow"
          :style="{ height: an_more ? tool.px2vw(244) : tool.px2vw(162) }" :class="{ 'pb-12px': an_more }">
          <var-tabs-items v-model:active="tab_cur">
            <template v-for="(item, index) in rank_tabs" :key="index">
              <var-tab-item :name="index" v-if="item.list.length" class="text-12px text-[#333] tab_item"
                :style="{ height: an_more ? 'auto' : '' }">
                <rank :list="item.list" :text-key="item.titleKey" :singleRow="item.singleRow"
                  :right-text-key="item.singleRow ? 'participateCount' : ''" :index="index" @jump="jump"></rank>
              </var-tab-item>
            </template>
          </var-tabs-items>
          <div class="text-[#999] text-12px text flex items-center justify-center py-10px" v-if="!an_more" v-ripple
            @click="an_more = !an_more">
            <span>展开更多</span>
            <var-icon name="chevron-down" />
          </div>
        </div>
      </div>

      <!--推荐新音乐 -->
      <div class="music mt-20px px-20px">
        <div class="font-700 text-16px">推荐新音乐</div>
        <div class="music_list flex flex-wrap justify-between mt-10px">
          <div class="music_item w-49/100 mb-10px rounded-10px bg-white public_shadow overflow-hidden"
            v-for="(item, index) in music_list" :key="index">
            <img :src="item.picUrl" class="w-full">
            <div class="py-10px text-center text-12px text-[#333] truncate">
              {{ item.name }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import useHistoryStore from "@/store/searchHistory";
import useUserStore from "@/store/user";
import { Search, SearchResult } from "@/types/search";
import { NewSong } from "@/types/song"
import { Dialog } from '@varlet/ui';
import rank from "./components/rank/rank.vue";
import { getHopic, getHot, getHotRadio, getNewMusic } from "@/api/home/hot";
import { getDefaultKeyword, searchAdvice } from "@/api/home/search";
let router = useRouter()
let tool = useTool()
let appBarStyle = {
  '--app-bar-title-padding': `0 ${tool.px2vw(30)}`,
  "--app-bar-color": "transparents"
}
let userStore = useUserStore()
// 搜索记录
let historyStore = useHistoryStore()
// 是否展示更多历史记录
let an_more_history = ref(false)
// 搜索框提示词
let placeholder = ref("")
// 点击空搜索的关键词
let null_keyword = ref("")
// 输入的关键词
let keyword = ref("")
let classify_list = ref([
  {
    name: "歌手",
    icon: "w_zhiyuan",
    url: "",
  },
  {
    name: "曲风",
    icon: "gequ",
    url: "",
  },
  {
    name: "专区",
    icon: "yinle",
    url: "",
  },
  {
    name: "识曲",
    icon: "maikefeng",
    url: "",
  },
])
let history_list = computed(() => {
  return an_more_history.value ? historyStore.list : historyStore.list.filter((item, index) => index < 4)
})

let rank_tabs = ref([{ title: "热搜榜", titleKey: "searchWord", singleRow: false, list: [] }, { title: "话题榜", singleRow: true, titleKey: "title", list: [] }, { title: "电台榜", singleRow: false, titleKey: "name", list: [] }])
let tab_cur = ref(0)
// 展开更多
let an_more = ref(false)

let music_list = ref<NewSong[]>([])

let search_result = ref<SearchResult[]>([])

// 获取默认搜索关键词
let getKeyword = async () => {
  let res: any = await getDefaultKeyword()
  placeholder.value = res.data.showKeyword
  null_keyword.value = res.data.realkeyword
}

// 点击搜索
const clickSearch = (value?: string) => {
  let k = ""
  let maxLength = historyStore.list.length
  let search: Search = {
    title: keyword.value == "" ? null_keyword.value : keyword.value,
    id: maxLength + 1
  }
  if (value) {
    k = value
  } else {
    k = keyword.value != "" ? keyword.value : null_keyword.value
  }
  historyStore.addHistory(search)
  // router.push({name:"searchResult",params:{keyword:keyword.value}})
  jump(k)
  keyword.value = ""
  // pageBack()
}


const jump = (value: string) => {
  router.push({ name: "searchResult", params: { keyword: value } })
}

// 清空历史记录
const clearHistory = () => {
  Dialog({
    title: "",
    message: "确定清空全部历史记录?",
    confirmButtonText: "清空",
    cancelButtonTextColor: "var(--color-primary)",
    onConfirm: () => {
      historyStore.clearHistory()
    }
  })
}

// 获取热搜榜
const getHotList = async () => {
  let res: any = await getHot()
  rank_tabs.value[0].list = res.data
}

// 获取热门话题
const getHotTopic = async () => {
  let res: any = await getHopic()
  console.log(res, "热门话题");
  rank_tabs.value[1].list = res.hot
}
// 获取电台榜
const getRadioList = async () => {
  let res: any = await getHotRadio()
  rank_tabs.value[2].list = res.djRadios
}
// 获取推荐新音乐
const getNewMusicList = async () => {
  let res: any = await getNewMusic()
  music_list.value = res.result
  console.log(res, "新音乐");
}

// 搜索输入监听
const searchInput = tool.debounce(async () => {
    if (keyword.value) {
      let res: any = await searchAdvice(keyword.value)
      search_result.value = res.result.allMatch || []
    } else {
      pageBack()
  }
})


// 页面返回
const pageBack = () => {
  if (search_result.value.length) {
    search_result.value.length = 0
    keyword.value = ""
    return
  }

  router.back()
}
if (userStore.token) {
  getHotTopic()
}
getNewMusicList()
getRadioList()

getHotList()
getKeyword()
</script>

<style scoped lang="scss">
.public_shadow {
  box-shadow: 0 0 5px #ccc;
}

.rank_item {
  transition: height .25s linear;
  overflow: hidden;
}

.page {
  .search_result {
    height: 100vh;

    &_item:last-child {
      border: none;
    }
  }

  .classify {
    &_item::after {
      content: "";
      position: absolute;
      width: 1px;
      height: 10px;
      background-color: #999;
      right: 0;
    }

    &_item:last-child:after {
      display: none;
    }
  }

  .tab_item {
    height: 110px;
    overflow: hidden;
  }
}
</style>