<!--
 * @Author: 
 * @Date: 2022-03-27 14:37:16
 * @LastEditTime: 2023-02-20 18:16:31
 * @LastEditors: zyk 997610780@qq.com
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \zyk-music-h5\src\components\kdy-transition\kdy-transition.vue
-->
<template>
  <transition
    mode="out-in"
    :class="`animate-delay-${delay}ms`"
    :duration="duration"
    :enter-active-class="`animate-animated ${enterClass}`"
    :leave-active-class="`animate-animated ${leaveClass}`"
    :appearance="appearance"
    :appear-active-class="`animate-animated ${appearClass}`"
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
  },
  appearClass: {
    type: String,
    default: "animate-fadeIn" // animate-bounceOut
  },
  delay:{
    type:[Number,String],
    default:0
  },
  appearance:{
    type:Boolean,
    default:false
  }

})

</script>

<style scoped lang="scss"></style>