<!--
 * @Author: your name
 * @Date: 2022-03-24 17:47:16
 * @LastEditTime: 2023-03-13 15:59:21
 * @LastEditors: zyk 997610780@qq.com
 * @Description: 查看评论弹层
 * @FilePath: \zyk-music-h5\template.vue
-->
<template>
    <var-style-provider :style-vars="{ '--popup-content-background-color': 'transparent' }">
      <var-popup :show="show" position="bottom" @close="close" @open="open" @click-overlay="close">
        <div class="window bg-white relative">
          <div class="window_head flex items-center p-10px sticky top-0px left-0 bg-white" @click="close">
            <var-icon name="chevron-left" color="#333" :size="tool.px2vw(26)" />
            <span class="text-[#333] text-14px">回复({{ total_count }})</span>
          </div>
          <div class="window_body ">
            <div class="owner flex px-10px" v-if="owner_comment?.commentId" @click="reply((owner_comment as any))">
              <img :src="owner_comment?.user.avatarUrl" class="w-40px h-40px fit_cover rounded-1/2">
              <div class="ml-10px flex-1">
                <div class="text-[#444] font-500 text-12px flex justify-between items-center">
                  <span>{{ owner_comment?.user.nickname }}</span>
                  <span v-if="owner_comment?.user.vipType" class="text-primary text-10px ml-3px flex-1">尊贵的vip</span>
                  <div class="text-10px text-[#999]"
                    @click.stop="clickLike((owner_comment?.commentId as number), (owner_comment?.liked as boolean), false)">
                    <span v-if="owner_comment?.likedCount">{{ tool.numFormat(owner_comment?.likedCount) }}</span>
                    <var-icon :name="owner_comment?.liked ? 'yidianzan' : 'dianzan'" namespace="kdy-icon"
                      :color="owner_comment?.liked ? 'var(--color-primary)' : '#999'" :size="tool.px2vw(20)"
                      transition="300" />
                  </div>
                </div>
                <div class="text-[#999] text-8px mt-2px">{{ owner_comment?.timeStr }}</div>
                <div v-html="owner_comment?.content" class="text-[#333] text-14px font-500 mt-10px  pb-10px leading-20px">
                </div>
              </div>

            </div>
            <div class="bg-default h-10px rounded-5px" v-if="like_most_list.length"></div>
            <div class="like_most mt-10px px-10px" v-if="like_most_list.length">
              <div class="text-14px font-700 text-[#333]">
                <span>最赞回复</span>
              </div>
              <div class="like_most_list mt-15px">
                <div class="like_most_item flex mb-10px "
                  :class="{ border_b_solid_1: index != like_most_list.length - 1 }"
                  v-for="(item, index) in like_most_list" :key="item.commentId" @click="reply(item)">
                  <img :src="item.user.avatarUrl" class="w-40px h-40px fit_cover rounded-1/2">
                  <div class="ml-10px flex-1">
                    <div class="text-[#444] font-500 text-12px flex justify-between items-center">
                      <span>{{ item.user.nickname }}</span>
                      <span v-if="item.user.vipType" class="text-primary text-10px ml-3px flex-1">尊贵的vip</span>
                      <div class="text-10px text-[#999]"
                        @click.stop="clickLike((item.commentId as number), (item.liked as boolean), true, index)">
                        <span v-if="item.likedCount">{{ tool.numFormat(item.likedCount) }}</span>
                        <var-icon :name="item.liked ? 'yidianzan' : 'dianzan'" namespace="kdy-icon"
                          :color="item.liked ? 'var(--color-primary)' : '#999'" :size="tool.px2vw(20)" transition="300" />
                      </div>
                    </div>
                    <div class="text-[#999] text-8px mt-2px">{{ item.timeStr }}</div>
                    <div v-html="item.content" class="text-[#333] text-14px font-500 mt-10px  pb-10px leading-20px">
                    </div>
                  </div>

                </div>
              </div>
            </div>
            <div class="bg-default h-10px rounded-5px"></div>
            <div class="floor mt-10px px-10px">
              <div class="text-14px font-700 text-[#333] mb-15px">
                <span>全部回复</span>
              </div>
              <var-list v-if="comment_list.length" :finished="finished" v-model:loading="loading" @load="load" :immediate-check="false">
                <div class="floor_list">
                  <div class="floor_item flex mb-10px " :class="{ border_b_solid_1: index != like_most_list.length - 1 }"
                    v-for="(item, index) in comment_list" :key="item.commentId" @click="reply(item)">
                    <img :src="item.user.avatarUrl" class="w-40px h-40px fit_cover rounded-1/2">
                    <div class="ml-10px flex-1">
                      <div class="text-[#444] font-500 text-12px flex justify-between items-center">
                        <span>{{ item.user.nickname }}</span>
                        <span v-if="item.user.vipType" class="text-primary text-10px ml-3px flex-1">尊贵的vip</span>
                        <div class="text-10px text-[#999]"
                          @click.stop="clickLike((item.commentId as number), (item.liked as boolean), true, index)">
                          <span v-if="item.likedCount">{{ tool.numFormat(item.likedCount) }}</span>
                          <var-icon :name="item.liked ? 'yidianzan' : 'dianzan'" namespace="kdy-icon"
                            :color="item.liked ? 'var(--color-primary)' : '#999'" :size="tool.px2vw(20)"
                            transition="300" />
                        </div>
                      </div>
                      <div class="text-[#999] text-8px mt-2px">{{ item.timeStr }}</div>
                      <div v-html="item.content" class="text-[#333] text-14px font-500 mt-10px  pb-10px leading-20px">
                      </div>
                      <!-- 回答用户 -->
                      <div class="replied" v-if="item.beReplied.length">
                        <template v-for="(e, i) in item.beReplied" :key="e.beRepliedCommentId">
                          <div class="replied_item pb-10px"
                            v-if="e.beRepliedCommentId != owner_comment?.commentId && e.content">
                            <div class="flex items-center text-12px font-500">
                              <span class="text-primary">{{ e.user.nickname }}:</span>
                              <div v-html="e.content" class="text-[#333]  leading-20px flex-1"></div>
                            </div>
                          </div>
                        </template>

                      </div>

                    </div>

                  </div>
                </div>
              </var-list>

              <kdy-empty v-else margin-top="100" :loading="loading_status"></kdy-empty>
            </div>
          </div>
        </div>
      </var-popup>
    </var-style-provider>
