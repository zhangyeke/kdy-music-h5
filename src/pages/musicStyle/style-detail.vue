<!--
 * @Author:kkk
 * @Date: 2022-03-24 17:47:16
 * @LastEditTime: 2023-04-18 16:29:53
 * @LastEditors: zyk 997610780@qq.com
 * @Description: 曲风详情
 * @FilePath: \zyk-music-h5\template.vue
-->
<template>
  <div class="page">
    <div class="relative bg-cover bg-center h-260px" :style="{ backgroundImage: `url(${pageHdBgImg})` }">
      <KdyNavBar :scroll-y="scrollY" :screenTop="150" :bgcolor="scrollY >= 150 ? style_detail?.colorDeep ? '#' + style_detail?.colorDeep : 'var(--color-primary)' : 'transparent'" left-icon-color="#fff" title-color="#fff" :title="style_detail?.name" :is-fixed="true">
        <template #default>
          <div class="flex justify-end items-center mr-15px" @click="tool.share(shareOption)">
            <var-icon namespace="kdy-icon" name="fenxiang" color="#fff" :size="tool.px2vw(18)"></var-icon>
          </div>
        </template>
      </KdyNavBar>

      <div class="flex justify-around mt-50px text-white text-18px font-700">
        <div class="text-center">
          <div>{{ style_detail?.songNum }}</div>
          <div class="text-12px mt-5px font-400">歌曲</div>
        </div>
        <div class="text-center">
          <div>{{ style_detail?.artistNum }}</div>
          <div class="text-12px mt-5px font-400">艺人</div>
        </div>
      </div>

      <div class="text-[#ddd] text-1px mt-30px px-15px leading-20px flex items-center" v-ripple @click="show_des_popup = true">
        <div class="truncate_2">{{ style_detail?.desc }}</div>
        <var-icon name="chevron-right" :size="tool.px2vw(22)" />
      </div>
      <div class="absolute w-full bottom-0">
        <var-style-provider :style-vars="styleVars">
          <var-tabs @change="tabChange" offset-top="50" v-model:active="cur_tab" :sticky="true" :color="style_detail?.colorDeep ? '#' + style_detail?.colorDeep : 'var(--color-primary)' "
            indicator-size="70%">
            <var-tab v-for="(item, idx) in tab_list" :name="idx" :key="item.value" v-ripple="{ disabled: true }">{{
              item.name
            }}</var-tab>
          </var-tabs>
        </var-style-provider>
      </div>
    </div>

    <div class="px-15px pt-10px">
      <KdyPlayAllHeader :ids="data_list.filter(item => item.id)" :total="paging.total" v-if="!cur_tab"></KdyPlayAllHeader>
      <var-list v-model:loading="paging.loading" :finished="paging.finish" :immediate-check="false" @load="loadStyleData">
        <component :is="tab_list[cur_tab].cmp" :item="item" v-for="(item, index) in data_list" v-ripple :key="item.id"
          v-model:followed="item.followed" coverKey="cover" songCountKey="songCount" playCountKey="playCount" userIdKey="userId" userNameKey="userName"></component>

      </var-list>
    </div>


    <styleDesPopup v-model="show_des_popup" :detail="style_detail"></styleDesPopup>
  </div>
</template>
<script lang="ts">
import kdySingle from "@/components/kdy-single/kdy-single.vue";
import kdyPlaylist from "@/components/kdy-playlist/kdy-playlist.vue";
import kdySinger from "@/components/kdy-singer/kdy-singer.vue";
import kdyAlbum from "@/components/kdy-album/kdy-album.vue";
import styleDesPopup from "./components/style-des-popup.vue";
export default {
  components: {
    kdySingle,
    kdyPlaylist,
    kdySinger,
    kdyAlbum,
    styleDesPopup
  }
}

</script>
<script setup lang="ts">
import { songStyle } from "@/types/song-style";
import { styleDetail, styleData } from "@/api/public/music-style";
const tool = useTool()
const route = useRoute()
let s_id = route.params.id as string
let pageHdBgImg = ref("")
let style_detail = ref<songStyle | null>(null)
let show_des_popup = ref(false)
//自定义tabs样式变量
let styleVars = computed(() => {
  return {
    "--tabs-item-horizontal-height": tool.px2vw(40),
    "--tab-active-color": '#fff',
    "--tab-inactive-color": "#878787",
    "--tabs-indicator-background": 'rgba(255,255,255,.1)',
    "--tabs-radius":"0",
  }
})
let shareOption = reactive({
  title: "",
  link: window.location.href,
  desc: "",
})

let tab_list = reactive([
  { key: "songs", cmp: "kdySingle", value: "song", name: "歌曲", },
  { key: "albums", cmp: "kdyAlbum", value: "album", name: "专辑" },
  { key: "playlist", cmp: "kdyPlaylist", value: "playlist", name: "歌单" },
  { key: "artists", cmp: "kdySinger", value: "artist", name: "艺人" }
])
let cur_tab = ref(0)
let dataKey = computed(()=>{
  return tab_list[cur_tab.value].key
})
let paging = reactive({
  cursor: 0,
  finish: false,
  total: 0,
  loading: false,
})

let data_list = ref<any[]>([])
let scrollY = ref(0)
window.addEventListener('scroll',()=>{
  scrollY.value = window.scrollY
})

const initPaging = () => {
  paging.cursor = 0
  paging.total = 0
  paging.finish = false
  paging.loading = false
  data_list.value.length = 0
}
const tabChange = (i: number | string) => {
  initPaging()
  getStyleData()
}

const getStyleDetail = async () => {
  let res = await styleDetail(s_id)
  pageHdBgImg.value = res.data.cover[0]
  style_detail.value = res.data
  shareOption.title = res.data.name
  shareOption.desc = res.data.desc
  console.log("曲风详情", res, pageHdBgImg.value);
  getStyleData()
}

const getStyleData = async () => {
  let res: any = await styleData(tab_list[cur_tab.value].value, s_id, paging.cursor)
  console.log("风格数据", res);
  data_list.value.push(...res.data[dataKey.value])
  paging.finish = !res.data.page.more
  paging.total = res.data.page.total
  paging.loading = false
}

const loadStyleData = () => {
  if (!paging.finish) {
    paging.cursor = data_list.value.length
    getStyleData()
  }
}

getStyleDetail()
</script>

<style scoped lang="scss">
.page {
  &_hd {
    border-radius: 0 0 10px 10px;
  }
}

:deep(.var-tab) {
  position: relative;
  z-index: 2;
}

:deep(.var-tabs--layout-horizontal-indicator) {
  height: 20px;
  z-index: 1;
  bottom: 7px;
  border-radius: 35px;
  // bottom: 50%;
}
</style>