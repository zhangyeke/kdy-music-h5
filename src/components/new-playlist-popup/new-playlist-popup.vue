<!--
 * @Author: your name
 * @Date: 2022-03-24 17:47:16
 * @LastEditTime: 2022-05-31 22:10:02
 * @LastEditors: [you name]
 * @Description: 新建窗口组件
 * @FilePath: \zyk-music-h5\template.vue
-->

<template>
  <div class="newlybuilt">
    <var-style-provider :style-vars="{ '--popup-content-background-color': 'transparent' }">
      <var-popup :show="show" position="bottom" @close="close" @open="open" @click-overlay="close">
        <div class="newlybuilt_window bg-white px-15px pb-15px">
          <div class="newlybuilt_window_head flex justify-between items-center text-[#333] text-16px font-500 py-10px">
            <span @click="cancel">取消</span>
            <span class="text-14px">{{ title }}</span>
            <span @click="finish" :class="{ 'text-[#999]': !playlistname.length }">完成</span>
          </div>
          <div class="newlybuilt_window_body">
            <var-input placeholder="歌单标题" maxlength="40" clearable v-model="playlistname" ref="newlyBuiltInput" />
            <div>
              <var-radio :icon-size="tool.px2vw(12)" v-model="is_public"><span
                  class="text-[#999] text-14px ">设置为共享歌单(vip)</span></var-radio>
            </div>
            <div>
              <var-radio :icon-size="tool.px2vw(12)" v-model="is_privacy"><span
                  class="text-[#999] text-14px ">设置为隐私歌单</span></var-radio>
            </div>
          </div>
        </div>
      </var-popup>
    </var-style-provider>
  </div>
</template>
<script setup lang="ts">
import { newPlaylist } from "@/api/public/music"
let prop = withDefaults(defineProps<{
  show: boolean,
  title?: string,//弹窗标题
  playlistName?: string,//歌单名称
}>(), {
  title: "新建歌单"
})

let emit = defineEmits(['close', 'open', 'update:show', 'finish','cancel'])
let tool = useTool()
// 歌单名称
let playlistname = ref("")

// 是否是隐私歌单
let is_privacy = ref(false)
// 是否是共享歌单
let is_public = ref(false)
onBeforeMount(() => {
  watch(() => prop.show, (v) => {
    playlistname.value = prop.playlistName || ""
  })
})

// 点击完成处理
const finish = () => {
  if (playlistname.value.length) {
    newPlaylist({
      name: playlistname.value,
      type: is_public.value ? "SHARED" : "NORMAL",
      privacy: is_privacy.value ? 10 : 0
    }).then((res: any) => {
      close()
      emit('finish',res.id)
    })
  }
}

const close = () => {
  emit('update:show', false)
  emit('close')
}
const open = () => {

}

const cancel = () =>{
  close()
  emit('cancel')
}

</script>

<style scoped lang="scss">
.newlybuilt {
  &_window {
    border-radius: 20px 20px 0 0;
  }
}
</style>