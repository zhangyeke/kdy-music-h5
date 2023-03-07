<!--
 * @Author: your name
 * @Date: 2022-03-24 17:47:16
 * @LastEditTime: 2023-03-07 18:24:05
 * @LastEditors: zyk 997610780@qq.com
 * @Description: 添加音乐到歌单
 * @FilePath: \zyk-music-h5\template.vue
-->
<template>
  <div class="page">
    <div class="sticky top-0 left-0 z-10">
      <KdyNavBar :title="route.meta.title"></KdyNavBar>
    </div>
    <div class="px-20px mt-20px ">
      <div class="flex items-center sticky top-50px left-0 z-10 bg-white pb-20px">
        <KdySearch v-model="keyword" class="flex-1" placeholder="搜索歌曲" bg-color="#eee" :disabled="search_disabled"
          @click="search_disabled = false" @input="searchInput" @enter="searchHandle" @focus="searchInput"></KdySearch>
        <span class="text-[#666] text-16px ml-10px" v-show="!search_disabled" @click="cancelHandle">取消</span>
      </div>

      <div class="border-b" v-show="search_disabled">
        <div class="tab_item" v-if="!is_love_playlist">
          <img :src="userStore.loveSongs[0].coverImgUrl" class="tab_item_left">
          <div class="tab_item_right">
            <div class="tab_item_name">我喜欢的音乐</div>
            <div class="tab_item_total">{{ userStore.loveSongs[0].trackCount }}首</div>
          </div>
        </div>
        <div class="tab_item">
          <img :src="userStore.createSongs[0].coverImgUrl" class="tab_item_left">
          <div class="tab_item_right">
            <div class="tab_item_name">创建的歌单</div>
            <div class="tab_item_total">{{ userStore.createSongs.length }}个歌单</div>
          </div>
        </div>
        <div class="tab_item">
          <img :src="userStore.collectSongs[0].coverImgUrl" class="tab_item_left">
          <div class="tab_item_right">
            <div class="tab_item_name">收藏的歌单</div>
            <div class="tab_item_total">{{ userStore.collectSongs.length }}个歌单</div>
          </div>
        </div>
      </div>

      <div class="mt-20px" v-show="search_disabled">
        <div class="font-700 text-20px text-[var(--text-color)]">最近播放</div>

        <div v-if="song_list.length">
          <KdySingle v-for="(item, index) in song_list" :key="item.id" :item="item">
            <template #right>
              <div class="flex items-center">
                <div class="mr-10px" @click.stop="operateHandle(index, 'is_love')"><var-icon
                    :name="item.is_love ? 'heart' : 'heart-outline'"
                    :color="item.is_love ? 'var(--color-danger)' : 'var(--text-color)'" transition="250" /></div>

                <div @click.stop="operateHandle(index, 'is_collect')" v-if="!is_love_playlist"><var-icon
                    :name="item.is_collect ? 'checkbox-marked-circle' : 'plus-circle-outline'"
                    :color="item.is_collect ? 'var(--color-danger)' : 'var(--text-color)'" transition="250" /></div>
              </div>
            </template>
          </KdySingle>
        </div>

        <KdyEmpty v-else margin-top="80"></KdyEmpty>

      </div>

      <searchSongWin :is-love-playlist="is_love_playlist" v-model="keyword" :p-id="playlist_id" :l-id="love_songs_id"  v-show="!search_disabled" v-model:list="suggests" ref="searchSongCmp"></searchSongWin>
    </div>

  </div>
</template>
<script setup lang="ts">
import searchSongWin from "./components/search-song.vue"
import useUserStore from "@/store/user";
import useSearchStore from "@/store/searchHistory";
import { latelyPlay } from "@/api/public/music";
import { searchAdvice } from "@/api/home/search";
import { songListAllSong, playlistOp } from "@/api/public/playlist";
import { Song } from "@/types/song";
import { SearchResult } from "@/types/search";
const searchStore = useSearchStore()
const userStore = useUserStore()
const route = useRoute()
const tool = useTool()
let searchSongCmp = ref<typeof searchSongWin | null>(null)
let song_list = ref<Song[]>([])
let keyword = ref("")
let search_disabled = ref(true)
const playlist_id = route.params.id as string

const love_songs_id = userStore.loveSongs[0].id

// 是否是我喜欢的歌单
const is_love_playlist = computed(()=>{
  return Number(playlist_id) == love_songs_id
})

// 搜索建议
let suggests = ref<SearchResult[]>([])

// 获取最近播放的音乐
const getLatelyPlay = async () => {
  let res: any = await latelyPlay()
  song_list.value = res.data.list.map((item: any) => item.data)
  console.log(song_list.value, "最近播放的音乐");
  // 获取当前歌单的所有音乐
  getSongListAllSong(playlist_id, 'is_collect')
  if(!is_love_playlist.value){
    // 获取当前歌单的所有音乐
    getSongListAllSong(love_songs_id, 'is_love')
  }
}

const getSongListAllSong = async (id: string | number, field: string) => {
  let res: any = await songListAllSong({ id })
  let ids: number[] = res.songs.map((item: Song) => item.id)
  song_list.value.forEach(item => {
    item[field] = ids.includes(item.id)
  })
  console.log(res, "当前歌单的所有歌曲", song_list.value);

}

// 取消搜索
const cancelHandle = ()=>{
  search_disabled.value = true
  keyword.value = ""
  searchSongCmp.value!.updateSearchStatus(false)
}

// 搜索输入监听
const searchInput = tool.debounce(async () => {
  searchSongCmp.value!.updateSearchStatus(false)
  if (keyword.value) {
    let res: any = await searchAdvice(keyword.value)
    suggests.value = res.result.allMatch
  } else {
    suggests.value.length = 0
  }

})

// 搜索处理
const searchHandle = (v:string) => {
  searchSongCmp.value!.updateSearchStatus(true)
  searchStore.addHistory(v)
  searchSongCmp.value!.initPaging()
  searchSongCmp.value!.getSearchResult(keyword.value)
}

// 对歌单进行添加或删除歌曲
const operateHandle = async (i: number, field: string,) => {
  let song = song_list.value[i]

  let res: any = await playlistOp({
    op: song[field] ? 'del' : 'add',
    tracks: song.id,
    pid: field == 'is_love' ? love_songs_id : playlist_id
  })

  let content = ""

  if (field == 'is_love') {
    content = song[field] ? "已取消喜欢" : "已添加到我喜欢的音乐"
  } else {
    content = song[field] ? "已取消收藏" : "已收藏到歌单"
  }
  song_list.value[i][field] = !song_list.value[i][field]
  tool.toast({ content })
  console.log(res, "对歌单进行操作");

}


getLatelyPlay()
</script>

<style scoped lang="scss">
.tab_item {
  @apply flex items-center relative;
  margin-bottom: 10px;

  &_left {
    width: 50px;
    height: 50px;
    border-radius: 5px;
  }

  &_right {
    width: 100%;
    margin-left: 10px;
  }

  &_name {
    @apply truncate w-[calc(100%-90px)];
    color: var(--text-color);
    font-size: 14px;
  }

  &_total {
    @apply truncate w-[calc(100%-90px)];
    color: #666;
    font-size: 10px;
    margin-top: 3px;
  }

  &_action {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
  }
}
</style>