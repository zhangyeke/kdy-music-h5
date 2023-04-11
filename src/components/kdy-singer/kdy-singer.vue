<!--
 * @Author: your name
 * @Date: 2022-03-24 17:47:16
 * @LastEditTime: 2023-03-27 21:53:50
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
    <kdy-followed-btn :model-value="followed" :user-id="item.id" plain @confirm="emit('update:followed',!followed)"></kdy-followed-btn>
  </div>
</template>
<script setup lang="ts" name="kdySinger">
import { Artist } from "@/types/user";
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

const clickHandle = () => {
  router.push({ name: "singerDetail", params: { id: props.item.id,type:1 } })
}

</script>

<style scoped lang="scss">
</style>