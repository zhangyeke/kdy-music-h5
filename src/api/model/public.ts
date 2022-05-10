export interface LoginParameter{
  phone:string|number,
  password?:string,
  captcha?:string|number,
  type:number
}

export interface RegisterParameter{
  nickname:string,
  phone:string|number,
  password:string,
  captcha:string|number,
}

