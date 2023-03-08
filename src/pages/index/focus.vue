<!--
 * @Author: 可达鸭 997610780@qq.com
 * @Date: 2022-04-13 21:03:59
 * @LastEditors: 可达鸭 997610780@qq.com
 * @LastEditTime: 2023-03-08 22:51:05
 * @FilePath: \zyk-music-h5\src\pages\index\focus.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div>

    <textarea v-model="code_text" placeholder="输入内容" class="mt-30px h-300px w-300px" @paste="pasteHandle"></textarea>
    <img :src="img_path" class="w-100px h-100px" v-if="img_path">
  </div>
</template>
<script setup lang="ts">
import qrcodeParser from 'qrcode-parser';
const img_path = ref("")
let code_text = ref("")
const pasteHandle = (e: ClipboardEvent) => {
  console.log(e, "kkk");
  let clipboardData = e.clipboardData!
  for (let i = 0; i < clipboardData.items.length; i++) {
    let item = clipboardData.items[i];
    if (item.kind == 'file' && item.type.match(/^image\//i)) {
      //blob就是剪贴板中的二进制图片数据
      let file: File = item.getAsFile()!;
      let reader = new FileReader();
      console.log(file, "这是？");
      reader.readAsDataURL(file)
      //定义fileReader读取完数据后的回调
      reader.onload = function (e) {
        let img = new Image()
        img.src = e.target!.result as string
        img.onload = (img_info) => {
          console.log(img_info, "图片信息", img.width, img.height);
          //解析二维码图片
          qrcodeParser(file).then((res:any) => {
            console.log(res);
            code_text.value = res;
          }).catch((err:any) => {
            console.log('error', err)
            code_text.value = "图片中未解析到数据";
          })
          img_path.value = img.src

        }
      }
    }
  }
}
</script>

<style scoped lang="scss"></style>