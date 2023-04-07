<!--
 * @Author:kkk
 * @Date: 2022-03-24 17:47:16
 * @LastEditTime: 2023-04-07 15:50:12
 * @LastEditors: zyk 997610780@qq.com
 * @Description: 选择日期弹窗
 * @FilePath: \zyk-music-h5\template.vue
-->
<template>
  <var-popup :show="show" position="center" :default-style="false" class="w-9/10" @open="open">
    <div class="bg-white p-15px rounded-5px" v-if="show">
      <div class="mb-10px text-[var(--color-text)] text-16px font-700">请选择日期</div>
      <var-date-picker v-model="date_value" @change="dateChange"/>
      <div class="flex justify-end">
        <var-button class="mr-20px" @click="cancle">取消</var-button>
        <var-button type="primary" @click="confirm">确定</var-button>
      </div>
    </div>
  </var-popup>
</template>
<script setup lang="ts">

const porps = withDefaults(defineProps<{
  show:boolean,
  modelValue:string
}>(),{

})

let date_value = ref(porps.modelValue)


const emit = defineEmits(['update:show','update:modelValue','change','confirm','cancle'])

const open = ()=>{
  date_value.value = porps.modelValue
}

const dateChange = (v: string | string[]) => {
  emit('change',v)
}

const cancle = ()=>{
  close()
  emit('cancle')
}

const close = ()=>{
  emit('update:show',false)
}

const confirm = ()=>{
  emit('update:modelValue',date_value.value)
  emit('confirm',date_value.value)
  close()
}

</script>

<style scoped lang="scss"></style>