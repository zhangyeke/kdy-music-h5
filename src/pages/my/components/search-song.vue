<!--
 * @Author: your name
 * @Date: 2022-03-24 17:47:16
 * @LastEditTime: 2023-03-06 18:22:50
 * @LastEditors: zyk 997610780@qq.com
 * @Description: 搜索歌曲
 * @FilePath: \zyk-music-h5\template.vue
-->
<template>
  <div class="mt-15px">
    <div>
      <div class="font-700 text-14px text-[var(--text-color)]">历史</div>
      <div class="flex justify-around flex-wrap">
        <div v-for="(item,index) in searchStore.list" :key="item.id" class="mt-10px" v-ripple @click="emit('click')">
          <var-chip color="#bbb" text-color="#666" plain size="small">{{ item.title }}</var-chip>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import useSearchStore from "@/store/searchHistory";
const tool = useTool()
const searchStore = useSearchStore()
const emit = defineEmits(['click'])




</script>

<style scoped lang="scss"></style>