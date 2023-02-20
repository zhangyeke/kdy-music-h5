/*
 * @Author: zyk 997610780@qq.com
 * @Date: 2022-06-27 16:49:17
 * @LastEditors: zyk 997610780@qq.com
 * @LastEditTime: 2023-02-20 18:26:38
 * @FilePath: \zyk-music-h5\src\enum-file\search-types.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
export interface searchType {
  value:number,
  name:string,
  component?:any,
  listKey:string,
  countKey:string,
}
// import synthesis from "@/pages/home/components/synthesis/synthesis.vue";
import singleList from "@/pages/home/components/single-list/single-list.vue";
import playlist from "@/pages/home/components/playlist/playlist.vue";
import singerList from "@/pages/home/components/singer-list/singer-list.vue";
import podcastList from "@/pages/home/components/podcast-list/podcast-list.vue";
import lyricList from "@/pages/home/components/lyric-list/lyric-list.vue";
import albumList from "@/pages/home/components/album-list/album-list.vue";
import userList from "@/pages/home/components/user-list/user-list.vue";
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
    component: singleList,
    listKey: "songs",
    countKey: "songCount",
  },
  {
    value: 1000,
    name: "歌单",
    listKey: "playlists",
    countKey: "playlistCount",
    component: playlist,
  },
  {
    value: 100,
    name: "歌手",
    listKey: "artists",
    countKey: "artistCount",
    component:singerList,
  },
  {
    value: 1009,
    name: "播客",
    listKey: "djRadios",
    countKey: "djRadiosCount",
    component:podcastList,
  },
  {
    value: 1006,
    name: "歌词",
    listKey: "songs",
    countKey: "songCount",
    component:lyricList,
  },
  {
    value: 10,
    name: "专辑",
    listKey: "albums",
    countKey: "albumCount",
    component:albumList,
  },
  {
    value: 1002,
    name: "用户",
    listKey: "userprofiles",
    countKey: "userprofileCount",
    component:userList,
  },
];