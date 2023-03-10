<!--
 * @Author: your name
 * @Date: 2022-03-24 17:47:16
 * @LastEditTime: 2023-02-27 20:46:27
 * @LastEditors: 可达鸭 997610780@qq.com
 * @Description: 全部歌曲
 * @FilePath: \zyk-music-h5\template.vue
-->
<template>
  <div class="page">
    <div class="page_hd">
      <KdyNavBar :title="route.meta.title"></KdyNavBar>
    </div>
    <div class="page_by px-15px bg-white">
      <KdyPlayAllHeader :ids="song_list.map(item => item.id)" :total="song_total">
        <template #right>
          <var-icon name="format-list-checkbox" :size="tool.addUnit(20)" color="var(--text-color)"
            @click="() => show_popup = true" />
        </template>
      </KdyPlayAllHeader>

      <var-list :finished="paging_config.finished" v-model:loading="paging_config.loading" @load="loadData" :offset="100">
        <KdySingle v-ripple v-for="(item, index) in song_list" :key="item.id" :item="item" :show-rank="true" :rank="index + 1">
        </KdySingle>
      </var-list>
    </div>
    <var-back-top bottom="100" right="30" />

    <var-popup position="bottom" v-model:show="show_popup" :default-style="false" teleport="body">
      <div class="bg-white rounded-tl-10px rounded-tr-10px">
        <div class="border-b-1px px-15px py-10px text-[#666] text-12px">
          选择排序方式
        </div>
        <div class="text-[var(--text-color)] text-14px">
          <div class="flex items-center py-10px px-15px " :class="{ active: item.value == paging_config.order }" v-ripple
            v-for="(item, index) in sort_types" :key="item.value" @click="toggleSort(item.value)">
            <var-icon namespace="kdy-icon" :name="item.icon" :size="tool.addUnit(16)" />
            <span class="ml-10px">{{ item.name }}</span>
          </div>
        </div>
      </div>
    </var-popup>
  </div>
</template>
<script setup lang="ts">
import { singerAllSong } from "@/api/my/singer";
import { Song } from "@/types/song";
import { sort_types } from "@/enum-file/singer";
let router = useRouter()
let route = useRoute()
const type = route.params.type
const id = route.params.id
const tool = useTool()

// 选择排序弹窗
let show_popup = ref(false)
// 歌曲总数
let song_total = ref(0)
// 分页配置
let paging_config = reactive({
  order: "hot",
  limit: 50,
  id,
  page: 1,
  finished: false,
  loading: false,
})
let song_list = ref<Song[]>([])
const offset = computed(() => {
  return (paging_config.page - 1) * paging_config.limit
})

const getSingerAllSong = async () => {
  let res: any = await singerAllSong({ ...paging_config, offset: offset.value })
  console.log(res, "酷酷酷");
  song_total.value = res.total
  song_list.value.push(...res.songs)
  res.more ? paging_config.page++ : paging_config.finished = !res.more
  paging_config.loading = false
}

// 切换排序方式
const toggleSort = (v: string) => {
  if (v != paging_config.order) {
    paging_config.order = v
    song_list.value.length = 0
    paging_config.page = 1
    show_popup.value = false
    getSingerAllSong()
  }
}

const loadData = () => {
  console.log("滚动加载", paging_config.finished);
  if (paging_config.finished) {
    return
  }


  if (type == "singer") {
    console.log("触发了嘛");
    getSingerAllSong()
  }
}

</script>

<style scoped lang="scss">
.active {
  background-color: rgba(#00afef, 0.3);
}
</style>