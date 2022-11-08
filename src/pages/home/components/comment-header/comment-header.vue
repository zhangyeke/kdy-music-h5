<!--
 * @Author: your name
 * @Date: 2022-03-24 17:47:16
 * @LastEditTime: 2022-11-03 16:51:02
 * @LastEditors: zyk 997610780@qq.com
 * @Description: 评论页面的头部
 * @FilePath: \zyk-music-h5\template.vue
-->
<template>
  <div class="song bg-white pb-10px flex items-center px-15px" @click="jump">
    <div class="song_cover w-50px h-50px  flex items-center justify-center " :class="{ circular: commentObj.type == 0 }">
      <img :src="commentObj.pic" class="w-full h-full fit_cover rounded-10px">
    </div>
    <div class="flex-1 ">
      <div class="text-[#333] text-14px ml-5px truncate_2 w-full">
        <span>{{ commentObj.title }}</span>
        <span v-if="commentObj.alias.length">{{ commentObj.alias[0] }}</span>
      </div>
      <div v-if="commentObj.artists.length" class="text-[#999] text-10px ml-5px mt-5px">
        歌手：
        <span v-for="(item, index) in commentObj.artists" :key="index"
          @click.stop="router.push({ name: 'singerDetail', params: { id: item.id } })">{{ item.name }}
          <span v-if="index != commentObj.artists.length - 1">/</span>
        </span>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { Artist } from "@/types/user";
interface CommentObj {
  pic: string,
  title: string,
  alias: string[],
  artists: Artist[],
  type: number,
  id:number,
}
let router = useRouter()
let prop = withDefaults(defineProps<{
  commentObj: CommentObj,
}>(), {
})


const jump = ()=>{
  
  if(prop.commentObj.type == 0){
    router.push({name:'songDetail',params:{id:prop.commentObj.id}})
  }
  if(prop.commentObj.type == 3){
    router.push({name:'albumDetail',params:{id:prop.commentObj.id}})

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
      width: 30px;
      height: 30px;
    }
  }
}
</style>