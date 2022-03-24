/*
 * @Author: your name
 * @Date: 2022-03-19 20:21:51
 * @LastEditTime: 2022-03-24 14:53:12
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \zyk-music-h5\src\assets\lib\http.ts
 */
import axios from "axios"

// 自定义默认配置
const kdyAxios = axios.create({
  // 基准域名
  baseURL: import.meta.env.VITE_API_URL,
  // `timeout` 指定请求超时的毫秒数(0 表示无超时时间)
  // 如果请求话费了超过 `timeout` 的时间，请求将被中断
  timeout: 3000,
  // `onUploadProgress` 允许为上传处理进度事件
  onUploadProgress: function (progressEvent) {
  },

  // `onDownloadProgress` 允许为下载处理进度事件
  onDownloadProgress: function (progressEvent) {
    // 对原生进度事件的处理
  },
})


// 添加请求拦截器
kdyAxios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  console.log("发送请求前",config);
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
kdyAxios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  console.log("响应请求后",response);
  return response;
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error);
});


export default kdyAxios