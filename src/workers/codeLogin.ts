// import { login, sendVerCode, getCodeKey, getQrCode, checkLogin } from "@/api/public/index";
import axios from "axios";
import {ref} from "vue"
axios.defaults.baseURL = import.meta.env.VITE_API_URL

// 是否开启轮询
let status = ref(0)
// 轮询扫码的定时器
let timer = ref<NodeJS.Timer | undefined>(undefined)
// code的键值
let code_key = ref("")

let scan_status = ref(0)

// 监听 message 事件
self.addEventListener("message", (event) => {
  // 获取传递的消息数据
  // console.log(`event`, event);
  status.value = event.data.status
  code_key.value = event.data.codeKey

  switch(status.value){
    case 0:
      close()
      break;
    case 1:
      open()
  }

});

function open(){
  if (timer.value) clearInterval(timer.value)
  timer.value = setInterval(checkScanStatus, 1500)
}

function close(){
  if (timer.value) clearInterval(timer.value)
}

function checkScanStatus(){
  axios.get(`/login/qr/check?key=${code_key.value}&${new Date().getTime()}`).then(res=>{
      if (res.data.code == 803 || res.data.code == 800) {
        clearInterval((timer.value as NodeJS.Timer))
      }
      if(scan_status.value != res.data.code){
        // console.log("给主线程发送消息",res.data);
        self.postMessage(res.data)
      }

      scan_status.value = res.data.code
  }).catch(err=>{

  })
}