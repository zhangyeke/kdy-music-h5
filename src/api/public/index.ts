/*
 * @Author: your name
 * @Date: 2022-03-19 20:27:21
 * @LastEditTime: 2022-05-10 11:44:01
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \zyk-music-h5\src\api\login.ts
 */
import { LoginParameter, RegisterParameter } from "../model/public";

enum Api {
  LOGIN = "/login/cellphone",
  REGISTER = "/register/cellphone",
  SENDVERCODE = "/captcha/sent",
  CHECKPHONEISREG = "/cellphone/existence/check",
  CHECKNICKNAMEISREPEAT = "/nickname/check",
}

// 登录
export const login = (data: LoginParameter) => {
  if (data.type == 1) {
    return kdyAxios.get<LoginParameter>(
      `${Api.LOGIN}?phone=${data.phone}&password=${data.password}`
    );
  }

  if (data.type == 2) {
    return kdyAxios.get<LoginParameter>(
      `${Api.LOGIN}?phone=${data.phone}&captcha=${data.captcha}`
    );
  }
};
// 注册
export const register = (data: RegisterParameter) =>
  kdyAxios.get<RegisterParameter>(
    `${Api.REGISTER}?phone=${data.phone}&captcha=${data.captcha}&password=${data.password}&nickname=${data.nickname}`
  );

// 发送验证码
export const sendVerCode = (phone: string | number) =>
  kdyAxios.get<string | number>(`${Api.SENDVERCODE}?phone=${phone}`);
// 检测手机号是否被注册
export const checkPhoneIsReg = (phone: string | number) =>
  kdyAxios.get<string | number>(`${Api.CHECKPHONEISREG}?phone=${phone}`);
// 重复昵称检测
export const checkNicknameIsRepeat = (nickname: string) =>
  kdyAxios.get<string | number>(
    `${Api.CHECKNICKNAMEISREPEAT}?nickname=${nickname}`
  );
