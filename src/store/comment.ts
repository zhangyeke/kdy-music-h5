/*
 * @Author: zyk 997610780@qq.com
 * @Date: 2023-02-27 13:44:34
 * @LastEditors: zyk 997610780@qq.com
 * @LastEditTime: 2023-02-27 14:41:08
 * @FilePath: \zyk-music-h5\src\store\comment.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { defineStore } from "pinia";
import { SongsList } from "@/types/songList";
import { Song, Album } from "@/types/song";
import { Artist,User } from "@/types/user";
interface CommentState {
  cover: string;
  author: User | Artist[] | null;
  title: string;
}
const commentStore = defineStore({
  id: "commentStore",
  state: (): CommentState => {
    return {
      cover: "",
      author: null,
      title: "",
    };
  },
  actions: {
    setCommentObj<P extends Song | SongsList | Album>(obj: P, type: number) {
      this.title = obj.name
      switch (type) {
        case 0:
          this.cover = obj.al.picUrl;
          this.author = obj.ar;
          break;
        case 2:
          this.cover = obj.coverImgUrl;
          this.author = obj.creator;
          break;
        case 3:
          this.cover = obj.picUrl;
          this.author = obj.artists;
          break;
      }
    },
  },
  getters: {},
});

export default commentStore;
