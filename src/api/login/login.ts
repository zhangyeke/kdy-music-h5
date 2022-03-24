/*
 * @Author: your name
 * @Date: 2022-03-19 20:27:21
 * @LastEditTime: 2022-03-24 14:59:35
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \zyk-music-h5\src\api\login.ts
 */
import kdyAxios from "@/assets/lib/http"
// 歌手分类列表
export const artistList = kdyAxios.get('/shop/api.goods/getBestGoods')
