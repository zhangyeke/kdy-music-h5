<!--
 * @Author: your name
 * @Date: 2022-03-24 17:47:16
 * @LastEditTime: 2023-03-10 23:34:10
 * @LastEditors: 可达鸭 997610780@qq.com
 * @Description: 动作面板
 * @FilePath: \zyk-music-h5\template.vue
-->
<template>
  <var-popup position="bottom" :show="show" :default-style="false" teleport="body" @close="close" @click-overlay="close"
    :close-on-click-overlay="maskClickOverlay">
    <div class="bg-white rounded-tl-10px rounded-tr-10px">
      <div class="border-b-1px p-15px text-[#666] text-16px">
        {{ title }}
      </div>
      <div class="text-14px" :class="[`text-[${color}]`]">
        <div class="flex items-center py-10px px-15px " v-ripple v-for="(item, index) in actions" :key="index"
          @click="selectHandle(index)">
          <var-icon :color="item.color ? item.color : color" :namespace="item.namespace ? item.namespace : 'var-icon'"
            :name="item.icon" :size="tool.addUnit(22)" />
          <span class="ml-10px">{{ item.name }}</span>
        </div>
      </div>
    </div>
  </var-popup>
</template>
<script setup lang="ts">
import {ActionItem} from "@/types/public";

const props = withDefaults(defineProps<{
  show: boolean,
  // 组件挂载的位置
  teleport?: string,
  title?: string,
  actions: Array<ActionItem>,
  // 选项的整体颜色
  color?: string,
  // 遮罩层是否可以点击
  maskClickOverlay?: boolean,
}>(), {
  teleport: "body",
  title: "",
  color: "#666",
  maskClickOverlay: true
})
const tool = useTool()
const emit = defineEmits(['select', 'update:show', 'close'])


const close = () => {
  emit('update:show', false)
  emit('close')
}

const selectHandle = (i: number) => {
  emit('select', i)
  emit('update:show', false)
}
</script>

<style scoped lang="scss"></style>