/*
 * @Author: your name
 * @Date: 2022-03-24 17:34:29
 * @LastEditTime: 2022-03-24 17:40:18
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \zyk-music-h5\tailwind.config.ts
 */
import Typography from 'windicss/plugin/typography'
import { defineConfig } from 'windicss/helpers'

export default defineConfig({
  darkMode: 'class',
	attributify: true,
  plugins: [Typography]
})