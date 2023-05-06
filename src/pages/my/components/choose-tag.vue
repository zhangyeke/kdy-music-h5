<!--
 * @Author: your name
 * @Date: 2022-03-24 17:47:16
 * @LastEditTime: 2023-03-06 12:32:53
 * @LastEditors: zyk 997610780@qq.com
 * @Description: 选择歌单标签
 * @FilePath: \zyk-music-h5\template.vue
-->
<template>
  <KdyTransition enter-class="animate-slideInRight" leave-class="animate-slideOutRight">
    <div class="fixed left-0 top-0 z-20 w-full min-h-100vh bg-white animate-duration-100" v-if="show">
      <KdyNavBar title="选择标签" :custom-back="true" @back="close">
        <template #default>
          <div class="flex justify-end font-700 text-14px pr-10px">
            <div @click="btnClick">保存</div>
          </div>
        </template>
      </KdyNavBar>

      <div>
        <div class="px-15px">
          <div class="text-12px text-[#666] flex items-center mb-10px">
            <var-icon name="information" color="#666" :size="tool.addUnit(14)" />
            <span class="ml-5px">请选择合适的标签,最多选择{{ max_choose }}个,已选{{ choose_names.length }}个</span>
          </div>
          <div class="mb-10px" v-for="(item, index) in tag_list" :key="index">
            <div class="flex items-center mb-8px">
              <var-icon namespace="kdy-icon" :name="item.icon" color="#666" :size="tool.addUnit(20)" />
              <span class="ml-5px">{{ item.name }}</span>
            </div>
            <div class=" flex flex-wrap">
              <div class="tag_item" :class="{ active: choose_names.includes(tag.name) }" @click="chooseTag(tag.name)"
                :lastcol="tag.is_last_col" :lastLine="tag.is_last_line" :isEven="tag.line % 2"
                v-for="(tag, idx) in item.list" :key="idx">{{ tag.name }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </KdyTransition>
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
const tool = useTool()
const emit = defineEmits(['update:show', 'update:modelValue', 'btnClick'])
const max_choose = 1
let choose_names = ref<string[]>(props.modelValue)

let tag_list = ref<SongsTag[]>([])
let cat_icons = [{ name: "语种", icon: "yuzhong-" }, { name: "风格", icon: "fengge" }, { name: "场景", icon: "shenghuoxiuxian" }, { name: "情感", icon: "qinggan" }]

// 关闭
const close = () => {
  emit('update:show', false)
}

// 选中标签
const chooseTag = (tag_name: string) => {
  if (choose_names.value.includes(tag_name)) {
    choose_names.value = choose_names.value.filter(name => name != tag_name)
  } else if (choose_names.value.length >= max_choose) {
    tool.toast({ content: `最多只允许添加${max_choose}个标签😁` })
  } else {
    choose_names.value.push(tag_name)
  }
}

// 获取歌单分类
const getSongsCat = async () => {
  let res: any = await songsCat()
  Object.keys(res.categories).forEach(key => {
    let songs_tag: SongsTag = {
      id: Number(key),
      name: res.categories[key],
      list: new Array<SongsCategory>()
    }
    let icon_index = cat_icons.findIndex(item => item.name == res.categories[key])
    if (icon_index != -1) {
      songs_tag.icon = cat_icons[icon_index].icon
    }

    res.sub.forEach((item: SongsCategory) => {
      if (item.category == songs_tag.id) {
        songs_tag.list.push(item)
      }
    });
    songs_tag.list.forEach((item, index) => {
      item.line = Math.ceil((index + 1) / 4)
      item.is_last_line = Number(Math.ceil(songs_tag.list.length / 4) == item.line)
      item.is_last_col = Number((index + 1) % 4 == 0)
    })
    tag_list.value.push(songs_tag)
  })

}

const btnClick = () => {
  console.log("点击保存", choose_names.value);
  emit('update:modelValue', choose_names.value)
  emit('btnClick', choose_names.value)
  close()
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

  &:nth-child(even) {
    border-left-width: 0;
    border-right-width: 0;
  }

  &[lastcol="1"] {
    border-right-width: 1px;
  }

  &[isEven="0"] {
    border-top-width: 0;
    border-bottom-width: 0;
  }

  &[lastline="1"] {
    border-bottom-width: 1px;
  }

  &.active {
    position: relative;
    border: 1px solid var(--color-primary);

    &::before {
      content: "\F061";
      font-family: "varlet-icons" !important;
      bottom: -12px;
      font-size: 10px;
      @apply text-white z-2 absolute right-0;
      transform: rotate(-5deg);
    }

    &::after {
      content: "";
      @apply w-0 absolute right-0 bottom-0;
      border: 10px solid var(--color-primary);
      border-top-color: transparent;
      border-left-color: transparent;
    }
  }
}</style>