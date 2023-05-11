
interface storageObj extends Object {
  [key:string]:any
}
class KdyStorage {
  constructor() {}
  getStorage(key: string,callBack?:Function): any {
    let data = window.localStorage.getItem(key);
    let result:storageObj | null = null;
    if(data){
      result = JSON.parse(data)
      if(result && result.hasOwnProperty(`${key}-aging`)){
        let now_time = new Date().getTime()
        let aging_time = result[`${key}-aging`]
        if(now_time > aging_time){
          typeof callBack == "function" && callBack()
          this.removeStorage(key)
          // console.error(key,"存储时间已到");
          return null
        }
      }
      return result!.data
    }
    return result
  }
  setStorage(key: string, value: any,aging?:number): void {
    let obj:storageObj = {
      data:value
    }
    if(aging){
      obj[`${key}-aging`] = new Date().getTime() + (aging * 60 * 60 * 1000)
    }
    window.localStorage.setItem(key, JSON.stringify(obj));
  }
  removeStorage(key: string): void {
    window.localStorage.removeItem(key);
  }
  clearStorage(): void {
    window.localStorage.clear();
  }
}

export default KdyStorage;
