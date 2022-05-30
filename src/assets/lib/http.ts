/*
 * @Author: your name
 * @Date: 2022-03-19 20:21:51
<<<<<<< HEAD
 * @LastEditTime: 2022-05-30 19:46:59
 * @LastEditors: [you name]
=======
 * @LastEditTime: 2022-05-23 09:59:07
 * @LastEditors: [you name]
>>>>>>> 61a3546fad7aff8deddc28e921b82585d5049c49
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \zyk-music-h5\src\assets\lib\http.ts
 */
import axios, {
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
  AxiosInstance,
} from "axios";
import kdyStorage from "@/assets/lib/storage";
import router from "@/router/index"
let kdy = useTool();
let storage = new kdyStorage();

// 自定义默认配置
const kdyAxios = axios.create({
  headers: {
    //php 的 post 传输请求头一定要这个 不然报错 接收不到值
    "Content-Type": "application/json;charset=UTF-8",
    "Access-Control-Allow-Origin-Type": "*",
  },
  // 表示跨域请求时是否需要使用凭证
  withCredentials: false,
  // 基准域名
  baseURL: import.meta.env.VITE_API_URL,
  // `timeout` 指定请求超时的毫秒数(0 表示无超时时间)
  // 如果请求话费了超过 `timeout` 的时间，请求将被中断
  timeout: 3000,
  // `onUploadProgress` 允许为上传处理进度事件
  onUploadProgress: function (progressEvent) {},

  // `onDownloadProgress` 允许为下载处理进度事件
  onDownloadProgress: function (progressEvent) {
    // 对原生进度事件的处理
  },
});

// 添加请求拦截器
kdyAxios.interceptors.request.use(
  function (config: AxiosRequestConfig<any>) {
    // 在发送请求之前做些什么
    const token = storage.getStorage("token");
    if (token) {
      (config.headers as any).Authorization = token;
    }
    return config;
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
kdyAxios.interceptors.response.use(
  function (response:AxiosResponse) {
    console.log("响应请求后", response);
    // 对响应数据做点什么
    if(response.data.code !== 200){
      errorHandle(response.data.message || response.data.msg)
      return Promise.reject(response.data.message || response.data.msg);
    }
    return response.data;
  },
  function (error) {
    let { response } = error;
    errorHandle(response.data.msg,response.status,response);
    // 对响应错误做点什么
    return Promise.reject(error);
  }
);
// 响应错误状态码处理
const errorHandle = (msg: string,status?:number,res?:any) => {
  if(status === 400 && res.data.code === -462){
    kdy.toast({ type: "error", content: res.data.data.blockText });
    return
  }
  if(status === 301){
    router.replace({path:"/login"})
  }
  kdy.toast({ type: "error", content: msg });
};

export default kdyAxios;
