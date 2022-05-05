<!--
 * @Author: kdy
 * @Date: 2022-03-24 17:47:16
 * @LastEditTime: 2022-05-05 17:07:54
 * @LastEditors: Please set LastEditors
 * @Description:侧边栏
 * @FilePath: \zyk-music-h5\template.vue
-->
<template>
  <div class="sidebar">
    <var-style-provider :style-vars="styleVars">
      <var-popup position="left" v-model:show="show" @close="close" @click-overlay="clickOverlay" @open="open">
        <div class="sidebar_window px-20px py-30px h-full">
          <div class="sidebar_window_head flex items-center">
            <img class="w-30px rounded-1/2 fit_cover"
              src="https://thirdwx.qlogo.cn/mmopen/vi_32/qxJ0iaPQSWpLg1pM7JtdiaXH5t0PzyCjOC6pWQUzSgDWdoicCdicsibkJaDmUXY5p1tOhjXIKTDa2lg8ZQDwTXN7yvA/132">
            <div class="flex items-center flex-1 ml-10px text-16px text-[#333]">
              <span>kkk</span>
              <var-icon name="chevron-right" color="#333" />
            </div>
            <div>
              <var-icon namespace="kdy-icon" name="saoma" color="#333" size="20" />
            </div>
          </div>
          <div class="sidebar_window_body overflow-y-scroll h-full">
            <div class="w-8/10 mt-15px mx-auto">
              <var-button class="w-full" @click="logout"><span class="text-primary">退出登录</span></var-button>
            </div>
          </div>
        </div>
      </var-popup>
    </var-style-provider>
  </div>
</template>
<script setup lang="ts">
import { Dialog } from '@varlet/ui'
let prop = defineProps({
  show: {
    type: Boolean,
    required: true
  }
})
let emit = defineEmits(['update:show', 'close', 'click-overlay', 'open'])
const styleVars = {
  '--popup-content-background-color': '#f8f8f8'
}
let router = useRouter()
// 关闭弹层
const close = () => {
  emit('update:show', false)
  emit('close')
}

// 点击遮罩层
const clickOverlay = () => {
  emit('update:show', false)
  emit('click-overlay')
}

// 弹层打开时触发
const open = () => {
  emit('open')
}

// 退出登录
const logout = () => {
  Dialog({
    title: "",
    message: `确定要退出${import.meta.env.VITE_APP_TITLE}吗？`,
    cancelButtonTextColor: "#666",
    onConfirm: () => {
      router.replace({ path: "/login" })
    },
    onCancel: () => {
    }
  })
}


</script>

<style scoped lang="scss">
.sidebar {
  &_window {
    width: 300px;
  }
}
</style>