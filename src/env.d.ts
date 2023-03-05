/*
 * @Author: your name
 * @Date: 2022-03-19 19:58:54
 * @LastEditTime: 2023-03-05 18:06:09
 * @LastEditors: 可达鸭 997610780@qq.com
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \zyk-music-h5\src\env.d.ts
 */
/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}

// 环境变量的类型推断
interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string
  readonly VITE_API_URL:string
  readonly VITE_BASE_PATH:string
  // 更多环境变量...
}

// interface ImportMeta {
//   readonly VITE_APP_TITLE: ImportMetaEnv
//   readonly VITE_API_URL:ImportMetaEnv
// }
