/*
 * @Author: your name
 * @Date: 2022-03-24 20:13:18
 * @LastEditTime: 2022-06-01 22:56:40
 * @LastEditors: [you name]
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \zyk-music-h5\src\assets\lib\index.ts
 */
import config from "@/config/index";
import KdyStorage from "./storage";
import { Snackbar } from "@varlet/ui";
import NativeShare from "nativeshare";
// 引入dayjs来格式化时间
import dayjs from 'dayjs';
interface LoadingOption {
  position?: any;
  content?: string;
  loadingType?: string;
  onOpen?: () => void;
  onClose?: () => void;
}

interface toastOption {
  type?: any;
  position?: any;
  duration?: number;
  content: string;
  loadingType?: string;
  forbidClick?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
}

class Tool extends KdyStorage{
  constructor() {
    super();
  }
  nativeShare(){
    return new NativeShare()
  }
  timeFormat(v:string | number,format:string | string[] = 'YYYY.MM.DD',){
    return dayjs(v).format(format)
  }
  // px转vw
  px2vw(px: number): string {
    return `${(px / config.layoutWidth) * 100}vw`;
  }
  // 添加单位
  addUnit(num:number | string){
    return typeof num == 'string' ? num : this.px2vw(num)
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
  numFormat(num: number | string, lang: string = "zh"): string | number {
    let number = parseFloat(num.toString());
    if(number.toString().length <= 3){
      return num
    } else if (number.toString().length == 4) {
      return `${Math.ceil(number / 1000)}${lang == "zh" ? "千" : "k"}`;
    } else if (number.toString().length > 4 && number.toString().length < 9) {
      return `${Math.ceil(number / 10000)}${lang == "zh" ? "万" : "w"}`;
    } else {
      return `${Math.ceil(number / 100000000)}${lang == "zh" ? "亿" : "e"}`;
    }
  }
  // 显示加载弹窗
  showLoading({
    position = "top",
    content = "正在加载中!",
    loadingType = "cube",
    onOpen,
    onClose,
  }: LoadingOption) {
    Snackbar({
      show: true,
      position: position,
      type: "loading",
      content: content,
      loadingType: loadingType,
      onOpen: onOpen,
      onClose: onClose,
    });
  }
  // 隐藏加载弹窗
  hideLoading() {
    Snackbar({
      show: false,
      duration: 0,
    });
  }
  // 提示弹窗
  toast({
    type = "info",
    position = "top",
    content,
    duration = 1500,
    loadingType = "cube",
    forbidClick = true,
    onOpen,
    onClose,
  }: toastOption) {
    Snackbar({
      show: true,
      type,
      position: position,
      duration: duration,
      content: content,
      loadingType: loadingType,
      forbidClick: forbidClick,
      onOpen: onOpen,
      onClose: onClose,
    });
  }
}

export default () => {
  return new Tool();
};
