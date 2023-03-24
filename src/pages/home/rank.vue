<!--
 * @Author: kkk
 * @Date: 2022-03-24 17:47:16
 * @LastEditTime: 2023-03-24 12:28:52
 * @LastEditors: zyk 997610780@qq.com
 * @Description: 排行榜
 * @FilePath: \zyk-music-h5\template.vue
-->
<template>
  <div class="page pb-10px">
    <div class="page_hd">
      <KdyNavBar :title="$route.meta.title" bgcolor="transparent" title-icon-color="#fff" left-icon-color="#fff"></KdyNavBar>
    </div>
    <div class="page_by">
      <div class="flex flex-wrap justify-around" v-if="rank_list.length">
        <div v-for="(item, index) in rank_list" :key="index" class="mb-10px" v-ripple @click="$router.push({name:'playlistDetail',params:{id:item.id}})">
          <div class="w-100px h-100px relative">
            <span class="absolute w-full top-10px left-0 text-center text-white text-12px">{{ item.updateFrequency }}</span>
            <var-image :src="item.coverImgUrl" lazy width="100%" height="100%" radius="10"></var-image>
            <div class="absolute right-5px bottom-5px">
              <var-icon namespace="kdy-icon" name="bofang" color="rgba(255,255,255,.5)" :size="tool.px2vw(16)"></var-icon>
            </div>
          </div>
        </div>
      </div>
      <KdyEmpty v-else :loading="loading_status" margin-top="250"></KdyEmpty>
    </div>
  </div>
</template>
<script setup lang="ts" name="rank">
import { allRank } from "@/api/public/rank";
import { SongsList } from "@/types/songList";
const tool = useTool()
let rank_list = ref<SongsList[]>([])
let loading_status = ref(true)
const getAllRank = async () => {
  let res: any = await allRank()
  rank_list.value.push(...res.list)
  loading_status.value = false
}

getAllRank()

</script>

<style scoped lang="scss">
.page {
  background: #2980B9;
  /* fallback for old browsers */
  background-image: radial-gradient(circle at center, #FFFFFF, #6DD5FA, #2980B9);
  min-height: 100vh;
}
</style>