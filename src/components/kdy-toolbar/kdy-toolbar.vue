<!--
 * @Author: your name
 * @Date: 2022-03-24 17:47:16
 * @LastEditTime: 2023-02-20 16:33:06
 * @LastEditors: zyk 997610780@qq.com
 * @Description: 工具栏
 * @FilePath: \zyk-music-h5\template.vue var-icon
-->
<template>
  <div class="tools" :style="[toolsStyle]" :class="{shadow}">
    <div class="tools_item" :style="[toolsImteStyle]"  v-for="(item, index) in tools" :key="index" @click="clickHandle(index)">
      <var-icon :name="item.iconName" :namespace="item.namespace" :color="color" :size="tool.addUnit(iconSize)" transition="200"/>
        <span class="tools_item_text">{{ isUnit ? tool.numFormat(item.text as number) : item.text }}</span>
    </div>
  </div>

</template>
<script setup lang="ts">
import {ToolBar} from "@/types/public"

let tool = useTool()
const props = withDefaults(defineProps<{
  tools: Array<ToolBar>,
  height?: string | number,
  shadow?: boolean,
  color?: string,
  iconSize?: string | number,
  textSize?: string | number,
  bold?: boolean,
  radius?: string | number,
  width?: string | number,
  bgColor?: string,
  isUnit?:boolean,
}>(), {
  height: 40,
  shadow: true,
  color: "var(--color-text)",
  iconSize: 14,
  textSize: 14,
  bold: true,
  radius: 20,
  width: "70%",
  bgColor: "#fff",
  isUnit:true
})

const emit = defineEmits(['click'])

const toolsStyle = computed(() => {
  return {
    minWidth: tool.addUnit(props.width),
    borderRadius: tool.addUnit(props.radius),
    backgroundColor: props.bgColor,
    height: tool.addUnit(props.height)
  }
})


const toolsImteStyle = computed(() => {
  return {
    fontWeight: props.bold ? 700 : 400,
    color: props.color,
    fontSize: tool.addUnit(props.textSize)
  }
})

const clickHandle = (i:number)=>{
  emit('click',i)
}

</script>

<style scoped lang="scss">
.tools {
  @apply flex items-center justify-around ;
  width: fit-content;
  inset-inline: 1rem;
  margin-inline: auto;
  margin: 0 auto;
  &_item {
    @apply flex items-center;
    &.shadow {
      box-shadow: 0 1px 5px #ccc;
    }

    &_text {
      margin-left: 5px;
    }
  }

}
</style>