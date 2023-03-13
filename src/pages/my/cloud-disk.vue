<!--
 * @Author: your name
 * @Date: 2022-03-24 17:47:16
 * @LastEditTime: 2023-03-13 20:17:54
 * @LastEditors: 可达鸭 997610780@qq.com
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \zyk-music-h5\template.vue
-->
<template>
  <div class="page">
    <div class="page_hd">
      <KdyNavBar>
        <template #default>
          <div>
            <div class="font-700 text-16px">{{ route.meta.title }}</div>
            <div class="text-[#999] text-10px mt-5px">{{ cloud_size }}</div>
          </div>
        </template>
      </KdyNavBar>
    </div>

    <div class="page_by px-15px mt-10px">
      <div v-if="song_list.length">
        <KdyPlayAllHeader :ids="song_list.map(item => item.id)" :total="song_total"></KdyPlayAllHeader>
        <var-list v-model:loading="paging.loading" :finished="paging.finish" @load="loadData" :immediate-check="false">
          <KdySingle v-for="(item, index) in song_list" :key="item.id" :item="item" :show-rank="true" :rank="index + 1">
          </KdySingle>
        </var-list>
      </div>

      <KdyEmpty v-else :loading="loading_status" margin-top="200"></KdyEmpty>
    </div>

  </div>
</template>
<script setup lang="ts">
import { cloudData } from "@/api/my/index";
import { Single } from "@/types/song";
const route = useRoute()

let paging = reactive({
  page: 1,
  loading: false,
  finish: false
})

let song_list = ref<Single[]>([])
let loading_status = ref(true)
let cloud_size = ref("")
let song_total = ref(0)

// 获取云盘数据
const getCloudData = async () => {
  let res: any = await cloudData(paging.page)
  console.log(res, "酷酷酷");
  song_list.value.push(...res.data.map((item: any) => item.simpleSong))
  song_total.value = res.count
  cloud_size.value = `${getSize(res.size).toFixed(2)}G / ${getSize(res.maxSize)}G`
  paging.page++
  paging.finish = !res.hasMore
  paging.loading = false
  loading_status.value = false
}

// 获取云盘大小 单位G
const getSize = (size: number): number => {
  return size / 1024 / 1024 / 1024
}

const loadData = () => {
  if (!paging.finish) {
    getCloudData()
  }
}

loadData()
</script>

<style scoped lang="scss"></style>