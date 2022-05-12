import {defineStore} from "pinia";
import {Search,SearchHistory} from "@/types/search"
export default defineStore({
  id: "searchHistory",
  state: (): SearchHistory => {
    return {
      list: [],
    };
  },
  actions: {
    setSearchList(arr:[]):void {
      this.list = arr;
    },
    setSearchItem(item: Search, index: number) {
      this.list[index] = item;
    },
    addHistory(item:Search){
      if(!(this.list.some((s:Search)=>s.title == item.title))){
        this.list.push(item)
      }
    },
    clearHistory(){
      this.list.length = 0
    }
  },
  // 开启数据缓存
  persist: {
    enabled: true,
    strategies: [
      {
        storage: localStorage,
        paths: ["list"],
      },
    ],
  },
});