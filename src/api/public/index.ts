/*
 * @Author: your name
 * @Date: 2022-03-19 20:27:21
 * @LastEditTime: 2023-02-26 20:47:43
 * @LastEditors: 可达鸭 997610780@qq.com
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \zyk-music-h5\src\api\login.ts
 */

import axios from "@/assets/lib/http";
enum Api {
  LOGIN = "/login/cellphone",
  REGISTER = "/register/cellphone",
  SENDVERCODE = "/captcha/sent",
  CHECKPHONEISREG = "/cellphone/existence/check",
  CHECKNICKNAMEISREPEAT = "/nickname/check",
}

let tool = useTool();

/**
 * @Author: kkk
 * @description: 退出登录
 * @return {*}
 */
export const exitLogin = () => axios.get("/logout");

/**
 * @Author: kkk
 * @description: 登录
 * @param phone 手机号 password:密码 type 1:密码登录 2:验证码登录
 * @return {*}
 */
export const login = <P extends Object>(data: P) => {
  return axios.get(`${Api.LOGIN}${tool.obj2str(data)}`);
};

/**
 * @Author: kkk
 * @description: 二维码 key 生成接口
 * @return {*}
 */
export const getCodeKey = () => {
  return axios.get(`/login/qr/key?${new Date().getTime()}`);
};
/**
  * @Author: kkk
  * @description: 二维码 key 生成接口
  * @param {key} key,由第一个接口生成
  * @return {*}
  */
export const getQrCode = (key: string) => {
  return axios.get(`/login/qr/create?key=${key}&qrimg=base64&${new Date().getTime()}`);
};
/**
 * @Author: kkk
 * @description: 二维码检测扫码状态接口 
 * @description: 轮询此接口可获取二维码扫码状态,800 为二维码过期,801 为等待扫码,802 为待确认,803 为授权登录成功(803 状态码下会返回 cookies)
 * @param {string} key
 * @return {*}
 */
export const checkLogin = (key: string) => {
  return axios.get(`/login/qr/check?key=${key}&${new Date().getTime()}`);
};

// 注册
export const register = <P extends Object>(data: P) =>
  axios.get(`${Api.REGISTER}${tool.obj2str(data)}`);

// 发送验证码
export const sendVerCode = (phone: string | number) =>
  axios.get<string | number>(`${Api.SENDVERCODE}?phone=${phone}`);
// 检测手机号是否被注册
export const checkPhoneIsReg = (phone: string | number) =>
  axios.get<string | number>(`${Api.CHECKPHONEISREG}?phone=${phone}`);
// 重复昵称检测
export const checkNicknameIsRepeat = (nickname: string) =>
  axios.get<string | number>(
    `${Api.CHECKNICKNAMEISREPEAT}?nickname=${nickname}`
  );

