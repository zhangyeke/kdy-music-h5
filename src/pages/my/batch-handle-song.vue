<!--
 * @Author: your name
 * @Date: 2022-03-24 17:47:16
 * @LastEditTime: 2023-03-08 18:29:33
 * @LastEditors: zyk 997610780@qq.com
 * @Description: 选择歌曲进行批量处理
 * @FilePath: \zyk-music-h5\template.vue
-->
<template>
  <div class="page">
    <div class="sticky top-0 left-0 z-10">
      <KdyNavBar :title="page_title">
        <template #default>
          <div class="flex justify-end pr-20px text-[var(--text-color)] font-700 text-16px">
            <span @click="selectAll">{{ is_select_all ? '取消全选' : '全选' }}</span>
          </div>
        </template>
      </KdyNavBar>
    </div>
    <div class="px-15px">
      <div class="flex items-center border-b" v-for="(item, index) in song_list" :key="item.id" v-ripple
        @click.capture.stop="toggleCheck(index)">
        <var-icon class="mr-10px" :name="item.check ? 'checkbox-marked' : 'checkbox-blank-outline'"
          :color="item.check ? 'var(--color-primary)' : '#666'" :size="tool.px2vw(20)" transition="50" />
        <KdySingle :item="item" :is-jump="false" :border="false">
          <template #right></template>
        </KdySingle>
      </div>
    </div>

    <div class="tool h-50px bg-white w-full fixed  bottom-0 left-0 z-10 flex items-center justify-around">
      <div class="flex flex-col items-center" v-ripple @click="nextPlayHandle">
        <var-icon namespace="kdy-icon" name="addplaylist" color="#666" :size="tool.px2vw(24)"></var-icon>
        <span class="text-12px text-[#666] mt-5px">下一首播放</span>
      </div>
      <div class="flex flex-col items-center" v-ripple @click="openCollectPopup">
        <var-icon namespace="kdy-icon" name="tianjiashoucang" color="#666" :size="tool.px2vw(24)"></var-icon>
        <span class="text-12px text-[#666] mt-5px">收藏到歌单</span>
      </div>
      <div class="flex flex-col items-center" v-ripple @click="downloadHandle">
        <var-icon namespace="kdy-icon" name="xiazai" color="#666" :size="tool.px2vw(24)"></var-icon>
        <span class="text-12px text-[#666] mt-5px">下载</span>
      </div>
      <div class="flex flex-col items-center" v-ripple v-if="uid == userStore.userId">
        <var-icon name="trash-can-outline" color="#666" :size="tool.px2vw(24)"></var-icon>
        <span class="text-12px text-[#666] mt-5px">删除</span>
      </div>
    </div>

    <!-- 收藏弹窗 -->
    <collectPopup v-model:show="collect_show" :ids="choose_ids" @newlyBuilt="clickNewlyBuilt"></collectPopup>
    <!-- 新建歌单弹窗 -->
    <newPlaylistPopup v-model:show="show_new_window" @cancel="openCollectPopup" @finish="newPlaylistFinish">
    </newPlaylistPopup>
  </div>
</template>
<script setup lang="ts">
import FileSaver from "file-saver";
import { songListAllSong, handlePlaylist } from "@/api/public/playlist";
import { getMusicUrl } from "@/api/public/music";
import { Song } from "@/types/song";
import useSongStore from "@/store/song";
import useUserStore from "@/store/user";
const songStore = useSongStore()
const userStore = useUserStore()
const route = useRoute()
const tool = useTool()
const page_title = computed(() => {
  return `已选择${choose_ids.value.length}项`
})
// 收藏弹窗
let collect_show = ref(false)
// 新建歌单弹窗
let show_new_window = ref(false)

const uid = Number(route.params.id)
const playlist_id = route.params.id as string

let choose_ids = computed((): number[] => {
  let ids: number[] = []
  song_list.value.forEach(item => {
    if (item.check) {
      ids.push(item.id)
    }
  });
  return ids
})

let song_list = ref<Song[]>([])

let is_select_all = ref(false)

// 切换选中状态
const toggleCheck = (i: number) => {
  song_list.value[i].check = !song_list.value[i].check
}

// 收藏弹窗新建歌单处理
const clickNewlyBuilt = () => {
  show_new_window.value = true
}
// 新建歌单窗口取消
const openCollectPopup = () => {
  collect_show.value = true
}
// 新建歌单窗口完成
const newPlaylistFinish = (pid: number) => {
  handlePlaylist({
    op: 'add',
    pid,
    tracks: choose_ids.value.toString()
  }).then((res: any) => {
    tool.toast({ type: "success", content: "已收藏到歌单!" })
  })
}

const downloadHandle = async() => {
    let res:any = await getMusicUrl(choose_ids.value.toString())
    console.log(res,"音乐url");
    res.data.forEach((item:any)=>{
      FileSaver.saveAs(item.url)
    })
}


const downloadUrl = (cutURL:string) => {
  let oA = document.createElement("a"); // 创建一个a标签
  // 正则表达式，这里是把图片文件名分离出来。拿到文件名赋到a.download,作为文件名来使用文本 ,
  // a的download 谷歌浏览器必须同源才能强制下载，否则跳转到图片地址
  oA.download = cutURL.replace(/(.*\/)*([^.]+.*)/ig, "$2").split("?")[0]; // 设置下载的文件名，默认是'下载'
  oA.href = cutURL;
  document.body.appendChild(oA);
  oA.click();
  oA.remove(); // 下载之后把创建的元素删除
}

// 全选
const selectAll = () => {
  is_select_all.value = !is_select_all.value

  song_list.value.forEach(item => {
    item.check = is_select_all.value
  })
}

const nextPlayHandle = () => {
  choose_ids.value.forEach(id => {
    songStore.nextSong(id)
  })

  tool.toast({ content: "已添加到下一首播放" })
}

const getSongListAllSong = async () => {
  let res: any = await songListAllSong({ id: playlist_id })
  console.log(res, "所有歌曲");
  song_list.value.push(...res.songs.map((item: Song) => {
    item.check = false
    return item
  }))
}
getSongListAllSong()

</script>

<style scoped lang="scss"></style>