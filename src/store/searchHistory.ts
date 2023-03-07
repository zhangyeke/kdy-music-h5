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
    delHistory(v:string){
      this.list = this.list.filter(item=>item.title != v)
    },
    setSearchList(arr:[]):void {
      this.list = arr;
    },
    setSearchItem(item: Search, index: number) {
      this.list[index] = item;
    },
    addHistory(item:Search | string){
      if(typeof item == 'string'){
        if(!(this.list.some((s:Search)=>s.title == item))){
          this.list.unshift({ title: item, id: this.list.length + 1 });
        }
      }else{
        if(!(this.list.some((s:Search)=>s.title == item.title))){
          this.list.unshift(item)
        }
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