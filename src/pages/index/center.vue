<!--
 * @Author: zyk 997610780@qq.com
 * @Date: 2022-06-27 16:49:17
 * @LastEditors: zyk 997610780@qq.com
 * @LastEditTime: 2023-03-01 18:29:37
 * @FilePath: \zyk-music-h5\src\pages\index\center.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE{}
-->
<template>
  <div class="page">
    <div class="page_hd">
      <div class="flex items-center justify-between px-15px pt-10px">
        <div @click="mitt.emit('openSidebar')">
          <var-icon name="menu" :size="tool.px2vw(30)" color="var(--text-color)" />
        </div>
        <div @click="router.push('/search')">
          <var-icon name="magnify" color="var(--text-color)" :size="tool.addUnit(26)" />
        </div>
      </div>
    </div>

    <div class="page_by px-20px mt-20px">
      <!-- 用户信息 -->
      <div v-if="user" class="flex flex-col items-center ">
        <img :src="user.avatarUrl" class="w-60px h-60px rounded-1/2 relative z-2">
        <div class="bg-white min-h-90px w-full -mt-30px rounded-5px flex flex-col items-center justify-center">
          <div class="pt-20px text-[var(--text-color)] text-16px font-700">{{ user.nickname }}</div>
          <div class="flex mt-15px text-[#666] text-12px">
            <div class="data_num mr-15px">
              <span>{{ user.follows }}</span>
              <span>关注</span>
            </div>
            <div class="data_num mr-15px">
              <span>{{ user.followeds }}</span>
              <span>粉丝</span>
            </div>
            <div class="data_num">
              <span>Lv.{{ user_level }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 工具栏 -->
      <div class="flex flex-wrap bg-white mt-20px rounded-5px pt-10px">
        <div v-for="(item, index) in myTools" :key="index"
          class="flex flex-col justify-center items-center w-3/10 mb-10px">
          <var-icon color="var(--color-primary)" :name="item.iconName" namespace="kdy-icon"
            :size="tool.px2vw(24)"></var-icon>
          <span class="text-12px text-[var(--text-color)] mt-5px">{{ item.name }}</span>
        </div>
      </div>
      <!-- 喜欢的音乐 -->
      <div class="bg-white tab_item" v-ripple>
        <img :src="tool.getAssetsImages('image/default_avatar.jpg')" class="tab_item_left">
        <div class="tab_item_right">
          <div class="tab_item_name">我喜欢的音乐</div>
          <div class="tab_item_total">123首</div>
        </div>
      </div>

      <!-- 我的歌单 -->
      <div>
        <var-tabs v-model:active="tab_cur" color="transparent">
          <var-tab v-for="(item, index) in tab_list" :key="index">{{ item.name }}</var-tab>
        </var-tabs>

        <!-- 创建歌单 -->
        <div class="mt-10px px-20px">
          <div class="tab_hd">
            <span class="tab_hd_left">创建歌单(9个)</span>
            <div class="tab_hd_right">
              <var-icon name="plus" color="#999" class="mr-10px" :size="tool.addUnit(12)"/>
              <var-icon name="dots-vertical" color="#999" :size="tool.addUnit(12)"/>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import mitt from "@/assets/lib/bus";
import { myTools } from "@/enum-file/public";
import { userDetail } from "@/api/my/index";
import useUserStore from "@/store/user";
import { User } from "@/types/user";
let tab_cur = ref(0)
let tab_list = reactive([{ name: "创建歌单" }, { name: "收藏歌单" }, { name: "歌单助手" }])
const tool = useTool()
const router = useRouter()
const userStore = useUserStore()
let user_level = ref(0)
let user = ref<User | null>(null)
// 获取用户详情信息
const getUserDetail = async () => {
  let res: any = await userDetail(userStore.userId)
  console.log(res, "用户信息");
  user.value = res.profile
  user_level.value = res.level
}


getUserDetail()
</script>

<style scoped lang="scss">
.page {
  min-height: 100vh;
  background-color: #eee;
  .tab_hd{
    @apply flex justify-between items-center;
    &_left{
      color: #999;
      font-size: 12px;
    }
    &_right{

    }
  }
  .tab_item{
    @apply flex items-center ;
    margin-top: 20px;
    padding: 10px;
    border-radius: 5px;
    &_left{
      width: 50px;
      height: 50px;
      border-radius: 5px;
    }
    &_right{
      margin-left: 5px;
    }
    &_name{
      color: var(--text-color);
      font-size: 14px;
    }
    &_total{
      color: #666;
      font-size: 10px;
      margin-top: 5px;
    }
  }
  .data_num {
  position: relative;

  &::after {
    content: "";
    position: absolute;
    right: -8px;
    top: 1px;
    width: 1px;
    height: 10px;
    background-color: rgba(#666, .1);
  }

  &:last-child {
    &::after {
      display: none;
    }
  }
}
}


</style>