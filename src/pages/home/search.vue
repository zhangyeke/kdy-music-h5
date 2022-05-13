<!--
 * @Author: your name
 * @Date: 2022-03-24 17:47:16
 * @LastEditTime: 2022-05-13 17:56:46
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \zyk-music-h5\template.vue
-->
<template>
  <div class="page">
    <div class="page_head bg-white pb-5px" @keydown.enter="clickSearch">
      <var-style-provider :style-vars="appBarStyle">
        <var-app-bar title-position="center" :elevation="false">
          <template #left>
            <div @click="router.back()">
              <var-icon name="chevron-left" color="#333" size="26" />
            </div>
          </template>
          <template #>
            <kdy-search class="mx-10px" bg-color="#ebecec" v-model="keyword" @click="router.push({ path: '/search' })"
              :placeholder="placeholder"></kdy-search>
          </template>
          <template #right>
            <div class="text-[#333] text-14px font-600" @click="clickSearch">
              搜索
            </div>
          </template>
        </var-app-bar>
      </var-style-provider>

      <!-- 分类 -->
      <div class="classify flex">
        <div class="classify_item flex items-center justify-center relative w-25/100"
          v-for="(item, index) in classify_list" :key="index">
          <div>
            <var-icon namespace="kdy-icon" :name="item.icon" :size="tool.px2vw(20)" color="var(--color-primary)" />
          </div>
          <div class="text-14px ml-3px text-[#333]">
            {{ item.name }}
          </div>
        </div>
      </div>
    </div>
    <div class="page_body px-20px mt-20px">
      <!-- 搜索历史 -->
      <div class="history text-[#333]" v-if="historyStore.list.length">
        <div class="font-700 text-16px flex justify-between">
          <span>历史</span>
          <div v-ripple @click="clearHistory">
            <var-icon namespace="kdy-icon" name="lajixiang" />
          </div>
        </div>
        <div class="history_list flex mt-10px flex-wrap">
          <div
            class="history_item mr-5px text-12px text-[#666] px-15px py-6px bg-white rounded-30px flex items-center mb-10px"
            v-for="(item, index) in history_list" :key="item.id" v-ripple>
            {{ item.title }}
          </div>
          <div class="history_more w-24px h-24px bg-white rounded-1/2 flex justify-center items-center"
            @click="an_more_history = !an_more_history" v-if="historyStore.list.length > 3">
            <var-icon :name="an_more_history ? 'chevron-up' : 'chevron-down'" color="#666" :transition="300" />
          </div>
        </div>
      </div>

      <div class="flex">
        <rank :list="hot_list" title="热搜榜"></rank>
        <rank :list="hot_list" title="话题榜"></rank>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import useHistoryStore from "@/store/searchHistory";
import { Search } from "@/types/search";
import { Dialog } from '@varlet/ui';
import rank from "./components/rank/rank.vue";
let router = useRouter()
let tool = useTool()
let appBarStyle = {
  '--app-bar-title-padding': `0 ${tool.px2vw(30)}`,
  "--app-bar-color": "transparents"
}
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
// 热搜榜
let hot_list = ref([])

let history_list = computed(() => {
  return an_more_history.value ? historyStore.list : historyStore.list.filter((item, index) => index < 4)
})

// 获取默认搜索关键词
let getKeyword = async () => {
  let res: any = await kdyAxios.get('/search/default')
  placeholder.value = res.data.showKeyword
  null_keyword.value = res.data.realkeyword
}

// 点击搜索
const clickSearch = () => {
  let maxLength = historyStore.list.length
  let search: Search = {
    title: keyword.value == "" ? null_keyword.value : keyword.value,
    id: maxLength + 1
  }
  historyStore.addHistory(search)
  keyword.value = ""
  getKeyword()
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
  let res = await kdyAxios.get('/search/hot/detail')
  hot_list.value = res.data
}

// 获取热门话题
const getHotTopic = async ()=>{
  let res = await kdyAxios.get('/hot/topic')
  console.log(res,"人话题");
  
}
getHotTopic()
getHotList()
getKeyword()
</script>

<style scoped lang="scss">
.page {
  &_head {
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
  }
}
</style>