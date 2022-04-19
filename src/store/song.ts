import { defineStore } from "pinia";

const useSongStore = defineStore("songListStore", {
  state: () => {
    return {
      id: 0,//歌单id
      sid:0,//歌曲id
      songList:<any>[],//歌单
    };
  },
  actions:{
    getSongList(){

    },
    async getSongUrl(id:number){
      let res = await kdyAxios.get(`/song/url?id=${id}`)
      this.songList.push(...res.data)
      // window.localStorage.setItem('playSongList',this.songList)
    },
  }
});

export default useSongStore;
