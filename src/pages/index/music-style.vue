<!--
 * @Author:kkk
 * @Date: 2022-03-24 17:47:16
 * @LastEditTime: 2023-04-13 14:19:47
 * @LastEditors: zyk 997610780@qq.com
 * @Description: 曲风
 * @FilePath: \zyk-music-h5\template.vue
-->
<template>
  <div class="page overflow-hidden">
    <KdyNavBar :title="$route.meta.title"></KdyNavBar>
    <div class="flex" :style="{ height: main_height + 'px' }" v-if="style_cates.length">
      <div class="page_left text-16px text-[#878787] text-center overflow-y-scroll" @click="toggleCate">
        <div v-for="(item, index) in style_cates" :class="{ active: index == cur_cate }" :data-index="index"
          :style="getActiveStyle(index)" class="px-5px h-50px leading-50px" :key="item.tagId">{{ item.tagName }}</div>
      </div>
      <div class="page_right bg-white flex-1 overflow-y-scroll">
        <div class="page_right_hd pt-15px text-[#878787] flex flex-col justify-between"
          :style="{ backgroundImage: `url(${style_cate.picUrl})` }">
          <div class="px-20px">
            <div class="text-white text-18px font-700 tracking-5px">{{ style_cate.tagName }}</div>
            <div class="text-12px mt-5px">{{ style_cate.enName }}</div>
          </div>
          <div class="w-full">
            <var-style-provider :style-vars="styleVars">
              <var-tabs v-model:active="cur_tag" :sticky="true" :color="`#${style_cate.colorDeep}`" indicator-size="70%">
                <var-tab v-for="(tag, idx) in style_cate.childrenTags" :name="idx" :key="tag.tagId"
                  v-ripple="{ disabled: true }">{{ tag.tagName
                  }}</var-tab>
              </var-tabs>
            </var-style-provider>

          </div>
        </div>

        <div class="page_right_by">
          <div v-for="(item, index) in style_cate.childrenTags" :key="item.tagId">
            <div class="big_cate cate_item border-b">
              <div>
                <div class="tag_name">{{ item.tagName }}</div>
                <div class="en_name">{{ item.enName }}</div>
              </div>
              <var-icon namespace="kdy-icon" name="bofang2" :size="tool.px2vw(20)"></var-icon>
            </div>
            <div class="cate_item" v-for="(el, idx) in item.childrenTags" :key="el.tagId">
              <div>
                <div class="tag_name">{{ el.tagName }}</div>
                <div class="en_name">{{ el.enName }}</div>
              </div>
              <var-icon namespace="kdy-icon" name="bofang2" :size="tool.px2vw(20)"></var-icon>
            </div>
          </div>

        </div>

      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import useSongStore from '@/store/song';
import { styleList } from "@/api/public/music-style";
import { styleCate } from "@/types/song-style";
const tool = useTool()
const songStore = useSongStore()
const main_height = computed(() => {
  let height = window.innerHeight - 150
  if (!songStore.songList.length) {
    height += 40
  }
  return height
})

let style_cates = ref<styleCate[]>([])
// 当前分类
let cur_cate = ref(0)
// 当前分类的子标签分类
let cur_tag = ref(0)
// 当前分类对象
let style_cate = computed(() => {
  return style_cates.value[cur_cate.value]
})
//自定义tabs样式变量
let styleVars = computed(() => {
  return {
    "--tabs-item-horizontal-height": tool.px2vw(35),
    "--tab-active-color": '#fff',
    "--tab-inactive-color": "#878787",
    "--tabs-indicator-background": 'rgba(255,255,255,.1)'
  }
})
// 获取分类
const getStyleList = async () => {
  let res = await styleList()
  style_cates.value.push(...res.data)
  console.log(res, "看看")
}
// 切换分类
const toggleCate = (e: Event) => {
  cur_cate.value = Number((e.target as HTMLElement).dataset.index)
}
// 获取激活的样式
const getActiveStyle = (i: number) => {
  let cate: styleCate = style_cates.value[i]
  let style = {}
  if (i == cur_cate.value) {
    style = {
      color: "#" + cate.colorDeep,
      backgroundColor: "#" + cate.colorShallow,
      fontWeight: 700
    }
  }

  return style
}

onMounted(()=>{
  
})


getStyleList()
</script>

<style scoped lang="scss">
:deep(.var-tabs--layout-horizontal-indicator) {
  height: 20px;
  z-index: 1;
  bottom: 6px;
  border-radius: 35px;
  // bottom: 50%;
}

:deep(.var-tab) {
  position: relative;
  z-index: 2;
}

.page {

  &_left,
  &_right {
    &::-webkit-scrollbar {
      display: none;
    }
  }

  &_left {
    .active {
      position: sticky;
      left: 0;
      top: 0;
      transition: all .25s linear;
    }
  }

  &_right {
    &_hd {
      height: 150px;
      background-position: top right;
      background-size: cover;
    }

    &_by {
      padding: 0 20px;
      .cate_item {
        @apply flex justify-between items-center;
        color: #878787;
        margin-top: 10px;
      }
      .big_cate{
        padding-bottom: 5px;
        .tag_name{
          font-size: 16px;
          font-weight: 700;
        }
      }
      .en_name {
        font-size: 12px;
      }

      .tag_name {
        font-size: 14px;
        color: var(--color-text);
      }
    }
  }
}
</style>