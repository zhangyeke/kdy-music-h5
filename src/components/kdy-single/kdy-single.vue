<!--
 * @Author: your name
 * @Date: 2022-03-24 17:47:16
 * @LastEditTime: 2023-02-20 23:12:10
 * @LastEditors: 可达鸭 997610780@qq.com
 * @Description: 单曲项
 * @FilePath: \zyk-music-h5\template.vue
-->
<template>
  <div class="kdy-single" :class="{border_b_solid_1:border}" @click="emit('click')">
    <div class="w-10/100  text-14px text-[#999]" v-if="showRank">
      <var-icon namespace="kdy-icon" name="zhuzhuangtu" color="var(--color-primary)" :size="tool.addUnit(24)"
        v-if="item.id == songStore.curSong.id" />
      <span class="ml-5px" v-else>{{ rank }}</span>
    </div>

    <div class="flex-1" v-ripple>
      <div class="text-[#333] text-14px">
        {{ item.name }}
        </div>
      <div class="text-10px text-[#666] mt-5px">
        <div class=" ">
          <span class="inline-block vip_tag mr-5px" v-if="item.fee == 1">vip</span>
          <span class="inline-block bg-primary  text-white p-3px mr-5px" v-if="item.originCoverType == 1">原唱</span>
          <span class=""><span v-for="(e, i) in item[artistsKey]" :key="i">{{ e.name }}</span></span>
          <span class="mx-5px">-</span>
          <span>{{ item.name }}</span>
        </div>
        <div class=" mt-5px truncate">
          <div class="" v-if="item[aliasKey]?.length">
            <span v-for="(e, i) in item[aliasKey]" :key="i">{{ e }}</span>
          </div>
          <div class="" v-if="item.originSongSimpleData">
            原唱：{{ item.originSongSimpleData.artists[0].name }}
          </div>
        </div>
      </div>
    </div>

    <div class="w-20/100 flex items-center justify-end ">
      <div @click.stop="" v-if="item[mvKey]" v-ripple>
        <var-icon name="bofang1" namespace="kdy-icon" color="#333" :size="tool.px2vw(20)" />
      </div>
      <div @click.stop="emit('more')" class="px-10px" v-ripple>
        <var-icon name="androidgengduo" namespace="kdy-icon" color="#333" :size="tool.px2vw(20)" />
      </div>
    </div>

  </div>
</template>
<script setup lang="ts" name="kdySingle">
import { Single } from "@/types/song";
import useSongStore from "@/store/song";
const tool = useTool()
const songStore = useSongStore()
const props = withDefaults(defineProps<{
  item: Single
  rank?: number,
  //是否显示排行
  showRank?: boolean,
  // 别名字段映射值
  aliasKey?: string,
  // 作者字段映射值
  artistsKey?: string,
  // mv字段映射值
  mvKey?: string,
  // 是否显示下边框
  border?:boolean
}>(), {
  showRank: false,
  aliasKey: "alias",
  artistsKey: "artists",
  mvKey: "mvid",
  border:true
})

const emit = defineEmits(['more','click'])

</script>

<style scoped lang="scss">
.kdy-single {
  @apply  flex items-center;
  padding: 10px 0;
  .vip_tag {
    border: 1px solid var(--color-danger);
    color: var(--color-danger);
    padding: 2px 5px;
  }
}
</style>