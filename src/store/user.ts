import {defineStore} from "pinia"

export default defineStore('userStore',{
  state: ()=>{
    return{
      userInfo:{
        id:1,
        name:"张三",
        age:19,
      },
      token:"lkjlkdd",
    }
  },
  getters:{
    user_name: (state):string=>{
      return state.userInfo.name
    },
    user_id(state):number{
      // 在getters使用this 可以访问整个store
      return state.userInfo.id
    },

    join_name(state):string{
      return `ID:${state.userInfo.id},用户名:${this.user_name}`;
    },
    getUserBaseInfo(state){
      return (id:number)=> this.user_id === id ? this.userInfo : "用户id错误";
    }
  }
})