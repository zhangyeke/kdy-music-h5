<!--
 * @Author:kkk
 * @Date: 2022-03-24 17:47:16
 * @LastEditTime: 2023-04-06 18:30:13
 * @LastEditors: zyk 997610780@qq.com
 * @Description: 选择日期弹窗
 * @FilePath: \zyk-music-h5\template.vue
-->
<template>
  <var-popup :show="show" position="center" :default-style="false" class="w-9/10" @open="open">
    <div class="bg-white p-15px rounded-5px">
      <div class="mb-10px">请选择日期</div>
      <var-date-picker v-model="date_value" @change="dateChange"/>
      <div class="flex justify-end">
        <var-button class="mr-20px">取消</var-button>
        <var-button type="primary">确定</var-button>
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


const emit = defineEmits(['update:show','update:modelValue','change'])

const open = ()=>{
  date_value.value = porps.modelValue
}

const dateChange = (v: string | string[]) => {
  console.log(v,"啦啦啦");
  
}

</script>

<style scoped lang="scss"></style>