class KdyStorage {
  aging: number = 0; //过期时间 分
  constructor() {}
  setAging(aging: number) {
    this.aging = aging;
  }
  getStorage(key: string): any {
    let data = window.localStorage.getItem(key);
    if (data) {
      if (window.localStorage.getItem("aging")) {
        let old_time =
          JSON.parse(window.localStorage.getItem("aging") || "") +
          this.aging * 60 * 1000;
        let now_time = new Date().getTime();
        if (this.aging > 0 && now_time >= old_time) {
          this.removeStorage(key);
          return { status: 0, msg: "存储时间已到!" };
        } else {
          return JSON.parse(window.localStorage.getItem(key) || "");
        }
      } else {
        return JSON.parse(data || "");
      }
    }else{
      return ""
    }
  }
  setStorage(key: string, value: any): void {
    window.localStorage.setItem(key, JSON.stringify(value));
    this.aging &&
      window.localStorage.setItem(
        "aging",
        JSON.stringify(new Date().getTime())
      );
  }
  removeStorage(key: string): void {
    window.localStorage.removeItem(key);
  }
  clearStorage(): void {
    window.localStorage.clear();
  }
}

export default KdyStorage;
