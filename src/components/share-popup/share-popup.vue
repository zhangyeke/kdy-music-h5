<!--
 * @Author: your name
 * @Date: 2022-03-24 17:47:16
 * @LastEditTime: 2023-02-26 15:30:05
 * @LastEditors: 可达鸭 997610780@qq.com
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \zyk-music-h5\template.vue
-->
<template>
  <div>
    <var-style-provider :style-vars="{ '--popup-content-background-color': 'transparent' }">
      <var-popup :show="show" position="bottom" @close="close" @click-overlay="close">
        <div class="share bg-white px-20px pb-10px">
          <div class="share_head text-[#666] text-14px py-15px text-center">
            分享至
          </div>
          <div class="share_list flex items-center flex-wrap">
            <div v-for="(item, index) in share_list" :key="item.value" class="w-25/100 flex flex-col items-center mb-10px"
              @click="shareHandle(index)" v-ripple>
              <img :src="tool.getAssetsImages(item.icon)" alt="" class="w-50px">
              <span class="text-[#333] text-12px mt-10px">{{ item.name }}</span>
            </div>
          </div>
        </div>
      </var-popup>
    </var-style-provider>
  </div>
</template>
<script setup lang="ts">
import { share_list } from "@/enum-file/share-list";
let prop = defineProps({
  show: {
    type: Boolean,
    required: true
  },
  shareOption: {
    type: Object,
  }
})

let emit = defineEmits(['close', 'update:show'])

let tool = useTool()

const close = () => {
  emit('update:show', false)
  emit('close')
}

// 分享处理
const shareHandle = (i: number) => {
  let share_item = share_list[i]
  console.log(share_list, i);
  if (share_item.value == "copyLink") {
    tool.copy(prop.shareOption!.link).then(_=>{
      tool.toast({content:"复制成功!",type:"success"})
    }).catch(()=>{
      tool.toast({content:"复制失败!",type:"error"})
    })
  } else {
    if(tool.isWxBrowser()){
      tool.showGuideMask()
      emit('update:show', false)
      return
    }

    let nativeShare = tool.nativeShare()
    nativeShare.setShareData(prop.shareOption)
    try {
      nativeShare.call(share_item.value)
    } catch (e: any) {
      try {
        nativeShare.call('default')
      } catch (e: any) {
        tool.toast({ content: `该浏览器不支持${share_item.name}分享!` })
      }
    }
  }


  emit('update:show', false)
}

</script>

<style scoped lang="scss">
.share {
  border-radius: 10px 10px 0 0;
}
</style>