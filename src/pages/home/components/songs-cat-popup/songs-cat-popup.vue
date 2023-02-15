<!--
 * @Author: your name
 * @Date: 2022-03-24 17:47:16
 * @LastEditTime: 2023-02-15 11:30:52
 * @LastEditors: zyk 997610780@qq.com
 * @Description: 歌单分类弹窗
 * @FilePath: \zyk-music-h5\template.vue
-->
<template>
  <div>
    <var-popup :show="show" :default-style="false" @close="close" @click-overlay="close" position="bottom">
      <div class="popup text-center bg-white">
        <div class="font-700 text-18px py-15px" :class="[`text-[${color}]`]">{{ title }}</div>
        <div class="px-20px bg-whi" @click.capture="changeHandle">
          <div class="cat_item" :style="isActive('全部') ? activeStyle : commonStyle" data-index="-1">全部</div>
          <div class="flex justify-around flex-wrap">
            <div class="cat_item" :style="isActive(item) ? activeStyle : commonStyle" :data-index="index"
              v-for="(item, index) in list" :key="index">{{ item }}</div>
          </div>
        </div>
      </div>
    </var-popup>
  </div>
</template>
<script setup lang="ts">
import { StyleHTMLAttributes } from 'vue';

const props = withDefaults(defineProps<{
  title?: string,
  list: Array<string>
  show: boolean,
  color?: string,
  activeColor?: string,
  bgColor?: string,
  activeBgColor?: string,
  current?: string | number
}>(), {
  title: "所有精品歌单",
  color: "var(--color-text)",
  activeColor: "#fff",
  bgColor: "#f2f2f2",
  activeBgColor: "var(--color-primary)"
})


const emit = defineEmits(['update:show', 'close', 'change'])

const isActive = (v: number | string) => {
  return props.current == v
}

const commonStyle = computed(() => {

  return {
    color: props.color,
    backgroundColor: props.bgColor
  }
})

const activeStyle = computed(() => {
  return {
    color: props.activeColor,
    backgroundColor: props.activeBgColor
  }
})

const changeHandle = (e: MouseEvent) => {
  let index = (e.target as HTMLElement).dataset.index
  emit('change', index)
  emit('update:show', false)
}

const close = () => {
  emit('update:show', false)
  emit('close')
}
</script>

<style scoped lang="scss">
.popup {
  border-radius: 20px 20px 0 0;

  .cat_item {
    height: 40px;
    font-size: 14px;
    line-height: 40px;
    border-radius: 20px;
    padding: 0 25px;
    margin-bottom: 10px;
  }
}
</style>