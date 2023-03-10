<!--
 * @Author: your name
 * @Date: 2022-03-24 17:47:16
 * @LastEditTime: 2023-03-10 13:39:29
 * @LastEditors: zyk 997610780@qq.com
 * @Description: 歌手项
 * @FilePath: \zyk-music-h5\template.vue
-->
<template>
  <div class="kdy-singer flex items-center  p-10px" :class="{ border_b_solid_1: border }" 
    @click="clickHandle">
    <img :src="item.picUrl" class="w-50px h-50px fit_cover rounded-50/100">
    <span class="text-[#333] text-14px font-500 flex-1 ml-10px">{{ item.name }}<span class="text-[#999] ml-5px text-12px"
        v-if="item.alias.length">({{ item.alias[0] }})</span></span>
    <span class="focus_btn text-10px " :class="{ in_focus: followed }"
      @click.stop="focusHandle(item.accountId)">{{ followed ? '已关注' : '关注' }}</span>
  </div>
</template>
<script setup lang="ts" name="kdySinger">
import { Artist } from "@/types/user";
import { focusUser } from "@/api/my/index";
const tool = useTool()
const router = useRouter()
const props = withDefaults(defineProps<{
  item: Artist,
  //是否关注
  followed?: number | boolean
  border?: boolean
}>(), {
  followed: 0,
  border: true
})

const emit = defineEmits(['update:followed','click'])

// 关注处理
const focusHandle = async (id: number) => {
  if (!id) {
    tool.toast({ content: '该歌手不支持关注😂!' })
    return
  }

  // if (!props.followed) {
    let res: any = await focusUser(id, Number(!props.followed))
    emit('update:followed', !props.followed)
    tool.toast({ type: 'success', content: res.followContent })
  // }
}

const clickHandle = () => {
  router.push({ name: "singerDetail", params: { id:props.item.id } })
}

</script>

<style scoped lang="scss">
.kdy-singer {
  .focus_btn {
    border: 1px solid var(--color-primary);
    color: var(--color-primary);
    padding: 3px 10px;
    border-radius: 20px;

    &.in_focus {
      border: 1px solid #999;
      color: #999;
    }
  }
}
</style>