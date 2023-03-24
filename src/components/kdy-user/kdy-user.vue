<!--
 * @Author: your name
 * @Date: 2022-03-24 17:47:16
 * @LastEditTime: 2023-03-24 13:40:45
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
      <span class="focus_btn text-10px " :class="{ in_focus: followed }" v-ripple
        @click="focusHandle(item.userId)">{{ followed ? '已关注' : '关注' }}</span>
    </div>
  </div>
</template>
<script setup lang="ts" name="kdyUser">
import { User } from "@/types/user";
import { focusUser } from "@/api/my/index";
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

// 关注处理
const focusHandle = async (id: number) => {
  let res: any = await focusUser(id, Number(!props.followed))
  emit('update:followed', !props.followed)
  tool.toast({ type: 'success', content: res.followContent })
}
const clickHandle = () => {
  if (props.isJump) router.push({ name: "userDetail", params: { id: props.item.userId } })
}
</script>

<style scoped lang="scss">
.kdy-user {
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