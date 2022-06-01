<!--
 * @Author: your name
 * @Date: 2022-03-24 17:47:16
 * @LastEditTime: 2022-06-01 16:59:32
 * @LastEditors: [you name]
 * @Description:歌曲评论
 * @FilePath: \zyk-music-h5\template.vue
-->
<template>
  <div class="page">
    <div class="page_head">
      <var-app-bar :title="PAGE_TITLE" :elevation="false">
        <template #left>
          <div>
            <var-icon name="chevron-left" :size="tool.px2vw(26)" />
          </div>
        </template>
      </var-app-bar>
    </div>
  </div>
</template>
<script setup lang="ts">

let tool = useTool()

const PAGE_TITLE = computed(()=>{
  return `评论`
})

</script>

<style scoped lang="scss">
</style>