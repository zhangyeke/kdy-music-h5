<!--
 * @Author: 
 * @Date: 2022-03-27 14:37:16
 * @LastEditTime: 2022-03-31 23:51:22
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \zyk-music-h5\src\components\kdy-transition\kdy-transition.vue
-->
<template>
  <transition
    mode="out-in"
    :duration="duration"
    :enter-active-class="`animate-animated ${enterClass}`"
    :leave-active-class="`animate-animated ${leaveClass}`"
  >
    <slot></slot>
  </transition>
</template>
<script setup lang="ts">
let prop = defineProps({
  duration:{
    type:Number,
  },
  enterClass: {
    type: String,
    default: "animate-fadeIn" //animate-bounceIn
  },
  leaveClass: {
    type: String,
    default: "animate-fadeOut" // animate-bounceOut
  }
})

</script>

<style scoped lang="scss"></style>