</template>
<script setup lang="ts">
import {Comment} from "@/types/comment";
import { getFloorComment, commentLike } from "@/api/public/comment";

let prop = withDefaults(defineProps<{
  show: boolean,
  cid: number,//评论id
  rid: number,//资源id
  type:number,
}>(), {
  cid: 0,
  rid: 0
})
let loading_status = ref(true)
let emit = defineEmits(['close', 'update:show', 'open', 'reply'])
let tool = useTool()
// 楼主评论
let owner_comment = ref<Comment | null>()
// 数据是否加载完毕
let finished = ref(false)
// 加载中的状态
let loading = ref(false)
// 评论列表
let comment_list = ref<Comment[]>([])
// 点赞最多的评论
let like_most_list = ref<Comment[]>([])
// 数据总数
let total_count = ref(0)
const loadComment = async () => {
  let params = {
    parentCommentId: prop.cid,
    id: prop.rid,
    type: prop.type,
    time: comment_list.value.length ? comment_list.value[comment_list.value.length - 1].time : 0
  }
  let res: any = await getFloorComment(params)
  if (!owner_comment.value) {
    owner_comment.value = res.data.ownerComment
    like_most_list.value = res.data.bestComments
    total_count.value = res.data.totalCount
  }

  finished.value = !res.data.hasMore
  comment_list.value.push(...res.data.comments)
  loading.value = false
  // loading_status.value = false
  console.log(res, "获取评论数据");
}

// 点赞
const clickLike = async (cid: number, status: boolean, is_floor: boolean = true, i?: number) => {
  let params = {
    id: prop.rid,
    cid,
    t: status ? 0 : 1,
  }
  let res: any = await commentLike(params)
  if (is_floor && typeof i === 'number') {
    comment_list.value[i].likedCount = comment_list.value[i].liked ? --comment_list.value[i].likedCount : ++comment_list.value[i].likedCount
    comment_list.value[i].liked = !comment_list.value[i].liked
  } else {
    (owner_comment.value as Comment).likedCount = (owner_comment.value as Comment).liked ? --(owner_comment.value as Comment).likedCount : ++(owner_comment.value as Comment).likedCount;
    (owner_comment.value as Comment).liked = !(owner_comment.value as Comment).liked;
  }

}

const reply = (item: Comment) => {
  emit('reply', item)
}

const close = () => {
  emit('update:show', false)
  emit('close')
}

const open = () => {
  emit('open')
  loadComment()
}

const load = () => {
  if (!finished.value && comment_list.value.length) {
    loadComment()
  }
}


</script>

<style scoped lang="scss">
.window {
  height: 80vh;
  overflow-y: scroll;
  border-radius: 20px 20px 0 0;
  margin-bottom: 40px;
}
</style>