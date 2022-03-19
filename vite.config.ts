/*
 * @Author: your name
 * @Date: 2022-03-16 19:45:06
 * @LastEditTime: 2022-03-19 18:11:08
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \zyk-music-h5\vite.config.ts
 */
import { resolve } from 'path'
import { defineConfig } from 'vite'
import zyk from './src/plugin-config/index';
// https://vitejs.dev/config/
export default defineConfig({
  server: {
    // 开发环境端口
    port:4000,
    // 本地跨域配置
    proxy: {},
  },
  // 打包配置
  build: {
    minify: "terser",
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
  base: "./",
  resolve: {
    alias: {
      "@/": `${resolve(__dirname, "src")}/`,
      cmp: `${resolve(__dirname, "src/components/")}`,
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@/assets/style/global.scss" as *;`,
      },
    },
  },
  plugins: [zyk()],
});
