<!--
 * @Author: your name
 * @Date: 2022-03-24 17:47:16
 * @LastEditTime: 2023-03-22 18:27:23
 * @LastEditors: zyk 997610780@qq.com
 * @Description: 歌手分类
 * @FilePath: \zyk-music-h5\template.vue
-->
<template>
  <div>
    <KdyNavBar :title="$route.meta.title"></KdyNavBar>
    <div class="px-15px text-12px text-[var(--color-text)] bg-white">
      <div class="flex mb-10px">
          <div class="mr-20px" :class="{ 'text-[var(--color-primary)]': item.value == cur_area }" v-for="(item, index) in category_area" :key="index">{{ item.name }}</div>
      </div>

      <div class="flex">
        <div class="mr-20px" :class="{ 'text-[var(--color-primary)]': item.value == cur_type }" v-for="(item,index) in category_type" :key="index">{{ item.name }}</div>
      </div>

    </div>


    <div class="mt-10px px-15px">
      <div v-for="(item,index) in singer_list" :key="item.id" class="mb-10px flex items-center">
        <div class="w-50px h-50px rounded-1/2">
          <var-image :src="item.picUrl" width="100%" height="100%" radius="50%" fit="cover"></var-image>
        </div>
        <div class="text-16px text-[var(--color-text)] ml-10px">
            <span>{{ item.name }}</span>
            <div v-if="item.accountId">

            </div>
        </div>
      </div>
    </div>

  </div>
</template>
<script setup lang="ts">
import {category_area,category_type} from "@/enum-file/singer";
import {singerList} from "@/api/home/singer";
import {Artist} from "@/types/user";
const tool = useTool()
let cur_area = ref(-1)

let cur_type = ref(-1)

let paging = reactive({
  page:1,
  limit:30,
  loading:false,
  finish:false
})

let singer_list = ref<Artist[]>([])

const getSingerList = async()=>{
  let { page, limit } = paging
  let params = {
    page,
    limit,
    initial: -1,
    type:cur_type.value,
    area:cur_area.value
  }
  let res:any = await singerList(params)
  console.log(res,"可怜见立刻就");
  singer_list.value.push(...res.artists)
  paging.finish = !res.more
  paging.loading = false
  paging.page++
}

getSingerList()

</script>

<style scoped lang="scss"></style>