<!--
 * @Author: your name
 * @Date: 2022-03-24 17:47:16
 * @LastEditTime: 2022-05-30 17:44:51
 * @LastEditors: [you name]
 * @Description: 搜索结果综合列表
 * @FilePath: \zyk-music-h5\template.vue
-->
<template>
  <div>
    <!-- 单曲 -->
    <div class="px-10px mt-10px rounded-20px overflow-hidden" v-if="searchStore.result?.song?.songs">
      <div class="flex justify-between items-center bg-white px-10px pt-15px">
        <span class="text-16px text-[#333] font-700">单曲</span>
        <div class="text-12px border_solid_1 rounded-20px py-5px px-10px flex items-center" v-ripple>
          <var-icon name="bofang" namespace="kdy-icon" color="#333" :size="tool.px2vw(10)" />
          <span class="ml-3px">播放</span>
        </div>
      </div>
      <singleList :show-head="false" aliasKey="alia" mvKey="mv" artistsKey="ar" :is-load-more="false"
        :list="searchStore.result.song.songs" />
      <div class="text-10px text-[#999] bg-white text-center py-10px" v-ripple @click="clickMore(1)">
        <span>{{ searchStore.result.song.moreText }}</span>
        <var-icon name="chevron-right" color="#999" :size="tool.px2vw(12)" />
      </div>
    </div>

    <!-- 歌单 -->
    <div class="px-10px  mt-10px rounded-20px overflow-hidden" v-if="searchStore.result?.playList?.playLists">
      <div class="bg-white px-10px py-15px">
        <span class="text-16px text-[#333] font-700">歌单</span>
      </div>
      <playlist :is-load-more="false" :list="searchStore.result.playList.playLists"></playlist>
      <div class="text-10px text-[#999] bg-white text-center py-10px" v-ripple @click="clickMore(1000)">
        <span>{{ searchStore.result.playList.moreText }}</span>
        <var-icon name="chevron-right" color="#999" :size="tool.px2vw(12)" />
      </div>
    </div>

    <!-- 歌手 -->
    <div class="px-10px  mt-10px rounded-20px overflow-hidden" v-if="searchStore.result?.artist?.artists">
      <div class="bg-white px-10px py-15px">
        <span class="text-16px text-[#333] font-700">艺人</span>
      </div>
      <singerList :is-load-more="false" :list="searchStore.result.artist.artists"></singerList>
      <div class="text-10px text-[#999] bg-white text-center py-10px" v-ripple @click="clickMore(100)">
        <span>{{ searchStore.result.playList.moreText }}</span>
        <var-icon name="chevron-right" color="#999" :size="tool.px2vw(12)" />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import singleList from "../single-list/single-list.vue";
import playlist from "../playlist/playlist.vue";
import singerList from "../singer-list/singer-list.vue";
import useSearchStore from "@/store/search";
let searchStore = useSearchStore()
let tool = useTool()

const clickMore = (v: number) => {
  searchStore.lookMore(v)
}

</script>

<style scoped lang="scss">
::v-deep .var-list__finished {
  display: none !important;
}

::v-deep .var-list__loading {
  display: none !important;
}
</style>