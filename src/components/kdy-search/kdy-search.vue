<!--
 * @Author: your name
 * @Date: 2022-03-24 19:55:28
 * @LastEditTime: 2022-03-24 21:28:42
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \zyk-music-h5\src\components\kdy-search\kdy-search.vue
-->
<template>
  <div>
    <input type="text"  :placeholder="placeholder" :style="searchStyle"/>
  </div>
</template>
<script setup lang="ts">

const kdy = getCurrentInstance()?.appContext.config.globalProperties.$kdy
console.log(kdy,"app实例");


const prop = defineProps({
  modelValue: {
    type: String,
    default: "",
  },
  disable: {
    type: Boolean,
    default: false,
  },
  height: {
    type: [String, Number],
    default: 80
  },
  bgColor: {
    type: String,
    default: "#fff"
  },
  placeholder: {
    type: String,
    default: "请输入关键词"
  }
})


const searchStyle = computed(() => {
  let style = {
    backgroundColor: prop.bgColor,
    height:kdy.px2vw(prop.height)
  }
  return style
})
</script>

<style scoped lang="scss"></style>