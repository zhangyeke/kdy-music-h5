import { defineStore } from "pinia";
import {Song} from "@/types/song";

const todayRmdStore = defineStore({
  id: "todayRmdStore",
  state: () => {
    return {
      todayDate:"",//今天的日期
      rmdSongList:new Array<Song>,//每日推荐的歌曲
    }
  },
  actions:{
    setTodayDate(date:string){
      this.todayDate = date
    },
    // 每日推荐歌曲追加
    pushRmdSongList(arr:Array<Song>){
      this.rmdSongList.push(...arr)
    },
    // 清空每日推荐歌曲
    clearRmdSongList(){
      this.rmdSongList.length = 0
    }
  },
  persist:{
    enabled: true,
    strategies: [
      {
        storage: localStorage,
        paths:["todayDate","rmdSongList"]
      }
    ]
  }
});

export default todayRmdStore;
