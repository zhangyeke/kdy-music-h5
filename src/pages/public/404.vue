<template>
  <div class="wrap">
  </div>
</template>

<script lang="ts" setup>

const init = ()=>{
  let script = document.createElement("script")
  script.type = 'text/javascript';
  script.src = `//qzonestyle.gtimg.cn/qzone/hybrid/app/404/search_children.js`;
  script.setAttribute('homePageUrl', '/')
  script.setAttribute('homePageName', '返回首页')
  document.getElementsByTagName('head')[0].appendChild(script);
  // let wrap = document.querySelector(".wrap")
}

onMounted(()=>{
  init()
})

</script>

<style scoped lang="scss">
// .wrap{
//   height: 100vh;
// }

</style>