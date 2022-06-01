<!--
 * @Author: your name
 * @Date: 2022-03-24 17:47:16
 * @LastEditTime: 2022-06-01 23:01:21
 * @LastEditors: [you name]
 * @Description:歌曲评论
 * @FilePath: \zyk-music-h5\template.vue
-->
<template>
  <div class="page">
    <div class="page_head">
      <var-app-bar :title="PAGE_TITLE" :elevation="false" color="#fff" text-color="#333">
        <template #left>
          <div>
            <var-icon name="chevron-left" :size="tool.px2vw(26)" />
          </div>
        </template>
      </var-app-bar>
    </div>

    <div class="page_body ">
      <div class="song bg-white pb-10px flex items-center px-15px">
        <div class="song_cover w-50px h-50px bg-black flex items-center justify-center rounded-1/2 ">
          <img :src="song?.al.picUrl" class="w-30px h-30px rounded-1/2 fit_cover">
        </div>
        <div class="text-[#333] text-14px truncate flex-1 ml-5px">
          <span>{{ song?.name }}</span>
          <span v-if="song?.alia.length">{{ song.alia[0] }}</span>
        </div>
        <div v-if="song?.ar" class="text-[#999] text-10px">
          -<span v-for="(item, index) in song.ar" :key="index">{{ item.name }}<span
              v-if="index != song.ar.length - 1">/</span></span>
        </div>
      </div>

      <div class="comment bg-white mt-5px px-15px
      ">
        <div class="comment_head flex justify-between items-center pt-10px">
          <span class="font-700 text-14px text-[#333]">评论区</span>
          <div class="text-12px text-[#999]">
            <span v-for="(item, index) in type_list" :key="index" class="mr-15px"
              :class="index == comment_type ? ['text-[#333]', 'font-700'] : ''" @click="toggleType(index)">{{ item.name
              }}</span>
          </div>
        </div>
        <div class="comment_list mt-20px">
          <var-list :finished="finished" v-model:loading="loading" @load="load">
            <div class="content_item flex mb-10px" v-for="(item, index) in comment_list" :key="item.commentId">
              <img :src="item.user.avatarUrl" class="w-40px h-40px fit_cover rounded-1/2">
              <div class="ml-10px border_b_solid_1 flex-1">
                <div class="text-[#444] font-500 text-12px flex justify-between">
                  <span>{{ item.user.nickname }}</span>
                  <span v-if="item.user.vipType" class="text-primary text-10px ml-3px flex-1">尊贵的vip</span>
                  <div class="text-10px text-[#999]">
                    <span v-if="item.likedCount">{{ tool.numFormat(item.likedCount)}}</span>
                    <var-icon :name="item.liked ? 'yidianzan' : 'dianzan'" namespace="kdy-icon"
                      :color="item.liked ? 'var(--color-primary)' : '#999'" :size="tool.px2vw(20)" transition="300" />
                  </div>
                </div>
                <div class="text-[#999] text-8px mt-5px">{{ item.timeStr }}</div>
                <div v-html="item.content" class="text-[#333] text-14px font-500 mt-10px  pb-10px leading-20px">

                </div>
                <div class="text-primary text-10px pb-10px" v-ripple v-if="item.replyCount">
                  <span>{{item.replyCount}}条回复</span>
                  <var-icon name="chevron-right" color="var(--color-primary)" :size="tool.px2vw(14)"/>
                </div>
              </div>
            </div>
          </var-list>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { getMusicDetail, getComment } from "@/api/public/music";
import { Song } from "@/types/song";
import { Comment } from "@/types/comment";
let tool = useTool()

const PAGE_TITLE = computed(() => {
  return `评论(${total.value})`
})

let route = useRoute()
// 评论类型 0 推荐 1 最热 2 最新
let comment_type = ref(0)
// 评论类型
let type_list = [
  {
    name: "推荐",
    value: 1,
  },
  {
    name: "最热",
    value: 2,

  },
  {
    name: "最新",
    value: 3,
  },
]
// 评论列表
let comment_list = ref<Comment[]>([])
// 歌曲详情
let song = ref<Song>()
// 评论页数
let page = ref(0)
// 评论总数
let total = ref(0)
let finished = ref(false)
let loading = ref(false)
watch(() => route.params.id, () => {
  getComments()
})

// 切换评论类型
const toggleType = (i:number) => {
  comment_type.value = i
  page.value = 1
  comment_list.value.length = 0
  getComments()
}

// 获取评论
const getComments = async () => {
  let params = {
    id: Number(route.params.id),
    pageSize: page.value * 20,
    sortType: type_list[comment_type.value].value,
    cursor: comment_type.value == 2 && page.value > 1 ? comment_list.value[comment_list.value.length - 1].time : 0
  }

  let res: any = await getComment(params)
  total.value = res.data.totalCount
  // comment_list.value.push(...res.data.comments)
  comment_list.value = res.data.comments
  finished.value = !res.data.hasMore
  loading.value = false

  console.log(res, "评论");
}



// 获取音乐详情
const getSongDetail = async () => {
  let res: any = await getMusicDetail(Number(route.params.id))
  song.value = res.songs[0]
}

const initData = () => {
  getSongDetail()
}

const load = () => {
  if (!finished.value) {
    page.value++
    getComments()
  }
}

initData()
</script>

<style scoped lang="scss">
.page {
  &_body {
    .song {
      &_cover {}
    }
  }
}
</style>