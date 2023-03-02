<!--
  * @Author: your name
 * @Date: 2022-03-24 17:47:16
 * @LastEditTime: 2023-03-02 16:55:30
 * @LastEditors: zyk 997610780@qq.com
  * @Description: 歌单介绍弹窗
  * @FilePath: \zyk-music-h5\template.vue
-->
<template>
  <div>
    <KdyTransition enter-class="animate-bounceInUp" leave-class="animate-zoomOut">
      <div class="popup min-h-100vh w-100vw fixed left-0 top-0 z-10" v-if="modelValue">
        <div class="popup_bg" :style="{ backgroundImage: `url(${playlist.coverImgUrl})` }"></div>
        <div class="relative z-11">
          <div class="flex justify-end mt-10px px-15px" @click="emit('update:modelValue', false)">
            <var-icon name="window-close" color="#fff" size="18" />
          </div>
          <div class="flex flex-col items-center mt-20px">
            <img :src="playlist.coverImgUrl" class="w-200px h-200px rounded-10px">
            <span class="text-white text-16px font-700 mt-15px">{{ playlist.name }}</span>
          </div>

          <div class="px-25px mt-30px text-white">
            <div class=" ">
              <span class="text-16px mr-10px">标签:</span>
              <var-chip class="mr-5px" size="small" color="rgba(0,0,0,.3)" text-color="#fff"
                v-for="(item, index) in playlist.tags" :key="index">{{ item }}</var-chip>
            </div>

            <div v-html="playlist.description" class="text-[#eee] text-14px leading-30px mt-20px">

            </div>
          </div>

          <div class="flex justify-center justify-around mt-50px">
            <var-button type="primary" @click="$router.push({name:'editPlaylist',params:{id:playlist.id}})" v-if="isMy" >编辑歌单</var-button>
            <var-button type="primary" @click="saveCover">保存封面</var-button>
          </div>
        </div>

      </div>
    </KdyTransition>

  </div>
</template>
<script setup lang="ts">
import { SongsList } from "@/types/songList";
const props = withDefaults(defineProps<{
  modelValue: boolean
  playlist: SongsList,
  isMy?:boolean
}>(), {
  isMy:false
})

const emit = defineEmits(['update:modelValue',])


const savePic = () => {
  let Url = props.playlist.coverImgUrl //图片路径，也可以传值进来
  let blob = new Blob([''], { type: 'application/octet-stream' }); //二进制大型对象blob
  let url = URL.createObjectURL(blob); //创建一个字符串路径空位
  let a = document.createElement('a'); //创建一个 a 标签
  a.href = Url;  //把路径赋到a标签的href上
  //正则表达式，这里是把图片文件名分离出来。拿到文件名赋到a.download,作为文件名来使用文本
  a.download = Url.replace(/(.*\/)*([^.]+.*)/ig, "$2").split("?")[0];
  /* let e = document.createEvent('MouseEvents');  //创建事件（MouseEvents鼠标事件）
  e.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null); //初始化鼠标事件（initMouseEvent已弃用）*/

  //代替方法。创建鼠标事件并初始化（后面这些参数我也不清楚，参考文档吧 (true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0) https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/MouseEvent）
  let e = new MouseEvent('click', { screenX: 0, screenY: 0, clientX: 0, clientY: 0, relatedTarget: window });
  //派遣后，它将不再执行任何操作。执行保存到本地
  a.dispatchEvent(e);
  //释放一个已经存在的路径（有创建createObjectURL就要释放revokeObjectURL）
  URL.revokeObjectURL(url);
}

const saveCover = () => {
  let cutURL:string = props.playlist.coverImgUrl
  let oA = document.createElement("a"); // 创建一个a标签
  // 正则表达式，这里是把图片文件名分离出来。拿到文件名赋到a.download,作为文件名来使用文本 ,
  // a的download 谷歌浏览器必须同源才能强制下载，否则跳转到图片地址
  oA.download = cutURL.replace(/(.*\/)*([^.]+.*)/ig, "$2").split("?")[0];; // 设置下载的文件名，默认是'下载'
  oA.href = cutURL;
  document.body.appendChild(oA);
  oA.click();
  oA.remove(); // 下载之后把创建的元素删除
}


</script>

<style scoped lang="scss">
.popup {
  overflow: hidden auto;

  &_bg {
    @apply absolute left-0 top-0 z-1 w-full h-full;
    background-size: 800%;
    background-position: right bottom;

    &::after {
      content: "";
      @apply absolute left-0 top-0 w-full h-full;
      backdrop-filter: blur(100px);
    }
  }

}
</style>

