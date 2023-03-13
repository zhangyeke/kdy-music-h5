/*
 * @Author: zyk 997610780@qq.com
 * @Date: 2023-03-01 17:06:32
 * @LastEditors: zyk 997610780@qq.com
 * @LastEditTime: 2023-03-13 17:14:13
 * @FilePath: \zyk-music-h5\src\enum-file\public.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

// 个人中心工具栏
export const myTools = [
  {
    name:"最近播放",
    iconName:"bofang2",
    namespace:"kdy-icon",
    path:"/latelyPlayed"
  },
  {
    name:"云盘",
    iconName:"yunpan",
    namespace:"kdy-icon",
    path:""
  },
  {
    name:"已购",
    iconName:"goumai-mianxing",
    namespace:"kdy-icon",
    path:""
  },
  {
    name:"收藏和赞",
    iconName:"shoucang",
    namespace:"kdy-icon",
    path:""
  },
  {
    name:"我的好友",
    iconName:"tianchongxing-",
    namespace:"kdy-icon",
    path:""
  },
]

// 最近播放tab
export const latelyPlayedTabs = [
  {
    name:"歌曲",
    value:"song",
    component_name:"kdySingle",
  },

  {
    name:"歌单",
    value:"playlist",
    component_name:"kdyPlaylist",
  },
  {
    name:"专辑",
    value:"album",
    component_name:"kdyAlbum",
  },
  {
    name:"播客",
    value:"dj",
    component_name:"kdyPodcast",
  },
]