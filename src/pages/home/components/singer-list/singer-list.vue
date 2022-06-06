<!--
 * @Author: your name
 * @Date: 2022-03-24 17:47:16
 * @LastEditTime: 2022-06-06 17:21:04
 * @LastEditors: [you name]
 * @Description: 歌手列表
 * @FilePath: \zyk-music-h5\template.vue
-->
<template>
  <div class="singer">
    <var-list :finished="finished" v-model:loading="loading" @load="load" :offset="200">
      <div class="singer_list bg-white">
        <div class="singer_item flex items-center border_b_solid_1 p-10px" v-for="(item, index) in singer_list"
          :key="item.id" v-ripple @click="router.push({name:'singerDetail',params:{id:item.id}})">
          <img :src="item.picUrl" class="w-50px h-50px fit_cover rounded-50/100">
          <span class="text-[#333] text-14px font-500 flex-1 ml-10px">{{ item.name }}<span class="text-[#999] ml-5px text-12px" v-if="item.alias.length">({{item.alias[0]}})</span></span>
          <span class="focus_btn text-10px " :class="{ in_focus: item.followed }" v-ripple
            @click.stop="focusHandle(item.accountId, index)">{{ item.followed ? '已关注' : '关注' }}</span>
        </div>
      </div>
    </var-list>
  </div>
</template>
<script setup lang="ts">
import { focusUser } from "@/api/my/index"
import useSearchStore from "@/store/search";
import { Artist } from "@/types/user";
let prop = withDefaults(defineProps<{
  isLoadMore?: boolean
  list?: Artist[]
}>(), {
  isLoadMore: true
})
let tool = useTool()
let router = useRouter()
let searchStore = useSearchStore()
// 是否加载完成
let finished = ref(false)
// 加载状态
let loading = ref(false)
// 列表
let singer_list = computed<Artist[]>(() => {
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
  if(!id){
    tool.toast({content: '该歌手不支持关注😂!' })
    return
  }

  let item = singer_list.value[i]
  if (!item.followed) {
    let res: any = await focusUser(id, 1)
    singer_list.value[i].followed = !singer_list.value[i].followed
    tool.toast({ type: 'success', content: res.followContent })
  }
}
</script>

<style scoped lang="scss">
.singer {
  &_item {
    &:last-child {
      border: none;
    }

    &:first-child {
      padding-top: 0;
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