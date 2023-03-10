<!--
 * @Author: your name
 * @Date: 2022-03-24 17:47:16
 * @LastEditTime: 2023-03-13 16:39:32
 * @LastEditors: zyk 997610780@qq.com
 * @Description: 选择歌曲进行批量处理
 * @FilePath: \zyk-music-h5\template.vue
-->
<template>
  <div class="page pb-60px">
    <div class="sticky top-0 left-0 z-10">
      <KdyNavBar :title="page_title">
        <template #default>
          <div class="flex justify-end pr-20px text-[var(--text-color)] font-700 text-16px">
            <span @click="selectAll">{{ is_select_all ? '取消全选' : '全选' }}</span>
          </div>
        </template>
      </KdyNavBar>
    </div>
    <div class="px-15px" v-if="song_list.length">
      <div class="flex items-center border-b" v-for="(item, index) in song_list" :key="item.id" v-ripple
        @click.capture.stop="toggleCheck(index)">
        <var-icon class="mr-10px" :name="item.check ? 'checkbox-marked' : 'checkbox-blank-outline'"
          :color="item.check ? 'var(--color-primary)' : '#666'" :size="tool.px2vw(20)" transition="10" />
        <KdySingle :item="item" :is-jump="false" :border="false">
          <template #right></template>
        </KdySingle>
      </div>
    </div>
    <KdyEmpty v-else :loading="loading_status" margin-top="200"></KdyEmpty>
    <div class="tool h-50px bg-white w-full fixed  bottom-0 left-0 z-10 flex">
      <div class="flex flex-col items-center justify-center flex-1 h-full" v-ripple @click="nextPlayHandle">
        <var-icon namespace="kdy-icon" name="addplaylist" color="#666" :size="tool.px2vw(24)"></var-icon>
        <span class="text-12px text-[#666] mt-5px">下一首播放</span>
      </div>
      <div class="flex flex-col items-center justify-center flex-1 h-full" v-ripple @click="openCollectPopup">
        <var-icon namespace="kdy-icon" name="tianjiashoucang" color="#666" :size="tool.px2vw(24)"></var-icon>
        <span class="text-12px text-[#666] mt-5px">收藏到歌单</span>
      </div>
      <div class="flex flex-col items-center justify-center flex-1 h-full" v-ripple @click="downloadHandle">
        <var-icon namespace="kdy-icon" name="xiazai" color="#666" :size="tool.px2vw(24)"></var-icon>
        <span class="text-12px text-[#666] mt-5px">下载</span>
      </div>
      <div class="flex flex-col items-center justify-center flex-1 h-full" v-ripple @click="delHandle"
        v-if="uid == userStore.userId">
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
import { Dialog } from "@varlet/ui";

const songStore = useSongStore()
const userStore = useUserStore()
const route = useRoute()
const tool = useTool()
let loading_status = ref(true)
const page_title = computed(() => {
  return `已选择${choose_ids.value.length}项`
})
// 收藏弹窗
let collect_show = ref(false)
// 新建歌单弹窗
let show_new_window = ref(false)

const uid = Number(route.params.uid)
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
  if (!choose_ids.value.length) {
    tool.toast({ content: '您还没有选中歌曲😊' })
    return
  }
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

// 删除处理
const delHandle = () => {
  if (!choose_ids.value.length) {
    tool.toast({ content: '您还没有选中歌曲😊' })
    return
  }

  Dialog({
    title: "",
    message: "确定将所选歌曲从列表中删除😢?",
    confirmButtonText: "删除",
    cancelButtonTextColor: "#666",
    onConfirm: async () => {
      await handlePlaylist({
        op: 'del',
        pid: playlist_id,
        tracks: choose_ids.value.toString()
      }).then(res => {
        song_list.value = song_list.value.filter(item=> !choose_ids.value.includes(item.id))
        tool.toast({ content: "已删除" })
      })

      
    }
  });

}

const downloadHandle = async () => {
  if (!choose_ids.value.length) {
    tool.toast({ content: '您还没有选中歌曲😊' })
    return
  }

  if (tool.isWxBrowser()) {
    tool.showGuideMask()
    return
  }

  let res: any = await getMusicUrl(choose_ids.value.toString())
  res.data.forEach((item: any) => {
    tool.downloadMusic(item.url)
  })
}


// 全选
const selectAll = () => {
  is_select_all.value = !is_select_all.value

  song_list.value.forEach(item => {
    item.check = is_select_all.value
  })
}

const nextPlayHandle = () => {

  if (!choose_ids.value.length) {
    tool.toast({ content: '您还没有选中歌曲😊' })
    return
  }

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
  loading_status.value = false
}
getSongListAllSong()

</script>

<style scoped lang="scss"></style>