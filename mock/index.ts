/*
 * @Author: your name
 * @Date: 2022-03-24 13:42:10
 * @LastEditTime: 2022-03-24 14:01:53
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \zyk-music-h5\mock\index.ts
 */
// test.ts

import { MockMethod } from 'vite-plugin-mock'
import {mock} from "mockjs"
export default [
  {
    url: '/api/getNameList',
    method: 'get',
    response: ({ query }) => {
      return {
        code: 0,
        data: mock({
          "list|1-10":[
            {
              "name":"@cname()"
            }
          ]
        })
      }
    },
  },
  {
    url: '/api/getTitleList',
    method: 'get',
    response: ({ query }) => {
      return {
        code: 0,
        data: mock({
          "list|1-10":[
            {
              "name":"@ctitle()"
            }
          ]
        })
      }
    },
  },
] as MockMethod[]