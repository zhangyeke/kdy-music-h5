<!--
 * @Author: your name
 * @Date: 2022-03-24 17:47:16
 * @LastEditTime: 2023-02-22 22:31:18
 * @LastEditors: 可达鸭 997610780@qq.com
 * @Description: 播放列表弹出层
 * @FilePath: \zyk-music-h5\template.vue
-->
<template>
    <var-style-provider :style-vars="{ '--popup-content-background-color': 'transparent' }">
      <var-popup :show="show" position="bottom" @open="open" @click-overlay="close" @close="close">
        <div class="song h-400px bg-white  flex flex-col w-100vw">
          <div class=" py-10px px-15px">
            <div class="song_title">
              <span class="text-[#333] text-16px font-700 tracking-wide">当前播放</span>
              <span class="text-[#999] text-12px">({{ songStore.songList.length }})</span>
            </div>
            <div class=" flex justify-between mt-10px">
              <div class="flex items-center" @click="toggleCycle" v-ripple>
                <var-icon namespace="kdy-icon" :name="cycle_types[songStore.cycleIndex].icon" />
                <span class="text-14px text-[#333] ml-5px">{{ cycle_types[songStore.cycleIndex].name }}</span>
              </div>
              <div class="flex items-center">
                <div v-for="(item, index) in tool_bars" :key="index" class="mr-15px" v-ripple>
                  <div @click="toolHandle(index)">
                    <var-icon namespace="kdy-icon" :name="item.icon" :size="tool.px2vw(20)" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="flex-1 overflow-y-scroll mt-10px  px-15px">
            <div class="song_list">
              <div v-for="(item, index) in songStore.songList" :key="item.id" v-ripple
                class="song_item flex items-center justify-between mb-10px text-[#333] font-500"
                :class="{ 'text-primary': item.id == songStore.curSong.id }" @click="playMusic(item.id)">
                <div class="song_item_left w-9/12 truncate flex items-center">
                  <var-icon namespace="kdy-icon" name="zhuzhuangtu" color="var(--color-primary)" :size="tool.px2vw(20)"
                    v-if="item.id == songStore.curSong.id" />
                  <span class="ml-5px text-13px">{{ item.name }}</span>

                  <div class="text-[#666] text-12px" :class="{ 'text-primary': item.id == songStore.curSong.id }"
                    v-for="(author, i) in item.ar" :key="i">
                    <span class="mx-5px">-</span>
                    <span>{{ author.name }}</span>
                  </div>

                </div>
                <div class="song_item_right" v-ripple>
                  <div @click.stop="deleteSong(item.id)">
                    <var-icon name="window-close" color="#666" :size="tool.px2vw(25)" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </var-popup>
    </var-style-provider>
</template>
<script setup lang="ts">
import useSongStore from "@/store/song";
import { Dialog } from '@varlet/ui';
let props = withDefaults(defineProps<{
  show:boolean
}>(),{
  
})
let tool = useTool()
let songStore = useSongStore()
let emit = defineEmits(['update:show','open','close'])

// 循环类型
let cycle_types = ref([
  {
    name: "列表循环",
    icon: "liebiaoxunhuan",
    value: 1,
  }, {
    name: "随机播放",
    icon: "suijibofang1",
    value: 2
  }, {
    name: "单曲循环",
    icon: "danquxunhuan",
    value: 3,
  }
])

// 下载 收藏歌单 清空播放列表
let tool_bars = [
  {
    icon: "xiazai"
  },
  {
    icon: "tianjiashoucang"
  },
  {
    icon: "lajixiang"
  }
]

watch(()=>props.show,(v)=>{
  v && open()
})



// 弹层打开
const open = ()=>{
  emit('open')
}

// 弹层关闭
const close = ()=>{
  emit('close')
  emit('update:show',false)
}

// 歌曲循环切换
const toggleCycle = () => {
  if (songStore.cycleIndex != (cycle_types.value.length - 1)) {
    songStore.setCycle(++songStore.cycleIndex)
  } else {
    songStore.setCycle(0)
  }
}

// 弹窗播放音乐
const playMusic = (id: number) => {
  songStore.getSong(id)
  if (songStore.paused) {
    songStore.startPlay()
  }
}

// 工具栏处理 下载 收藏 清空
const toolHandle = (i: number) => {
  if (i == 2) {
    emit('update:show',false)
    Dialog({
      title: "",
      message: '确定要清空播放列表？',
      confirmButtonText: "清空",
      cancelButtonTextColor: "#666",
      onConfirm: () => {
        songStore.clearSongList()
      },
      onCancel: () => {
        emit('update:show',true)
      }
    })
  }
}

const deleteSong = (id: number) => {
  if (id == songStore.curSong.id) {
    if (songStore.cycleIndex == 0 || songStore.cycleIndex == 2) {
      songStore.loopPlay()
    }
    if (songStore.cycleIndex == 1) {
      songStore.randomPlay()
    }
  }
  songStore.deleteSong(id)
}



</script>

<style scoped lang="scss">
.song {
  border-radius: 20px 20px 0 0;
}
</style>