<!--
 * @Author: your name
 * @Date: 2022-03-24 17:47:16
 * @LastEditTime: 2023-03-02 18:30:30
 * @LastEditors: zyk 997610780@qq.com
 * @Description: 编辑歌单信息
 * @FilePath: \zyk-music-h5\template.vue
-->
<template>
  <div class="page bg-white min-h-100vh">
    <KdyNavBar :title="route.meta.title"></KdyNavBar>

    <div class="h-10px bg-[#eee]"></div>

    <div class="px-20px" v-if="playlist">
      <div class="py-10px flex items-center justify-between border-b relative" v-ripple>
        <div class="text-[var(--text-color)] text-16px font-700">更换封面</div>
        <img :src="playlist.coverImgUrl" class="w-40px h-40px rounded-5px">
        <input type="file" class="absolute z-2 w-full h-full opacity-0" accept="image/*" @change="getFile">
      </div>

      <div class="py-15px flex items-center justify-between border-b" v-ripple>
        <div class="text-[var(--text-color)] text-16px font-700">名称</div>
        <div class="text-[#999] text-14px">{{ playlist.name }}</div>
      </div>

      <div class="py-15px flex items-center justify-between border-b" v-ripple>
        <div class="text-[var(--text-color)] text-16px font-700">标签</div>
        <div class="">
          <var-chip plain type="primary" size="small" class="mr-5px" v-for="(item, index) in playlist.tags"
            :key="index">{{ item }}</var-chip>
        </div>
      </div>

      <div class="py-15px flex items-center justify-between" v-ripple>
        <div class="text-[var(--text-color)] text-16px font-700">描述</div>
        <div class="text-[#999] text-14px truncate flex-1 text-right">{{ playlist.name }}</div>
      </div>

    </div>

  </div>
</template>
<script setup lang="ts">
import { SongsList } from '@/types/songList';
import { getSongListDetail, uploadCover } from "@/api/public/playlist";
const route = useRoute()
const router = useRouter()
const playlist_id = route.params.id as string
let update_img = ref("")
const playlist = ref<SongsList | null>(null)

const getPlaylistDetail = async () => {
  let res: any = await getSongListDetail({ id: playlist_id })
  console.log(res, "歌单详情");
  playlist.value = res.playlist
}

const getFile = (e: Event) => {
  let files = (e.target as HTMLInputElement).files
  if (files?.length) uploadFile(files[0])

}

const uploadFile = (file: File,) => {
  let form_data = new FormData()
  form_data.append('imgFile', file)
  uploadCover(playlist_id, form_data)
}

getPlaylistDetail()
</script>

<style scoped lang="scss"></style>