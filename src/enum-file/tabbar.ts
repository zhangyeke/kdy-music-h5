export interface TabBar {
  icon: string;
  activeIcon: string;
  title: string;
  pagePath: string;
}

export const tabBarList: Array<TabBar> = [
  {
    icon: `tabbar/faxian.png`,
    activeIcon: `tabbar/sel_faxian.png`,
    title: `发现`,
    pagePath: "/index",
  },
  {
    icon: `tabbar/boke.png`,
    activeIcon: `tabbar/sel_boke.png`,
    title: `播客`,
    pagePath: "/podcast",
  },
  {
    icon: `tabbar/wode.png`,
    activeIcon: `tabbar/sel_wode.png`,
    title: `我的`,
    pagePath: "/center",
  },
  {
    icon: `tabbar/guanzhu.png`,
    activeIcon: `tabbar/sel_guanzhu.png`,
    title: `关注`,
    pagePath: "/focus",
  },
  {
    icon: `tabbar/yuncun.png`,
    activeIcon: `tabbar/sel_yuncun.png`,
    title: `云村`,
    pagePath: "/community",
  },
];
