<!--
 * @Author: your name
 * @Date: 2022-03-24 17:47:16
 * @LastEditTime: 2022-06-13 20:40:03
 * @LastEditors: [you name]
 * @Description:歌曲评论
 * @FilePath: \zyk-music-h5\template.vue
-->
<template>
  <div class="page">
    <div class="page_head">
      <var-app-bar :title="PAGE_TITLE" :elevation="false" color="#fff" text-color="#333">
        <template #left>
          <div @click="router.back()">
            <var-icon name="chevron-left" :size="tool.px2vw(26)" />
          </div>
        </template>
      </var-app-bar>
    </div>

    <div class="page_body ">
      <commentHeader :commentObj="COMMENT" v-if="commentObj"></commentHeader>

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
            <div class="content_item flex mb-10px" v-for="(item, index) in comment_list" :key="item.commentId"
              @click.stop="replyUser(item)">
              <img :src="item.user.avatarUrl" class="w-40px h-40px fit_cover rounded-1/2">
              <div class="ml-10px border_b_solid_1 flex-1">
                <div class="text-[#444] font-500 text-12px flex justify-between items-center">
                  <span>{{ item.user.nickname }}</span>
                  <span v-if="item.user.vipType" class="text-primary text-10px ml-3px flex-1">尊贵的vip</span>
                  <div class="text-10px text-[#999]" @click.stop="clickLike(index)">
                    <span v-if="item.likedCount">{{ tool.numFormat(item.likedCount) }}</span>
                    <var-icon :name="item.liked ? 'yidianzan' : 'dianzan'" namespace="kdy-icon"
                      :color="item.liked ? 'var(--color-primary)' : '#999'" :size="tool.px2vw(20)" transition="300" />
                  </div>
                </div>
                <div class="text-[#999] text-8px mt-5px">{{ item.timeStr }}</div>
                <div v-html="item.content" class="text-[#333] text-14px font-500 mt-10px  pb-10px leading-20px">

                </div>
                <div class="text-primary text-10px pb-10px" v-ripple v-if="item.replyCount"
                  @click.stop="openComment(index)">
                  <span>{{ item.replyCount }}条回复</span>
                  <var-icon name="chevron-right" color="var(--color-primary)" :size="tool.px2vw(14)" />
                </div>
              </div>
            </div>
          </var-list>
        </div>
      </div>
    </div>

    <div
      class="page_foot fixed h-40px bottom-0 w-full bg-white border_t_solid_1 flex items-center px-15px z-index-2100">
      <var-input class="flex-1" :placeholder="placeholder" rows="2" v-model="sendValue" text-color="#333" :line="false"
        :textarea="true" :hint="false" :autofocus="cid != 0" clearable />
      <span :class="{ 'text-[#eee]': !sendValue }" class="text-14px text-[#666] h-full flex items-center" v-ripple
        @click="clickSend()">发送</span>
    </div>


    <lookComment v-model:show="show_comment" :cid="window_cid" :rid="Number(route.params.id)" @reply="replyUser">
    </lookComment>
  </div>
</template>
<script setup lang="ts">
import commentHeader from "./components/comment-header/comment-header.vue";
import lookComment from "./components/look-comment/look-comment.vue";
import { getComment, commentLike, commentHandle } from "@/api/public/comment";
import { getMusicDetail, getAlbumDetail } from "@/api/public/music";
import { User, Artist } from "@/types/user";
import { Comment } from "@/types/comment";
interface CommentObj {
  pic: string,
  title: string,
  alias: string[],
  artists: Artist[],
  type: number,
  id:number,
}

let tool = useTool()
let router = useRouter()
let sendValue = ref("")

// 返回箭头处的标题
const PAGE_TITLE = computed(() => {
  return `评论(${total.value})`
})

let route = useRoute()
// 类型 0：歌曲 3：专辑
let c_type = Number(route.params.type) || 0
//是否显示评论弹窗
let show_comment = ref(false)
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

