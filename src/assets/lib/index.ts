/*
 * @Author: your name
 * @Date: 2022-03-24 20:13:18
 * @LastEditTime: 2022-03-25 17:48:27
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \zyk-music-h5\src\assets\lib\index.ts
 */
import config  from "@/config/index"

export default (Vue:any, options:any)=>{
  Vue.config.globalProperties.$kdy = {}

  // Vue.config.globalProperties.$kdy.px2vw = (px: number): string => `${(window.screen.width / config.layoutWidth) * px}vw`
  Vue.config.globalProperties.$kdy.px2vw = (px: number): string => `${(px/ config.layoutWidth) * 100 }vw`

  // Vue.config.globalProperties.$kdy.addUnit = (value:string | number,unit:string = 'px')=>{
  //   if(typeof Number(value) == "number"){
  //     return value + unit
  //   }else{
  //     return value
  //   }
  // }
}

