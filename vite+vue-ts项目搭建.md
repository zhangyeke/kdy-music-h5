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

