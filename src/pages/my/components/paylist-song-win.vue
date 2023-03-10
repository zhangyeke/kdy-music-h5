<!--
 * @Author: your name
 * @Date: 2022-03-24 17:47:16
 * @LastEditTime: 2023-03-08 00:40:16
 * @LastEditors: 可达鸭 997610780@qq.com
 * @Description: 歌单的歌曲列表窗口
 * @FilePath: \zyk-music-h5\template.vue
-->
<template>
  <KdyTransition enter-class="animate-slideInRight" leave-class="animate-slideOutRight">
    <div class="bg-default fixed top-0 bottom-0 left-0 w-full min-h-100vh z-30 overflow-y-auto pb-50px"
      v-show="modelValue">
      <div>
        <KdyNavBar :title="title" :custom-back="true" @back="close"></KdyNavBar>
      </div>
      <div class="px-20px mt-20px">
        <var-list :finished="paging.finished" :immediate-check="false" v-model:loading="paging.loading" @load="loadSong"
          :offset="100">
          <KdySingle v-for="(item, index) in list" :key="item.id" :item="item" :is-jump="false" v-ripple>
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
      <var-back-top :duration="50" right="30" bottom="100" />
    </div>
  </KdyTransition>
</template>
<script setup lang="ts">
import { Song } from '@/types/song';
import { songListAllSong, handlePlaylist } from "@/api/public/playlist";
const props = withDefaults(defineProps<{
  title: string,
  modelValue: boolean,
  isLovePlaylist: boolean,
  pId: string | number,
  lId: string | number,
  chooseId: string | number,
}>(), {

})

const tool = useTool()

let list = ref<Song[]>([])

// 是否与歌单详情的歌单id相同
const is_other = computed(() => {
  return props.pId != props.chooseId ? true : false
})

// 分页
let paging = reactive({
  page: 1,
  limit: 30,
  finished: false,
  loading: false,
})
const getOffset = () => {
  return (paging.page - 1) * paging.limit
}

watch(() => props.modelValue, (v) => {
  v && loadSong()
})

const emit = defineEmits(['update:modelValue'])

const initPaging = () => {
  paging = {
    page: 1,
    limit: 30,
    finished: false,
    loading: false,
  }
  list.value.length = 0
}

let p_ids: number[] = []
let l_ids: number[] = []

const setSongItemStatus = (list: Song[]): Song[] => {
  return list.map(item => {
    if (is_other) {
      item.is_love = l_ids.includes(item.id)
      item.is_collect = p_ids.includes(item.id)
    } else if (props.isLovePlaylist) {
      item.is_love = true
      item.is_collect = p_ids.includes(item.id)
    } else {
      item.is_love = l_ids.includes(item.id)
      item.is_collect = true
    }

    return item
  })
}

const close = () => {
  initPaging()
  emit('update:modelValue', false)
}

const loadSong = tool.debounce(() => {
  if (!paging.finished) {
    getSongList()
  }
})

const getAllSong = async (id: number | string, type: number = 1) => {
  let res: any = await songListAllSong({ id })
  if (type) {
    p_ids = res.songs.map((item: Song) => item.id)
  } else {
    l_ids = res.songs.map((item: Song) => item.id)
  }
}

const getSongList = async () => {
  let res: any = await songListAllSong({
    ...paging,
    id: props.chooseId,
    offset: getOffset()
  })

  if (!list.value.length) {
    if (is_other) {
      await getAllSong(props.lId, 0)
      await getAllSong(props.pId)
    } else if (props.isLovePlaylist) {
      await getAllSong(props.pId)
    } else {
      await getAllSong(props.lId, 0)
    }
  }
  if (res.songs.length < paging.limit) {
    paging.finished = true
  } else {
    paging.finished = false
    paging.page++
  }
  list.value.push(...setSongItemStatus(res.songs))
  paging.loading = false
}



// 对歌单进行添加或删除歌曲
const operateHandle = async (i: number, field: string,) => {
  let song = list.value[i]

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
  list.value[i][field] = !list.value[i][field]
  tool.toast({ content })
  console.log(res, "对歌单进行操作");

}
</script>

<style scoped lang="scss"></style>