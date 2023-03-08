/*
 * @Author: your name
 * @Date: 2022-03-24 20:13:18
 * @LastEditTime: 2023-03-09 00:59:07
 * @LastEditors: 可达鸭 997610780@qq.com
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \zyk-music-h5\src\assets\lib\index.ts
 */
import config from "@/config/index";
import KdyStorage from "@/assets/lib/storage";
import { Snackbar } from "@varlet/ui";
import NativeShare from "nativeshare";
// 引入dayjs来格式化时间
import dayjs from "dayjs";
import mitt from "@/assets/lib/bus";
interface LoadingOption {
  position?: any;
  content?: string;
  loadingType?: string;
  onOpen?: () => void;
  onClose?: () => void;
}

interface toastOption {
  type?: any; //可选值为 success warning info error loading
  position?: any;
  duration?: number;
  content: string;
  loadingType?: string;
  forbidClick?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
}

class Tool extends KdyStorage {
  constructor() {
    super();
  }
  //验证十进制数字
  testNumber(value: string | number) {
    return /^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(String(value));
  }
  // 防抖
  debounce(func: Function, time: number = 500, immediate = false) {
    let timer: number | null = null;
    return (...args: any) => {
      if (timer) clearInterval(timer);
      if (immediate) {
        if (!timer) func.apply(this, args);
        timer = window.setTimeout(() => {
          timer = null;
        }, time);
      } else {
        timer = window.setTimeout(() => {
          func.apply(this, args);
        }, time);
      }
    };
  }

  // 节流
  throttle(func: Function, time: number, immediate = false) {
    if (immediate) {
      let prevTime = 0;
      return (...args: any) => {
        let nowTime = Date.now();
        if (nowTime - prevTime >= time) {
          func.apply(this, args);
          prevTime = nowTime;
        }
      };
    } else {
      let timer: number | null = null;
      return (...args: any) => {
        if (!timer) {
          func.apply(this, args);
          timer = window.setTimeout(() => {
            if (timer) clearInterval(timer);
            timer = null;
          }, time);
        }
      };
    }
  }

  // 字符串去除所有空格
  strTrim(str: string): string {
    return str.replace(/\s+/g, "");
  }
  // 传入时间戳  获取时分秒
  getTime(timeStamp: number) {
    timeStamp /= 1000;
    let hours = Math.floor((timeStamp / 60 / 60) % 24);
    let minute = Math.floor((timeStamp / 60) % 60);
    let second = Math.floor(timeStamp % 60);
    let time = "";
    if (hours > 0) {
      time += `${this.fillZero(hours)}:`;
    }

    time += `${this.fillZero(minute)}:${this.fillZero(second)}`;
    return {
      hours,
      minute,
      second,
      time,
    };
  }
  // 分享配置
  nativeShare() {
    return new NativeShare();
  }
  // 打开分享弹窗
  share<Param>(option: Param) {
    mitt.emit("openSharePopup", option);
  }
  // 复制
  copy(data: string) {
    return new Promise((resolve: Function, reject: Function) => {
      if (navigator.clipboard) {
        navigator.clipboard
          .writeText(data)
          .then((res) => {
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          });
      } else {
        try {
          let textarea = document.createElement("textarea");
          document.body.appendChild(textarea);
          textarea.value = data;
          textarea.select();
          document.execCommand("copy");
          textarea.remove();
          resolve();
        } catch (err) {
          reject(err);
        }
      }
    });
  }
  // 时间戳转换
  timeFormat(v: string | number, format: string | string[] = "YYYY.MM.DD") {
    return dayjs(v).format(format);
  }
  // px转vw
  px2vw(px: number | string): string {
    return `${(Number(px) / config.layoutWidth) * 100}vw`;
  }
  // 添加单位
  addUnit(num: number | string) {
    return this.testNumber(num) ? this.px2vw(num) : num;
  }
  // 数字小于10 进行补零
  fillZero(n: number): string | number {
    return n < 10 ? `0${n}` : n;
  }
  //获取当前日期
  getNowDate() {
    let date = new Date();
    let year: number | string = date.getFullYear();
    let month: number | string = date.getMonth() + 1;
    let day: number | string = date.getDate();
    month = this.fillZero(month);
    day = this.fillZero(day);
    let currentDate = {
      year,
      month,
      day,
      timestamp: date.getTime(),
      today: `${year}-${month}-${day}`,
    };

    return currentDate;
  }
  // 获取本地图片
  getAssetsImages(name: string): string {
    return new URL(`/src/assets/${name}`, import.meta.url).href;
  }
  // 对象转str
  obj2str<Params extends Object>(obj: Params, separator: string = "&"): string {
    if (Object.keys(obj).length) {
      let str = "";
      for (let [key, value] of Object.entries(obj)) {
        str += `${key}=${value}${separator}`;
      }
      str = "?" + str.substring(0, str.length - 1);
      return str;
    }
    return "";
  }
  // 数字格式化
  numFormat(num: number | string, lang: string = "zh"): string | number {
    let number = parseFloat(String(num));
    if (number.toString().length <= 3) {
      return num;
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
  // 切割地址栏url?后面的参数
  getUrlParameter(
    url: string,
    equal: string = "=",
    and: string = "&",
    question: string = "?"
  ): any {
    let parameters = url.indexOf(question) != -1 ? url.split(question)[1] : url;
    let strs = parameters.split(and);
    let obj: any;
    strs.map((item) => {
      obj[item.split(equal)[0]] = item.split(equal)[1];
      return item;
    });
    return obj;
  }
  // 媒体资源url 转为 blob对象资源路径
  async media2blob(url: string): Promise<string> {
    let request = new Request(url);
    return new Promise(async (resolve, reject) => {
      try {
        let res = await fetch(request);
        console.log(res, "看看看");
        resolve(URL.createObjectURL(await res.blob()));
      } catch (err) {
        reject(err);
      }
    });
  }
  hasOwn<T extends Object>(obj:T,prop:string):boolean{
    if(typeof Object.hasOwn != "undefined"){
      return Object.hasOwn(obj,prop)
    }else{
      return obj.hasOwnProperty(prop)
    }
  }

  // 判断是否在微信浏览器环境
  isWxBrowser() {
    let ua = navigator.userAgent.toLowerCase();
    return ua.match(/MicroMessenger/i)?.includes('micromessenger') == undefined ? false : true
  }
}

export default () => {
  return new Tool();
};
