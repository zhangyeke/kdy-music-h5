<!--
 * @Author: your name
 * @Date: 2022-03-24 17:47:16
 * @LastEditTime: 2023-03-09 00:44:41
 * @LastEditors: 可达鸭 997610780@qq.com
 * @Description: 搜索歌曲
 * @FilePath: \zyk-music-h5\template.vue
-->
<template>
  <div class="mt-15px">
    <div v-show="!list.length && !is_search">
      <div class="font-700 text-14px text-[var(--text-color)]">历史</div>
      <div class="flex justify-around flex-wrap">
        <div v-for="(item, index) in searchStore.list" :key="item.id" class="mt-10px" v-ripple @click="clickKeyword(item.title)">
          <var-chip  color="#bbb" text-color="#666" plain size="small" :closable="true"
            @close="delHistory(item.title,$event)">{{ item.title }}</var-chip>
        </div>
      </div>
    </div>

    <div v-show="list.length && !is_search">
      <div class="border-b py-5px px-10px text-14px text-[#333] flex items-center" v-for="(item, index) in list"
        :key="index" @click.stop="clickKeyword(item.keyword)">
        <var-icon name="magnify" color="#dedede" :size="20" />
        <span class="ml-5px">{{ item?.keyword }}</span>
      </div>
    </div>

    <div v-show="is_search">
      <var-list :finished="search_paging.finished"  :immediate-check="false" v-model:loading="search_paging.loading" @load="loadResult" :offset="100">
        <KdySingle v-for="(item, index) in song_list" :key="item.id" :item="item" :is-jump="false">
          <template #right>
            <div class="flex items-center">
              <div class="mr-10px" @click.stop="operateHandle(index, 'is_love')"><var-icon
                  :name="item.is_love ? 'heart' : 'heart-outline'"
                  :color="item.is_love ? 'var(--color-danger)' : 'var(--text-color)'" transition="250" /></div>

              <div @click.stop="operateHandle(index, 'is_collect')" v-if="!isLovePlaylist"><var-icon
                  :name="item.is_collect ? 'checkbox-marked-circle' : 'plus-circle-outline'"
                  :color="item.is_collect ? 'var(--color-danger)' : 'var(--text-color)'" transition="250" /></div>
            </div>
          </template>
        </KdySingle>
      </var-list>
    </div>


  </div>
</template>
<script setup lang="ts">
import useSearchStore from "@/store/searchHistory";
import { SearchResult } from "@/types/search";
import { searchResult } from "@/api/home/search";
import { songListAllSong, handlePlaylist } from "@/api/public/playlist";
import { Song } from "@/types/song";
const props = withDefaults(defineProps<{
  list: SearchResult[],
  pId: string | number,
  lId: string | number,
  modelValue: string,
  isLovePlaylist:boolean | number
}>(), {

})


const tool = useTool()
const searchStore = useSearchStore()
const emit = defineEmits(['click', 'update:list', 'update:modelValue'])

let song_list = ref<Song[]>([])

// 分页
let search_paging = reactive({
  page: 1,
  limit: 30,
  finished: false,
  loading: false,
})
const getOffset = () => {
  return (search_paging.page - 1) * search_paging.limit
}

const is_search = ref(false)

// 初始化分页参数
const initPaging = () => {
  search_paging = {
    page: 1,
    limit: 30,
    finished: false,
    loading: false,
  }
  song_list.value.length = 0
}

const updateSearchStatus = (v: boolean) => {
  is_search.value = v
}

const delHistory = (v:string,e:Event)=>{
  searchStore.delHistory(v)
  e.stopPropagation()
}

// 点击关键词
const clickKeyword = async (v: string) => {
  is_search.value = true
  searchStore.addHistory(v)
  await emit('update:modelValue', v)
  initPaging()
  getSearchResult()
}

let p_ids: number[] = []
let l_ids: number[] = []

const setSongItemStatus = (list: Song[]): Song[] => {
  return list.map(item => {
    item.is_love = l_ids.includes(item.id)
    item.is_collect = p_ids.includes(item.id)
    return item
  })
}

// 获取搜索结果
const getSearchResult = async () => {
  if (props.list.length) {
    emit('update:list', [])
  }
  let params = {
    ...search_paging,
    offset: getOffset(),
    type: 1,
    keywords: props.modelValue,
  }
  if (!song_list.value.length) {
    let p_res: any = await songListAllSong({ id: props.pId })
    let l_res: any = await songListAllSong({ id: props.lId })
    p_ids = p_res.songs.map((item: Song) => item.id)
    l_ids = l_res.songs.map((item: Song) => item.id)
  }
  let res: any = await searchResult(params)
  if (!tool.hasOwn(res.result, 'songs') || (res.result.songs.length < search_paging.limit)) {
    search_paging.finished = true
  } else {
    search_paging.page++
    search_paging.finished = false
  }
  search_paging.loading = false
  song_list.value.push(...setSongItemStatus(res.result.songs))
  console.log(res.result.songs, "搜索结果",);
}

// 加载更多搜索结果
const loadResult = tool.debounce(() => {
  if (!search_paging.finished && is_search.value) {
    getSearchResult()
  }
})

// 对歌单进行添加或删除歌曲
const operateHandle = async (i: number, field: string,) => {
  let song = song_list.value[i]

  let res: any = await handlePlaylist({
    op: song[field] ? 'del' : 'add',
    tracks: song.id,
    pid: field == 'is_love' ? props.lId : props.pId
  })

  let content = ""

  if (field == 'is_love') {
    content = song[field] ? "已取消喜欢" : "已添加到我喜欢的音乐"
  } else {
    content = song[field] ? "已取消收藏" : "已收藏到歌单"
  }
  song_list.value[i][field] = !song_list.value[i][field]
  tool.toast({ content })
  console.log(res, "对歌单进行操作");

}

defineExpose({
  getSearchResult,
  updateSearchStatus,
  initPaging
})

</script>

<style scoped lang="scss"></style>