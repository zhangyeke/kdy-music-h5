# 1.vite+vue-ts搭建

## 1.1sass配置

安装sass

```js
npm install sass -D
```

如果未安装node-sass的话也需要安装该依赖

```js
npm install -D sass-loader node-sass sass
```

vite.config.ts添加配置或在main.ts中引入scss文件

```ts
export default defineConfig({
  //✨此处才是sass配置  
  css:{
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@/assets/style/common.scss" as *;`,
      },
    },
  },
});

//main.ts中
// 引入公共样式
import "./assets/style/common.scss"

```

## 1.2vite添加别名配置

**❤TIP❤**

在ts引入path，会出现报错

![在这里插入图片描述](https://img-blog.csdnimg.cn/c675bbc5d9474d77b0ced8f3d65fe9b7.png)

**✨解决方法✨**

安装@types/node

```js
npm install @types/node --save-dev
```

```ts
import { resolve } from 'path'
export default defineConfig({
  resolve: {
		alias: {
			'@/': `${resolve(__dirname, 'src')}/`
		}
  },
});
```

## 1.3vite本地服务器配置

```ts
export default defineConfig({
    server:{
        // 开发环境端口
        port:4000,
        // 本地跨域配置
        proxy: {
          //匹配/api开头的接口请求  
          "^/api":{
            target:"https://mingyangcanyin.zijieshop.com",//后端接口域名
            changeOrigin:true,//开启跨域
            rewrite: (path) => {
              return path.replace(/^\/api/, '')//将/api/替换成‘’
            },
          }
        },
    }
});
```

## 1.4vite打包配置

```ts
export default defineConfig({
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
});
```

## 1.5vite的生产环境和开发环境配置

### 1.开发环境

**💖TIP💖**

使用import.meta.env查看当前环境

```ts
console.log(import.meta.env,"环境");
```

创建.env.development文件在vite.config.ts同级目录下

.env.development文件内容

```ts
VITE_API_URL = "/api"  //api地址
VITE_APP_TITLE = "可达鸭音乐" //项目标题
```

在上面创建了变量之后 需要在env.d.ts中声明推断类型

```ts
// 环境变量的类型推断
interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string
  readonly VITE_API_URL:string
  // 更多环境变量...
}
```

### 2.生产环境

创建.env.production文件在vite.config.ts同级目录下

.env.production文件内容

```ts
VITE_API_URL = "https://www.baidu.com" // 生产环境域名
VITE_APP_TITLE = "可达鸭音乐"
```

**❤TIP❤**

如果你的env配置文件没有放在vite.config.ts同级目录下，可以通过一下配置项，来配置env文件在哪个目录下

```ts
export default defineConfig({
    //用于加载 .env 文件的目录。可以是一个绝对路径，也可以是相对于项目根的路径。
    envDir:`${resolve(__dirname)}/src/env`,
})
```

## 1.6vite-plugin-mock配置

安装   github地址：https://github.com/vbenjs/vite-plugin-mock/blob/HEAD/README.zh_CN.md

```ts
npm i vite-plugin-mock mockjs  -D
```

vite配置

```ts
import { viteMockServe } from 'vite-plugin-mock'
export default defineConfig({
    plugins:[
      viteMockServe({
      	mockPath:"mock"//mock接口文件存储目录
      })
    ]
})
```

mock/index.ts文件内容

mockjs使用文档：http://mockjs.com/examples.html#String

```ts

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
] as MockMethod[]
```

## 1.7axios配置和封装

安装

```ts
$ npm install axios
```

## 1.8VarletUI库按需引入

安装VarletUI库

```ts
npm i @varlet/ui -S
```

安装插件 unplugin-vue-components的官方文档 https://github.com/antfu/unplugin-vue-components

```ts
npm i unplugin-vue-components -D
```

**vite配置** 官方示例 https://varlet.gitee.io/varlet-ui/#/zh-CN/importOnDemand

```ts
import components from 'unplugin-vue-components/vite'
import { VarletUIResolver } from 'unplugin-vue-components/resolvers'
export default defineConfig({
  plugins: [
    components({
      resolvers: [VarletUIResolver()]
    })
  ]
})
```

## 1.9API自动引入

安装插件

```
npm i -D unplugin-auto-import
```

vite配置

```ts

import AutoImport from 'unplugin-auto-import/vite'
export default defineConfig({
    plugins:[
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
        // 自定义全局导入
        {
          "@/assets/lib/http":[['default','kdyAxios']],
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
})
```

## 2.0 WindiCSS配置

安装 官方文档 https://cn.windicss.org/integrations/vite.html

```
npm i -D vite-plugin-windicss windicss
```



# 2.浏览器适配

安装  参考文档：https://www.jianshu.com/p/87e3fa02604f/

```
npm i postcss-px-to-viewport -D
```

