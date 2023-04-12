/*
 * @Author: zyk 997610780@qq.com
 * @Date: 2022-06-27 16:49:17
 * @LastEditors: zyk 997610780@qq.com
 * @LastEditTime: 2023-04-12 18:05:16
 * @FilePath: \zyk-music-h5\src\enum-file\tabbar.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
export interface TabBar {
  icon: string;
  activeIcon: string;
  title: string;
  pagePath: string;
}

export const tabBarList: Array<TabBar> = [
  {
    icon: `tabbar/home.png`,
    activeIcon: `tabbar/home_sel.png`,
    title: `首页`,
    pagePath: "/index",
  },
  {
    icon: `tabbar/style.png`,
    activeIcon: `tabbar/style_sel.png`,
    title: `曲风`,
    pagePath: "/musicStyle",
  },
  {
    icon: `tabbar/my.png`,
    activeIcon: `tabbar/my_sel.png`,
    title: `我的`,
    pagePath: "/center",
  },

];
