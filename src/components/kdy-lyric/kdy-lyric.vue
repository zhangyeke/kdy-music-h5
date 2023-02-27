<!--
 * @Author: your name
 * @Date: 2022-03-24 17:47:16
 * @LastEditTime: 2023-02-27 20:33:21
 * @LastEditors: 可达鸭 997610780@qq.com
 * @Description: 歌词项
 * @FilePath: \zyk-music-h5\template.vue
-->
<template>
  <div class="kdy-lyric p-10px" :class="{ border_b_solid_1: border }" ref="kdyLyric" @click="clickHandle">
    <div class="flex items-center">
      <div class="w-260px">
        <div class="text-14px text-[#333] font-500">{{ item.name }}</div>
        <div class="text-[#666] text-10px truncate mt-5px">
          <span v-for="(e, i) in item[artistsKey]" :key="i">{{ e.name }}<span
              v-if="i != item[artistsKey].length - 1">/</span></span>
            <span>&nbsp;-&nbsp;{{ item[albumKey].name || item.name }}</span>
        </div>
      </div>
      <div class="w-20/100 flex items-center justify-end ">
        <div>
          <var-icon name="bofang1" namespace="kdy-icon" color="#333" :size="tool.px2vw(20)" />
        </div>
        <div @click.stop="mitt.emit('oepnSongDetail', item.id)" class="px-10px" v-ripple>
          <var-icon name="androidgengduo" namespace="kdy-icon" color="#333" :size="tool.px2vw(20)" />
        </div>
      </div>
    </div>
    <div class="kdy-lyric-info text-[#666] text-12px mt-10px leading-25px" :class="{ an }">
      <div v-for="(txt, i) in item.lyrics" :key="i" v-html="txt"></div>
    </div>

    <div class="text-[#999] text-10px py-10px an_btn" @click.stop="clickAn" v-ripple>
      <span>{{ an ? '收起' : '展开' }}歌词</span>
      <var-icon name="chevron-down" color="#999" :size="tool.px2vw(10)" />
    </div>
  </div>
</template>
<script setup lang="ts" name="kdyLyric">
import { Single } from "@/types/song";
import useSongStore from "@/store/song";
import mitt from "@/assets/lib/bus";
const router = useRouter()
const songStore = useSongStore()
const tool = useTool()
const props = withDefaults(defineProps<{
  item: Single,
  border?: boolean,
  // 别名字段映射值
  aliasKey?: string,
  // 作者字段映射值
  artistsKey?: string,
  // mv字段映射值
  mvKey?: string,
  // 专辑字段映射值
  albumKey?: string,
  // 展开歌词
  an?: boolean | number
}>(), {
  border: true,
  aliasKey: "alias",
  artistsKey: "artists",
  mvKey: "mvid",
  albumKey: "al"
})

const emit = defineEmits(['more', 'click', 'update:an'])
const kdyLyric = ref<HTMLElement | null>(null)

// 点击展开
const clickAn = (e: MouseEvent) => {
  window.scrollTo(0, kdyLyric.value!.offsetTop)
  emit('update:an', !props.an)
}

const clickHandle = () => {
  songStore.getSong(props.item.id)
  songStore.setSongPaused(false)
  mitt.emit('playAudio')
  router.push({ name: "songDetail", params: { id:props.item.id } })
}

</script>

<style scoped lang="scss">
.kdy-lyric {
  transition: height .3s ease-out;
  padding-bottom: 0;

  :deep(b) {
    color: var(--color-primary);
  }

  &-info {
    max-height: 120px;
    overflow: hidden;
    transition: 1s linear;
    &.an {

      max-height: 150vh;
    }
  }
}
</style>