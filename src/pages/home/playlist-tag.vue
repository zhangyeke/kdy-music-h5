<!--
 * @Author: your name
 * @Date: 2022-03-24 17:47:16
 * @LastEditTime: 2023-02-15 16:37:56
 * @LastEditors: zyk 997610780@qq.com
 * @Description: 歌单标签
 * @FilePath: \zyk-music-h5\template.vue
-->
<template>
  <div class="page">
    <div class="page_hd">
      <kdyNavBar :title="route.meta.title"></kdyNavBar>
    </div>
    <div class="page_by px-15px text-[var(--color-text)]">
      <div class="mt-20px" v-for="(item, index) in categories" :key="index">
        <div class="font-700 text-14px mb-10px">{{ item.name }}</div>
        <div class="flex flex-wrap justify-around">
          <div @click="router.push({name:'playlist',params:{name:songs.name}})"
            class="bg-[#f2f2f2] px-20px h-40px text-12px rounded-20px leading-40px mb-10px flex items-center"
            v-for="(songs, idx) in item.list" :key="songs.id" v-ripple>
            <var-icon v-if="songs.hot" class="mr-5px"  namespace="kdy-icon" name="hot" color="#ff0000" :size="tool.px2vw(12)"></var-icon>
            <span>{{ songs.name }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { SongsTag,SongsCategory } from "@/types/songList";
import { songsCat } from "@/api/public/playlist";
let route = useRoute()
let router = useRouter()
let tool = useTool()
let categories = ref<SongsTag[]>([])

const getSongsCat = async () => {
  let res: any = await songsCat();
  Object.keys(res.categories).forEach(key=>{
    let songs_tag:SongsTag = {
      id:Number(key),
      name:res.categories[key],
      list:new Array<SongsCategory>()
    }
    res.sub.forEach((item:SongsCategory) => {
      if (item.category == songs_tag.id) {
        songs_tag.list.push(item)
      }
    });
    categories.value.push(songs_tag)
  })
  console.log("歌单标签",categories.value);
  
}


getSongsCat()
</script>

<style scoped lang="scss">

</style>