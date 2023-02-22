/*
 * @Author: zyk 997610780@qq.com
 * @Date: 2022-06-27 16:49:17
 * @LastEditors: 可达鸭 997610780@qq.com
 * @LastEditTime: 2023-02-22 23:18:03
 * @FilePath: \zyk-music-h5\src\enum-file\search-types.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
export interface searchType {
  value:number,
  name:string,
  listKey:string,
  countKey:string,
  component_name:string
}
export const searchTypes: searchType[] = [
  // {
  //   value: 1018,
  //   name: "综合",
  //   component: synthesis,
  //   listKey: "",
  //   countKey: "",
  // },
  {
    value: 1,
    name: "单曲",
    component_name:"kdySingle",
    listKey: "songs",
    countKey: "songCount",
  },
  {
    value: 1000,
    name: "歌单",
    listKey: "playlists",
    countKey: "playlistCount",
    component_name:"kdyPlaylist",
  },
  {
    value: 100,
    name: "歌手",
    listKey: "artists",
    countKey: "artistCount",
    component_name:"kdySinger",
  },
  {
    value: 1009,
    name: "播客",
    listKey: "djRadios",
    countKey: "djRadiosCount",
    component_name:"kdyPodcast",
  },
  {
    value: 1006,
    name: "歌词",
    listKey: "songs",
    countKey: "songCount",
    component_name:"kdyLyric",
  },
  {
    value: 10,
    name: "专辑",
    listKey: "albums",
    countKey: "albumCount",
    component_name:"kdyAlbum",
  },
  {
    value: 1002,
    name: "用户",
    listKey: "userprofiles",
    countKey: "userprofileCount",
    component_name:"kdyUser",
  },
];