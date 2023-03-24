<!--
 * @Author:kkk
 * @Date: 2022-03-24 17:47:16
 * @LastEditTime: 2023-03-24 16:18:52
 * @LastEditors: zyk 997610780@qq.com
 * @Description: 用户主页
 * @FilePath: \zyk-music-h5\template.vue
-->
<template>
  <div class="page">
    <div v-if="user" class="page_hd" :style="{ backgroundImage: `url(${user.profile.backgroundUrl})` }">
        <div class="flex items-center  justify-between pt-10px">
          <var-icon name="chevron-left" :size="tool.px2vw(30)" color="#fff" />
          <var-icon namespace="kdy-icon" name="androidgengduo" :size="tool.px2vw(26)" color="#fff" />
        </div>
    </div>

    <div class="page_by px-15px">
      <div class="user bg-white flex flex-col items-center justify-center rounded-10px">
          <div class="user_avatar bg-white w-60px h-60px rounded-1/2 overflow-hidden">
            <img :src="user?.profile.avatarUrl" class="w-full h-full object-fit"/>
          </div>
          <div>{{ user?.profile.nickname }}</div>
      </div>

    </div>


  </div>
</template>
<script setup lang="ts">
import { userDetail } from "@/api/my/index";
import { User } from "@/types/user";

interface UserDetail {
  profile: User,
  [key: string]: any
}
const tool = useTool()
const route = useRoute()

const user_id = route.params.id as string

let user = ref<UserDetail | null>(null)

const getUserDetail = async () => {
  let res: any = await userDetail(user_id)
  user.value = res
  console.log(user, "用户详情");
}

getUserDetail()
</script>

<style scoped lang="scss">
.page{
  &_hd{
    height: 300px;
    background-size: 100% 100%;
    background-position: center;
  }
  &_by{
    transform: translateY(-20px);
    .user{
      &_avatar{
        transform: translateY(-30px);
      }
    }
  }
}

</style>