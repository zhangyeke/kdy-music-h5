/*
 * @Author: 可达鸭 997610780@qq.com
 * @Date: 2023-02-26 14:16:21
 * @LastEditors: 可达鸭 997610780@qq.com
 * @LastEditTime: 2023-02-26 14:27:44
 * @FilePath: \zyk-music-h5\src\types\routeMeta.d.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import "vue-router"

declare module 'vue-router'{
  interface RouteMeta {
    title:string
  }
}