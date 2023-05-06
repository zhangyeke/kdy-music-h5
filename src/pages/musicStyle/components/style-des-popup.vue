<!--
  * @Author: your name
 * @Date: 2022-03-24 17:47:16
 * @LastEditTime: 2023-03-06 12:15:13
 * @LastEditors: zyk 997610780@qq.com
  * @Description: 曲风介绍弹窗
  * @FilePath: \zyk-music-h5\template.vue
-->
<template>
  <div>
    <KdyTransition enter-class="animate-bounceInUp" leave-class="animate-zoomOut">
      <div class="popup min-h-100vh w-100vw fixed left-0 top-0 z-100" v-if="modelValue">
        <div class="popup_bg" :style="{ backgroundImage: `url(${detail!.cover[0]})` }"></div>
        <div class="relative z-11">
          <div class="flex justify-end mt-10px px-15px" @click="emit('update:modelValue', false)">
            <var-icon name="window-close" color="#fff" size="18" />
          </div>
          <div class="flex flex-col items-center mt-20px">
            <img :src="detail!.cover[0]" class="w-200px h-200px rounded-10px object-cover">
            <span class="text-white text-16px font-700 mt-15px">{{ detail!.name }}</span>
            <span class="text-[#ddd] text-12px mt-5px">{{ detail!.enName }}</span>
          </div>

          <div class="px-25px mt-10px text-white">
            <div v-html="detail!.desc" class="text-[#eee] text-14px leading-30px mt-20px">

            </div>
          </div>
        </div>

      </div>
    </KdyTransition>

  </div>
</template>
<script setup lang="ts">
import { songStyle } from "@/types/song-style";
const props = withDefaults(defineProps<{
  modelValue: boolean
  detail: songStyle | null,
}>(), {

})

const emit = defineEmits(['update:modelValue',])


</script>

<style scoped lang="scss">
.popup {
  overflow: hidden auto;

  &_bg {
    @apply absolute left-0 top-0 z-1 w-full h-full;
    background-size: 150% 150%;
    background-position: left  center;

    &::after {
      content: "";
      @apply absolute left-0 top-0 w-full h-full;
      backdrop-filter: blur(20px);
    }
  }

}
</style>

