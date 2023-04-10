
<!--
 * @Author:kkk
 * @Date: 2022-03-24 17:47:16
 * @LastEditTime: 2023-04-10 11:34:45
 * @LastEditors: zyk 997610780@qq.com
 * @Description: 编辑用户信息
 * @FilePath: \zyk-music-h5\template.vue
-->
<template>
  <div>
    <KdyNavBar :title="$route.meta.title"></KdyNavBar>

    <div class="gap"></div>
    <div class="px-20px" v-if="user">
      <div class="py-10px flex items-center justify-between border-b relative" v-ripple>
        <div class="text-[var(--text-color)] text-16px font-700">头像</div>
        <img :src="user.profile.avatarUrl" class="w-40px h-40px rounded-1/2">
        <input type="file" class="absolute z-2 w-full h-full opacity-0" accept="image/*" @change="getFile">
      </div>

      <div class="py-15px flex items-center justify-between border-b" v-ripple @click="show_songs_action = true">
        <div class="text-[var(--text-color)] text-16px font-700">性别</div>
        <div class="text-[#999] text-14px">{{ genderList[user.profile.gender].name }}</div>
      </div>

      <div class="py-15px flex items-center justify-between" v-ripple @click="openEditInfo(1)">
        <div class="text-[var(--text-color)] text-16px font-700">昵称</div>
        <div class="text-[#999] text-14px">{{ user.profile.nickname }}</div>
      </div>
    </div>

    <div class="gap"></div>

    <div class="px-20px" v-if="user">

      <div class="py-15px flex items-center justify-between border-b" v-ripple @click="show_date_picker = true">
        <div class="text-[var(--text-color)] text-16px font-700">生日</div>
        <div class="text-[#999] text-14px">{{ user.profile.birthdate }}</div>
      </div>

      <div class="py-15px flex items-center justify-between border-b" v-ripple @click="openArea">
        <div class="text-[var(--text-color)] text-16px font-700">地区</div>
        <div class="text-[#999] text-14px">{{ tool.getAddress(user.profile.city) }}</div>
      </div>

      <div class="py-15px flex items-center justify-between" v-ripple @click="openEditInfo(2)">
        <div class="text-[var(--text-color)] text-16px font-700">简介</div>
        <div class="text-[#999] text-14px truncate w-8/10 text-right">{{ user.profile.signature }}</div>
      </div>
    </div>


    <editInfo v-if="user" v-model="edit_info_value" :maxlength="input_maxlength" :textarea="is_extarea"
      :placeholder="edit_info_placeholder" :ischeck="is_check" :title="edit_info_title" v-model:show="show_edit_info"
      @btnClick="saveHandle" :activeClose="is_active_close">
    </editInfo>

    <KdyActionSheet :actions="genderList" v-model:show="show_songs_action" title="选择性别" @select="actionSelectHandle">
    </KdyActionSheet>

    <datePickerPopup v-model="user!.profile.birthdate" v-model:show="show_date_picker" v-if="user"
      @confirm="birthdayUpdate"></datePickerPopup>
  </div>
</template>
<script setup lang="ts">
import datePickerPopup from "./components/date-picker-popup.vue"
import editInfo from "./components/edit-info.vue";
import { genderList } from "@/enum-file/public";
import { User } from "@/types/user";
import { userDetail, uploadAvatar, updateUserInfo } from "@/api/my/index";
import useUserStore from "@/store/user";
import { Picker } from '@varlet/ui';
import pacs from "@/enum-file/pca-code.json";


interface UserDetail {
  profile: User,
  [key: string]: any
}
const tool = useTool()
const userStore = useUserStore()
let edit_info_type = ref(0)
let show_edit_info = ref(false)
let show_songs_action = ref(false)
let show_date_picker = ref(false)
let user = ref<UserDetail | null>(null)
const edit_info_value = computed({
  get() {
    return edit_info_type.value == 1 ? user.value?.profile.nickname : user.value?.profile.signature
  },
  set(v) {
    edit_info_type.value == 1 ? user.value!.profile.nickname : user.value!.profile.signature = v
  }
})

const edit_info_title = computed(() => {
  return edit_info_type.value == 1 ? "修改昵称" : "修改简介"
})

const edit_info_placeholder = computed(() => {
  return edit_info_type.value == 1 ? "请输入昵称" : "一句话介绍"
})

