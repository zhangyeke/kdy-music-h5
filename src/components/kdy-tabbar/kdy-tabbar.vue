<!--
 * @Author: your name
 * @Date: 2022-03-24 18:49:22
 * @LastEditTime: 2022-03-24 18:49:25
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \zyk-music-h5\src\components\kdy-tabbar\kdy-tabbar.vue
-->
<template>
  <div>
    <div class="tabbar">
      <div class="tabbar_item" v-for="(item, index) in list" :key="item.title">
        <div>
          <img :src="item.icon"  />
        </div>
        <span>{{item.title}}</span>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { TabBar } from "@/enum-file/tabbar"


let prop = withDefaults(defineProps<{
  bgColor:string,
  color: string,
  activeColor: string,
  list: TabBar[],
}>(),{
  bgColor:'#fff'
})



</script>

<style scoped lang="scss">
.tabbar {
  display: flex;
  justify-content: space-around;
  &_item {
  }
}
</style>