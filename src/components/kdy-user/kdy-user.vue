<!--
 * @Author: your name
 * @Date: 2022-03-24 17:47:16
 * @LastEditTime: 2023-03-27 18:02:10
 * @LastEditors: zyk 997610780@qq.com
 * @Description: 用户项
 * @FilePath: \zyk-music-h5\template.vue
-->
<template>
  <div class="kdy-user flex items-center p-10px flex" :class="{ border_b_solid_1: border }" v-ripple @click="clickHandle">
    <img :src="item.avatarUrl" class="w-50px h-50px fit_cover rounded-50/100">
    <div class="font-500 flex-1 ml-10px text-14px flex">
      <div class="text-[#333] flex-1 flex items-center">
        <span class="mr-5px">{{ item.nickname }}</span>
        <var-icon namespace="kdy-icon" :name="item.gender == 1 ? 'sex_man' : 'xingbie_nv'" :size="tool.px2vw(20)"
          :color="item.gender == 1 ? '#7BB9EA' : '#FC3DC7'" />
      </div>
      <!-- <span class="focus_btn text-10px " :class="{ in_focus: followed }" v-ripple
        @click="focusHandle(item.userId)">{{ followed ? '已关注' : '关注' }}</span> -->

      <kdy-followed-btn :user-id="item.userId" :model-value="followed"  plain @confirm="emit('update:followed',!followed)"></kdy-followed-btn>
    </div>
  </div>
</template>
<script setup lang="ts" name="kdyUser">
import { User } from "@/types/user";
const tool = useTool()
const router = useRouter()
const props = withDefaults(defineProps<{
  item: User,
  //是否关注
  followed?: number | boolean
  border?: boolean,
  isJump?:boolean,
}>(), {
  followed: 0,
  border: true,
  isJump:true
})

const emit = defineEmits(['click', 'update:followed'])


const clickHandle = () => {
  if (props.isJump) router.push({ name: "userDetail", params: { id: props.item.userId } })
}
</script>

<style scoped lang="scss">
</style>