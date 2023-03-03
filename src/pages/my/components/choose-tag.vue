<!--
 * @Author: your name
 * @Date: 2022-03-24 17:47:16
 * @LastEditTime: 2023-03-03 18:30:14
 * @LastEditors: zyk 997610780@qq.com
 * @Description: 选择歌单标签
 * @FilePath: \zyk-music-h5\template.vue
-->
<template>
  <div class="fixed left-0 top-0 z-20 w-full min-h-100vh bg-white" v-if="show">
    <KdyNavBar title="选择标签" :custom-back="true" @back="close">
      <template #default>
        <div class="flex justify-end font-700 text-14px pr-10px">
          <div @click="btnClick">保存</div>
        </div>
      </template>
    </KdyNavBar>

    <div>
      <div class="">
        <div class="" v-for="(item, index) in tag_list" :key="index">
          <div class="flex items-center">
            <var-icon name="checkbox-marked-circle" color="#2979ff" />
            <span>{{ item.name }}</span>
          </div>
          <div class=" flex flex-wrap">
            <div class="tag_item" :data-line="Math.ceil((idx + 1) / 4)" :isEven="Math.ceil((idx + 1) / 4) % 2"
              v-for="(tag, idx) in item.list" :key="idx">{{ tag.name }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { songsCat } from "@/api/public/playlist";
import { SongsTag, SongsCategory } from "@/types/songList";
const props = withDefaults(defineProps<{
  show?: boolean
  modelValue: Array<string>
}>(), {
  show: true
})

const emit = defineEmits(['update:show', 'update:modelValue'])

let tag_list = ref<SongsTag[]>([])

const close = () => {
  emit('update:show', false)
}

const getSongsCat = async () => {
  let res: any = await songsCat()
  Object.keys(res.categories).forEach(key => {
    let songs_tag: SongsTag = {
      id: Number(key),
      name: res.categories[key],
      list: new Array<SongsCategory>()
    }
    res.sub.forEach((item: SongsCategory) => {
      if (item.category == songs_tag.id) {
        songs_tag.list.push(item)
      }
    });
    songs_tag.list.forEach((item, index) => {
      item.line = Math.ceil((index + 1) / 4)
      item.is_last_line = Math.ceil(songs_tag.list.length / 4) == item.line
      console.log();
      
    })
    tag_list.value.push(songs_tag)
  })
  console.log(res, "分类", tag_list);
}


const btnClick = () => {

}
getSongsCat()

</script>

<style scoped lang="scss">
.tag_item {
  @apply text-center border-1px text-[var(--text-color)] truncate;
  width: 25%;
  font-size: 12px;
  height: 36px;
  line-height: 36px;

  &[isEven="0"] {
    border-top-width: 0;
    border-bottom-width: 0;

  }
}
</style>