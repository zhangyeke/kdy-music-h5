/*
 * @Author: your name
 * @Date: 2022-03-24 20:13:18
 * @LastEditTime: 2023-04-11 09:57:58
 * @LastEditors: zyk 997610780@qq.com
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
import provinces from "@/enum-file/provinces.json";
import citys from "@/enum-file/city.json";
import areas from "@/enum-file/areas.json";
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
  pointsField<T>(arr: any[], field: string) {
    return arr.map<T>((item) => item[field]);
  }
  /**
   * @description: 填充文本
   * @param {string | number} value:原字符串
   * @param {string} fill_txt:要填充的文字
   * @param {number} max_lengt:最大长度 为0时 将原字符串替换
   * @return {*}
   */
  fillText(
    value: string | number,
    fill_txt: string | number = "*",
    max_lengt: number = 0
  ): string {
    if (typeof value == "number") value = String(value);
    let str = "";
    if (max_lengt) {
      str = value;
      for (let i = value.length; i < max_lengt; i++) {
        str += fill_txt;
      }
    } else {
      for (let i = 0; i < value.length; i++) {
        str += fill_txt;
      }
    }
    return str;
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
  formatTimestamp(timestamp: number) {
    // 将时间戳转换为秒数，并取整
    let seconds = Math.floor(timestamp / 1000);

    // 计算分钟和秒钟数
    let minutes = Math.floor(seconds / 60);
    let remainingSeconds = seconds % 60;

    // 格式化分钟和秒钟数
    let formattedMinutes = ("0" + minutes).slice(-2);
    let formattedSeconds = ("0" + remainingSeconds).slice(-2);

    // 获取毫秒数并格式化
    let formattedMilliseconds = ("00" + (timestamp % 1000))
      .slice(-3)
      .slice(0, -1);

    // 返回格式化后的时间
    return (
      formattedMinutes + ":" + formattedSeconds + "." + formattedMilliseconds
    );
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
  // 日期格式 转 时间戳
  dateFormat(v: string): number {
    return dayjs(v).toDate().getTime();
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
      onOpen: () => {
        typeof onOpen == "function" && setTimeout(onOpen, duration);
      },
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
        resolve(URL.createObjectURL(await res.blob()));
      } catch (err) {
        reject(err);
      }
    });
  }
  // 判断对象是否存在该属性
  hasOwn<T extends Object>(obj: T, prop: string): boolean {
    if (typeof Object.hasOwn != "undefined") {
      return Object.hasOwn(obj, prop);
    } else {
      return obj.hasOwnProperty(prop);
    }
  }

  // 是否在微信浏览器环境
  isWxBrowser() {
    let ua = navigator.userAgent.toLowerCase();
    return ua.match(/MicroMessenger/i)?.includes("micromessenger") == undefined
      ? false
      : true;
  }
  // 是否在Safari浏览器环境
  isSafariBrowser() {
    return (
      /Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent)
    );
  }
  // 展示引导遮罩
  showGuideMask(maskGg: string = "rgba(0,0,0,0.7)") {
    let mask = document.createElement("div");
    mask.id = "guideMask";
    mask.className = `fixed w-full h-100vh left-0 top-0  z-999`;
    mask.style.background = maskGg;
    let html = `
    <div class="w-full">
      <img class="w-full h-400px" src="${this.getAssetsImages(
        "image/browser_guide.png"
      )}">
    </div>
    `;
    mask.innerHTML = html;
    mask.onclick = this.closeGuideMask;
    mask.onanimationend = (e: AnimationEvent) => {
      if (e.animationName == "zoomOut") {
        mask.remove();
      }
    };
    document.body.append(mask);
  }
  closeGuideMask() {
    let mask = document.getElementById("guideMask");
    mask?.classList.add("close");
  }
  // 下载音乐
  downloadMusic(url: string) {
    let oA = document.createElement("a"); // 创建一个a标签
    // 正则表达式，这里是把图片文件名分离出来。拿到文件名赋到a.download,作为文件名来使用文本 ,
    // a的download 谷歌浏览器必须同源才能强制下载，否则跳转到图片地址
    oA.target = "_blank";
    oA.rel = "noopener";
    oA.download =
      url.replace(/(.*\/)*([^.]+.*)/gi, "$2").split("?")[0] +
      new Date().getTime(); // 设置下载的文件名，默认是'下载'
    oA.href = url;
    document.body.appendChild(oA);
    oA.click();
    oA.remove(); // 下载之后把创建的元素删除
  }

  // 颜色16进制转 rgb
  hex2rgb(hex: string, opacity: number = 1) {
    let rgba =
      "rgba(" +
      parseInt("0x" + hex.slice(1, 3)) +
      "," +
      parseInt("0x" + hex.slice(3, 5)) +
      "," +
      parseInt("0x" + hex.slice(5, 7)) +
      "," +
      (opacity || "1") +
      ")";
    return rgba;
  }
  // rgb 转 16进制颜色
  rgb2hex(color: string) {
    var values = color
      .replace(/rgba?\(/, "")
      .replace(/\)/, "")
      .replace(/[\s+]/g, "")
      .split(",");
    var a = parseFloat(values[3] || "1"),
      r = Math.floor(a * parseInt(values[0]) + (1 - a) * 255),
      g = Math.floor(a * parseInt(values[1]) + (1 - a) * 255),
      b = Math.floor(a * parseInt(values[2]) + (1 - a) * 255);
    return (
      "#" +
      ("0" + r.toString(16)).slice(-2) +
      ("0" + g.toString(16)).slice(-2) +
      ("0" + b.toString(16)).slice(-2)
    );
  }
  // 等块分割数组或字符串
  blockSlice(value: any[] | string, block: number = 2): any[] {
    let list: any[] = [];
    for (let index = 0; index < value.length; index++) {
      if (index % block == 0) {
        list.push(value.slice(index, index + block));
      }
    }
    return list;
  }
  // 通过地区代码获取地址
  getAddress(code: number | string): string {
    let codes = this.blockSlice(String(code)).filter((item) => item != "00");
    let address = "";
    let value = codes.join("");
    interface Area {
      [key: number]: any;
    }
    let area: Area = {
      1: provinces,
      2: citys,
      3: areas,
    };

    let obj = area[codes.length].find((item: any) => item.code == value);

    if (this.hasOwn(obj, "provinceCode")) {
      address +=
        provinces.find((item) => item.code == obj.provinceCode)?.name || "未知";
    }

    if (this.hasOwn(obj, "cityCode")) {
      address +=
        citys.find((item) => item.code == obj.cityCode)?.name || "未知";
    }

    address += obj.name;
    return address;
  }
  // 页面平滑滚动
  scroll(targetPosition: number, duration: number = 1500): void {
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    const startTime = performance.now();
    function scrollAnimation(currentTime: number) {
      const elapsed = currentTime - startTime;
      const scrollStep = Math.PI / (duration / 15);
      const cosParameter = distance / 2;

      if (elapsed < duration) {
        window.requestAnimationFrame(scrollAnimation);
        const scrollDistance = Math.round(
          cosParameter - cosParameter * Math.cos(elapsed * scrollStep)
        );
        window.scrollTo(0, startPosition + scrollDistance);
      } else {
        window.scrollTo(0, targetPosition);
      }
    }

    window.requestAnimationFrame(scrollAnimation);
  }
  elScroll(element: Element, targetPosition: number, duration: number = 1500) {
    const startPosition = element.scrollTop;
    const distance = targetPosition - startPosition;
    const startTime = performance.now();

    function scrollAnimation(currentTime: number) {
      const elapsed = currentTime - startTime;
      const scrollStep = Math.PI / (duration / 15);
      const cosParameter = distance / 2;

      if (elapsed < duration) {
        window.requestAnimationFrame(scrollAnimation);
        const scrollDistance = Math.round(
          cosParameter - cosParameter * Math.cos(elapsed * scrollStep)
        );
        element.scrollTo(0, startPosition + scrollDistance);
      } else {
        element.scrollTo(0, targetPosition);
      }
    }

    window.requestAnimationFrame(scrollAnimation);
  }
  getInnerHeight() {
    return {
      height: window
        ? window.innerHeight + "px"
        : document.documentElement.clientHeight + "px",
    };
  }
}

export default () => {
  return new Tool();
};
