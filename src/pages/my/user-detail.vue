<!--
 * @Author:kkk
 * @Date: 2022-03-24 17:47:16
 * @LastEditTime: 2023-03-27 17:49:57
 * @LastEditors: zyk 997610780@qq.com
 * @Description: 用户主页
 * @FilePath: \zyk-music-h5\template.vue
-->
<template>
  <div class="page">
    <div v-if="user" class="page_hd" :style="{ backgroundImage: `url(${user.profile.backgroundUrl})` }">
      <div class="flex items-center  justify-between pt-10px">
        <var-icon name="chevron-left" :size="tool.px2vw(30)" color="#fff" @click="router.back" />
        <var-icon namespace="kdy-icon" name="androidgengduo" :size="tool.px2vw(26)" color="#fff" />
      </div>
    </div>

    <div class="page_by px-15px -mt-20px">
      <div class="user bg-white flex flex-col items-center justify-center rounded-10px pb-10px" v-if="user">
        <div class="relative -mt-30px w-60px h-60px rounded-1/2 overflow-hidden bg-white">
          <img :src="user.profile.avatarUrl" class="w-full h-full object-fit  " />
        </div>
        <div class="font-700 text-18px text-[var(--color-text)] mt-7px flex items-center">
          <span>{{ user.profile.nickname }}</span>
          <var-icon namespace="kdy-icon" name="VIP" :size="tool.px2vw(26)" color="var(--color-primary)"></var-icon>
        </div>

        <div class="flex mt-7px text-[#666] text-12px">
          <div class="data_num mr-15px">
            <span>{{ user.profile.follows }}</span>
            <span>关注</span>
          </div>
          <div class="data_num mr-15px">
            <span>{{ user.profile.followeds }}</span>
            <span>粉丝</span>
          </div>
          <div class="data_num">
            <span>Lv.{{ user.level }}</span>
          </div>
        </div>

        <div class="">
          <var-chip plain type="primary" :round="false" size="mini" class="mr-5px">归属地:{{ tool.getAddress(user.profile.province)
          }}</var-chip>
          <var-chip plain type="primary" :round="false" size="mini" class="mr-5px">
            <span>{{ tool.timeFormat(user.profile.birthday, 'YYYY').substring(2, 3) }}0后</span>
          </var-chip>
          <var-chip plain type="primary" :round="false" size="mini">{{
            constellations[tool.timeFormat(user.profile.birthday, 'YYYY-M').split('-')[1] - 1].name }}</var-chip>
        </div>

        <div>
          <kdy-followed-btn v-model="(user.profile.followed as boolean)"  :type="user.profile.followed? 'default' : 'primary'" size="small" :user-id="user.profile.userId"></kdy-followed-btn>
        </div>

      </div>

    </div>


  </div>
</template>
<script setup lang="ts">
import { userDetail } from "@/api/my/index";
import { User } from "@/types/user";
import constellations from "@/enum-file/constellation.json";
interface UserDetail {
  profile: User,
  [key: string]: any
}
const tool = useTool()
const route = useRoute()
const router = useRouter()
const user_id = route.params.id as string

let user = ref<UserDetail | null>(null)


const getUserDetail = async () => {
  let res: any = await userDetail(user_id)
  user.value = res
}

getUserDetail()
</script>

<style scoped lang="scss">
.page {
  &_hd {
    height: 300px;
    background-size: 100% 100%;
    background-position: center;
  }
  &_by{
    .user{
      box-shadow: 0 0 10px #ccc;
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
}</style>