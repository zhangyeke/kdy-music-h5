<!--
 * @Author:kkk
 * @Date: 2022-03-24 17:47:16
 * @LastEditTime: 2023-03-27 17:59:47
 * @LastEditors: zyk 997610780@qq.com
 * @Description: 关注按钮
 * @FilePath: \zyk-music-h5\template.vue
-->
<template>
  <div @click.stop="focusHandle">
    <var-chip v-bind="chipAttrs" v-ripple>{{ modelValue ? cancelText : confirmText }}</var-chip>
  </div>
</template>
<script setup lang="ts">
import { focusSinger, focusUser, } from "@/api/my/index";
import { Dialog } from "@varlet/ui";
const props = withDefaults(defineProps<{
  modelValue: boolean | number,
  cancelText?: string,
  confirmText?: string,
  userType?: 'user' | 'singer',
  userId: string | number,
  type?: 'default' | 'primary' | 'info' | 'success' | 'warning' | 'danger',
  size?: 'normal' | 'mini' | 'small' | 'large'
}>(), {
  cancelText: "取消关注",
  confirmText: "关注TA",
  userType: 'user', //可选 singer
  type: "primary",
  size: "small"
})

const tool = useTool()

const attrs = useAttrs()

const emit = defineEmits(['cancel', 'confirm', 'update:modelValue'])

const chipAttrs = computed(() => {
  return {
    type: props.type,
    size: props.size,
    ...attrs
  }
})


const focusHandle = () => {
  Dialog({
    title: "",
    message: `确定要${props.modelValue ? props.cancelText : props.confirmText}吗？`,
    confirmButtonText: "确定",
    cancelButtonTextColor: "#666",
    onConfirm: async () => {
      switch (props.userType) {
        case "user":
          await focusUser(props.userId, props.modelValue ? 0 : 1)
          break;
        case "singer":
          await focusSinger(props.userId, props.modelValue ? 0 : 1)
          break;
      }
      tool.toast({ content: props.modelValue ? "取消关注成功👾" : "关注成功💕" })
      emit('update:modelValue', !props.modelValue)
      emit('confirm')
    },
    onCancel: () => {
      emit('cancel')
    }
  });
}

</script>

<style scoped lang="scss"></style>