/*
 * @Author: your name
 * @Date: 2022-03-24 20:13:18
 * @LastEditTime: 2022-04-20 15:37:29
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \zyk-music-h5\src\assets\lib\index.ts
 */
import config from "@/config/index";
import KdyStorage from "./storage"
class Tool extends KdyStorage{
  constructor() {
    super()
  }
  // px转vw
  px2vw(px: number): string {
    return `${(px / config.layoutWidth) * 100}vw`;
  }
  //获取当前日期
  getNowDate(obj?: any) {
    let date = new Date();
    if (obj instanceof Date) {
      date = obj;
    }
    let year: number | string = date.getFullYear();
    let month: number | string = date.getMonth() + 1;
    let day: number | string = date.getDate();
    month = month < 10 ? `0${month}` : month;
    day = day < 10 ? `0${day}` : day;
    let currentDate = {
      year,
      month,
      day,
    };

    return currentDate;
  }
  // 获取本地图片
  getAssetsImages(name: string): string {
    return new URL(`/src/assets/${name}`, import.meta.url).href;
  }
  // 数字格式化
  numFormat(num: number | string, lang: string = "zh"): string {
    let number = parseFloat(num.toString())
    if (number.toString().length == 4) {
      return `${Math.ceil(number / 1000)}${lang == "zh" ? "千" : "k"}`;
    } else if (number.toString().length > 4 && number.toString().length < 9) {
      return `${Math.ceil(number / 10000)}${lang == "zh" ? "万" : "w"}`;
    } else {
      return `${Math.ceil(number / 100000000)}${lang == "zh" ? "亿" : "yi"}`;
    }
  }
}

export default () => {
  return new Tool();
};
