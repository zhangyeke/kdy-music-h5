<!--
 * @Author: your name
 * @Date: 2022-03-24 17:47:16
 * @LastEditTime: 2023-02-13 18:27:51
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
            <var-tab v-for="(item, index) in songs_cats" :key="index">{{ item.name }}{{ cur_cat }}</var-tab>
          </var-tabs>
          <div class="tab_mask"></div>
        </div>
        <var-icon namespace="kdy-icon" name="fenlei" :size="tool.px2vw(26)" v-ripple></var-icon>
      </div>
    </div>
    <div class="page_by mt-20px px-20px">
      <var-tabs-items v-model:active="cur_cat">
        <!-- <var-tab-item v-show="!cur_cat">
          <songsRmd ></songsRmd>
        </var-tab-item> -->
        <!-- v-show="cur_cat" -->
        <var-tab-item>
          <div class="title flex justify-between items-center text-14px text-[var(--color-text)] mb-20px">
            <span>全部精品</span>
            <div>
              <var-icon namespace="kdy-icon" name="filter" color="#666"></var-icon>
              筛选
            </div>
          </div>
          <var-list :finished="page_option.finished" v-model:loading="page_option.loading" @load="loadSongs" :offset="50">
            <div class="flex flex-wrap justify-around">
              <KdySong class="mb-10px" :cover="item.coverImgUrl" :name="item.name" :play-count="item.playCount"
                v-for="(item, index) in songs_cats[cur_cat].list" :key="item.id"></KdySong>

            </div>
          </var-list>
        </var-tab-item>
      </var-tabs-items>

    </div>
  </div>
</template>
<script setup lang="ts">
import kdyNavBar from '@/components/kdy-nav-bar/kdy-nav-bar.vue';
import songsRmd from "./components/songs-rmd/songs-rmd.vue";
import { getHotSongsCat } from "@/api/home/hot";
import { hiySongs } from "@/api/public/playlist"
import { SongsCategory, SongsList } from "@/types/songList";
import KdySong from '@/components/kdy-song/kdy-song.vue';
import { Song } from '@/types/song';
let tool = useTool()
let router = useRouter()
let route = useRoute()
// 当前tab
let cur_cat = ref(0)
// 精品歌单分类
let hiy_cat = ref("全部")

let page_option = reactive({
  limit: 30,
  before: 0,
  finished:false,
  loading:false
})

// 歌单分类{ name: "推荐", id: 0, hot: true, type: 0, category: 0 },
let songs_cats = ref<SongsCategory[]>([{ name: "精品", id: -1, hot: true, type: 0, category: 0 }])
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
    cat: hiy_cat.value,
    ...page_option,
  })
  songs_cats.value[cur_cat.value].list = <unknown | SongsList>[]
  songs_cats.value[cur_cat.value].list = [...songs_cats.value[cur_cat.value].list, ...res.playlists]
  page_option.loading = false
  page_option.finished = res.more
  console.log(res, "精品歌曲", songs_cats.value[cur_cat.value].list);
  console.log("最后一个",songs_cats.value[cur_cat.value].list[songs_cats.value[cur_cat.value].list.length - 1].updateTime);
    
}

const loadSongs = ()=>{
  if(!page_option.finished){
    getHiySongs()

    // page_option.before = songs_cats.value[cur_cat.value].list[songs_cats.value[cur_cat.value].list.length - 1].updateTime
    // getHiySongs()
  }
}

// tab切换
const tabChange = () => {
  if (!Object.hasOwn(songs_cats.value[cur_cat.value], 'list')) {
    songs_cats.value[cur_cat.value].list = <unknown | SongsList>[]
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