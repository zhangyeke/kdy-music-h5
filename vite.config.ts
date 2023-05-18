/*
 * @Author: your name
 * @Date: 2022-03-16 19:45:06
 * @LastEditTime: 2023-03-13 19:41:26
 * @LastEditors: 可达鸭 997610780@qq.com
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \zyk-music-h5\vite.config.ts
 */
import { resolve } from 'path'
import { env } from 'process';
import { defineConfig } from 'vite'
import kdy from './plugin-config/index';


// https://vitejs.dev/config/
export default defineConfig({
  server: {
    hmr:true,
    // 开发环境端口
    port:4000,
    // 本地跨域配置
    proxy: {
      "^/api":{
        target:"http://43.136.82.129:3000",
        changeOrigin:true,
        rewrite: (path) => {
          return path.replace(/^\/api/, '')
        },

      }
    },
  },
  // 打包配置
  build: {
    minify: "terser",
    assetsDir:"static",
    terserOptions: {
      // 自定义压缩
      compress: {
        // 删除log 和debug语句
        drop_console: true,
        drop_debugger: true,
      },
    },
    rollupOptions: {
      output: {
        // 全部js打包配置
        chunkFileNames: "js/[name]-[hash].js",
        // 入口文件配置 index.js
        entryFileNames: "js/[name]-[hash].js",
        // 静态资源分包
        assetFileNames: "[ext]/[name]-[hash].[ext]",
      },
    },
  },
  base: env.VITE_BASE_PATH,
  resolve: {
    alias: {
      "@/": `${resolve(__dirname, "src")}/`,
      cmp: `${resolve(__dirname, "src/components/")}`,
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/style/global.scss";`,
      },
    },
  },
  plugins: [kdy()],
});
