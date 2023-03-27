<!--
 * @Author:kkk
 * @Date: 2022-03-24 17:47:16
 * @LastEditTime: 2023-03-27 22:52:49
 * @LastEditors: 可达鸭 997610780@qq.com
 * @Description: 用户主页
 * @FilePath: \zyk-music-h5\template.vue
-->
<template>
  <div class="page pb-10px">
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
          <var-icon namespace="kdy-icon" name="VIP" :size="tool.px2vw(26)" color="var(--color-primary)"
            v-if="user.vipType"></var-icon>
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
          <var-chip plain type="primary" :round="false" size="mini" class="mr-5px">
            <span>{{ tool.timeFormat(user.profile.birthday, 'YYYY').substring(2, 3) }}0后</span>
          </var-chip>
          <var-chip plain type="primary" :round="false" size="mini">{{
            constellations[tool.timeFormat(user.profile.birthday, 'YYYY-M').split('-')[1] - 1].name }}</var-chip>
        </div>

        <div class="mt-5px">
          <kdy-followed-btn v-model="(user.profile.followed as boolean)"
            :type="user.profile.followed ? 'default' : 'primary'" size="small"
            :user-id="user.profile.userId"></kdy-followed-btn>
        </div>

      </div>


      <div class="bg-white mt-15px rounded-10px px-10px pb-10px" v-if="create_songs.length">
        <div class="py-10px">
          <span class="font-700 text-16px text-[var(--color-text)]">创建的歌单({{ create_songs.length }}个)</span>
        </div>
        <div class="kdy_tab_item" v-ripple v-for="(item, index) in create_songs" :key="index"
          @click="toPlaylistDetail(item.id)">
          <img :src="item.coverImgUrl" class="kdy_tab_item_left">
          <div class="kdy_tab_item_right">
            <div class="kdy_tab_item_name">{{ item.name }}</div>
            <div class="kdy_tab_item_total">{{ item.trackCount }}首,by {{ item.creator?.nickname }}</div>
          </div>
        </div>
        <div class="text-10px text-[#999] bg-white text-center py-10px border-t" v-ripple @click="">
          <span>查看全部</span>
          <var-icon name="chevron-right" color="#999" :size="tool.px2vw(12)" />
        </div>
      </div>

      <div class="bg-white mt-15px rounded-10px px-10px" v-if="collect_songs.length">
        <div class="py-10px">
          <span class="font-700 text-16px text-[var(--color-text)]">收藏的歌单({{ collect_songs.length }}个)</span>
        </div>
        <div class="kdy_tab_item" v-ripple v-for="(item, index) in collect_songs" :key="index"
          @click="toPlaylistDetail(item.id)">
          <img :src="item.coverImgUrl" class="kdy_tab_item_left">
          <div class="kdy_tab_item_right">
            <div class="kdy_tab_item_name">{{ item.name }}</div>
            <div class="kdy_tab_item_total">{{ item.trackCount }}首,by {{ item.creator?.nickname }}</div>
          </div>
        </div>
        <div class="text-10px text-[#999] bg-white text-center py-10px border-t" v-ripple @click="">
          <span>查看全部</span>
          <var-icon name="chevron-right" color="#999" :size="tool.px2vw(12)" />
        </div>
      </div>


      <div class="bg-white mt-15px rounded-10px px-10px text-12px text-[#999] pb-10px" v-if="user">
        <div class="py-10px">
          <span class="font-700 text-16px text-[var(--color-text)]">基本信息</span>
        </div>
        <div class="mt-5px">
          <span>村龄：{{ Math.floor(user.createDays / 365) }}年</span>
          <span class="ml-5px">({{ tool.timeFormat(user.createTime, 'YYYY年MM月') }}注册)</span>
        </div>
        <div class="mt-15px">
          <span>年龄：</span>
          <span>{{ tool.timeFormat(user.profile.birthday, 'YYYY').substring(2, 3) }}0后</span>
          <span class="ml-5px">{{ constellations[tool.timeFormat(user.profile.birthday, 'YYYY-M').split('-')[1] - 1].name
          }}</span>
        </div>
        <div class="mt-15px">
          <span>地区：{{ tool.getAddress(user.profile.city) }}</span>
        </div>
        <div class="mt-15px">
          <span>个人简介：{{ user.profile.signature }}</span>
        </div>
      </div>

    </div>


  </div>
</template>
<script setup lang="ts">
import { userDetail, getUserPlaylist } from "@/api/my/index";
import { User } from "@/types/user";
import constellations from "@/enum-file/constellation.json";
import { Playlist } from "@/types/song";
interface UserDetail {
  profile: User,
  [key: string]: any
}
const tool = useTool()
const route = useRoute()
const router = useRouter()
const user_id = route.params.id as string

let user = ref<UserDetail | null>(null)

let create_songs = ref<Playlist[]>([])
let collect_songs = ref<Playlist[]>([])
const getUserDetail = async () => {
  let res: any = await userDetail(user_id)
  user.value = res
  console.log(user.value, "用户详情");

}

const getPlaylist = async () => {
  let res: any = await getUserPlaylist(user_id, 1, 15)
  console.log(res, "用户歌单");
  res.playlist.forEach((item: Playlist) => {
    if (item.creator!.userId == user_id) {
      create_songs.value.push(item);
    } else {
      collect_songs.value.push(item);
    }
  });

}

// 跳转歌单详情
const toPlaylistDetail = (id: number) => {
  router.push({ name: "playlistDetail", params: { id } })
}

getPlaylist()
getUserDetail()
</script>

<style scoped lang="scss">
.page {
  &_hd {
    height: 300px;
    background-size: 100% 100%;
    background-position: center;
  }

  &_by {
    .user {
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
}
</style>