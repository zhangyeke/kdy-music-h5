/*
 * @Author: your name
 * @Date: 2022-03-16 19:45:06
 * @LastEditTime: 2023-02-09 16:28:56
 * @LastEditors: zyk 997610780@qq.com
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \zyk-music-h5\src\main.ts
 */
import App from './App.vue';
import router from './router';
import pinia from "@/store/index";
import 'virtual:windi.css';
// import "@/assets/style/global.scss"
import "@/assets/style/font.css";
import '@varlet/ui/es/style';
import Varlet from '@varlet/ui';
const app = createApp(App)

app.use(pinia).use(Varlet).use(router).mount('#app')

