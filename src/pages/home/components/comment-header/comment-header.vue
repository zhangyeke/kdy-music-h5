<!--
 * @Author: your name
 * @Date: 2022-03-24 17:47:16
 * @LastEditTime: 2023-02-27 15:19:28
 * @LastEditors: zyk 997610780@qq.com
 * @Description: 评论页面的头部
 * @FilePath: \zyk-music-h5\template.vue
-->
<template>
  <div class="song bg-white border-b-6px pb-10px flex items-center px-15px" @click="emit('jump')">
    <div class="song_cover w-50px h-50px  flex items-center justify-center " :class="{ circular: shape == 'round' }">
      <img :src="commentStore.cover" class="w-full h-full fit_cover rounded-10px">
    </div>
    <div class="flex-1 ml-10px">
      <div class="text-[var(--text-color)] text-14px truncate_2 w-full">
        <span>{{ commentStore.title }}</span>

      </div>

      <div class="text-[#999] text-10px mt-10px">
        <div v-if="commentStore.author?.length">
          <span v-for="(item, index) in commentStore.author" :key="index" @click.stop="lookAuthor(Number(index))">{{
            item.name
          }}<span v-if="Number(index) != commentStore.author.length - 1">/</span></span>
        </div>
        <div v-else @click.stop="lookAuthor()">
          by {{ (commentStore.author as User).nickname }}
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import useCommentStore from "@/store/comment";
import { User } from "@/types/user";
import { Artist } from "@/types/user";
const commentStore = useCommentStore()
let router = useRouter()
let tool = useTool()
let props = defineProps({
  type: {
    type: Number
  },
  // 封面形状 可选 round
  shape: {
    type: String,
    default: "rect",
  },
})

const emit = defineEmits(['jump', 'lookAuthor'])
console.log(commentStore.author, "这是？");

// 查看作者
const lookAuthor = (i?: number) => {
  if (i != undefined) {
    let author = (commentStore.author as Artist[])[i]
    author.id ? router.push({ name: 'singerDetail', params: { id: author.id } }) : tool.toast({ content: "未能在平台找到该歌手信息👩‍💻!" })
  } else {
    router.push({ name: 'userDetail', params: { id: (commentStore.author as User).userId } })
  }
}

</script>

<style scoped lang="scss">
.song {
  .circular {
    border-radius: 50%;
    background-color: #000;

    img {
      border-radius: 50%;
      width: 40px;
      height: 40px;
    }
  }
}
</style>