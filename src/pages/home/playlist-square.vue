<!--
 * @Author: your name
 * @Date: 2022-03-24 17:47:16
 * @LastEditTime: 2023-02-17 14:12:39
 * @LastEditors: zyk 997610780@qq.com
 * @Description: 歌单广场
 * @FilePath: \zyk-music-h5\template.vue
-->
<template>
  <div class="page">
    <div class="page_hd">
      <kdyNavBar :title="route.meta.title"></kdyNavBar>
      <div class="flex items-center bg-white">
        <div class="tab relative">
          <var-tabs v-model:active="cur_cat" indicator-color="var(--color-primary)" active-color="var(--color-text)"
            inactive-color="var(--color-text-disabled)" @change="tabChange">
            <var-tab v-for="(item, index) in songs_cats" :key="index">{{ item.name }}</var-tab>
          </var-tabs>
          <div class="tab_mask"></div>
        </div>
        <div @click="router.push('/playlistTag')">
          <var-icon namespace="kdy-icon" name="fenlei" :size="tool.px2vw(26)" v-ripple></var-icon>
        </div>
      </div>
    </div>
    <div class="page_by mt-20px px-20px" @scroll.passive @touchstart.passive @touchmove.passive>
      <var-tabs-items v-model:active="cur_cat" :can-swipe="false">
        <var-tab-item>
          <songsRmd></songsRmd>
        </var-tab-item>
        <var-tab-item v-for="(item, index) in songs_cats" :key="item.id">
          <div class="title flex justify-between items-center text-14px text-[var(--color-text)] mb-20px"
            v-show="cur_cat == 1">
            <span>{{ hiy_cat }}</span>
            <div @click="show_songs_cat = true">
              <var-icon namespace="kdy-icon" name="filter" color="#666"></var-icon>
              筛选
            </div>
          </div>
          <var-list :finished="page_option.finished" v-model:loading="page_option.loading" @load="loadSongs"
            :offset="10">

            <div class="flex flex-wrap justify-around">
              <KdySong v-for="(songs, index) in songs_cats[cur_cat].list" :key="songs.id" class="mb-10px"
                :cover="songs.coverImgUrl" :name="songs.name" :play-count="songs.playCount" @click="router.push({name:'playlistDetail',params:{id:songs.id}})">
              </KdySong>
            </div>
          </var-list>

        </var-tab-item>
      </var-tabs-items>
    </div>

    <songsCatPopup v-model:show="show_songs_cat" :list="hiy_tags.map(item => item.name)" :current="hiy_cat"
      @change="hiyCatChange"></songsCatPopup>
  </div>
</template>
<script setup lang="ts" name="playlistSquare">
import kdyNavBar from '@/components/kdy-nav-bar/kdy-nav-bar.vue';
import songsRmd from "./components/songs-rmd/songs-rmd.vue";
import { getHotSongsCat } from "@/api/home/hot";
import { hiySongs, selectSongs, hiyTags } from "@/api/public/playlist"
import { SongsCategory, SongsList } from "@/types/songList";
import KdySong from '@/components/kdy-song/kdy-song.vue';
import songsCatPopup from "./components/songs-cat-popup/songs-cat-popup.vue";
let tool = useTool()
let router = useRouter()
let route = useRoute()

// 当前tab
let cur_cat = ref(0)
// 精品歌单分类
let hiy_cat = ref("全部")
// 精品歌单分类弹窗开关
let show_songs_cat = ref(false)
//精品歌单分类列表
let hiy_tags = ref<SongsCategory[]>([])

let page_option = reactive({
  limit: 15,
  before: 0,
  page: 1,
  finished: false,
  loading: false
})

// 歌单分类
let songs_cats = ref<SongsCategory[]>([{ name: "推荐", id: 0, hot: true, type: 0, category: 0 }, { name: "精品", id: -1, hot: true, type: 0, category: 0 }])

const offset = computed(() => {
  return (page_option.page - 1) * page_option.limit
})

// 获取热门歌曲分类
const getSongsCat = async () => {
  let res: any = await getHotSongsCat()
  songs_cats.value.push(...res.tags)
  console.log(res.tags, "热门分2222类", songs_cats.value);
}

// 获取精品歌曲
const getHiySongs = async () => {
  try {
    let res: any = await hiySongs({
      cat: hiy_cat.value,
      ...page_option,
    })
    songs_cats.value[cur_cat.value].list.push(...songsFilter<SongsList>(songs_cats.value[cur_cat.value].list, res.playlists, "id"))
    console.log("精品歌曲", songs_cats.value[cur_cat.value], songs_cats.value[cur_cat.value].list.length);
    page_option.loading = false
    page_option.finished = !res.more
    page_option.before = songs_cats.value[cur_cat.value].list[songs_cats.value[cur_cat.value].list.length - 1].updateTime
  } catch (err) {
    page_option.loading = false
  }

}

// 获取精品歌曲的分类标签
const getHiyTags = async () => {
  let res: any = await hiyTags()
  hiy_tags.value.push(...res.tags)
}

// 获取精选歌单
const getSelectSongs = async () => {

  try {
    let res: any = await selectSongs({
      cat: songs_cats.value[cur_cat.value].name,
      offset:offset.value,
      ...page_option
    })
    page_option.loading = false
    page_option.finished = !res.more
    songs_cats.value[cur_cat.value].list.push(...songsFilter<SongsList>(songs_cats.value[cur_cat.value].list, res.playlists, "id"))
    page_option.page++
    console.log(songs_cats.value[cur_cat.value], "精选1歌单", cur_cat.value);
  } catch (err) {
    page_option.loading = false
  }


}

const loadSongs = () => {
  if (!page_option.finished) {
    if (cur_cat.value == 1) {
      !hiy_tags.value.length && getHiyTags()
      getHiySongs()
    } else {
      getSelectSongs()
    }

  }
}

// tab切换
const tabChange = (i: number | string) => {
  cur_cat.value = (i as number)
  if (!Object.hasOwn(songs_cats.value[cur_cat.value], 'list')) {
    songs_cats.value[cur_cat.value].list = <any | SongsList>[]
    page_option.page = 1
    console.log("tab切换这是")
    // if (cur_cat.value == 1) {
    //   getHiySongs()
    // } else {
    //   getSelectSongs()
    // }
  } else if (cur_cat.value > 1) {
    console.log("限制性嘛..........................");

    page_option.page = Math.ceil(songs_cats.value[cur_cat.value].list.length / page_option.limit) || 1
  }
}

// 精品歌单分类改变
const hiyCatChange = (i: number) => {
  if (i >= 0) {
    hiy_cat.value = hiy_tags.value[i].name
  } else {
    hiy_cat.value = "全部"
  }
  songs_cats.value[cur_cat.value].list.length = 0
  page_option.finished = false
  page_option.before = 0
  getHiySongs()
}

const songsFilter = <T>(arr: T[], arr2: T[], key: string): T[] => {
  let list = new Array<T>()
  let arr_ids = arr.map((item: any) => item[key])
  if (arr.length) {
    arr2.forEach((item: any) => {
      if (!arr_ids.includes(item[key])) {
        list.push(item)
      }
    })
    return list
  } else {
    return arr2
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