
<!--
 * @Author: your name
 * @Date: 2022-03-24 17:47:06
 * @LastEditTime: 2022-04-20 16:48:53
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \zyk-music-h5\src\pages\index.vue
-->
<template>
  <div class="page">
    <var-style-provider :style-vars="appBarStyle">
      <var-app-bar title-position="center" :elevation="false">
        <template #left>
          <var-icon name="menu" :size="kdy.px2vw(30)" />
        </template>
        <template #>
          <kdy-search class="ml-10px" :disabled="true" @click="searchJump"></kdy-search>
        </template>
        <template #right>
          <var-icon namespace="kdy-icon" name="maikefeng" :size="kdy.px2vw(26)" />
        </template>
      </var-app-bar>
    </var-style-provider>

    <div class="page_body">
      <!-- 轮播图 -->
      <div class="swiper mt-20px px-20px">
        <var-swipe :autoplay="3000">
          <var-swipe-item v-for="(item, index) in swiper_list" :key="index">
            <div class="relative">
              <img class="w-full fit_cover rounded-10px" :src="item.pic" />
              <span class="swiper_title" :style="{ backgroundColor: item.titleColor }">{{ item.typeTitle }}</span>
            </div>
          </var-swipe-item>
        </var-swipe>
      </div>
      <!-- 导航栏 -->
      <div class="nav x_slide flex text-center pt-20px px-20px bg-white">
        <div v-for="(item, indx) in nav_list" :key="item.id" class="nav_item w-80px mr-20px" >
          <div class="nav_icon rounded-1/2 relative flex items-center justify-center">
            <var-image :width="kdy.px2vw(50)" :height="kdy.px2vw(50)" fit="cover" radius="50%" :src="item.iconUrl" />
            <span v-if="indx == 0" class="absolute pt-5px text-[#EC4141] font-700 text-14px">{{
              kdy.getNowDate().day
            }}</span>
          </div>
          <span class="text-12px text-[#333] font-700">{{ item.name }}</span>
        </div>
      </div>

      <div class="page_data">
        <div v-for="(item, index) in indexData" :key="item.blockCode"
          class="page_data_item mb-10px px-20px bg-white rounded-10px">
          <div class="page_data_head flex items-center justify-between pt-20px" v-if="item.uiElement?.subTitle?.title">
            <div class="font-700 text-18px">{{ item.uiElement.subTitle.title }}</div>
            <div class="fun_btn flex items-center" v-if="item.uiElement?.button" @click="modelRightClick(item)">
              <span class="mr-2px">{{ item.uiElement.button.text }}</span>
              <var-icon name="chevron-right" color="#333" :size="14"
                v-if="item.uiElement.button?.actionType == 'orpheus'" />
              <var-icon name="bofang" namespace="kdy-icon" color="#333" :size="12"
                v-if="item.uiElement.button?.action == 'play_all_song'" />
              <var-icon name="shuaxin1" namespace="kdy-icon" color="#333" :size="12"
                v-if="item.uiElement.button.text == '换一批'" />
            </div>
          </div>

          <!-- 推荐歌单 -->
          <div class="recomm flex x_slide mt-10px" v-if="item.blockCode == 'HOMEPAGE_BLOCK_PLAYLIST_RCMD'">
            <div v-for="(el, idx) in item.creatives" :key="idx" class="mr-10px">
              <div v-if="el.resources.length > 1">
                <var-swipe class="w-100px h-100px" :autoplay="3000" :vertical="true" :indicator="false"
                  :touchable="false" @change="recommSwiperChange">
                  <var-swipe-item v-for="(d, i) in el.resources" :key="i">
                    <div class="flex flex-col items-center">
                      <img :src="d.uiElement?.image?.imageUrl" class="w-full h-full rounded-10px fit_cover" />
                    </div>
                  </var-swipe-item>
                </var-swipe>
                <kdyTransition>
                  <span class="mt-5px text-12px text-[#333] font-500 truncate_2" :key="recommSwiperCur">
                    {{
                      el.resources[recommSwiperCur].uiElement?.mainTitle?.title
                    }}
                  </span>
                </kdyTransition>
              </div>

              <div class="flex flex-col items-center" v-else>
                <div class="recomm_img">
                  <var-image :width="kdy.px2vw(100)" :height="kdy.px2vw(100)" :radius="kdy.px2vw(10)" fit="cover"
                    :src="el.uiElement?.image?.imageUrl" />
                </div>
                <span class="mt-5px text-12px text-[#333] font-500 truncate_2">
                  {{
                    el.uiElement?.mainTitle?.title
                  }}
                </span>
              </div>
            </div>
          </div>

          <!-- 精选歌曲 -->
          <div class="mt-10px pb-10px" v-if="item.blockCode == 'HOMEPAGE_BLOCK_STYLE_RCMD'">
            <var-swipe class :indicator="false" :autoplay="5000">
              <var-swipe-item v-for="(el, idx) in item.creatives" :key="idx">
                <div>
                  <div v-for="(v, i) in el.resources" :key="i" class="mb-10px flex items-center" @click="playMusic(v.resourceId)">
                    <div class="relative flex items-center justify-center w-50px h-50px">
                      <img class="w-full h-full rounded-10px fit_cover" :src="v.uiElement?.image?.imageUrl" />
                      <div class="absolute opacity-70">
                        <var-icon namespace="kdy-icon" name="bofang" color="#fff" />
                      </div>
                    </div>
                    <div class="flex-1 ml-10px truncate">
                      <!-- 歌曲名 && 作者信息 -->
                      <div class="flex items-center truncate">
                        <span class="font-700 text-[#333] text-18px">{{ v.uiElement?.mainTitle?.title }}</span>
                        <div class="text-[#999] text-12px">
                          <span class="mx-5px">-</span>
                          <span v-for="s in v.resourceExtInfo.artists" :key="s.id">{{ s.name }}</span>
                        </div>
                      </div>
                      <!-- 歌曲副标题 -->
                      <div class="text-14px text-[#999] mt-10px border_b_solid_1 pb-5px">{{
                        v.uiElement?.subTitle?.title
                      }}</div>
                    </div>

                    <div class="ml-4px">
                      <var-icon namespace="kdy-icon" name="bofang1" color="#ccc" />
                    </div>
                  </div>
                </div>
              </var-swipe-item>
            </var-swipe>
          </div>

          <!-- 热门话题 -->
          <div class="mt-10px pb-5px" v-if="item.blockCode == 'HOMEPAGE_BLOCK_HOT_TOPIC'">
            <div>
              <div v-for="(el, idx) in item.creatives" :key="el.creativeId">
                <div v-for="(v, i) in el.resources" :key="v.resourceId" class="mb-8px">
                  <div class="flex items-center justify-between">
                    <div class="flex items-center flex-1 truncate">
                      <img class="w-10px" :src="v.uiElement?.mainTitle?.titleImgUrl" />
                      <span class="text-14px text-[#333]">{{ v.uiElement?.mainTitle?.title }}</span>
                      <img class="w-15px ml-5px" :src="v.uiElement?.labelUrls[0]"
                        v-if="v.uiElement?.labelUrls?.length" />
                    </div>
                    <div class="text-[#999] text-10px">{{ v.uiElement?.subTitle?.title }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 音乐日历 -->
          <div class="mt-10px pb-5px" v-if="item.blockCode == 'HOMEPAGE_MUSIC_CALENDAR'">
            <div>
              <div v-for="(el, idx) in item.creatives" :key="el.creativeId">
                <div v-for="(v, i) in el.resources" :key="v.resourceId"
                  class="mb-10px flex items-center justify-between" @click="modelJump(item, v)">
                  <div class="w-7/10">
                    <div class="flex items-center mb-10px">
                      <span class="text-14px text-[#ccc]">{{ idx == 0 ? "今天" : "明天" }}</span>
                      <span class="text-warning text-12px px-4px py-3px bg-warning-light ml-5px"
                        v-for="(tag, it) in v.uiElement?.labelTexts" :key="it">{{ tag }}</span>

                      <span class="text-[#666] bg-default text-12px px-4px py-3px ml-5px"
                        v-if="v.resourceExtInfo?.eventType == 'REP_TRAILER'">预告</span>
                    </div>
                    <div class="text-16px font-600 truncate">{{ v.uiElement?.mainTitle?.title }}</div>
                  </div>

                  <div class="w-50px h-50px">
                    <img class="w-full h-full fit-cover rounded-10px" :src="v.uiElement?.image?.imageUrl" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 精选视频 -->
          <div class="mt-10px pb-5px" v-if="item.blockCode == 'HOMEPAGE_MUSIC_MLOG'">
            <div class="flex flex-wrap justify-between">
              <div v-for="(el, idx) in item.extInfo" :key="el.id" class="w-49/100 mb-10px" @click="modelJump(item, el)">
                <div class="poster relative flex items-center justify-center">
                  <var-image width="100%" :height="kdy.px2vw(100)" fit="cover" :radius="kdy.px2vw(10)" :lazy="true"
                    :src="el.resource?.mlogBaseData?.coverUrl" />
                  <div class="absolute opacity-80">
                    <var-icon namespace="kdy-icon" name="bofang1" color="#fff" />
                  </div>
                </div>
                <div class="mt-10px">
                  <div class="truncate_2 text-12px text-[#333] font-500">{{ el.resource?.mlogBaseData?.text }}</div>
                </div>
              </div>
            </div>
          </div>

          <!-- 雷达歌单 -->
          <div class="mt-10px pb-5px" v-if="item.blockCode == 'HOMEPAGE_BLOCK_MGC_PLAYLIST'">
            <div class="x_slide flex">
              <div v-for="(el, idx) in item.creatives" :key="el.creativeId" class="mr-10px">
                <row-song-list :list="el.resources"></row-song-list>
              </div>
            </div>
          </div>

          <!-- 专属场景歌单 -->
          <div class="mt-10px pb-5px" v-if="item.blockCode == 'HOMEPAGE_BLOCK_OFFICIAL_PLAYLIST'">
            <div class="x_slide flex">
              <div v-for="(el, idx) in item.creatives" :key="el.creativeId" class="mr-10px">
                <row-song-list :list="el.resources"></row-song-list>
              </div>
            </div>
          </div>

          <!-- 云村出品 -->
          <div class="mt-10px pb-5px " v-if="item.blockCode == 'HOMEPAGE_BLOCK_YUNCUN_PRODUCED'">
            <div class="x_slide flex">
              <div class="mr-10px" v-for="(el, idx) in item.creatives" :key="idx">
                <div class="">
                  <var-image :width="kdy.px2vw(150)" :height="kdy.px2vw(100)" fit="cover" radius="10" :lazy="true"
                    :src="el.uiElement?.image?.imageUrl" />
                </div>
                <div class="mt-5px text-12px text-[#333] font-500 truncate_2">
                  {{ el.uiElement?.mainTitle?.title }}
                </div>
              </div>
            </div>
          </div>

          <!-- 视频合辑场景歌单 -->
          <div class="mt-10px pb-5px" v-if="item.blockCode == 'HOMEPAGE_BLOCK_VIDEO_PLAYLIST'">
            <div class="x_slide flex">
              <div v-for="(el, idx) in item.creatives" :key="el.creativeId" class="mr-10px">
                <row-song-list :list="el.resources"></row-song-list>
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
import kdyTransition from "cmp/kdy-transition/kdy-transition.vue";
import rowSongList from "cmp/row-song-list/row-song-list.vue";
import useSongStore from "@/store/song"

let songStore = useSongStore()
let router = useRouter()

const kdy = useTool()

let nav_list = ref<any>([])

let swiper_list = ref<any>([])

let indexData = ref<any>([])

let recommSwiperCur = ref(0)

let appBarStyle = ref({
  '--app-bar-title-padding': `0 ${kdy.px2vw(30)}`
})


// 搜索跳转
const searchJump = () => {
  router.push({ name: "songSearch" })
}

// 模块跳转
const modelJump = (model: any, item: any) => {
  switch (model.blockCode) {
    case "HOMEPAGE_MUSIC_CALENDAR":
      if (item.resourceType == 'WEBVIEW') {
        window.location.href = item.resourceId
      }
      break;
    case "HOMEPAGE_MUSIC_MLOG":
      window.location.href = item.resource.shareUrl
      break;
  }
}

// 模块头部右侧按钮处理
const modelRightClick = (model: any) => {
  if (model.uiElement.button.text) {

  }
}

const getIndexData = async () => {
  let res: any = await kdyAxios('/homepage/block/page')
  res.data.blocks.shift()
  indexData.value.push(...res.data.blocks)
}

const getSwiperList = async () => {
  let res: any = await kdyAxios('/banner?type=1')
  swiper_list.value = res.banners
}

const getNavList = async () => {
  let res: any = await kdyAxios('/homepage/dragon/ball')
  nav_list.value = res.data
}

// 推荐歌单轮播图变动监听
const recommSwiperChange = (i: number) => {
  recommSwiperCur.value = i
}


//播放音乐
const playMusic = (id:number) =>{
  songStore.getSongUrl(id)
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
    }
  }
}

.fun_btn {
  @apply text-12px border pl-8px pr-3px py-3px rounded-20px font-500 align-middle text-[#333];
}
</style>