<!--
 * @Author: your name
 * @Date: 2022-03-24 17:47:16
 * @LastEditTime: 2023-02-10 10:36:05
 * @LastEditors: zyk 997610780@qq.com
 * @Description: 歌曲歌单展示
 * @FilePath: \zyk-music-h5\template.vue
-->
<template>
  <div class="kdy-song" @click="clickHandle">
    <var-image :width="tool.addUnit(width)" :radius="tool.addUnit(radius)" :hieght="tool.addUnit(height)" :lazy="true"
      :src="cover" />
    <div class="kdy-song-name" :style="{width:tool.addUnit(width)}" :class="[nameLine > 1 ? `truncate_${nameLine}` : 'truncate']">{{ name }}</div>
    <div class="kdy-song-play-count" v-if="playCount">
      <var-icon namespace="kdy-icon" name="bofang" :size="tool.px2vw(10)" color="#fff" />
      <span class="ml-3px">{{ tool.numFormat(playCount) }}</span>
    </div>

  </div>
</template>
<script setup lang="ts">
let props = defineProps({
  name: {
    type: String,
    required: true
  },
  //封面
  cover: {
    type: String,
    required: true
  },
  playCount: {
    type: [Number,String],
    default: 0
  },
  width: {
    type: [Number, String],
    default: 100
  },
  height: {
    type: [Number, String],
    default: 100

  },
  //名称显示的行数
  nameLine: {
    type: Number,
    default: 1
  },
  //圆角
  radius: {
    type: [Number, String],
    default: 10
  },
})

let tool = useTool()
let emit = defineEmits(['click'])

const clickHandle = ()=>{
  emit('click')
}


</script>

<style scoped lang="scss">
.kdy-song {
  position: relative;
  font-size: 12px;

  &-name {
    margin-top: 5px;
    color: var(--color-text);
    font-weight: 500;
  }

  &-play-count {
    display: flex;
    align-items: center;
    position: absolute;
    color: #fff;
    right: 5px;
    top: 5px;
    background-color: rgba(#000000, .7);
    padding: 2px 8px;
    border-radius: 20px;
  }
}
</style>