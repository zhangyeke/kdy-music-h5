<!--
 * @Author: your name
 * @Date: 2022-03-24 17:47:16
 * @LastEditTime: 2023-03-08 00:41:39
 * @LastEditors: 可达鸭 997610780@qq.com
 * @Description: 添加音乐到歌单
 * @FilePath: \zyk-music-h5\template.vue
-->
<template>
  <div class="page" :class="[show_plalist_win ?'overflow-y-hidden h-90vh':'']">
    <div class="sticky top-0 left-0 z-10 bg-white pb-20px">
      <KdyNavBar :title="route.meta.title"></KdyNavBar>
      <div class="flex items-center px-20px">
        <KdySearch v-model="keyword" class="flex-1" placeholder="搜索歌曲" bg-color="#eee" :disabled="search_disabled"
          @click="search_disabled = false" @input="searchInput" @enter="searchHandle" @focus="searchInput"></KdySearch>
        <span class="text-[#666] text-16px ml-10px" v-show="!search_disabled" @click="cancelHandle">取消</span>
      </div>
    </div>

    <div class="px-20px mt-20px">
      <div class="border-b" v-show="search_disabled">
        <div class="kdy_tab_item" v-if="!is_love_playlist" @click="openSongsWin({name:'我喜欢的音乐',id:userStore.loveSongs[0].id})" v-ripple>
          <img :src="userStore.loveSongs[0].coverImgUrl" class="kdy_tab_item_left">
          <div class="kdy_tab_item_right">
            <div class="kdy_tab_item_name">我喜欢的音乐</div>
            <div class="kdy_tab_item_total">{{ userStore.loveSongs[0].trackCount }}首</div>
          </div>
        </div>
        <div class="kdy_tab_item" v-ripple @click="openPlaylistWin('createSongs','创建的歌单')">
          <img :src="userStore.createSongs[0].coverImgUrl" class="kdy_tab_item_left"  >
          <div class="kdy_tab_item_right">
            <div class="kdy_tab_item_name">创建的歌单</div>
            <div class="kdy_tab_item_total">{{ userStore.createSongs.length }}个歌单</div>
          </div>
        </div>
        <div class="kdy_tab_item" v-ripple  @click="openPlaylistWin('collectSongs','收藏的歌单')">
          <img :src="userStore.collectSongs[0].coverImgUrl" class="kdy_tab_item_left">
          <div class="kdy_tab_item_right">
            <div class="kdy_tab_item_name">收藏的歌单</div>
            <div class="kdy_tab_item_total">{{ userStore.collectSongs.length }}个歌单</div>
          </div>
        </div>
      </div>

      <div class="mt-20px" v-show="search_disabled">
        <div class="font-700 text-20px text-[var(--text-color)]">最近播放</div>

        <div v-if="song_list.length">
          <KdySingle v-for="(item, index) in song_list" :key="item.id" :item="item" :is-jump="false">
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
    
    
      <playlistListWin v-model="show_plalist_win" :title="sel_playlist.title" :listKey="sel_playlist.list_key" @click="openSongsWin"></playlistListWin>
      <paylistSongWin :l-id="love_songs_id"  :is-love-playlist="is_love_playlist" :title="choose_playlist.name" :pId="playlist_id" :choose-id="choose_playlist.id" v-model="show_songs_win"></paylistSongWin>
    </div>
  </div>
</template>
<script setup lang="ts">
import searchSongWin from "./components/search-song.vue";
import playlistListWin from "./components/playlist-list-win.vue";
import paylistSongWin from "./components/paylist-song-win.vue";
import useUserStore from "@/store/user";
import useSearchStore from "@/store/searchHistory";
import { latelyPlay } from "@/api/public/music";
import { searchAdvice } from "@/api/home/search";
import { songListAllSong, handlePlaylist } from "@/api/public/playlist";
import { Song } from "@/types/song";
import { SearchResult } from "@/types/search";
const searchStore = useSearchStore()
const userStore = useUserStore()
const route = useRoute()
const tool = useTool()
let searchSongCmp = ref<typeof searchSongWin | null>(null)
// 最近播放的歌曲
let song_list = ref<Song[]>([])
// 搜索关键词
let keyword = ref("")
// 是否禁用搜索
let search_disabled = ref(true)
// 歌单id
const playlist_id = route.params.id as string
// 我喜欢的歌单id
const love_songs_id = userStore.loveSongs[0].id

// 是否是我喜欢的歌单
const is_love_playlist = computed(()=>{
  return Number(playlist_id) == love_songs_id
})

// 是否显示歌单列表窗口
let show_plalist_win = ref(false)

// 显示歌单的歌曲列表窗口
let show_songs_win = ref(false)



// 选中要查看的歌单列表
let sel_playlist = reactive({
  title:"",
  list_key:"",
})
// 选择打开的歌单
let choose_playlist = reactive({
  name:"",
  id:0
})

// 搜索建议
let suggests = ref<SearchResult[]>([])

// 打开歌单的歌曲窗口
const openSongsWin = ({ name, id }: { name: string, id: number }) => {
  choose_playlist = {
    name,
    id
  }
  show_songs_win.value = true
}

// 打开歌单列表窗口
const openPlaylistWin = (list_key:string,title:string)=>{
  sel_playlist = {
    title,
    list_key
  }
  show_plalist_win.value = true
}

// 获取最近播放的音乐
const getLatelyPlay = async () => {
  let res: any = await latelyPlay()
  song_list.value = res.data.list.map((item: any) => item.data)
  // 获取当前歌单的所有音乐
  getSongListAllSong(playlist_id, 'is_collect')
  if(!is_love_playlist.value){
    // 获取当前歌单的所有音乐
    getSongListAllSong(love_songs_id, 'is_love')
  }
}
// 获取歌单的所有歌曲
const getSongListAllSong = async (id: string | number, field: string) => {
  let res: any = await songListAllSong({ id })
  let ids: number[] = res.songs.map((item: Song) => item.id)
  song_list.value.forEach(item => {
    item[field] = ids.includes(item.id)
  })
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

  let res: any = await handlePlaylist({
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

</style>