/*
 * @Author: your name
 * @Date: 2022-03-24 16:59:03
 * @LastEditTime: 2022-03-25 16:56:19
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \zyk-music-h5\postcss.config.js
 */

module.exports = {
    plugins: {
        'postcss-px-to-viewport': {
            viewportWidth: 375,
            viewportUnit: "vw", //指定需要转换成的视窗单位，建议使用vw
            unitToConvert: 'px',
            unitPrecision: 3, // 指定`px`转换为视窗单位值的小数位数
            minPixelValue: 1, // 小于或等于`1px`不转换为视窗单位，你也可以设置为你想要的值
            propList: ['*'],
            mediaQuery: false // 允许在媒体查询中转换`px`
        }
    }
}