<!--
 * @Author:kkk
 * @Date: 2022-03-24 17:47:16
 * @LastEditTime: 2023-04-12 18:34:01
 * @LastEditors: zyk 997610780@qq.com
 * @Description: 曲风
 * @FilePath: \zyk-music-h5\template.vue
-->
<template>
  <div>
    <KdyNavBar :title="$route.meta.title" ></KdyNavBar>

      <div class="flex" :style="{ height: main_height + 'px' }">
      <div class="text-[#8e8e8e] text-18px text-center">
        <div v-for="(item,index) in 10" class="px-10px h-50px leading-50px" :key="index">分隔分隔分{{ index }}</div>
      </div>
      <div class="bg-white flex-1"></div>
    </div>
  </div>
</template>
<script setup lang="ts">


const main_height = computed(()=>{
  return window.innerHeight - 100
})
console.log(window.innerHeight);

</script>

<style scoped lang="scss"></style>