<!--
 * @Author: your name
 * @Date: 2022-03-24 17:47:16
 * @LastEditTime: 2022-11-04 10:51:26
 * @LastEditors: zyk 997610780@qq.com
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \zyk-music-h5\template.vue
-->
<template>
  <div class="page h-100vh bg-black flex flex-col justify-center ">
    <div class="page_hd px-10px flex items-center pt-10px">
      <var-icon name="chevron-down" :size="tool.px2vw(32)" color="#fff" @click="router.back()"/>
      <div class="text-white flex-1 text-center">
        <div class="text-15px truncate ">歌曲名称</div>
        <div class="text-[#999] text-12px mt-5px">歌手</div>
      </div>
    </div>

    <div class="page_bd flex flex-1 justify-center  items-center">
      <div class="song_poster relative w-200px h-200px">
        <div class="halo w-full h-full" v-for="(item, index) in 3" :key="index" :style="{'animation-delay':`${index+0.3}s`}"></div>
        <img :src="tool.getAssetsImages('/image/kdy.png')" alt="" class="rounded-1/2 w-full h-full fit_cover border-3px border-[#333]">
      </div>
    </div>

    <div class="page_ft">
      <var-icon name="heart-outline" color="#ccc" :size="tool.px2vw(26)"/>
      <var-icon name="message-text-outline" color="#ccc" :size="tool.px2vw(26)"/>
      <var-icon namespace="kdy-icon" name="androidgengduo" color="#ccc" :size="tool.px2vw(26)"></var-icon>
    </div>
  </div>
</template>
<script setup lang="ts">
let tool = useTool()
let router = useRouter()

</script>

<style scoped lang="scss">

.page{
    &_bd{
      .song_poster{
        margin-top: -40%;
        @include rotating(0,360,10);

        .halo{
          position: absolute;
          left: 0;
          top: 0;
          border: 1px solid #ccc;
          border-radius: 50%;
          animation: haloScale 3s linear infinite;
          // &:nth-child(2){
          //   animation-delay: 1.2s;
          // }

          @keyframes haloScale {
            0%{
              opacity: 1;
              transform: scale(1);
            }
            100%{
              opacity: 0;
              transform: scale(1.5) ;
            }
          }
        }
      }
    }
  }


</style>