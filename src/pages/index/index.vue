<!--
 * @Author: your name
 * @Date: 2022-03-24 17:47:06
 * @LastEditTime: 2022-03-25 22:59:33
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \zyk-music-h5\src\pages\index.vue
-->
<template>
  <div class="page">
    <var-app-bar title-position="center" :elevation="false">
      <template #left>
        <var-icon name="menu" :size="kdy.px2vw(30)" />
      </template>
      <template #>
        <kdy-search class="ml-10px" :disabled="true" @click="jumpHandle"></kdy-search>
      </template>
      <template #right>
        <var-icon namespace="kdy-icon" name="maikefeng" :size="kdy.px2vw(26)" />
      </template>
    </var-app-bar>

    <div class="page_body px-20px">
      <!-- 轮播图 -->
      <div class="swiper mt-20px">
        <var-swipe class>
          <var-swipe-item v-for="(item, index) in swiper_list" :key="index">
            <img class="w-full fit_cover rounded-10px" :src="item.pic" />
          </var-swipe-item>
        </var-swipe>
      </div>
      <!-- 导航栏 -->
      <div class="nav flex text-center mt-20px">
        <div v-for="item in nav_list" :key="item.id" class="nav_item w-80px mr-20px">
          <div class="nav_icon rounded-1/2 ">
            <var-image
              :width="kdy.px2vw(50)"
              :height="kdy.px2vw(50)"
              fit="cover"
              radius="50%"
              :src="item.iconUrl"
            />
          </div>
          <span class="text-12px text-[#333]">{{ item.name }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import kdySearch from 'cmp/kdy-search/kdy-search.vue';
let router = useRouter()

const kdy = getCurrentInstance()?.appContext.config.globalProperties.$kdy

let nav_list = ref<any>([])

let swiper_list = ref<any>([])



const jumpHandle = () => {
  router.push({ name: "songSearch" })
}

const getSwiperList = async () => {
  let res: any = await kdyAxios('/banner?type=1')
  swiper_list.value = res.banners
  console.log(res, "轮播图");
}

const getNavList = async () => {
  let res: any = await kdyAxios('/homepage/dragon/ball')
  nav_list.value = res.data
  console.log(res, "导航栏");

}
getNavList()
getSwiperList()
</script>

<style scoped lang="scss">
.nav {
  overflow: hidden;
  /* 比里层元素高16px 为了隐藏滚动条*/
  overflow-x: scroll;
  /* 定义超出此盒子滚动 */
  overflow-y: hidden;
  &::-webkit-scrollbar {
    width: 0;
  }
  -ms-overflow-style: none;
  overflow: -moz-scrollbars-none;

  &_icon{
    @apply bg-[#EC4141];
  }
}
</style>