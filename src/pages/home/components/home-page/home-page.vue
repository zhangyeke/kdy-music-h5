
<!--
 * @Author: your name
 * @Date: 2022-03-24 17:47:16
 * @LastEditTime: 2022-06-06 23:14:22
 * @LastEditors: [you name]
 * @Description: 歌手主页
 * @FilePath: \zyk-music-h5\template.vue
-->
<template>
  <div class="home-page text-12px text-[#666] font-500">
    <div class="home-page-top bg-white rounded-10px px-10px pb-15px">
      <div class="home-page-top-title py-15px font-700 text-16px text-[#333]">
        艺人百科
      </div>

      <div class="flex items-center" v-if="userInfo">
        <img :src="otherInfo.imageUrl" class="w-15px h-15px fit_cover mr-5px" alt="" v-if="otherInfo.imageUrl" />
        <span class="">{{userInfo ? userInfo.description : otherInfo.imageDesc}}</span>
      </div>
      <div class="mt-10px">
        艺人名：{{artist.name}}
      </div>
      <div class="mt-10px" v-if="artist.transNames.length">
        别名：<span v-for="(item, index) in artist.transNames" :key="index">{{item}}<span
            v-if="index != artist.transNames.length-1">、</span></span>
      </div>
      <div class="mt-10px">
        <span>身份：</span>
        <template v-if="artist.identities.length">
          <span v-for="(item, index) in artist.identities" :key="index">{{item}}
            <span v-if="index!=artist.identities.length-1">、</span>
          </span>
        </template>
        <span v-else>{{otherInfo.imageDesc}}</span>
      </div>

      <div class="mt-10px" v-if="userInfo">
        生日：{{tool.timeFormat(userInfo.birthday,'YYYY-MM-HH')}}
      </div>
      <div class="mt-10px flex" v-if="userInfo?.signature">
        <span>个性签名：</span>
        <span class="flex-1 leading-15px ">{{userInfo.signature}}</span>
      </div>
      <div class="mt-10px flex" v-ripple @click="show = true">
        <span>歌手简介：</span>
        <span class="flex-1 leading-15px truncate_2" v-html="artist.briefDesc"></span>
      </div>
    </div>

    <div class="home-page-center mt-10px">
      <div class="bg-white mb-10px rounded-10px px-10px pb-15px" v-for="(item, index) in artistDes" :key="index">
        <div class="py-15px font-700 text-16px text-[#333]">
          {{item.ti}}
        </div>

        <div v-html="item.txt" class="leading-20px"></div>
      </div>
    </div>


    <var-style-provider :style-vars="{ '--popup-content-background-color': 'transparent' }">
      <var-popup v-model:show="show">
        <div class="px-20px mx-20px bg-white rounded-10px h-400px overflow-y-scroll pb-15px">
          <div class="font-700 text-16px text-[#333] py-15px">歌手简介</div>
          <div class="text-12px leading-20px font-500" v-html="artist.briefDesc"></div>
        </div>
      </var-popup>
    </var-style-provider>
  </div>
</template>

<script setup lang="ts">
import {Artist,User} from "@/types/user";

interface Des{
  ti:string,
  txt: string
}
let prop = withDefaults(defineProps<{
  userInfo?:User | null,//用户信息
  artist:Artist,//歌手信息
  otherInfo?:any | null,//其他信息
  artistDes: Des[]//歌手的其他描述信息
}>(),{

})

let tool = useTool()
// 展示简介
let show = ref(false)

</script>

<style scoped lang="scss"></style>