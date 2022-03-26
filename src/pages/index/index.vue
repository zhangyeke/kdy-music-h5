<!--
 * @Author: your name
 * @Date: 2022-03-24 17:47:06
 * @LastEditTime: 2022-03-26 17:55:26
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

    <div class="page_body">
      <!-- 轮播图 -->
      <div class="swiper mt-20px px-20px">
        <var-swipe :autoplay="3000">
          <var-swipe-item v-for="(item, index) in swiper_list" :key="index">
            <div class="relative">
              <img class="w-full fit_cover rounded-10px" :src="item.pic" />
              <span
                class="swiper_title"
                :style="{ backgroundColor: item.titleColor }"
              >{{ item.typeTitle }}</span>
            </div>
          </var-swipe-item>
        </var-swipe>
      </div>
      <!-- 导航栏 -->
      <div class="nav x_slide flex text-center pt-20px px-20px bg-white">
        <div v-for="item in nav_list" :key="item.id" class="nav_item w-80px mr-20px">
          <div class="nav_icon rounded-1/2">
            <var-image
              :width="kdy.px2vw(50)"
              :height="kdy.px2vw(50)"
              fit="cover"
              radius="50%"
              :src="item.iconUrl"
            />
          </div>
          <span class="text-12px text-[#333] font-700">{{ item.name }}</span>
        </div>
      </div>

      <div class="page_data">
        <div
          v-for="(item, index) in indexData"
          :key="item.blockCode"
          class="page_data_item mb-10px px-20px bg-white rounded-10px"
        >
          <div
            class="page_data_title flex items-center justify-between"
            v-if="item.uiElement?.subTitle?.title"
          >
            <div class="font-700 text-18px">{{ item.uiElement.subTitle.title }}</div>
            <div class="fun_btn flex items-center" v-if="item.uiElement?.button">
              <span class="mr-2px">{{ item.uiElement.button.text }}</span>
              <var-icon
                name="chevron-right"
                color="#333"
                :size="14"
                v-if="item.uiElement.button?.actionType == 'orpheus'"
              />
              <var-icon
                name="bofang"
                namespace="kdy-icon"
                color="#333"
                :size="12"
                v-if="item.uiElement.button?.action == 'play_all_song'"
              />
              <var-icon
                name="shuaxin1"
                namespace="kdy-icon"
                color="#333"
                :size="12"
                v-if="item.uiElement.button.text == '换一批'"
              />
            </div>
          </div>

          <div class="recomm flex x_slide mt-10px " v-if="item.blockCode == 'HOMEPAGE_BLOCK_PLAYLIST_RCMD'">
            <div v-for="(el, index) in item.creatives" :key="index" class="mr-10px">
              <!-- <var-swipe class="" :autoplay="2000" :vertical="true" :indicator="false">
                <var-swipe-item v-for="(item, index) in el." :key="index">
                  <img class="" src="https://varlet.gitee.io/varlet-ui/cat.jpg" />
                </var-swipe-item>
              </var-swipe>-->
              <div class="flex flex-col items-center">
                <div class="recomm_img ">
                  <var-image
                    :width="kdy.px2vw(80)"
                    :height="kdy.px2vw(80)"
                    :radius="10"
                    fit="cover"
                    :src="el.uiElement?.image?.imageUrl"
                  />
                </div>
                <span
                  class="mt-5px text-10px text-[#333] font-500 truncate_2"
                >{{ el.uiElement?.mainTitle?.title }}</span>
              </div>
            </div>
          </div>
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

let indexData = ref<any>([])

const jumpHandle = () => {
  router.push({ name: "songSearch" })
}

const getIndexData = async () => {
  let res: any = await kdyAxios('/homepage/block/page')
  res.data.blocks.shift()
  indexData.value.push(...res.data.blocks)
  console.log(isRef(indexData), "首页数据", indexData.value);

}

const getSwiperList = async () => {
  let res: any = await kdyAxios('/banner?type=1')
  swiper_list.value = res.banners
}

const getNavList = async () => {
  let res: any = await kdyAxios('/homepage/dragon/ball')
  nav_list.value = res.data
}

getNavList()
getSwiperList()
getIndexData()
</script>

<style scoped lang="scss">
.page {
  .swiper {
    &_title {
      @apply absolute right-0 bottom-0 text-white text-14px py-3px px-7px;
      border-radius: 10px 0 10px 0;
    }
  }
  .nav {
    border-bottom: 1px solid #ccc;
    border-radius: 10px 10px 0 0;
    &_icon {
      @apply bg-[#EC4141];
    }
  }
  &_data {
    &_item:first-child {
      border-radius: 0 0 10px 10px;
      .page_data_title {
        padding-top: 20px;
      }
    }
  }
}

.fun_btn {
  @apply text-12px border pl-8px pr-3px py-3px rounded-20px font-500 align-middle text-[#333];
}
</style>