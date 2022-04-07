<template>
  <div class>
    <div class="box">
      <div class="left wrap">
        <div class="circleProgress leftcircle"></div>
      </div>
      <div class="right wrap">
        <div class="circleProgress rightcircle"></div>
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
  width: 200px;
  height: 200px;
  border: 1px solid red;
  .wrap {
    position: absolute;
    top: 0;
    width: 50%;
    height: 100%;
    overflow: hidden;
    .circleProgress {
      width: 80px;
      height: 80px;
      position: absolute;
      top: 0;
      border: 10px solid transparent;
      border-radius: 50%;
    }
    .rightcircle {
      border-top: 10px solid green;
      border-right: 10px solid green;
      right: 0;
      transform: rotate(45deg);
    }
    &.left {
      left: 0;
    }
    &.right {
      right: 0;
    }
  }
}
</style>