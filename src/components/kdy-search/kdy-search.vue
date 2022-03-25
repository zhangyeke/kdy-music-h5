<!--
 * @Author: your name
 * @Date: 2022-03-24 19:55:28
 * @LastEditTime: 2022-03-25 17:56:26
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \zyk-music-h5\src\components\kdy-search\kdy-search.vue
-->
<template>
  <div class="kdy-search" :style="searchStyle">
    <var-icon name="magnify" color="#dedede" :size="26"/>
    <input
      type="text"
      class="kdy-search-input"
      autocomplete="off"
      :placeholder="placeholder"
      :style="[inputStyle]"
    />
  </div>
</template>
<script setup lang="ts">

const kdy = getCurrentInstance()?.appContext.config.globalProperties.$kdy

const prop = defineProps({
  // v-model 绑定值
  modelValue: {
    type: String,
    default: "",
  },
  // 是否禁用
  disable: {
    type: Boolean,
    default: false,
  },
  // 高度
  height: {
    type: Number,
    default: 30
  },
  // 背景颜色
  bgColor: {
    type: String,
    default: "#fff"
  },
  // 提示占位字
  placeholder: {
    type: String,
    default: "请输入关键词"
  },
  // 输入框的自定义样式
  inputStyle: {
    type: Object,
    default: null,
  },
  // 形状类型  方形：shape  半圆：round
  shape: {
    type: String,
    default: "round"
  },

})

const emits = [""]

const searchStyle = computed(() => {
  let style = {
    backgroundColor: prop.bgColor,
    height: kdy.px2vw(prop.height),
    borderRadius: prop.shape == 'shape' ? kdy.px2vw(10) : kdy.px2vw((prop.height / 2)),
  }
  return style
})



</script>

<style scoped lang="scss">
.kdy-search {
  overflow: hidden;
  &-input {
    width: 100%;
    height: 100%;
    padding-left: 40px;
  }
}
</style>