<!--
 * @Author: your name
 * @Date: 2022-03-24 19:55:28
 * @LastEditTime: 2023-03-07 14:47:21
 * @LastEditors: zyk 997610780@qq.com
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \zyk-music-h5\src\components\kdy-search\kdy-search.vue
-->
<template>
  <div class="kdy-search overflow_h flex items-center w-full" :style="searchStyle" @click="clickHandle"
  @keydown.enter="enter">
    <div class="ml-10px">
      <var-icon name="magnify" color="#dedede" :size="kdy.addUnit(iconSize)" />
    </div>
    <input
       ref="inputEl"
      :autofocus="autofocus" type="text" class="kdy-search-input ml-5px" autocomplete="off" :value="modelValue"
      :placeholder="placeholder" :style="[inputStyle]" :disabled="disabled" @input="input" @blur="blur" @focus="focus" />
  </div>
</template>
<script setup lang="ts">

const kdy = useTool()

const prop = defineProps({
  // v-model 绑定值
  modelValue: {
    type: String,
  },
  // 是否禁用
  disabled: {
    type: Boolean,
    default: false,
  },
  iconSize: {
    type: [Number, String],
    default: 26
  },
  // 高度
  height: {
    type: Number,
    default: 30
  },
  // 字体大小
  fontSize: {
    type: [Number, String],
    default: 16
  },
  // 字体颜色
  color: {
    type: String,
    default: "var(--color-text)"
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

let inputEl = ref<HTMLInputElement | null>(null)

const emits = defineEmits(["update:modelValue", "click", "input", "focus", "blur", "enter"])

const autofocus = computed(()=>{
  return prop.disabled? false : true
})

watch(()=>autofocus.value,(v)=>{
  nextTick(()=>{
    v && inputEl.value?.focus()
  })
})


const searchStyle = computed(() => {
  let style = {
    backgroundColor: prop.bgColor,
    height: kdy.px2vw(prop.height),
    borderRadius: prop.shape == 'shape' ? kdy.px2vw(10) : kdy.px2vw((prop.height / 2)),
    fontSize: kdy.addUnit(prop.fontSize),
    color: prop.color,
  }
  return style
})
const input = (e: Event) => {
  let value = (e.target as HTMLInputElement).value
  emits('update:modelValue', value)
  emits('input', value)
}

const enter = () => {
  emits('enter',prop.modelValue)
}

const focus = () => {
  emits('focus')
}

const blur = () => {
  emits('blur')
}


const clickHandle = () => {
  if (prop.disabled) emits('click')
}



</script>

<style scoped lang="scss">
.kdy-search {
  &-input {
    width: 100%;
    height: 100%;
    background-color: transparent;

    &::placeholder {
      color: #ccc;
    }
  }
}
</style>