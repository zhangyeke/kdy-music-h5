/*
 * @Author: your name
 * @Date: 2022-03-24 20:13:18
 * @LastEditTime: 2022-03-29 21:48:31
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \zyk-music-h5\src\assets\lib\index.ts
 */
import config from "@/config/index"

export default (Vue: any, options: any) => {
  Vue.config.globalProperties.$kdy = {}

  // Vue.config.globalProperties.$kdy.px2vw = (px: number): string => `${(window.screen.width / config.layoutWidth) * px}vw`
  Vue.config.globalProperties.$kdy.px2vw = (px: number): string => `${(px / config.layoutWidth) * 100}vw`
  // Vue.config.globalProperties.$kdy.addUnit = (value:string | number,unit:string = 'px')=>{
  //   if(typeof Number(value) == "number"){
  //     return value + unit
  //   }else{
  //     return value
  //   }
  // }

  // 获取今日的日期
  Vue.config.globalProperties.$kdy.getNowDate = (obj: any) => {
    let date = new Date();
    if (obj instanceof Date) {
      date = obj
    }
    let year: number | string = date.getFullYear();
    let month: number | string = date.getMonth() + 1;
    let day: number | string = date.getDate()
    month = month < 10 ? `0${month}` : month
    day = day < 10 ? `0${day}` : day
    let currentDate = {
      year,
      month,
      day
    };

    return currentDate
  }


  // 数字格式化
  Vue.config.globalProperties.$kdy.numFormat = (num: number, lang: string = 'zh'):string => {

    if (num.toString().length == 4) {
      console.log("千");
      return `${Math.ceil(num / 1000)}${lang == 'zh' ? '千' : 'k'}`
    } else if (num.toString().length > 4 && num.toString().length < 9) {
        return `${Math.ceil(num / 10000)}${lang == 'zh' ? '万' : 'w'}`
      } else {
        return `${Math.ceil(num / 100000000)}${lang == 'zh' ? '亿' : 'yi'}`
      }
  }
}

