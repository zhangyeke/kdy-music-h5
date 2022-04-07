<!--
 * @Author: your name
 * @Date: 2022-04-07 20:35:32
 * @LastEditTime: 2022-04-07 21:19:40
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \zyk-music-h5\src\pages\index\podcast.vue
-->
<template>
  <div class>
    <div class="box">
      <div class="right wrap">
        <div class="circleProgress rightcircle"></div>
      </div>
      <div class="left wrap">
        <div class="circleProgress leftcircle"></div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts"></script>

<style scoped lang="scss">
* {
  box-sizing: border-box;
}
.box {
  position: relative;
  margin: 0 auto;
  margin-top: 100px;
  width: 210px;
  height: 210px;
  // border: 1px solid red;

  .wrap {
    position: absolute;
    top: 0;
    width: 50%;
    height: 215px;
    overflow: hidden;
    &.left {
      left: 0;
    }
    &.right {
      right: 0;
    }
    .circleProgress {
      width: 215px;
      height: 215px;
      position: absolute;
      top: 0;
      border: 20px solid transparent;
      border-radius: 50%;
      transform: rotate(45deg);
    }
    .rightcircle {
      border-top: 20px solid green;
      border-right: 20px solid green;
      right: 0;
      animation: circleProgressLoad_right 5s linear infinite;
    }

    .leftcircle {
      border-bottom: 20px solid green;
      border-left: 20px solid green;
      left: 0;
      animation: circleProgressLoad_left 5s linear infinite;
      // transform: rotate(45deg);
    }
  }
}
@-webkit-keyframes circleProgressLoad_right {
  0% {
    -webkit-transform: rotate(45deg);
  }
  50%,
  100% {
    -webkit-transform: rotate(225deg);
  }
}
@-webkit-keyframes circleProgressLoad_left {
  0%,
  50% {
    -webkit-transform: rotate(45deg);
  }
  100% {
    -webkit-transform: rotate(225deg);
  }
}
</style>