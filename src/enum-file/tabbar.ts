
export interface TabBar{
  icon:string,
  activeIcon:string,
  title:string,
}

export const tabBarList:Array<TabBar> = [
  {
    icon:"@/assets/tabbar/faxian.png",
    activeIcon:"@/assets/tabbar/sel_faxian.png",
    title:"发现"
  },
  {
    icon:"@/assets/tabbar/boke.png",
    activeIcon:"@/assets/tabbar/sel_boke.png",
    title:"播客"
  },
  {
    icon:"@/assets/tabbar/wode.png",
    activeIcon:"@/assets/tabbar/sel_wode.png",
    title:"我的"
  },
  {
    icon:"@/assets/tabbar/guanzhu.png",
    activeIcon:"@/assets/tabbar/sel_guanzhu.png",
    title:"关注"
  },
  {
    icon:"@/assets/tabbar/yuncun.png",
    activeIcon:"@/assets/tabbar/sel_yuncun.png",
    title:"云村"
  },
]
