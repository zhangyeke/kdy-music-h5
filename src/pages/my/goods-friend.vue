<!--
 * @Author: your name
 * @Date: 2022-03-24 17:47:16
 * @LastEditTime: 2023-03-23 00:22:34
 * @LastEditors: 可达鸭 997610780@qq.com
 * @Description: 我的好友
 * @FilePath: \zyk-music-h5\template.vue
-->
<template>
  <div class="page">
    <div class="page_hd">
      <KdyNavBar :title="route.meta.title"></KdyNavBar>
      <var-tabs v-model:active="cur_tab" @change="tabChange">
        <var-tab v-for="(item, index) in tabs" :name="index">{{ item }}</var-tab>
      </var-tabs>
    </div>

    <div class="page_by px-15px mt-20px" v-if="user_list.length">
      <div class="text-12px flex justify-end mb-10px text-[var(--color-text)]" v-show="!cur_tab">
        <span class="all mr-20px" :class="{ 'text-[#999]': cur_type != 'all' }" @click="toggleType('all')">全部</span>
        <span class="singer" :class="{ 'text-[#999]': cur_type != 'singer' }" @click="toggleType('singer')">歌手</span>
      </div>

      <div >
        <var-list :finished="paging.finish" v-model:loading="paging.loading" @load="loadData" :immediate-check="false">
          <div>
            <div class="mb-10px border-b pb-10px flex items-center" v-for="(item, index) in user_list" :key="index" @click="jumpPage(item)">
              <div class="relative w-50px h-50px">
                <var-image :src="item.avatarUrl || item.picUrl" width="100%" height="100%" fit="cover"
                  radius="50%"></var-image>
                <img class="absolute right-0 bottom-0 w-15px h-15px rounded-1/2" :src="item.avatarDetail.identityIconUrl"
                  v-if="item.avatarDetail">
              </div>

              <div class="w-1/2 flex flex-col justify-center ml-15px">
                <div class="text-16px text-[var(--color-text)] truncate">{{ item.nickname || item.name }}</div>
                <div v-if="item.signature" class="text-12px text-[#666] truncate mt-8px">{{ item.signature }}</div>
              </div>

              <div class="ml-20px" @click.stop="focusHandle(index)">
                <var-chip plain type="primary" size="small" v-ripple>{{ item.followed ? '取消关注' : '关注TA' }}</var-chip>
              </div>

            </div>
          </div>
        </var-list>
      </div>
    </div>

    <KdyEmpty v-else margin-top="150" :loading="loading_status"></KdyEmpty>


  </div>
</template>
<script setup lang="ts">
import { getFollows, followSingers, focusSinger, focusUser, getUserFans } from "@/api/my/index";
import useUserStore from "@/store/user";
import { User, Artist } from "@/types/user";
import { Dialog } from "@varlet/ui";
const router = useRouter()
const route = useRoute()
const userStore = useUserStore()
const tabs = ["关注", "粉丝"]
const tool = useTool()
let cur_tab = ref(0)
let cur_type = ref('all')
let user_list = ref<User[] | Artist[]>([])
let loading_status = ref(false)
let paging = reactive({
  page: 1,
  loading: false,
  finish: false
})

const toggleType = (type: string) => {
  loading_status.value = true
  initPaging()
  cur_type.value = type
  loadData()
}

const tabChange = (i: string | number) => {
  loading_status.value = true
  if (typeof i == "number") {
    console.log(cur_tab.value);
    initPaging()
    loadData()
  }
}

const jumpPage = (item:Artist | User)=>{
  if(item.userType == 0){
    router.push({ name: 'userDetail', params: { id: item.userId } })
  }else{
    router.push({ name: 'singerDetail', params: { id: item.id } })
  }
}

// 初始化分页
const initPaging = () => {
  paging = {
    page: 1,
    loading: false,
    finish: false
  }
  user_list.value.length = 0
}

// 获取关注的歌手
const getFollowSingers = async () => {
  let res: any = await followSingers(paging.page)
  console.log(res, "关注的歌手");
  user_list.value.push(...res.data.map((item: Artist) => {
    item.followed = true
    return item
  }))
  paging.finish = !res.hasMore
  paging.loading = false
  paging.page++
  loading_status.value = false
}

// 获取关注用户列表
const getFollowList = async () => {
  let res: any = await getFollows(userStore.userId, paging.page)
  user_list.value.push(...res.follow)
  paging.finish = !res.more
  paging.loading = false
  paging.page++
  loading_status.value = false
}

// 获取粉丝列表
const getFans = async () => {
  let res: any = await getUserFans(userStore.userId, paging.page)
  console.log(res, "粉丝列表");
  user_list.value.push(...res.followeds)
  paging.finish = !res.more
  paging.loading = false
  paging.page++
  loading_status.value = false
}


// 关注和取消关注
const focusHandle = (i: number) => {
  let item = user_list.value[i]
  Dialog({
    title: "",
    message: `确定要${item.followed ? '取消关注' : '关注TA'}吗？`,
    confirmButtonText: "确定",
    cancelButtonTextColor: "#666",
    onConfirm: async () => {
      if (!cur_tab.value && cur_type.value == "singer") {
        await focusSinger(item.id, item.followed ? 0 : 1)
        user_list.value[i].followed = !user_list.value[i].followed
      } else {
        await focusUser(item.userId, item.followed ? 0 : 1)
        user_list.value[i].followed = !user_list.value[i].followed
      }
      tool.toast({ content: user_list.value[i].followed ? "关注成功💕" : "取消成功👾" })
    }
  });

}


const loadData = () => {
  if (!paging.finish) {
    if (cur_tab.value) {
      getFans()
    } else {
      cur_type.value == "all" ? getFollowList() : getFollowSingers()
    }

  }
}

loadData()

</script>

<style scoped lang="scss">
.all {
  position: relative;

  &::after {
    content: "";
    position: absolute;
    top: 50%;
    left: 33px;
    width: 1px;
    height: 10px;
    background-color: #aaa;
    transform: translateY(-50%);
  }
}
</style>