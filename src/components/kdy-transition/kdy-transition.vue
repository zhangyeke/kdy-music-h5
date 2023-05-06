<!--
 * @Author: 
 * @Date: 2022-03-27 14:37:16
 * @LastEditTime: 2023-03-27 22:56:26
 * @LastEditors: 可达鸭 997610780@qq.com
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \zyk-music-h5\src\components\kdy-transition\kdy-transition.vue
-->
<template>
  <!-- :class="[delay ? `animate-delay-${delay}ms` : '', duration ? `animate-duration-${duration}` : '']" -->
  <transition :mode="mode"
    :enter-active-class="`animate-animated ${enterClass}`" :leave-active-class="`animate-animated ${leaveClass}`"
    :appearance="appearance" :appear-active-class="`animate-animated ${appearClass}`">
    <slot></slot>
  </transition>
</template>
<script setup lang="ts">
const props = withDefaults(defineProps<{
  mode?: 'in-out' | 'out-in' | 'default',
  enterClass?: string
  leaveClass?: string
  appearance?: boolean
  appearClass?: string,
  delay?: number | string,//单位毫秒
  duration?: number | string,//单位毫秒

}>(), {
  mode: 'out-in',
  enterClass: "animate-fadeIn",
  leaveClass: "animate-fadeOut",
  appearance: false,
  appearClass: "animate-fadeIn",
  delay: 0,

})

</script>

<style scoped lang="scss"></style>