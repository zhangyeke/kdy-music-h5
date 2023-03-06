<!--
 * @Author: your name
 * @Date: 2022-03-24 17:47:16
 * @LastEditTime: 2023-03-06 20:49:49
 * @LastEditors: 可达鸭 997610780@qq.com
 * @Description: 搜索歌曲
 * @FilePath: \zyk-music-h5\template.vue
-->
<template>
  <div class="mt-15px">
    <div v-show="!list.length">
      <div class="font-700 text-14px text-[var(--text-color)]">历史</div>
      <div class="flex justify-around flex-wrap">
        <div v-for="(item,index) in searchStore.list" :key="item.id" class="mt-10px" v-ripple @click="emit('click',item.title)">
          <var-chip color="#bbb" text-color="#666" plain size="small">{{ item.title }}</var-chip>
        </div>
      </div>
    </div>

    <div v-show="list.length">
      <div class="border-b py-5px px-10px text-14px text-[#333] flex items-center"
        v-for="(item, index) in list" :key="index" @click.stop="emit('click',item.keyword)">
        <var-icon name="magnify" color="#dedede" :size="20" />
        <span class="ml-5px">{{ item?.keyword }}</span>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import useSearchStore from "@/store/searchHistory";
import {SearchResult} from "@/types/search";
const props = withDefaults(defineProps<{
  list: SearchResult[]
}>(),{

})


const tool = useTool()
const searchStore = useSearchStore()
const emit = defineEmits(['click'])




</script>

<style scoped lang="scss"></style>