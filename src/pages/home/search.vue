<!--
 * @Author: your name
 * @Date: 2022-03-24 17:47:16
 * @LastEditTime: 2022-05-12 15:17:27
 * @LastEditors: Please set LastEditors
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
            <kdy-search class="mx-10px" bg-color="#ebecec" v-model="keyword" @click="router.push({ path: '/search' })"
              :placeholder="placeholder"></kdy-search>
          </template>
          <template #right>
            <div class="text-[#333] text-14px" @click="clickSearch">
              搜索
            </div>
          </template>
        </var-app-bar>
      </var-style-provider>

      <!-- 分类 -->
      <div class="classify flex">
        <div class="classify_item flex items-center justify-center relative"
          :class="[`w-100/${classify_list.length}00`]" v-for="(item, index) in classify_list" :key="index">
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
      <div class="history">
        <div class="font-700 text-16px">
          历史
        </div>
        <div class="history_list">
          
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import useHistoryStore from "@/store/searchHistory";
import {Search} from "@/types/search"
let router = useRouter()
let tool = useTool()
let appBarStyle = {
  '--app-bar-title-padding': `0 ${tool.px2vw(30)}`,
  "--app-bar-color": "transparents"
}
let historyStore = useHistoryStore()
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
let getKeyword = async () => {
  let res: any = await kdyAxios.get('/search/default')
  placeholder.value = res.data.showKeyword
  null_keyword.value = res.data.realkeyword
}

// 点击搜索
const clickSearch = ()=>{
  let maxLength = historyStore.list.length
  let search:Search = {
    title:keyword.value == "" ? null_keyword.value: keyword.value,
    id:maxLength+1
  }
  historyStore.addHistory(search)
  keyword.value = ""
  getKeyword()
}

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