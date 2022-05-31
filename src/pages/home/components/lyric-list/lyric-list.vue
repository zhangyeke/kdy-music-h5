
<!--
 * @Author: your name
 * @Date: 2022-03-24 17:47:16
 * @LastEditTime: 2022-05-31 10:56:42
 * @LastEditors: [you name]
 * @Description: 歌词列表
 * @FilePath: \zyk-music-h5\template.vue
-->
<template>
  <div class="lyric">
    <var-list :finished="finished" v-model:loading="loading" @load="load" :offset="200">
      <div class="lyric_list bg-white">
        <div class="lyric_item  border_b_solid_1 p-10px" v-for="(item, index) in lyric_list" :key="item.id" v-ripple>
          <div class="flex items-center">
            <div class="flex-1">
              <div class="text-14px text-[#333] font-500">{{ item.name }}</div>
              <div class="text-[#666] text-10px truncate mt-5px">
                <span v-for="(e, i) in item.artists" :key="i">{{ e.name }}<span
                    v-if="i != item.artists.length - 1">/</span></span>
                <span>&nbsp;-&nbsp;{{ item.album.name || item.name }}</span>
              </div>
            </div>
            <div class="w-20/100 flex items-center justify-end ">
              <div>
                <var-icon name="bofang1" namespace="kdy-icon" color="#333" :size="tool.px2vw(20)" />
              </div>
              <div @click.stop="lookMusicDetail(item.id)" class="px-10px">
                <var-icon name="androidgengduo" namespace="kdy-icon" color="#333" :size="tool.px2vw(20)" />
              </div>
            </div>
          </div>
          <div class="lyric_info text-[#666] text-12px mt-10px" :class="{ an: item.status }"
            v-html="textReplace(item.lyrics?.txt || '')"></div>

          <div class="text-[#999] text-10px py-10px an_btn" v-ripple @click.stop="clickAn(index)">
            <span>{{ item.status ? '收起' : '展开' }}歌词</span>
            <var-icon name="chevron-down" color="#999" :size="tool.px2vw(10)" />
          </div>
        </div>
      </div>
    </var-list>

    <musicDetailPopup v-model:show="show_win" :music-id="cur_music_id"></musicDetailPopup>
  </div>
</template>
<script setup lang="ts">
import useSearchStore from "@/store/search";
import { Single } from "@/types/song";
let prop = withDefaults(defineProps<{
  isLoadMore?: boolean
  list?: Single[]
}>(), {
  isLoadMore: true
})
let tool = useTool()
let searchStore = useSearchStore()
// 音乐详情弹窗
let show_win = ref(false)
// 需要查看详情的音乐id
let cur_music_id = ref(0)
// 是否加载完成
let finished = ref(false)
// 加载状态
let loading = ref(false)
// 列表
let lyric_list = computed<Single[]>(() => {
  return prop.list?.length ? prop.list : searchStore.list
})
// 加载处理
const load = () => {
  if (prop.isLoadMore && searchStore.page <= searchStore.pageCount) {
    searchStore.page++
    searchStore.getList().then((r: boolean) => {
      loading.value = false
    })
  } else {
    loading.value = false
    finished.value = true
  }
}

// 文本替换
const textReplace = (text: string) => {
  return text.replace(/\n/g, '</br></br>')
}

// 点击展开
const clickAn = (i: number) => {
  if (lyric_list.value[i].status) {
    let e: Element = document.querySelectorAll(".lyric_item")[i]
    let top = (e as HTMLElement).offsetTop
    window.scrollTo(0, top)
  }
  lyric_list.value[i].status = !lyric_list.value[i].status
}

// 查看歌曲详情
const lookMusicDetail = (id: number) => {
  cur_music_id.value = id
  show_win.value = true
}


</script>

<style scoped lang="scss">
.lyric {
  &_item {
    transition: height .3s ease-out;
    padding-bottom: 0;

    &:last-child {
      border: none;
    }
  }

  &_info {
    height: 120px;
    overflow: hidden;

    &.an {
      height: auto;
    }
  }
}
</style>