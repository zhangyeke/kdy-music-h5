<!--
 * @Author: kdy
 * @Date: 2022-03-24 17:47:16
 * @LastEditTime: 2023-02-17 12:31:03
 * @LastEditors: zyk 997610780@qq.com
 * @Description:侧边栏
 * @FilePath: \zyk-music-h5\template.vue
-->
<template>
  <div class="sidebar" >
    <var-style-provider :style-vars="styleVars">
      <var-popup position="left" :show="show" @close="close" @click-overlay="clickOverlay" @open="open">
        <div class="sidebar_window px-20px py-30px w-300px">
          <div class="sidebar_window_head flex items-center justify-between">
            <div class="flex items-center" v-if="userStore.token">
              <img class="w-30px rounded-1/2 fit_cover"
                :src="userStore.userInfo.avatarUrl ? userStore.userInfo.avatarUrl : tool.getAssetsImages('/image/default_avatar.jpg')">
              <div class="flex items-center flex-1 ml-10px text-14px text-[#333]">
                <span>{{ userStore.userInfo.nickname ? userStore.userInfo.nickname : userStore.userInfo.userName}}</span>
                <var-icon name="chevron-right" color="#333" />
              </div>
            </div>
            <div class="flex items-center" v-else @click="router.push({ path: '/login' })">
              <img class="w-30px rounded-1/2 fit_cover" :src="tool.getAssetsImages('/image/default_avatar.jpg')">
              <div class="flex items-center flex-1 ml-10px text-14px text-[#333]">
                <span>立即登录</span>
                <var-icon name="chevron-right" color="#333" />
              </div>
            </div>
            <!-- 扫码 -->
            <div>
              <var-icon namespace="kdy-icon" name="saoma1" color="#333" size="20" />
            </div>
          </div>
          <div class="sidebar_window_body overflow-y-scroll h-full" v-if="userStore.token">
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
import { Dialog } from '@varlet/ui';
import useUserStore from "@/store/user";
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
let userStore = useUserStore()
let tool = useTool()

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
      userStore.logout().then(_ => {
        tool.toast({ type: 'success', content: "退出成功!" })
        setTimeout(() => {
          router.replace({ path: "/login" })
        }, 1500);
      })
    },
    onCancel: () => {
    }
  })
}


</script>

<style scoped lang="scss">

</style>