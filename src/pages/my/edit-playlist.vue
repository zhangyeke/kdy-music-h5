<!--
 * @Author: your name
 * @Date: 2022-03-24 17:47:16
 * @LastEditTime: 2023-03-03 17:03:03
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

      <div class="py-15px flex items-center justify-between border-b" v-ripple @click="openEditInfo(1)">
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

      <div class="py-15px flex items-center justify-between" v-ripple @click="openEditInfo(2)">
        <div class="text-[var(--text-color)] text-16px font-700">描述</div>
        <div class="text-[#999] text-14px truncate w-8/10 text-right">{{ playlist.description }}</div>
      </div>

    </div>
    <editInfo v-if="playlist" v-model="edit_info_value"  :maxlength="input_maxlength"
      :textarea="is_extarea" :placeholder="edit_info_placeholder" :ischeck="is_check" :title="edit_info_title" v-model:show="show_edit_info" @btnClick="updatePlaylistInfo">
    </editInfo>
    <chooseTag v-if="playlist" v-model:show="show_choose_tag" v-model="playlist.tags"></chooseTag>
  </div>
</template>
<script setup lang="ts">
import { SongsList } from '@/types/songList';
import { getSongListDetail, uploadCover,updateDesc,updateName,updateTags } from "@/api/public/playlist";
import editInfo from "./components/edit-info.vue";
import chooseTag from "./components/choose-tag.vue";
const tool = useTool()
const route = useRoute()
const router = useRouter()
const playlist_id = route.params.id as string
let playlist = ref<SongsList | null>(null)
let show_edit_info = ref(false)
let show_choose_tag = ref(true)
// 编辑内容类型 1：歌单名称 2：歌单介绍
let edit_info_type = ref(0)

const edit_info_value = computed({
  get(){
    return edit_info_type.value == 1 ? playlist.value?.name : playlist.value?.description
  },
  set(v){
    console.log(v,"要设置的值");
    edit_info_type.value == 1 ? playlist.value!.name = v : playlist.value!.description = v
  }
})

const edit_info_title = computed(() => {
  return edit_info_type.value == 1 ? "歌单名称" : "歌单介绍"
})

const edit_info_placeholder = computed(() => {
  return edit_info_type.value == 1 ? "编辑歌单名称" : "编辑歌单介绍"
})

const is_check = computed(()=>{
  return edit_info_type.value == 1 ? true : false
})

const is_extarea = computed(() => {
  return edit_info_type.value == 1 ? false : true
})

const input_maxlength = computed(() => {
  return edit_info_type.value == 1 ? "" : 1000
})


const openEditInfo = (type: number) => {
  edit_info_type.value = type
  show_edit_info.value = true
}

// 获取歌单详情
const getPlaylistDetail = async () => {
  let res: any = await getSongListDetail({ id: playlist_id })
  console.log(res, "歌单详情");
  playlist.value = res.playlist
}

// 获取上传的文件
const getFile = (e: Event) => {
  let files = (e.target as HTMLInputElement).files
  if (files?.length) uploadFile(files[0])
}

// 上传文件
const uploadFile = async (file: File,) => {
  if (!isMatchUpload(file.size)) {
    tool.toast({ type: "warning", content: "请上传小于5M大小的图片!" })
    return
  }
  let form_data = new FormData()
  form_data.append('imgFile', file)
  let path = URL.createObjectURL(file)
  playlist.value!.coverImgUrl = path
  let imgSize = await getCoverImgSize(file)
  uploadCover({ id: playlist_id, imgSize: imgSize.width }, form_data)
}

// 是否符合上传大小 max单位M
const isMatchUpload = (file_size: number, max: number = 5) => {
  return (file_size / 1024 / 1024) <= max
}

// 获取封面图片大小
const getCoverImgSize = (file: File) => {
  return new Promise((resolve: (value: { width: number, height: number }) => void) => {
    let reader = new FileReader()
    reader.readAsDataURL(file)
    // 开始读取文件
    reader.onloadstart = (res) => {
      console.log("开始读取", res);
    }
    // 读取中
    reader.onprogress = (res) => {
      let progress = (res.total / file.size) * 100
      if (progress >= 100) {
        tool.hideLoading()
      } else {
        tool.showLoading({ content: `上传进度${progress}%` })
      }
    }
    // 读取文件成功
    reader.onload = (res) => {
      console.log("读取文件成功", res);
      let img = new Image()
      img.src = res.target!.result as string
      img.onload = (r) => {
        tool.toast({ content: "上传成功!", type: "success" })
        resolve({ width: img.width, height: img.height })
      }
    }
  })
}

// 更新歌单信息
const updatePlaylistInfo = (v:string)=>{
  if(edit_info_type.value == 1){
    updateName(playlist_id,v)
    return
  }

  if(edit_info_type.value == 2){
    updateDesc(playlist_id,v)
    return
  }
}
getPlaylistDetail()
</script>

<style scoped lang="scss"></style>