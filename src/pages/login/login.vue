<!--
 * @Author: your name
 * @Date: 2022-03-31 20:40:59
 * @LastEditTime: 2022-04-01 00:03:08
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \zyk-music-h5\src\pages\login\login.vue
-->
<template>
  <div class="page flex items-center justify-center">
    <div class="flex flex-col items-center">
      <div class="owl flex items-end relative">
        <kdyTransition leave-active-class="leave_hand_left" enter-active-class="enter_hand_left">
          <div class="owl_hand absolute" v-show="!hide_eye"></div>
        </kdyTransition>

        <kdyTransition leave-active-class="leave_hand_right" enter-active-class="enter_hand_right">
          <div class="owl_hand absolute" v-show="!hide_eye"></div>
        </kdyTransition>

        <transition mode="out-in" leave-active-class="leave_enter" enter-active-class="wing_enter">
          <div class="wings" v-show="hide_eye">
            <div class="wing"></div>
            <div class="wing"></div>
          </div>
        </transition>
      </div>

      <div class="kdy_form">
        <div class="kdy_input">
          <div class="kdy_label">
            <var-icon namespace="kdy-icon" name="shouji" />
          </div>
          <input
            type="text"
            class="placeholder_class kdy_input_item"
            v-model="formData.user_name"
            placeholder="请输入手机号或者邮箱"
          />
        </div>
        <div class="kdy_input">
          <div class="kdy_label">
            <var-icon namespace="kdy-icon" name="shouji" />
          </div>
          <input
            type="password"
            class="placeholder_class kdy_input_item"
            v-model="formData.password"
            @focus="pwdFocus"
            @blur="pwdBlur"
            placeholder="请输入密码"
          />
        </div>
      </div>

      <div class="mt-100px">
        <var-button type="primary">主要按钮</var-button>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import kdyTransition from "cmp/kdy-transition/kdy-transition.vue"
let formData = reactive({
  user_name: "",
  password: ""
})

let hide_eye = ref(false)

const pwdFocus = () => {
  hide_eye.value = true
}

const pwdBlur = () => {
  hide_eye.value = false
}
</script>

<style scoped lang="scss">
.leave_hand_left {
  animation: handLeaveLeft 0.3s ease-out;
}

.enter_hand_left {
  animation: handLeaveLeft 0.3s ease-out reverse;
}

@keyframes handLeaveLeft {
  0% {
  }
  100% {
    transform: translateX(42px) translateY(-15px) scaleY(0.7);
  }
}

.leave_hand_right {
  animation: handLeaveRight 0.3s ease-out;
}

.enter_hand_right {
  animation: handLeaveRight 0.3s ease-out reverse;
}

@keyframes handLeaveRight {
  0% {
  }
  100% {
    transform: translateX(-42px) translateY(-15px) scaleY(0.7);
  }
}

.wing_enter {
  transition: all .3s ease-out;
  transition-delay: 33s;

  @keyframes wingEnter {
    0% {
    }
    100% {
      
    }
  }
}

.page {
  height: 100vh;
  background-color: var(--color-success);
  .owl {
    width: 211px;
    height: 108px;
    transform: translateY(8px);
    background: url(@/assets/image/owl/head.png) no-repeat;

    .wings {
      position: absolute;
      bottom: 9px;
      width: 100%;
      height: 40px;
      overflow: hidden;
      .wing {
        position: absolute;
        width: 65px;
        height: 40px;
        background: url(@/assets/image/owl/hand.png) no-repeat;
        &:first-child {
          left: 64px;
        }
        &:last-child {
          right: 57px;
          transform: scaleX(-1);
        }
      }
    }
    &_hand {
      width: 34px;
      height: 34px;
      background-color: #472f22;
      border-radius: 100%;
      transform: scaleY(0.6);
      bottom: -8px;
      &:first-child {
        left: 15px;
      }
      &:nth-child(2) {
        right: 11px;
      }
    }
  }
  .kdy_input {
    display: flex;
    align-items: center;
    background-color: #fff;
    border-radius: 5px;
    overflow: hidden;
    padding: 0 10px;
    width: 250px;
    margin-bottom: 10px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .kdy_input_item {
    flex: 1;
    height: 40px;
    line-height: 40px;
    padding-left: 10px;
    color: #333;
    font-size: 14px;
    &.placeholder_class {
      &::placeholder {
        color: #ccc;
        font-size: 14px;
      }
    }
  }
}
</style>