const is_check = computed(() => {
  return edit_info_type.value == 1 ? true : false
})

const is_active_close = computed(() => {
  return edit_info_type.value == 1 ? false : true
})

const is_extarea = computed(() => {
  return edit_info_type.value == 1 ? false : true
})

const input_maxlength = computed(() => {
  return edit_info_type.value == 1 ? 10 : 300
})

// 获取用户详情
const getUserDetail = async () => {
  let res: any = await userDetail(userStore.userId)
  user.value = res
  user.value!.profile.birthdate = tool.timeFormat(user.value!.profile.birthday, 'YYYY-MM-DD')
}

const openEditInfo = (type: number) => {
  edit_info_type.value = type
  show_edit_info.value = true
}

const actionSelectHandle = (i: number) => {
  user.value!.profile.gender = genderList[i].value
  updateInfo()
}

const saveHandle = (v: string) => {
  if (edit_info_type.value == 1) {
    user.value!.profile.nickname = v
  } else {
    user.value!.profile.signature = v
  }
  updateInfo()
}

async function openArea() {
  const { indexes, texts } = await Picker({
    cascade: true,
    columns: pacs,
    textKey: "name"
  })
  let codes = getCodeRecursive(pacs,indexes as number[])
  user.value!.profile.province = tool.fillText(codes.substring(0, 2),0,6)
  user.value!.profile.city = tool.fillText(codes.substring(0, 4),0,6)
  updateInfo()
}

function getCodeRecursive(pacs:any[], indexes: number[]):string {
  if (indexes.length === 1) {
    return pacs[indexes[0]].code
  } else {
    let child = pacs[indexes[0]].children[indexes[1]]
    return tool.hasOwn(child,'children') ? getCodeRecursive(child.children, indexes.slice(2)) : ""
  }
}

const birthdayUpdate = () => {
  user.value!.profile.birthday = tool.dateFormat(user.value?.profile.birthdate)
  updateInfo()
}

// 更新用户信息
const updateInfo = () => {
  let { gender, nickname, signature, birthday, city, province } = user.value!.profile
  updateUserInfo({ gender, nickname, signature, birthday, city, province }).then(res => {
    show_edit_info.value = false
    tool.toast({ content: "修改信息成功", type: "success" })
  })
}

// 获取上传的文件
const getFile = (e: Event) => {
  let files = (e.target as HTMLInputElement).files
  if (files?.length) uploadFile(files[0])
}

// 上传文件
const uploadFile = async (file: File,) => {
  if (!isMatchUpload(file.size)) {
    tool.toast({ type: "warning", content: "请上传小于5M大小的图片!" })
    return
  }
  let form_data = new FormData()
  form_data.append('imgFile', file)
  user.value!.profile.avatarUrl = URL.createObjectURL(file)
  let imgSize = await getCoverImgSize(file)
  uploadAvatar({ imgSize: imgSize.width }, form_data).then(res => {
    URL.revokeObjectURL(user.value!.profile.avatarUrl)
    user.value!.profile.avatarUrl = res.data.url
  })
}



// 是否符合上传大小 max单位M
const isMatchUpload = (file_size: number, max: number = 5) => {
  return (file_size / 1024 / 1024) <= max
}

// 获取封面图片大小
const getCoverImgSize = (file: File) => {
  return new Promise((resolve: (value: { width: number, height: number }) => void) => {
    let reader = new FileReader()
    reader.readAsDataURL(file)
    // 开始读取文件
    reader.onloadstart = (res) => {
      console.log("开始读取", res);
    }
    // 读取中
    reader.onprogress = (res) => {
      let progress = (res.total / file.size) * 100
      if (progress >= 100) {
        tool.hideLoading()
      } else {
        tool.showLoading({ content: `上传进度${progress}%` })
      }
    }
    // 读取文件成功
    reader.onload = (res) => {
      console.log("读取文件成功", res);
      let img = new Image()
      img.src = res.target!.result as string
      img.onload = (r) => {
        tool.toast({ content: "上传成功!", type: "success" })
        resolve({ width: img.width, height: img.height })
      }
    }
  })
}

getUserDetail()
</script>

<style scoped lang="scss">
.gap {
  height: 10px;
  background-color: #f1f1f1;
}
</style>