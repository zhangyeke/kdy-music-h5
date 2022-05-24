export interface searchType {
  value:number,
  name:string,
  component?:any,
}
import synthesis from "@/pages/home/components/synthesis/synthesis.vue";
import singleList from "@/pages/home/components/single-list/single-list.vue";
export const searchTypes:searchType[] = [
  {
    value:1018,
    name:"综合",
    component:synthesis,
  },
  {
    value:1,
    name:"单曲",
    component:singleList

  },
  {
    value:1000,
    name:"歌单"
  },
  {
    value:100,
    name:"歌手"
  },
  {
    value:1009,
    name:"播客"
  },
  {
    value:1006,
    name:"歌词"
  },
  {
    value:10,
    name:"专辑"
  },
  {
    value:1002,
    name:"用户"
  },
]