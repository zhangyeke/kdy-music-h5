<!--
 * @Author: kdy
 * @Date: 322-03-24 17:47:16
 * @LastEditTime: 2023-03-21 21:40:43
 * @LastEditors: 可达鸭 997610780@qq.com
 * @Description:侧边栏
 * @FilePath: \zyk-music-h5\template.vue
-->
<template>
  <var-popup position="left" :show="show" @close="close" @click-overlay="clickOverlay" @open="open">
    <div class="sidebar px-20px py-30px w-300px h-100vh">

      <div class="sidebar_hd" @click="clickSidebarHd">
        <template v-if="userStore.token">
          <div class="avatar">
            <var-image width="100%" height="100%" object="cover" radius="50%"
              :src="userStore.userInfo.avatarUrl"></var-image>
          </div>
          <div class="user_name">{{ userStore.userInfo.nickname ? userStore.userInfo.nickname : userStore.userInfo.userName }}</div>

          <div class="">
            <var-chip plain type="primary" :round="false" size="mini" class="mr-5px">
              <span>{{ tool.timeFormat(userStore.userInfo.birthday, 'YYYY').substring(2, 3) }}0后</span>
            </var-chip>
            <var-chip plain type="primary" :round="false" size="mini">{{
              constellations[tool.timeFormat(userStore.userInfo.birthday, 'YYYY-M').split('-')[1] - 1].name }}</var-chip>
          </div>
        </template>
        <template v-else>
          <div class="avatar">
            <var-image width="100%" height="100%" object="cover" radius="50%"
              :src="tool.getAssetsImages('image/default_avatar.jpg')"></var-image>
          </div>
          <div class="user_name">未登录</div>
        </template>
      </div>
      <div class="sidebar_by">
        <div class="cell" v-for="(item, index) in cell_list" :key="index" v-ripple @click="cellClick(item)" >
          <span>{{ item.name }}</span>
          <var-icon name="chevron-right" />
        </div>
        <div class="w-8/10 mt-15px mx-auto" v-show="userStore.token">
          <var-button class="w-full" @click="logout"><span class="text-[var(--color-danger)]">退出登录</span></var-button>
        </div>
      </div>
      <div class="sidebar_ft text-12px absolute bottom-50px" >
        <div class="flex items-center  text-[#ddd] leading-20px">
          <span>喜欢这个项目吗？帮助我拯救流浪猫和狗，就在GitHub和Gitee上点一下Star吧！</span>
          <!-- <var-icon name="star" color="#eac54f" :size="tool.px2vw(16)"/> -->
        </div>
        <div class="flex items-center justify-center">
          <var-icon name="github" :size="tool.px2vw(34)" class="mr-10px" @click="jumpStar('https://github.com/zhangyeke/kdy-music-h5.git')"/>
          <var-icon name="mayun" namespace="kdy-icon" :size="tool.px2vw(28)" @click="jumpStar('https://gitee.com/zhang-yeke/zyk-music-h5.git')"/>
          <!-- <span></span> -->
        </div>
        <div class="flex items-center">
          <!-- <span></span> -->
        </div>
      </div>
    </div>
  </var-popup>
</template>
<script setup lang="ts">
import constellations from "@/enum-file/constellation.json";
import { Dialog } from '@varlet/ui';
import useUserStore from "@/store/user";
let prop = defineProps({
  show: {
    type: Boolean,
    required: true
  }
})
let emit = defineEmits(['update:show', 'close', 'click-overlay', 'open'])

let router = useRouter()
let userStore = useUserStore()
let tool = useTool()
let cell_list = reactive([
  {
    name: "每日推荐",
    url: "/everyDayRmd",
  },
  {
    name: "我的歌单",
    url: {
      name:"userPlaylist",
      params:{
        nickname:userStore.token ? userStore.userInfo.nickname || userStore.userInfo.userName : "",
        id:userStore.token ? userStore.userId : 0,
        type:0
      }
    }
  },
  {
    name: "我的好友",
    url: "/goodFriend",
  },
  {
    name: "我的收藏",
    url: "/collect",
  },
  {
    name: "分享" + import.meta.env.VITE_APP_TITLE,
  }
])

const jumpStar = (url:string)=>{
  close()
  window.open(url, '_blank');
}

const cellClick = <P>(item: { name: string, url?: string | P }) => {
  close()
  if (item.url) {
    router.push(item.url)
  } else {
    tool.share({
      desc: "发现和分享新的音乐体验",
      title:import.meta.env.VITE_APP_TITLE,
      link:location.origin,
    })
  }

}

const clickSidebarHd = () => {
  close()
  if (userStore.token) {
    router.push({ name: "userDetail", params: { id: userStore.userId } })
  } else {
    router.push({ path: '/login' })
  }
}


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
        close()
        tool.toast({ type: 'success', content: "退出成功!" })
        setTimeout(() => {
          router.push("/login" )
        }, 1500);
      })
    },
    onCancel: () => {
    }
  })
}


</script>

<style scoped lang="scss">
.sidebar {
  background: url(@/assets/image/side_bg.jpg) no-repeat center/cover;
  @apply bg-white text-white;

  &_hd {
    @apply flex items-center flex-col;

    .avatar {
      width: 80px;
      height: 80px;
    }

    .user_name {
      font-size: 14px;
      margin-top: 5px;
    }
  }

  &_by {
    margin-top: 10px;
  }

  .cell {
    @apply flex justify-between items-center border-b;
    padding: 5px 0;
    font-size: 16px;
    margin-bottom: 10px;
  }
}
</style>