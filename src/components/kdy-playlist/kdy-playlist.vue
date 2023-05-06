<!--
 * @Author: your name
 * @Date: 2022-03-24 17:47:16
 * @LastEditTime: 2023-03-10 13:39:41
 * @LastEditors: zyk 997610780@qq.com
 * @Description: 歌单项
 * @FilePath: \zyk-music-h5\template.vue
-->
<template>
  <div class="p-10px flex" :class="{border_b_solid_1:border}"  @click="clickHandle">
    <div class="w-50px h-50px rounded-5px overflow-hidden">
      <var-image :src="item[coverKey]" width="100%" height="100%" :lazy="true" object="cover"/>
    </div>
    <div class="ml-8px w-4/5">
      <div class="text-[#333] text-14px truncate">{{ item.name }}</div>
      <div class="text-[#666] text-12px mt-5px">{{ item[songCountKey] }}首,播放{{ tool.numFormat(item[playCountKey]) }}次
      </div>
      <div class="text-[#888] text-12px mt-5px">歌单所属:{{ userNameKey ? item[userNameKey] : item!.creator!.nickname }}</div>
    </div>
  </div>
</template>
<script setup lang="ts" name="kdyPlaylist">
import {SongsList} from "@/types/songList"
const tool = useTool()
const router = useRouter()
const props = withDefaults(defineProps<{
  item: SongsList,
  border?:boolean
  coverKey?:string,
  songCountKey?:string,
  playCountKey?:string,
  userNameKey?:string,
  userIdKey?:string
}>(), {
  border:true,
  coverKey:"coverImgUrl",
  songCountKey:"trackCount",
  playCountKey:"playCount",
  userNameKey:"",
  userIdKey: "id",
})

const emit = defineEmits(['click'])
const clickHandle = () => {
  router.push({ name: "playlistDetail", params: { id:props.item[props.userIdKey] } })
}
</script>

<style scoped lang="scss">

</style>