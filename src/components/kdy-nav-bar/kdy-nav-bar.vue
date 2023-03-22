<!--
 * @Author: your name
 * @Date: 2022-03-24 17:47:16
 * @LastEditTime: 2023-03-22 22:12:54
 * @LastEditors: 可达鸭 997610780@qq.com
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \zyk-music-h5\template.vue
-->
<template>
  <div class="nav-bar">
    <div class="placeholder" :style="[{ height:tool.addUnit(height) }]" v-if="isFixed"></div>
    <div :style="[navbarStyle]" class="nav-bar-main" :class="{fixed:isFixed}">
      <div @click="backCall">
        <var-icon name="chevron-left" :size="tool.px2vw(leftIconSize)" :color="leftIconColor"/>
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
  titleIconSize?: number,//标题的大小
  titleIconColor?: string,//标题的颜色
  bold?: boolean,//标题是否加粗
  customBack?:boolean,
}>(), {
  height: 50,
  isFixed: false,
  bgcolor: "#fff",
  leftIconSize: 32,
  leftIconColor: "var(--color-text)",
  titleIconSize: 16,
  titleIconColor: "var(--color-text)",
  bold: true,
  customBack:false,
})

const emit = defineEmits(['back'])

const backCall = ()=>{
  if(props.customBack){
    emit('back')
  }else{
    router.back()
  }
}


const navbarStyle = computed(() => {
  return {
    height: tool.addUnit(props.height),
    backgroundColor: props.bgcolor
  }
})

const titleStyle = computed(() => {
  return {
    color: props.titleIconColor,
    fontSize: tool.addUnit(props.titleIconSize),
    fontWeight: props.bold ? 700 : 400,
  }
})

</script>

<style scoped lang="scss">
.nav-bar {
  &-main {
    @apply flex items-center w-full top-0 left-0 z-99;
  }
}
</style>