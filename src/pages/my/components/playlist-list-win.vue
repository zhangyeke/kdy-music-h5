<!--
 * @Author: your name
 * @Date: 2022-03-24 17:47:16
 * @LastEditTime: 2023-03-13 14:11:22
 * @LastEditors: zyk 997610780@qq.com
 * @Description: 歌单列表窗口
 * @FilePath: \zyk-music-h5\template.vue
-->
<template>
  <KdyTransition enter-class="animate-slideInRight" leave-class="animate-slideOutRight">
    <div class="bg-default fixed top-0 bottom-0 left-0 w-full min-h-100vh z-30 overflow-y-auto pb-50px" v-show="modelValue">
      <div>
        <KdyNavBar :title="title" :custom-back="true" @back="close"></KdyNavBar>
      </div>
      <div class="px-20px mt-20px">
        <div class="kdy_tab_item" v-for="(item, index) in list" :key="item.id" v-ripple @click="clickHandle(item)">
          <img :src="item.coverImgUrl" class="kdy_tab_item_left">
          <div class="kdy_tab_item_right">
            <div class="kdy_tab_item_name">{{ item.name }}</div>
            <div class="kdy_tab_item_total">{{ item.trackCount }}首</div>
          </div>
        </div>
      </div>
    </div>
  </KdyTransition>
</template>
<script setup lang="ts">
import { SongsList } from '@/types/songList';
import useUserStore from "@/store/user";

const props = withDefaults(defineProps<{
  title: string,
  listKey: string,
  modelValue: boolean
}>(), {
  
})
const tool = useTool()
const userStore = useUserStore()

let list = ref<SongsList[]>([])

watch(() => props.modelValue, (v) => {
  console.log(v,"内部监听");
  
  v && open()
})

const emit = defineEmits(['update:modelValue','click'])

const close = () => {
  emit('update:modelValue', false)
}

const open = () => {
  list.value = userStore.playlist[props.listKey]
}

const clickHandle = (item:SongsList)=>{
  if(!item.trackCount){
    tool.toast({content:"当前歌单暂无歌曲,不可添加"})
    return
  }

  emit('click',{name:item.name,id:item.id})
}
</script>

<style scoped lang="scss"></style>