<!--
 * @Author: your name
 * @Date: 2022-03-31 20:40:59
 * @LastEditTime: 2023-03-01 14:17:50
 * @LastEditors: zyk 997610780@qq.com
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \zyk-music-h5\src\pages\login\login.vue
-->
<template>
  <div class="page flex items-center justify-center">
    <div class="kdy_form flex flex-col items-center relative">
      <div class="code_login_btn" @click="openCode">二维码登录</div>

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
      <div class="kdy_form_item">
        <div class="kdy_input">
          <div class="kdy_label flex">
            <var-icon namespace="kdy-icon" name="shouji" />
          </div>
          <input type="number" maxlength="11" class="placeholder_class kdy_input_item" v-model="formData.phone"
            placeholder="请输入手机号" @input="checkPhone" @blur="checkPhone" />
        </div>
        <div class="kdy_form_msg">
          {{ phoneErrMsg }}
        </div>
      </div>
      <div class="kdy_form_item" v-if="login_type == 1">
        <div class="kdy_input">
          <div class="kdy_label flex">
            <var-icon namespace="kdy-icon" name="password" />
          </div>
          <input type="password" class="placeholder_class kdy_input_item" v-model="formData.password" @focus="pwdFocus"
            @blur="pwdBlur" placeholder="请输入密码" @input="checkPwd" />
        </div>
        <div class="kdy_form_msg">
          {{ pwdErrMsg }}
        </div>
      </div>
      <!-- 验证码输入框 -->
      <div class="kdy_form_item" v-if="login_type == 2">
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
      <div class="text-[#666] text-12px flex justify-between w-full">
        <span @click="toggleLoginType">{{ login_type == 1 ? '验证码登录' : '密码登录' }}</span>
        <span class="underline" @click="router.push({ path: '/register' })">注册账号</span>
      </div>
      <div class="mt-20px w-90/100">
        <var-button type="primary" class="w-full" @click="loginHandle" @keyup.enter="loginHandle">登录</var-button>
      </div>
    </div>

    <var-popup v-model:show="show_code_popup" teleport="body" @close="popupClose">
      <div class="p-10px flex flex-col items-center rounded-10px relative">
        <img :src="code_img" class="w-160px" alt="" />
        <span class="text-[#666] text-12px">请打开网易云APP扫码登录</span>
        <div class="popup_mask" v-if="scan_status.code && scan_status.code != 801">
          <div :class="{ 'w-full': scan_status.code == 803 }" @click="scanResultHandle">
            <var-icon name="shuaxin" namespace="kdy-icon" :size="tool.px2vw(36)"
              v-if="scan_status.code == 800"></var-icon>
            <var-loading type="wave" v-if="scan_status.code == 802" />
            <var-result type="success" :description="scan_status.message" v-if="scan_status.code == 803" />
          </div>
          <span v-if="scan_status.code != 803" class="mt-10px">{{ scan_status.message }}</span>
        </div>
      </div>
    </var-popup>
  </div>
</template>
<script setup lang="ts">
import kdyTransition from "cmp/kdy-transition/kdy-transition.vue";
import useUserStore from "@/store/user";
import useTodayRmdStore from "@/store/todayRmd"
import { login, sendVerCode, getCodeKey, getQrCode, checkLogin } from "@/api/public/index";

let formData = reactive({
  phone: "",
  password: "",
  captcha: "",//验证码
})
let tool = useTool()
// 重新获取验证码的时间
let resetTime = ref(60)
let send_tips = ref("获取验证码")
// 是否可以发送验证码
let is_send = ref(true)
let hide_eye = ref(false)
let kdy = useTool();

// 二维码登录
let show_code_popup = ref(false)
let code_key = ref("")
let code_img = ref("")
// 轮询扫码的定时器
let timer = ref<NodeJS.Timer | undefined>(undefined)
// 扫码的状态 800 为二维码过期,801 为等待扫码,802 为待确认,803 为授权登录成功
let scan_status = ref<any>({})

const pwdFocus = () => {
  hide_eye.value = true
}
const pwdBlur = () => {
  hide_eye.value = false
  checkPwd()
}
// 登录方式 1：密码登录  2：验证码登录
let login_type = ref(1)

let phoneErrMsg = ref("")
let pwdErrMsg = ref("")
let captchaErrMsg = ref("")
let router = useRouter()
let userStore = useUserStore()
let todayRmdStore = useTodayRmdStore()

// 切换登录方式
const toggleLoginType = () => {
  if (login_type.value == 1) {
    login_type.value = 2
  } else {
    login_type.value = 1
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

// 登录处理
const loginHandle = async () => {
  if (login_type.value == 1) {
    if (checkPhone() && checkPwd()) {
      let res: any = await login({ phone: formData.phone, password: formData.password, type: login_type.value })
      await userStore.setToken(res.cookie)
      userStore.getUserInfo()
      kdy.toast({ type: 'success', content: "登录成功!" })
      setTimeout(() => {
        router.back()
      }, 1500);
    }
    return
  }

  if (login_type.value == 2) {
    if (checkPhone() && checkCaptcha()) {
      let res: any = await login({ phone: formData.phone, captcha: formData.captcha, type: login_type.value })
      userStore.setToken(res.cookie)
      userStore.getUserInfo()
      todayRmdStore.setTodayDate("")
      kdy.toast({ type: 'success', content: "登录成功!" })
      setTimeout(() => {
        router.back()
      }, 1500);
    }
    return
  }

}
const createCodeKey = async () => {
  let res = await getCodeKey()
  code_key.value = res.data.unikey
  createQrcode()
  console.log(res, "code的可以");
}

const createQrcode = async () => {
  let res = await getQrCode(code_key.value)
  code_img.value = res.data.qrimg
  if (timer.value) clearInterval(timer.value)
  timer.value = setInterval(checkScanStatus, 1500)
}

// 打开二维码弹窗
const openCode = () => {
  show_code_popup.value = true
  createCodeKey()
}

// 二维码弹窗关闭
const popupClose = ()=>{
  if(timer.value){
    clearInterval(timer.value)
  }
}

// 检测扫码状态
const checkScanStatus = async () => {
  let res: any = await checkLogin(code_key.value)
  scan_status.value = res
  if (scan_status.value.code == 803) {
    clearInterval((timer.value as NodeJS.Timer))
    userStore.setToken(res.cookie)
    userStore.getUserInfo()
    setTimeout(() => {
      router.back()
    }, 1000);
  }
}

// 扫码结果处理
const scanResultHandle = tool.debounce(() => {
  if (scan_status.value.code == 800) {
    scan_status.value.code = 802
    createCodeKey()
  }
})

// 发送验证码
const sendCode = () => {
  if (!checkPhone()) {
    kdy.toast({ type: "error", content: "请填写手机号！" })
    return
  }
  sendVerCode(formData.phone).then(res => {
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
.popup_mask {
  @apply absolute left-0 top-0 z-20 w-full h-full text-white flex flex-col items-center justify-center;
  background-color: rgba(#000000, .7);
}

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

  .code_login_btn {
    @apply absolute left-1/2 text-[#666] underline z-99;
    transform: translateX(-45%);
    font-size: 12px;
    top: 10px;
  }

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