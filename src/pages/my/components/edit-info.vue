<!--
 * @Author: your name
 * @Date: 2022-03-24 17:47:16
 * @LastEditTime: 2023-03-03 16:30:58
 * @LastEditors: zyk 997610780@qq.com
 * @Description: 编辑信息
 * @FilePath: \zyk-music-h5\template.vue
-->
<template>
  <div class="fixed left-0 top-0 z-20 w-full min-h-100vh bg-white" v-if="show">
    <KdyNavBar :title="title" :custom-back="true" @back="close">
      <template #default>
        <div class="flex justify-end font-700 text-14px pr-10px">
          <div @click="btnClick">{{ btnText }}</div>
        </div>
      </template>
    </KdyNavBar>
    <div class="px-20px mt-20px">
      <var-input :placeholder="placeholder" :maxlength="maxlength" :clearable="clearable"
        :autofocus="autofocus" :textarea="textarea" v-model="input_value" />
    </div>
  </div>
</template>
<script setup lang="ts">
const props = withDefaults(defineProps<
  {
    // 显示开关
    show?: boolean,
    // 标题
    title: string,
    // 要修改的默认值
    modelValue: string,
    // 右上角按钮文本
    btnText?: string,
    // 占位符
    placeholder?: string,
    // 是否可清空
    clearable?: boolean,
    // 是否启用文本域
    textarea?: boolean,
    // 是否自动聚焦
    autofocus?: boolean,
    // 最大输入长度
    maxlength?: string | number,
    // 是否校验
    ischeck?: boolean,
    // 保存时是否关闭组件
    activeClose?:boolean,
  }
>(), {
  btnText: "保存",
  placeholder: "请输入内容",
  clearable: true,
  textarea: false,
  autofocus: true,
  maxlength: "",
  show: true,
  ischeck: false,
  activeClose:true,
})
const tool = useTool()
let input_value = ref(props.modelValue)
const emit = defineEmits(['update:modelValue', 'update:show','btnClick'])

watch(() => props.show, (v) => {
  if (v) {
    input_value.value = props.modelValue
  }
})

const btnClick = ()=>{
  if(props.ischeck){
    if(!input_value.value.trim()){
      tool.toast({content:`请输入${props.title}`})
      return
    }
  }
  emit('update:modelValue',input_value.value)
  if(props.activeClose){
    close()
  }
  emit('btnClick',input_value.value)
}

const close = () => {
  emit('update:show', false)
}
</script>

<style scoped lang="scss"></style>