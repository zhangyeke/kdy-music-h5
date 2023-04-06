/*
 * @Author: zyk 997610780@qq.com
 * @Date: 2023-03-01 17:06:32
 * @LastEditors: zyk 997610780@qq.com
 * @LastEditTime: 2023-03-22 16:54:41
 * @FilePath: \zyk-music-h5\src\enum-file\public.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

// 首页tab

export const indexTabs = [
  {
    name:"每日推荐",
    icon:"image/index_tab/daily.jpg",
    path:"/everyDayRmd"
  },
  {
    name:"歌单",
    icon:"image/index_tab/playlist.jpg",
    path:"/playlistSquare"
  },
  {
    name:"歌手",
    icon:"image/index_tab/singer.png",
    path:"/singerCategory"
  },
  {
    name:"排行榜",
    icon:"image/index_tab/rank.jpg",
    path:"/rank"
  }
]


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
    path:"/cloudDisk"
  },
  {
    name:"已购",
    iconName:"goumai-mianxing",
    namespace:"kdy-icon",
    path:"/purchased"
  },
  {
    name:"我的收藏",
    iconName:"shoucang",
    namespace:"kdy-icon",
    path:"/collect"
  },
  {
    name:"我的好友",
    iconName:"tianchongxing-",
    namespace:"kdy-icon",
    path:"/goodFriend"
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

export const genderList = [
  {
    name:"保密",
    value:0
  },
  {
    name:"男",
    value:1
  },
  {
    name:"女",
    value:2
  },

]

// 收藏 tab
export const collectTabs = [
  {
    name:"专辑",
    component_name:"kdyAlbum",
    api_url:"/album/sublist"
  },

  {
    name:"MV",
    component_name:"kdyVideo",
    api_url:"/mv/sublist",
  },
  // {
  //   name:"专栏",
  //   component_name:"kdySingle",
  //   api_url:"/topic/sublist",
  // },

]