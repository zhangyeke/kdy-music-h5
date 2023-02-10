<!--
 * @Author: your name
 * @Date: 2022-03-24 17:47:16
 * @LastEditTime: 2023-02-10 18:17:02
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
            inactive-color="var(--color-text-disabled)" @change="tabChange">
            <var-tab v-for="(item, index) in songs_cats" :key="index">{{ item.name }}</var-tab>
          </var-tabs>
          <div class="tab_mask"></div>
        </div>
        <var-icon namespace="kdy-icon" name="fenlei" :size="tool.px2vw(26)" v-ripple></var-icon>
      </div>
    </div>

    <div class="page_by mt-20px px-20px">
      <var-tabs-items v-model:active="cur_cat" v-show="cur_cat">
        <var-tab-item>
          呜啦啦啦火车笛，随着奔腾的马蹄。 小妹妹吹着口琴，夕阳下美了剪影。 我用子弹写日记，介绍完了风景。
          接下来换介绍我自己。 我虽然是个牛仔，在酒吧只点牛奶。 为什么不喝啤酒，因为啤酒伤身体。
        </var-tab-item>
        <var-tab-item>
          很多人不长眼睛，嚣张都靠武器。 赤手空拳就缩成蚂蚁。 不用麻烦了，不用麻烦了。 不用麻烦，不用麻烦了，不用麻烦了。
        </var-tab-item>
      </var-tabs-items>
      <songsRmd v-show="!cur_cat"></songsRmd>

    </div>
  </div>
</template>
<script setup lang="ts">
import kdyNavBar from '@/components/kdy-nav-bar/kdy-nav-bar.vue';
import songsRmd from "./components/songs-rmd/songs-rmd.vue";
import { getHotSongsCat } from "@/api/home/hot";
import { hiySongs } from "@/api/public/playlist"
import { SongsCategory, SongsList } from "@/types/songList";
let tool = useTool()
let router = useRouter()
let route = useRoute()

let cur_cat = ref(0)
// 歌单分类
let songs_cats = ref<SongsCategory[]>([{ name: "推荐", id: 0, hot: true, type: 0, category: 0 }, { name: "精品", id: -1, hot: true, type: 0, category: 0 }])
// 歌单列表
let songs_list = ref<SongsList[]>([])

// 获取热门歌曲分类
const getSongsCat = async () => {
  let res: any = await getHotSongsCat()
  songs_cats.value.push(...res.tags)
  console.log(res.tags, "热门分类", songs_cats.value);
}

// 获取精品歌曲
const getHiySongs = async () => {
  let res: any = await hiySongs({
    cat: "",
  })

  songs_cats.value[cur_cat.value].list = [...songs_cats.value[cur_cat.value].list, ...res.playlists]
  console.log(res, "精品歌曲");

}
// tab切换
const tabChange = () => {
  if (!Object.hasOwn(songs_cats.value[cur_cat.value], 'list')) {
    switch (cur_cat.value) {
      case 1:
        getHiySongs()
        break;
    }
  }
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
      z-index: 99;
      pointer-events: none;
    }
  }

}
</style>