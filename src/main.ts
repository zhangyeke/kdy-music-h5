/*
 * @Author: your name
 * @Date: 2022-03-16 19:45:06
 * @LastEditTime: 2022-04-22 14:11:22
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \zyk-music-h5\src\main.ts
 */
import App from './App.vue'
import router from './router'
import 'virtual:windi.css'
import "@/assets/style/global.scss"
import "@/assets/style/font.css"
import piniaPluginPersist from 'pinia-plugin-persist'
const app = createApp(App)
const pinia = createPinia()
pinia.use(piniaPluginPersist)
app.use(pinia).use(router).mount('#app')

