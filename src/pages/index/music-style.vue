
<!--
 * @Author:kkk
 * @Date: 2022-03-24 17:47:16
 * @LastEditTime: 2023-04-17 18:20:55
 * @LastEditors: zyk 997610780@qq.com
 * @Description: 曲风
 * @FilePath: \zyk-music-h5\template.vue
-->
<template>
  <div class="page overflow-hidden">
    <KdyNavBar :title="$route.meta.title"></KdyNavBar>
    <div class="flex" :style="{ height: main_height + 'px' }" v-if="style_cates.length">
      <div class="page_left text-16px text-[#878787] text-center overflow-y-scroll" @click.capture="toggleCate">
        <div v-for="(item, index) in style_cates" :class="{ active: index == cur_cate }" :data-index="index"
          :style="getActiveStyle(index)" class="px-5px h-50px leading-50px" :key="item.tagId">{{ item.tagName }}</div>
      </div>
      <div class="page_right bg-white flex-1 overflow-y-scroll" @scroll.passive="pageRightScroll" ref="pageRight">
        <div class="page_right_hd pt-15px text-[#878787] flex flex-col justify-between"
          :style="{ backgroundImage: `url(${style_cate.picUrl})` }" v-if="preference_loading && style_cate.tagId > -1">
          <div class="px-20px">
            <div class="text-white text-18px font-700 tracking-5px">{{ style_cate.tagName }}</div>
            <div class="text-12px mt-5px">{{ style_cate.enName }}</div>
          </div>
          <div class="w-full">
            <var-style-provider :style-vars="styleVars">
              <var-tabs v-model:active="cur_tag" :sticky="true" :color="style_cate.colorDeep" indicator-size="70%"
                @click="toggleTag">
                <var-tab v-for="(tag, idx) in style_cate.childrenTags" :name="idx" :key="tag.tagId"
                  v-ripple="{ disabled: true }">{{ tag.tagName
                  }}</var-tab>
              </var-tabs>
            </var-style-provider>

          </div>
        </div>

        <div v-else-if="preference_loading && style_cate.tagId == -1" class="page_right_hd my_style" @click.capture="myToggleTag">
          <div class="h-full flex">
            <div class="h-full poster" :style="{ width: style_cate.preferences[0].ratio + '%' }">
              <div class="mask" :data-tagid="style_cate.preferences[0].tagId">{{ style_cate.preferences[0].tagName }}{{ style_cate.preferences[0].ratio
              }}%</div>
              <var-image :src="style_cate.preferences[0].picUrl" fit="cover" height="100%" width="100%"></var-image>
            </div>
            <div class="flex-1 h-full flex flex-wrap">
              <template v-for="(item, index) in style_cate.preferences" :key="item.tagId">
                <div v-if="index == 1" class="h-4/10 w-full poster">
                  <div class="mask" :data-tagid="item.tagId">{{ item.tagName }}{{ item.ratio }}%</div>
                  <var-image :src="item.picUrl" fit="cover" height="100%" width="100%"></var-image>
                </div>
                <div v-if="index == 2" class="h-6/10 w-4/10 poster">
                  <div class="mask" :data-tagid="item.tagId">{{ item.tagName }}{{ item.ratio }}%</div>
                  <var-image :src="item.picUrl" fit="cover" height="100%" width="100%"></var-image>
                </div>
                <div class="h-6/10 w-6/10" v-if="index == 3">
                  <div class="w-full h-1/2 poster">
                    <div class="mask" :data-tagid="item.tagId">{{ item.tagName }}{{ item.ratio }}%</div>

                    <var-image :src="item.picUrl" fit="cover" height="100%" width="100%"></var-image>
                  </div>
                  <div class="w-full h-1/2 poster" v-if="style_cate.preferences.length >= 5">
                    <div class="mask" :data-tagid="style_cate.preferences[4].tagId">{{ style_cate.preferences[4].tagName }}{{
                      style_cate.preferences[4].ratio }}%</div>

                    <var-image :src="style_cate.preferences[4].picUrl" fit="cover" height="100%" width="100%"></var-image>
                  </div>
                </div>

              </template>

            </div>

          </div>
        </div>


        <div class="page_right_by">
          <div v-for="(item, index) in style_cate.childrenTags" :key="item.tagId" >
            <div class="big_cate cate_item border-b" :data-index="index" v-ripple @click.stop="router.push({name:'styleDetail',params:{id:item.tagId}})">
              <div>
                <div class="tag_name">{{ item.tagName }}</div>
                <div class="en_name">{{ item.enName }}</div>
              </div>
              <var-icon namespace="kdy-icon" name="bofang2" :size="tool.px2vw(20)"></var-icon>
            </div>
            <div class="cate_item" v-for="(el, idx) in item.childrenTags" :key="el.tagId" :data-index="index" v-ripple @click.stop="router.push({name:'styleDetail',params:{id:el.tagId}})">
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

    <KdyEmpty :loading="load_status" v-else margin-top="300"></KdyEmpty>
  </div>
