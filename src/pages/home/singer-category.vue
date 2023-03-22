<!--
 * @Author: your name
 * @Date: 2022-03-24 17:47:16
 * @LastEditTime: 2023-03-23 00:16:45
 * @LastEditors: 可达鸭 997610780@qq.com
 * @Description: 歌手分类
 * @FilePath: \zyk-music-h5\template.vue
-->
<template>
  <div class="bg-white" @touchmove="touchmove">
    <KdyNavBar :title="$route.meta.title" :is-fixed="true"></KdyNavBar>
    <div class="screen px-15px text-12px text-[var(--color-text)] pb-10px bg-white">

      <div v-show="show_screen" class="text-14px flex justify-between items-center" v-ripple
        @click="show_screen = !show_screen">
        <div>
          <span v-if="cur_area == -1 && cur_type == -1">全部歌手</span>
          <span v-if="cur_area > -1">{{ category_area[cur_area].name }}</span>
          <span v-if="cur_type > -1">&nbsp;·&nbsp;{{ category_type[cur_type].name }}</span>
        </div>
        <div class="flex items-center">
          <var-icon namespace="kdy-icon" name="filter" :size="tool.px2vw(16)" color="var(--color-text)"></var-icon>
          <span class="ml-5px">筛选</span>
        </div>
      </div>


      <div v-show="!show_screen">
        <div class="flex mb-10px">
          <div class="mr-20px" :class="{ 'text-[var(--color-primary)]': index == cur_area }" v-ripple
            @click="toggleHhere(index, 'area')" v-for="(item, index) in category_area" :key="index">{{ item.name }}</div>
        </div>

        <div class="flex">
          <div class="mr-20px" :class="{ 'text-[var(--color-primary)]': index == cur_type }" v-ripple
            @click="toggleHhere(index, 'type')" v-for="(item, index) in category_type" :key="index">{{ item.name }}</div>
        </div>
      </div>


    </div>

    <div class="px-5px">
      <var-list v-model:loading="paging.loading" :finished="paging.finish" :immediate-check="false" @load="loadData">
        <KdySinger v-for="(item, index) in singer_list" :key="item.id" :item="item" :border="false" v-ripple v-model:followed="item.followed" :show-alias="false" :show-icon="true"></KdySinger>
      </var-list>

    </div>

    <var-back-top bottom="100" right="30" />
  </div>
</template>
<script setup lang="ts">
import { category_area, category_type } from "@/enum-file/singer";
import { singerList } from "@/api/home/singer";
import { Artist } from "@/types/user";
const tool = useTool()
let cur_area = ref(-1)
let cur_type = ref(-1)
let show_screen = ref(false)
let paging = reactive({
  page: 1,
  limit: 30,
  loading: false,
  finish: false
})

let singer_list = ref<Artist[]>([])

const initPaging = () => {
  paging = {
    page: 1,
    limit: 30,
    loading: false,
    finish: false
  }
  singer_list.value.length = 0
}

// 切换筛选条件
const toggleHhere = (i: number, screen: string) => {
  if (screen == "area") {
    cur_area.value = i
  } else {
    cur_type.value = i
  }
  initPaging()
  loadData()
}


// 获取歌手列表
const getSingerList = async () => {
  let { page, limit } = paging
  let params = {
    page,
    limit,
    initial: -1,
    type: cur_type.value == -1 ? cur_type.value : category_type[cur_type.value].value,
    area: cur_area.value == -1 ? cur_area.value : category_area[cur_area.value].value
  }
  let res: any = await singerList(params)
  console.log(res, "可怜见立刻就");
  singer_list.value.push(...res.artists)
  paging.finish = !res.more
  paging.loading = false
  paging.page++
}


const touchmove = () => {
  console.log(window.scrollY, "看看看");
  if (window.scrollY > 100) {
    show_screen.value = true
  }
}

const loadData = () => {
  if (!paging.finish) {
    getSingerList()
  }
}

loadData()

</script>

<style scoped lang="scss">
.screen {
  position: sticky;
  top: 50px;
  left: 0;
  z-index: 9;
}
</style>