<!--
 * @Author: your name
 * @Date: 2022-03-24 17:47:16
 * @LastEditTime: 2023-03-23 00:16:04
 * @LastEditors: 可达鸭 997610780@qq.com
 * @Description: 歌手项
 * @FilePath: \zyk-music-h5\template.vue
-->
<template>
  <div class="kdy-singer flex items-center justify-between  p-10px" :class="{ border_b_solid_1: border }"
    @click="clickHandle">
    <div class="w-50px h-50px">
      <var-image :src="item.picUrl" width="100%" height="100%" fit="cover" radius="50%"></var-image>
    </div>
    <div class="text-14px text-[var(--color-text)] ml-10px flex items-center font-500 flex-1 ">
      <span>{{ item.name }}</span>
      <span class="text-[#999] ml-5px text-12px" v-if="showAlias && item.alias.length">({{ item.alias[0] }})</span>
      <var-icon name="account-circle" :size="tool.px2vw(14)" color="var(--color-primary)" class="ml-5px"
        v-if="showIcon && item.accountId" />
    </div>
    <div class="focus_btn text-10px " :class="{ in_focus: followed }" @click.stop="focusHandle(item.id)">
      {{ followed ? '已关注' : '关注' }}</div>
  </div>
</template>
<script setup lang="ts" name="kdySinger">
import { Artist } from "@/types/user";
import { focusSinger } from "@/api/my/index";
import { Dialog } from "@varlet/ui";
const tool = useTool()
const router = useRouter()
const props = withDefaults(defineProps<{
  item: Artist,
  //是否关注
  followed?: number | boolean
  border?: boolean,
  showAlias?: boolean,//显示别名
  showIcon?: boolean,//显示账号icon
}>(), {
  followed: 0,
  border: true,
  showAlias: true,
  showIcon: false,
})

const emit = defineEmits(['update:followed', 'click'])

// 关注和取消关注
const focusHandle = (id: number) => {
  if (!id) {
    tool.toast({ content: '该歌手不支持关注😂!' })
    return
  }
  Dialog({
    title: "",
    message: `确定要${props.followed ? '取消关注' : '关注TA'}吗？`,
    confirmButtonText: "确定",
    cancelButtonTextColor: "#666",
    onConfirm: async () => {
      await focusSinger(id, props.followed ? 0 : 1)
      tool.toast({ content: props.followed ? "取消关注成功👾" : "关注成功💕" })
      emit('update:followed', !props.followed)
    }
  });

}



const clickHandle = () => {
  router.push({ name: "singerDetail", params: { id: props.item.id } })
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