</template>
<script setup lang="ts">
import useSongStore from '@/store/song';
import useUserStore from "@/store/user";
import { styleList, preference } from "@/api/public/music-style";
import { styleCate } from "@/types/song-style";
import router from '@/router';
const tool = useTool()
const songStore = useSongStore()
const userStore = useUserStore()
const main_height = computed(() => {
  let height = window.innerHeight - 150
  if (!songStore.songList.length) {
    height += 40
  }
  return height
})
let load_status = ref(true)
// 我的曲风接口是否执行完毕
let preference_loading = ref(false)
let style_cates = ref<styleCate[]>([])
// 当前分类
let cur_cate = ref(0)
// 当前分类的子标签分类
let cur_tag = ref(0)
let pageRight = ref<HTMLElement | null>(null)
let bigCates = ref<HTMLElement[]>([])
let bigCateClientRects = ref<number[]>([])

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
  style_cates.value.push(...res.data.map((item: styleCate) => {
    item.colorDeep = "#" + item.colorDeep
    item.colorShallow = "#" + item.colorShallow
    return item
  }))
  console.log(res, "看看")
  if (userStore.token) {
    getPreference()
  }else{
    preference_loading.value = true
    load_status.value = false
  }
}
// 切换分类
const toggleCate = (e: Event) => {
  cur_cate.value = Number((e.target as HTMLElement).dataset.index)
  pageRight.value = null
}
// 定时器
let timer: undefined | number | NodeJS.Timer;

const myToggleTag = (e: Event) => {
  let tagId = (e.target as HTMLElement).dataset.tagid
  let index = (style_cate.value.childrenTags as styleCate[]).findIndex((item:any) => item.tagId == tagId)
  let big_cates = pageRight.value!.querySelectorAll('.big_cate')
  let target = big_cates[index].getBoundingClientRect().top

  pageRight.value?.scrollTo({
    top: target - (big_cates[index] as HTMLElement).offsetHeight,
    behavior: "smooth"
  })
}

// 切换标签子类
const toggleTag = () => {
  if (timer) return
  let index = cur_tag.value
  let target = bigCateClientRects.value[index]
  let cur_scrollTop = pageRight.value!.scrollTop
  let increment = Number(target / 50)
  let top = 0

  // 方式一
  pageRight.value?.scrollTo({
    top: target - bigCates.value[index].offsetHeight,
    behavior: "smooth"
  })

  // 方式二 往下滑
  // if (target > cur_scrollTop) {
  //   timer = setInterval(() => {
  //     // pageRight.value!.clientHeight 添加滚动容器高度是考虑触底问题 
  //     let current = pageRight.value!.scrollTop + pageRight.value!.clientHeight
  //     top = current + increment
  //     if (current >= target) {
  //       top = target
  //       clearInterval(timer)
  //       timer = undefined
  //     }
  //     console.log(current, "下滚的距离", top);
  //     console.log(target);

  //     pageRight.value?.scrollTo(0, top)
  //   }, 10)
  // } else {
  //   timer = setInterval(() => {
  //     let current = pageRight.value!.scrollTop
  //     top = current - increment

  //     if (current <= target) {
  //       top = target
  //       clearInterval(timer)
  //       timer = undefined
  //     }
  //     console.log("上滚的距离", top);
  //     pageRight.value?.scrollTo(0, top)
  //   }, 10)
  // }


}


// 获取激活的样式
const getActiveStyle = (i: number) => {
  let cate: styleCate = style_cates.value[i]
  let style = {}
  if (i == cur_cate.value) {
    style = {
      color: cate.colorDeep,
      backgroundColor: cate.colorShallow,
      fontWeight: 700
    }
  }

  return style
}

// 滚动处理
const pageRightScroll = (e: Event) => {
  let scrollTop = (e.target as HTMLElement).scrollTop

  // 方式1
  // const visibleItems = bigCates.value.filter(item => {
  //   const rect = item.getBoundingClientRect();
  //   return rect.top < pageRight.value!.clientHeight && rect.bottom > 0;
  // });
  // if (visibleItems.length) {
  //   cur_tag.value = Number(visibleItems[0].dataset.index);
  // }

  // 方式2
  let list = bigCateClientRects.value.filter((item, index) => scrollTop >= item)
  cur_tag.value = list.length > 0 ? list.length - 1 : list.length

}

// 获取我的曲风偏好
const getPreference = async () => {
  preference().then(res => {
    console.log(res, "我的偏好");
    let cate: styleCate = {
      tagName: "我的",
      tagId: -1,
      enName: "My preference",
      picUrl: "",
      colorDeep: "var(--color-primary)",
      colorShallow: "var(--color-info)",
      childrenTags: res.data.tags,
      preferences: res.data.tagPreferenceVos
    }
    style_cates.value.unshift(cate)
    preference_loading.value = true
    load_status.value = false
  })


}

const getBigCates = () => {
  bigCates.value = Array.from(pageRight.value!.querySelectorAll('.big_cate'))
  bigCateClientRects.value = bigCates.value.map((item) => {
    return item.getBoundingClientRect().top - 50
  })
}

watch(() => pageRight.value, (v) => {
  if (v) {
    cur_tag.value = 0
    pageRight.value?.scrollTo({ top: 0 })
    getBigCates()
  }
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
    .my_style {
      .poster {
        position: relative;
      }

      .mask {
        @apply flex items-center justify-center text-white absolute left-0 top-0 w-full h-full text-center;
        font-size: 12px;
        background-color: rgba(#000, .3);
      }
    }

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

      .big_cate {
        padding-bottom: 5px;

        .tag_name {
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