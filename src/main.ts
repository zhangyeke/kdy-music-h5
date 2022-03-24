/*
 * @Author: your name
 * @Date: 2022-03-16 19:45:06
 * @LastEditTime: 2022-03-24 17:54:57
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \zyk-music-h5\src\main.ts
 */
import 'virtual:windi.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

createApp(App).use(createPinia()).use(router).mount('#app')
