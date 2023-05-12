<!--
 * @Author: your name
 * @Date: 2022-03-24 18:49:22
 * @LastEditTime: 2023-04-12 18:13:53
 * @LastEditors: zyk 997610780@qq.com
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \zyk-music-h5\src\components\kdy-tabbar\kdy-tabbar.vue
-->
<template>
  <div v-show="show">
    <div class="tabbar border-t" :style="[{ backgroundColor: bgColor, height: kdy.px2vw(height) }]">
      <div class="tabbar_item" v-ripple v-for="(item, index) in list" :key="item.title"
        @click="router.push({ path: item.pagePath })">
        <div :class="{ active_bg: item.pagePath == cur_path }">
          <img class="tabbar_icon"
            :src="kdy.getAssetsImages(item.pagePath == cur_path ? item.activeIcon : item.icon)" />
        </div>
        <span class="tabbar_title" :class="[`text-${fontSize}px`]"
          :style="{ color: item.pagePath == cur_path ? activeColor : color }">{{ item.title }}</span>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { TabBar } from "@/enum-file/tabbar"
let prop = withDefaults(defineProps<{
  bgColor?: string,
  color?: string,
  activeColor?: string,
  list: TabBar[],
  height?: number
  fontSize?: number,
  show:boolean,
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
let router = useRouter()
// 组件内使用全局路由守卫
router.afterEach((to, from) => {
  cur_path.value = to.path
})
</script>

<style scoped lang="scss">
.tabbar {
  display: flex;
  align-items: center;
  &_item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 33%;
    height: 100%;

    .active_bg {
      border-radius: 50%;
      background: var(--color-primary);
      /* fallback for old browsers */
    }
  }

  &_icon {
    display: block;
    width: 28px;
    height: 28px;
    object-fit: cover;
  }

  &_title {
    margin-top: 5px;
  }
}
</style>