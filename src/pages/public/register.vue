<!--
 * @Author: your name
 * @Date: 2022-03-31 20:40:59
 * @LastEditTime: 2022-05-10 11:43:30
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

        <transition mode="out-in" enter-active-class="wing_enter">
          <div class="wings" v-show="hide_eye">
            <div class="wing"></div>
            <div class="wing"></div>
          </div>
        </transition>
      </div>

      <div class="kdy_form">
        <div class="kdy_form_item">
          <div class="kdy_input">
            <div class="kdy_label flex">
              <var-icon namespace="kdy-icon" name="nicheng" />
            </div>
            <input type="text" maxlength="10" class="placeholder_class kdy_input_item" v-model="formData.nickname"
              placeholder="请输入1-10位字符的昵称" @input="checkNickname" @blur="nicknameBlur" />
          </div>
          <div class="kdy_form_msg">
            {{ nicknameErrMsg }}
          </div>
        </div>

        <div class="kdy_form_item">
          <div class="kdy_input">
            <div class="kdy_label flex">
              <var-icon namespace="kdy-icon" name="shouji" />
            </div>
            <input type="number" maxlength="11" class="placeholder_class kdy_input_item" v-model="formData.phone"
              placeholder="请输入手机号" @input="checkPhone" @blur="phoneBlur" />
          </div>
          <div class="kdy_form_msg">
            {{ phoneErrMsg }}
          </div>
        </div>

        <!-- 验证码输入框 -->
        <div class="kdy_form_item">
          <div class="kdy_input">
            <div class="kdy_label flex">
              <var-icon namespace="kdy-icon" name="yanzhengma1" />
            </div>
            <input type="number" maxlength="6" class="placeholder_class kdy_input_item" v-model="formData.captcha"
              @input="checkCaptcha" placeholder="请输入验证码" @blur="checkCaptcha" />
            <!-- 发送验证码按钮 -->
            <div class="send_code">
              <var-button type="primary" size="small" @click="sendCode" :disabled="!is_send">{{ send_tips }}
              </var-button>
            </div>
          </div>
          <div class="kdy_form_msg">
            {{ captchaErrMsg }}
          </div>

        </div>

        <div class="kdy_form_item">
          <div class="kdy_input">
            <div class="kdy_label flex">
              <var-icon namespace="kdy-icon" name="password" />
            </div>
            <input type="password" class="placeholder_class kdy_input_item" v-model="formData.password"
              @focus="pwdFocus" @blur="pwdBlur" placeholder="请输入密码" @input="checkPwd" />
          </div>
          <div class="kdy_form_msg">
            {{ pwdErrMsg }}
          </div>
        </div>
        <div class="flex justify-end text-[#666] text-12px">
          <span class="underline" @click="router.replace({path:'/login'})">已有账号?去登录</span>
        </div>
      </div>

      <div class="mt-20px w-90/100">
        <var-button type="primary" class="w-full" @click="registerHandle">注册</var-button>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import kdyTransition from "cmp/kdy-transition/kdy-transition.vue"
import useUserStore from "@/store/user"
import { register, sendVerCode, checkPhoneIsReg, checkNicknameIsRepeat } from "@/api/public/index"
let formData = reactive({
  phone: "",
  password: "",
  captcha: "",//验证码
  nickname: "",
})
// 重新获取验证码的时间
let resetTime = ref(60)
let send_tips = ref("获取验证码")
// 是否可以发送验证码
let is_send = ref(true)

let hide_eye = ref(false)
let kdy = useTool();


const pwdFocus = () => {
  hide_eye.value = true
}
const pwdBlur = () => {
  hide_eye.value = false
  checkPwd()
}

// 错误提示
let phoneErrMsg = ref("")
let pwdErrMsg = ref("")
let captchaErrMsg = ref("")
let nicknameErrMsg = ref("")

let router = useRouter()
let userStore = useUserStore()


// 昵称验证
const checkNickname = () => {
  if (!formData.nickname) {
    nicknameErrMsg.value = "请输入昵称"
    return
  }
  nicknameErrMsg.value = ""
  return true
}

// 昵称输入框离开焦点
const nicknameBlur = async () => {
  if (checkNickname()) {
    let res: any = await checkNicknameIsRepeat(formData.nickname)
    if (res.duplicated) {
      nicknameErrMsg.value = "昵称已被使用!"
      return
    }
    nicknameErrMsg.value = ""
    return true
  }
}

// 手机号输入框离开焦点
const phoneBlur = async () => {
  if (checkPhone()) {
    let res: any = await checkPhoneIsReg(formData.phone)
    console.log(res, "检测是否注册的手机号");
    if (res.exist == 1) {
      phoneErrMsg.value = "手机号已被注册!"
      return
    }
    phoneErrMsg.value = ""
    return true
  }
}
// 手机号验证
const checkPhone = () => {
  let pat = /^(?:(?:\+|00)86)?1\d{10}$/
  if (!formData.phone) {
    phoneErrMsg.value = "请输入手机号"
    return
  }

  if (!pat.test(formData.phone)) {
    phoneErrMsg.value = "请输入正确的手机号"
    return
  }
  phoneErrMsg.value = ""
  return true
}

// 验证码验证
const checkCaptcha = () => {
  if (!formData.captcha) {
    captchaErrMsg.value = "请输入验证码"
    return
  }
  captchaErrMsg.value = ""
  return true
}

// 密码验证
const checkPwd = () => {
  let pat = /^\S*(?=\S{6,12})(?=\S*\d)\S*$/
  if (!formData.password) {
    pwdErrMsg.value = "请输入密码"
    return
  }

  if (!pat.test(formData.password)) {
    pwdErrMsg.value = "请输入6-12位数字和英文组合的密码"
    return
  }

  pwdErrMsg.value = ""
  return true
}

// 注册处理
const registerHandle = async () => {
  if (checkCaptcha() && checkNickname() && checkPhone() && checkPwd()) {
    let res: any = await register(formData)
    userStore.setToken(res.token)
    await userStore.getUserInfo()
    setTimeout(() => {
      kdy.toast({ type: 'success', content: "登录成功!" })
    }, 100);
    setTimeout(() => {
      router.push({ path: '/' })
    }, 1500);
  }
}

// 发送验证码
const sendCode = async () => {
  if (!(checkPhone() && phoneBlur())) {
    kdy.toast({ type: "error", content: "请填写手机号！" })
    return
  }
  sendVerCode(formData.phone).then(res => {
    console.log(res, "验证码");
    resetTime.value = 60
    let timer = setInterval(() => {
      if (resetTime.value == 0) {
        is_send.value = true
        send_tips.value = "获取验证码"
        clearInterval(timer)
      } else {
        is_send.value = false
        resetTime.value--
        send_tips.value = `${resetTime.value}s后重新获取`
      }
    }, 1000)
  })

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
  0% {}

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
  0% {}

  100% {
    transform: translateX(-42px) translateY(-15px) scaleY(0.7);
  }
}

.wing_enter {
  animation: wingEnter 0.3s ease-out;

  @keyframes wingEnter {

    0%,
    99% {
      opacity: 0;
    }

    100% {
      opacity: 1;
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

  .kdy_form {
    &_item {
      position: relative;
      margin-bottom: 10px;


    }

    &_msg {
      color: var(--color-danger);
      font-size: 14px;
      margin-top: 3px;
    }

    .kdy_input {
      position: relative;
      display: flex;
      align-items: center;
      background-color: #fff;
      border-radius: 5px;
      overflow: hidden;
      padding: 0 10px;
      width: 250px;

      .send_code {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        right: 10px;
      }

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
}
</style>