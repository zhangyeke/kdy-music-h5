<!--
 * @Author: your name
 * @Date: 2022-03-24 17:47:16
 * @LastEditTime: 2023-03-23 17:14:44
 * @LastEditors: zyk 997610780@qq.com
 * @Description: 头部导航栏
 * @FilePath: \zyk-music-h5\template.vue
-->
<template>
  <div class="nav-bar">
    <div class="placeholder" :style="[{ height: tool.addUnit(height) }]" v-if="!immerse && isFixed"></div>
    <div :style="[navbarStyle]" class="nav-bar-main" :class="{ fixed: isFixed }">
      <div @click="backCall">
        <var-icon name="chevron-left" :size="tool.px2vw(leftIconSize)" :color="leftIconColor" />
      </div>
      <div :style="[titleStyle]" v-if="title">{{ title }}</div>
      <div class="flex-1">
        <slot name="default"></slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

let tool = useTool()
let router = useRouter()
let slot = useSlots()

let props = withDefaults(defineProps<{
  height?: string | number,//组件高度
  title?: string | unknown,//navbar的标题
  isFixed?: boolean,//是否固定在顶部
  bgcolor?: string,//背景颜色
  leftIconSize?: number,//左边图标的大小
  leftIconColor?: string,//左边图标的颜色
  titleSize?: number,//标题的大小
  titleColor?: string,//标题的颜色
  bold?: boolean,//标题是否加粗
  customBack?: boolean,
  immerse?: boolean,//沉浸式--没有占位盒子
  sticky?: boolean,//开始粘性定位,
  screenTop?: number,//滚动top值才显示导航栏
  top?: number,//距离页面顶部的距离
  scrollY?:number,
}>(), {
  height: 50,
  isFixed: false,
  bgcolor: "#fff",
  leftIconSize: 32,
  leftIconColor: "var(--color-text)",
  titleSize: 16,
  titleColor: "var(--color-text)",
  bold: true,
  customBack: false,
  immerse: false,
  sticky: false,
  screenTop: 0,
  top: 0,
  scrollY:0
})

const emit = defineEmits(['back'])
// 透明度
const progress = computed(() => {
  return parseFloat((props.scrollY / props.screenTop).toFixed(2))
})

const backCall = () => {
  if (props.customBack) {
    emit('back')
  } else {
    router.back()
  }
}


const navbarStyle = computed(() => {
  return {
    height: tool.addUnit(props.height),
    backgroundColor: props.bgcolor,
    top: tool.addUnit(props.top),
    opacity: props.sticky ? progress.value : 1
  }
})

const titleStyle = computed(() => {
  return {
    color: props.titleColor,
    fontSize: tool.addUnit(props.titleSize),
    fontWeight: props.bold ? 700 : 400,
  }
})

</script>

<style scoped lang="scss">
.nav-bar {
  &-main {
    @apply flex items-center w-full left-0 z-99;
  }
}
</style>