<!--
 * @Author: your name
 * @Date: 2022-03-24 17:47:16
 * @LastEditTime: 2023-03-13 16:35:50
 * @LastEditors: zyk 997610780@qq.com
 * @Description: 批量处理歌单
 * @FilePath: \zyk-music-h5\template.vue
-->
<template>
  <div class="page pb-60px">
    <div class="sticky top-0 left-0 z-10">
      <KdyNavBar :title="page_title">
        <template #default>
          <div class="flex justify-end pr-20px text-[var(--text-color)] font-700 text-16px">
            <span @click="selectAll">{{ is_select_all ? '取消全选' : '全选' }}</span>
          </div>
        </template>
      </KdyNavBar>
    </div>
    <div class="px-15px mt-20px" v-if="songs_list.length">
      <div class="flex items-center border-b mb-10px" v-for="(item, index) in songs_list" :key="item.id" v-ripple
        @click.capture.stop="toggleCheck(index)">
        <var-icon class="mr-10px" :name="item.check ? 'checkbox-marked' : 'checkbox-blank-outline'"
          :color="item.check ? 'var(--color-primary)' : '#666'" :size="tool.px2vw(20)" transition="10" />
        <div class="kdy_tab_item flex-1">
          <div class="kdy_tab_item_left">
            <div class="kdy_tab_item_left_icon" v-if="item.privacy == 10">
              <var-icon name="password" namespace="kdy-icon" color="#666" :size="tool.addUnit(10)" v-ripple />
            </div>
            <img :src="item.coverImgUrl" class="kdy_tab_item_left_img" />
          </div>
          <div class="kdy_tab_item_right">
            <div class="kdy_tab_item_name">{{ item.name }}</div>
            <div class="kdy_tab_item_total">{{ item.trackCount }}首</div>
          </div>
        </div>
      </div>
    </div>
    <KdyEmpty margin-top="200" v-else></KdyEmpty>

    <div class="tool h-50px bg-white w-full fixed  bottom-0 left-0 z-10 flex">

      <div class="flex flex-col items-center justify-center flex-1 h-full" v-ripple @click="delHandle">
        <var-icon name="trash-can-outline" color="#666" :size="tool.px2vw(24)"></var-icon>
        <span class="text-12px text-[#666] mt-5px">删除</span>
      </div>
    </div>

  </div>
</template>
<script setup lang="ts">
import {deletePlaylist} from "@/api/public/playlist";
import useUserStore from "@/store/user";
import { Dialog } from "@varlet/ui";

const tool = useTool()
const route = useRoute()
const userStore = useUserStore()
let songs_list = ref(userStore.playlist[route.params.key as string].map(item => {
  item.check = false
  return item
}))

let is_select_all = ref(false)

let choose_ids = computed((): number[] => {
  let ids: number[] = []
  songs_list.value.forEach(item => {
    if (item.check) {
      ids.push(item.id)
    }
  });
  return ids
})
const page_title = computed(() => {
  return `已选择${choose_ids.value.length}项`
})

// 切换选中状态
const toggleCheck = (i: number) => {
  songs_list.value[i].check = !songs_list.value[i].check
}
// 全选
const selectAll = () => {
  is_select_all.value = !is_select_all.value

  songs_list.value.forEach(item => {
    item.check = is_select_all.value
  })
}

// 删除处理
const delHandle = () => {
  if (!choose_ids.value.length) {
    tool.toast({ content: '您还没有选中歌单😊' })
    return
  }

  Dialog({
    title: "",
    message: "确定将所选歌单从列表中删除😢?",
    confirmButtonText: "删除",
    cancelButtonTextColor: "#666",
    onConfirm: async () => {
      await deletePlaylist(choose_ids.value.toString()).then(res => {
        songs_list.value = songs_list.value.filter(item=> !choose_ids.value.includes(item.id))
        tool.toast({ content: "已删除" })
      })
    }
  });


}

</script>

<style scoped lang="scss"></style>