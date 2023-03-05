/*
 * @Author: your name
 * @Date: 2022-03-19 17:59:48
 * @LastEditTime: 2023-03-04 20:52:55
 * @LastEditors: 可达鸭 997610780@qq.com
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \zyk-music-h5\src\plugin-config\index.ts
 */
import vue from '@vitejs/plugin-vue'
// import { viteMockServe } from 'vite-plugin-mock'
import components from 'unplugin-vue-components/vite'
import { VarletUIResolver } from 'unplugin-vue-components/resolvers'
import AutoImport from 'unplugin-auto-import/vite'
import WindiCSS from 'vite-plugin-windicss'
import vueSetupExtend from "vite-plugin-vue-setup-extend"
export default () => {
  return [
    vue(),
    WindiCSS(),
    vueSetupExtend(),
    // viteMockServe({
    //   mockPath: "mock"
    // }),
    components({
      dts: "./plugin-config/types/components.d.ts",
      resolvers:[VarletUIResolver()]
    }),
    AutoImport({
       // 目标文件
      include: [
        /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
        /\.vue$/, /\.vue\?vue/, // .vue
        /\.md$/, // .md
      ],
      // 需要全局导入的库
      imports:[
        "vue",
        "vue-router",
        'pinia',
        // 自定义全局导入
        {
          "@/assets/lib/index":[['default','useTool']]
        },
      ],
      resolvers:[],
      //声明文件生成位置和文件名称
      dts:"./plugin-config/types/auto-imports.d.ts",
      //eslit报错解决
      eslintrc: {
        enabled: false, // Default `false`
        filepath: './plugin-config/types/.eslintrc-auto-import.json', // Default `./.eslintrc-auto-import.json`
        globalsPropValue: true, // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
      },
    }),
  ]
}