<!--
 * @Author: your name
 * @Date: 2022-03-24 17:47:16
 * @LastEditTime: 2022-06-06 17:34:17
 * @LastEditors: [you name]
 * @Description: 页面头部组件 -适用于 歌手详情 我的 用户详情头部
 * @FilePath: \zyk-music-h5\template.vue
-->
<template>
  <div class="kdy-header">
    <div class="kdy-header-top relative">
      <div class="absolute">
        <var-button round text color="transparent" text-color="#fff" @click="router.back()">
          <var-icon name="chevron-left" :size="tool.px2vw(30)" />
        </var-button>
      </div>
      <img :src="bgImgSrc" class="w-full">
    </div>

    <div class="kdy-header-bottom mx-20px flex flex-col items-center py-10px bg-white rounded-10px text-[#666] text-13px font-500">
      <slot name="bottom"></slot>
    </div>
  </div>
</template>
<script setup lang="ts">
let prop = defineProps({
  userInfo:{
    type:Object,
    required:true,
  },
  other:{
    type:Object,
    default: () => { }
  },
  //背景图路径
  bgImgSrc:{
    type:String,
    required:true,
  },
})

let router = useRouter()
let tool = useTool()

</script>

<style scoped lang="scss">
  .kdy-header{
    &-bottom{
      transform: translateY(-15px);
    }
  }
</style>