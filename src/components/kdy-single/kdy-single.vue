<!--
 * @Author: your name
 * @Date: 2022-03-24 17:47:16
 * @LastEditTime: 2023-03-07 16:39:57
 * @LastEditors: zyk 997610780@qq.com
 * @Description: 单曲项
 * @FilePath: \zyk-music-h5\template.vue
-->
<template>
  <div class="kdy-single" :class="{ border_b_solid_1: border }" @click="clickHandle">
    <div class="text-14px text-[#999]" :class="[item.id == songStore.curSong.id ? 'pr-15px' : 'px-15px']" v-if="showRank">
      <var-icon class="ml-5px" namespace="kdy-icon" name="zhuzhuangtu" color="var(--color-primary)"
        :size="tool.addUnit(24)" v-if="item.id == songStore.curSong.id" />
      <span v-else>{{ rank }}</span>
    </div>

    <div class="min-w-80/100">
      <div class="text-[#333] text-14px w-8/10">
        {{ item.name }}
      </div>
      <div class="text-10px text-[#666] mt-5px w-full">
        <div class="truncate">
          <span class="inline-block vip_tag mr-5px" v-if="item.fee == 1">vip</span>
          <span class="inline-block bg-primary  text-white p-3px mr-5px" v-if="item.originCoverType == 1">原唱</span>
          <span class="" v-for="(e, i) in item[artistsKey]" :key="i">
            {{ e.name }}
            <span v-if="i != item[artistsKey].length - 1">/ </span>
          </span>
        </div>
        <div class="mt-5px  w-8/10 truncate">
          <template v-if="item[aliasKey]?.length">
            <span v-for="(e, i) in item[aliasKey]" :key="i">{{ e }}</span>
          </template>
          <template v-if="item.originSongSimpleData">
            原唱：{{ item.originSongSimpleData.artists[0].name }}
          </template>
        </div>
      </div>
    </div>

    <div class="operation ">
      <template v-if="!$slots.right">
        <div @click.stop="mitt.emit('oepnSongDetail', item.id)" class="px-10px" v-ripple>
          <var-icon name="androidgengduo" namespace="kdy-icon" color="#333" :size="tool.px2vw(20)" />
        </div>
        <div @click.stop="" v-if="item[mvKey]" v-ripple>
          <var-icon name="bofang1" namespace="kdy-icon" color="#333" :size="tool.px2vw(20)" />
        </div>

      </template>

      <slot name="right"></slot>

    </div>

  </div>
</template>
<script setup lang="ts" name="kdySingle">
import { Single, Song } from "@/types/song";
import useSongStore from "@/store/song";
import mitt from "@/assets/lib/bus";
const router = useRouter()
const songStore = useSongStore()
const tool = useTool()
const props = withDefaults(defineProps<{
  item: Single | Song,
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
  border?: boolean,
  isJump?:boolean,
}>(), {
  showRank: false,
  aliasKey: "alia",
  artistsKey: "ar",
  mvKey: "mvid",
  border: true,
  isJump:true
})

const emit = defineEmits(['more', 'click'])

const clickHandle = () => {
  songStore.getSong(props.item.id)
  songStore.setSongPaused(false)
  mitt.emit('playAudio')
  if(props.isJump) router.push({ name: "songDetail", params: { id: props.item.id } })
}
</script>

<style scoped lang="scss">
.kdy-single {
  @apply flex items-center relative;
  padding: 10px 0;

  .operation {
    @apply absolute left-8/10 top-5/10 flex items-center z-2;
    transform: translateY(-50%);
  }

  .vip_tag {
    border: 1px solid var(--color-danger);
    color: var(--color-danger);
    padding: 2px 5px;
  }
}
</style>