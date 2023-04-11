<!--
 * @Author: your name
 * @Date: 2022-03-24 17:47:16
 * @LastEditTime: 2023-04-11 14:37:41
 * @LastEditors: zyk 997610780@qq.com
 * @Description: 空数据占位符
 * @FilePath: \zyk-music-h5\template.vue
-->
<template>
  <div :style="{marginTop:tool.addUnit(marginTop)}" class="flex items-center justify-center">
    <var-loading type="wave" v-if="loading" :description="loadingText"/>
    <!-- <var-icon namespace="kdy-icon" :name="src" :size="tool.addUnit(size)" color="var(--color-primary)"></var-icon> -->
    <var-image v-else-if="!$slots.default" :src="tool.getAssetsImages('image/data_empty.png')" :width="size"></var-image>

    <slot v-else></slot>

  </div>
</template>
<script setup lang="ts">
const tool = useTool()

const props = defineProps({
  src:{
    type:String,
    default:'liebiaoweikong'
  },
  size:{
    type:[String,Number],
    default:128
  },
  marginTop:{
    type:[String,Number],
    default:50
  },
  loading:{
    type:Boolean,
    default:false,
  },
  loadingText:{
    type:String,
    default:"加载中"
  }
})
</script>

<style scoped lang="scss"></style>