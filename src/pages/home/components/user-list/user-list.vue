<!--
 * @Author: your name
 * @Date: 2022-03-24 17:47:16
 * @LastEditTime: 2022-05-30 23:08:50
 * @LastEditors: [you name]
 * @Description: 用户列表
 * @FilePath: \zyk-music-h5\template.vue
-->
<template>
  <div class="user">
    <var-list :finished="finished" v-model:loading="loading" @load="load" :offset="200">
      <div class="user_list bg-white">
        <div class="user_item flex items-center border_b_solid_1 p-10px flex" v-for="(item, index) in user_list"
          :key="item.id" v-ripple>
          <img :src="item.avatarUrl" class="w-50px h-50px fit_cover rounded-50/100">
          <div class="font-500 flex-1 ml-10px text-14px flex">
            <div class="text-[#333] flex-1 flex items-center">
              <span class="mr-5px">{{ item.nickname }}</span>
              <var-icon namespace="kdy-icon" :name="item.gender == 1 ? 'sex_man' : 'xingbie_nv'"
                :size="tool.px2vw(20)" :color="item.gender == 1 ? '#7BB9EA' : '#FC3DC7'" />
            </div>
            <span class="focus_btn text-10px " :class="{ in_focus: item.followed }" v-ripple
              @click="focusHandle(item.userId, index)">{{ item.followed ? '已关注' : '关注' }}</span>
          </div>
        </div>
      </div>
    </var-list>
  </div>
</template>
<script setup lang="ts">
import { focusUser } from "@/api/my/index"
import useSearchStore from "@/store/search";
import { User } from "@/types/user";
let prop = withDefaults(defineProps<{
  isLoadMore?: boolean
  list?: User[]
}>(), {
  isLoadMore: true
})
let tool = useTool()
let searchStore = useSearchStore()
// 是否加载完成
let finished = ref(false)
// 加载状态
let loading = ref(false)
// 列表
let user_list = computed<User[]>(() => {
  return prop.list?.length ? prop.list : searchStore.list
})

// 加载处理
const load = () => {
  if (prop.isLoadMore && searchStore.page <= searchStore.pageCount) {
    searchStore.page++
    searchStore.getList().then((r: boolean) => {
      loading.value = false
    })
  } else {
    loading.value = false
    finished.value = true
  }
}

// 关注处理
const focusHandle = async (id: number, i: number) => {
  let item = user_list.value[i]
  if (!item.followed) {
    let res: any = await focusUser(id, 1)
    user_list.value[i].followed = !user_list.value[i].followed
    tool.toast({ type: 'success', content: res.followContent })
  }
}
</script>

<style scoped lang="scss">
.user {
  &_item {
    &:last-child {
      border: none;
    }
  }

  .focus_btn {
    @apply px-10px py-3px rounded-20px;
    border: 1px solid var(--color-primary);
    color: var(--color-primary);

    &.in_focus {
      border: 1px solid #999;
      color: #999;
    }
  }
}
</style>