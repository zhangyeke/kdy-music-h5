<!--
 * @Author: your name
 * @Date: 2022-03-24 18:49:22
 * @LastEditTime: 2022-04-07 16:34:21
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \zyk-music-h5\src\components\kdy-tabbar\kdy-tabbar.vue
-->
<template>
  <div>
    <div class="tabbar" :style="[{ backgroundColor: bgColor, height: kdy.px2vw(height) }]">
      <div class="tabbar_item" v-for="(item, index) in list" :key="item.title" @click="tabBarJump(item.pagePath)">
        <div :class="{active_bg:item.pagePath == cur_path}">
          <img
            class="tabbar_icon"
            :src="kdy.getAssetsImages(item.pagePath == cur_path ? item.activeIcon : item.icon)"
          />
        </div>
        <span
          class="tabbar_title"
          :class="[`text-${fontSize}px`]"
          :style="{ color: item.pagePath == cur_path ? activeColor : color }"
        >{{ item.title }}</span>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { TabBar } from "@/enum-file/tabbar"


let prop = withDefaults(defineProps<{
  bgColor: string,
  color: string,
  activeColor: string,
  list: TabBar[],
  height: number
  fontSize: number,
}>(), {
  bgColor: '#fff',
  height: 60,
  color: "#999",
  activeColor: 'var(--color-primary)',
  fontSize: 10,
})

const kdy = useTool()

let route = useRoute()
let cur_path = ref(route.fullPath)
console.log(cur_path.value,"当前页面",prop.list);

let router = useRouter()

const tabBarJump = (path:string) =>{
  cur_path.value = path
  router.push({path:path})
}

</script>

<style scoped lang="scss">
.tabbar {
  display: flex;
  align-items: center;
  justify-content: space-around;
  &_item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .active_bg {
      border-radius: 50%;
      background: var(--color-primary); /* fallback for old browsers */
    }
  }

  &_icon {
    display: block;
    width: 26px;
    height: 26px;
    object-fit: cover;
  }
  &_title{
    margin-top: 5px;
  }
}
</style>