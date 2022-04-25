<!--
 * @Author: your name
 * @Date: 2022-03-24 19:55:28
 * @LastEditTime: 2022-04-25 10:53:25
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \zyk-music-h5\src\components\kdy-search\kdy-search.vue
-->
<template>
  <div
    class="kdy-search overflow_h text-[#333] text-16px flex items-center w-full"
    :style="searchStyle"
    @click="clickHandle"
  >
    <div class="ml-10px">
      <var-icon name="magnify" color="#dedede" :size="26" />
    </div>
    <input
      type="text"
      class="kdy-search-input ml-5px"
      autocomplete="off"
      :placeholder="placeholder"
      :style="[inputStyle]"
      :value="modelValue"
      :disabled="disabled"
    />
  </div>
</template>
<script setup lang="ts">

const kdy = useTool()

const prop = defineProps({
  // v-model 绑定值
  modelValue: {
    type: String,
    default: "",
  },
  // 是否禁用
  disabled: {
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

const emits = defineEmits(["update:modelValue", "click"])

const searchStyle = computed(() => {
  let style = {
    backgroundColor: prop.bgColor,
    height: kdy.px2vw(prop.height),
    borderRadius: prop.shape == 'shape' ? kdy.px2vw(10) : kdy.px2vw((prop.height / 2)),
  }
  return style
})

const clickHandle = () => {
  emits('click')
}



</script>

<style scoped lang="scss">
.kdy-search {
  &-input {
    width: 100%;
    height: 100%;
    background-color: transparent;
    &::placeholder {
      font-size: 16px;
      color: #ccc;
    }
  }
}
</style>