// 评论的对象
let commentObj = ref<any | null>()
// 回复评论的id
let cid = ref(0)
// 传给弹层的评论id
let window_cid = ref(0)
let reply_user = ref<User | null>()
let placeholder = computed(() => {
  return cid.value != 0 ? `回复${reply_user.value?.nickname}:` : "这一次也许就是你上热评了"
})
// 评论页数
let page = ref(0)
// 评论总数
let total = ref(0)
// 数据是否加载完毕
let finished = ref(false)
// 加载中的状态
let loading = ref(false)
watch(() => route.params.id, () => {
  getComments()
})

// 打开评论弹层
const openComment = (i: number) => {
  window_cid.value = comment_list.value[i].commentId
  show_comment.value = true
}

// 切换评论类型
const toggleType = (i: number) => {
  comment_type.value = i
  page.value = 1
  comment_list.value.length = 0
  getComments()
}

// 获取评论
const getComments = async () => {
  let params = {
    id: Number(route.params.id),
    type: c_type,
    pageSize: page.value * 20,
    sortType: type_list[comment_type.value].value,
    cursor: comment_type.value == 2 && page.value > 1 ? comment_list.value[comment_list.value.length - 1].time : 0
  }

  let res: any = await getComment(params)
  total.value = res.data.totalCount
  comment_list.value = res.data.comments
  finished.value = !res.data.hasMore
  loading.value = false
}

// 给子组件的评论对象
const COMMENT = computed(() => {
  let obj: CommentObj = {
    pic: "",
    title: "",
    alias: [],
    artists: [],
    type: c_type,
    id:Number(route.params.id)
  }
  if (commentObj.value) {
    if (c_type == 0) {
      obj = {
        pic: commentObj.value.al.picUrl,
        title: commentObj.value.name,
        alias: commentObj.value.alia,
        artists: commentObj.value.ar,
        type: c_type,
        id:Number(route.params.id)
      }
    }

    if (c_type == 3) {
      obj = {
        pic: commentObj.value.picUrl,
        title: commentObj.value.name,
        alias: commentObj.value.alias,
        artists: commentObj.value.artists,
        type: c_type,
        id:Number(route.params.id)
      }
    }
  }
  return obj
})

// 获取音乐详情
const getSongDetail = async () => {
  let res: any = await getMusicDetail(Number(route.params.id))
  commentObj.value = res.songs[0]
}

const getAlbum = async () => {
  let res: any = await getAlbumDetail(Number(route.params.id))
  commentObj.value = res.album
}

// 点赞
const clickLike = async (i: number) => {
  let params = {
    id: Number(route.params.id),
    cid: comment_list.value[i].commentId,
    t: comment_list.value[i].liked ? 0 : 1,
  }
  let res: any = await commentLike(params)
  comment_list.value[i].likedCount = comment_list.value[i].liked ? --comment_list.value[i].likedCount : ++comment_list.value[i].likedCount
  comment_list.value[i].liked = !comment_list.value[i].liked
}

// 点击回复用户
const replyUser = (item: Comment) => {
  reply_user.value = item.user
  cid.value = item.commentId
}

// 发送评论
const clickSend = async (commentId?: number) => {
  if (!sendValue.value) {
    return
  }
  let params = {
    id: Number(route.params.id),
    t: 1,
    content: sendValue.value,
    commentId: commentId ? commentId : cid.value
  }
  let res: any = await commentHandle(params)
  tool.toast({ type: 'success', content: "发布成功!" })
  sendValue.value = ""
  cid.value = 0
  reply_user.value = null
  getComments()
}

const initData = () => {
  if (c_type == 0) {
    getSongDetail()
    return
  }

  if (c_type == 3) {
    getAlbum()
    return
  }
}

const load = () => {
  if (!finished.value) {
    page.value++
    getComments()
  }
}

initData()

onMounted(() => {
  let _t: any = {
    oldBodyHeight: 0,
    bodyHeightIsChange: 0,
  };
  _t.oldBodyHeight = document.documentElement.clientHeight
  window.onresize = () => {
    if (_t.oldBodyHeight) {
      _t.bodyHeightIsChange = document.documentElement.clientHeight !== _t.oldBodyHeight;
      if (!_t.bodyHeightIsChange && sendValue.value == "") {
        cid.value = 0
      }
    }
  };
})

</script>

<style scoped lang="scss">
</style>