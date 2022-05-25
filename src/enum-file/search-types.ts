export interface searchType {
  value:number,
  name:string,
  component?:any,
  listKey:string,
  countKey:string,
}
import synthesis from "@/pages/home/components/synthesis/synthesis.vue";
import singleList from "@/pages/home/components/single-list/single-list.vue";
export const searchTypes: searchType[] = [
  {
    value: 1018,
    name: "综合",
    component: synthesis,
    listKey: "",
    countKey: "",
  },
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
  },
  {
    value: 100,
    name: "歌手",
    listKey: "artists",
    countKey: "artistCount",
  },
  {
    value: 1009,
    name: "播客",
    listKey: "djRadios",
    countKey: "djRadiosCount",
  },
  {
    value: 1006,
    name: "歌词",
    listKey: "songs",
    countKey: "songCount",
  },
  {
    value: 10,
    name: "专辑",
    listKey: "albums",
    countKey: "albumCount",
  },
  {
    value: 1002,
    name: "用户",
    listKey: "userprofiles",
    countKey: "userprofileCount",
  },
];