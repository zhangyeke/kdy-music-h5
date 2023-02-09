<!--
 * @Author: your name
 * @Date: 2022-03-24 17:47:16
 * @LastEditTime: 2023-02-09 11:44:15
 * @LastEditors: zyk 997610780@qq.com
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \zyk-music-h5\template.vue
-->
<template>
  <div class="page">
    <div class="page_hd">
      <kdyNavBar :title="(route.meta.title as string)"></kdyNavBar>
      <div class="flex items-center ">
        <div class="tab relative">
          <var-tabs v-model:active="cur_cat" indicator-color="var(--color-primary)" active-color="var(--color-text)"
            inactive-color="var(--color-text-disabled)">
            <var-tab v-for="(item, index) in songs_cats" :key="index">{{ item.name }}</var-tab>
          </var-tabs>
          <div class="tab_mask"></div>
        </div>
        <var-icon namespace="kdy-icon" name="fenlei" :size="tool.px2vw(26)" v-ripple></var-icon>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import kdyNavBar from '@/components/kdy-nav-bar/kdy-nav-bar.vue';
import { getHotSongsCat } from "@/api/home/hot";
import { SongsCategory } from "@/types/song";
let tool = useTool()
let router = useRouter()
let route = useRoute()
let cur_cat = ref(0)
// 歌单分类
let songs_cats = ref<SongsCategory[]>([])

const getSongsCat = async () => {
  let res: any = await getHotSongsCat()
  songs_cats.value.push(...res.tags)
  console.log(res.tags, "热门分类", songs_cats.value);
}

getSongsCat()

</script>

<style scoped lang="scss">
::v-deep .var-tabs--layout-horizontal-scrollable::-webkit-scrollbar {
  display: none;
}

.page {
  .tab {
    width: calc(100% - 26px);
    &_mask {
      position: absolute;
      right: 0;
      top: 0;
      width: 45px;
      height: 100%;
      background: linear-gradient(-45deg, #fff, hsla(0, 0%, 100%, 0));
      // background-color: rgba(249,248,254,0.8);
      // filter: blur(30rpx);
      z-index: 99;
      pointer-events: none;
    }
  }

}
</style>