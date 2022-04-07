<template>
  <div>
    <div class="player" :style="[{ backgroundColor: bgColor, }]">
      <img class="music_poster" :src="tool.getAssetsImages('image/kdy.png')" />
      <div class="music">
        <span class="music_name">歌曲名称</span>
        <span class="mx-5px">-</span>
        <span class="music_author">作者名字</span>
      </div>
      <div class="player_btn">
        <div class="progress"></div>
        <var-icon class="btn_icon" namespace="kdy-icon" name="bofang" size="10" />
      </div>
      <div class="list_btn">
        <var-icon namespace="kdy-icon" name="bofangliebiao" :size="tool.px2vw(20)"/>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
let prop = defineProps({
  bgColor: {
    type: String,
    default: '#fff'
  },

})
let tool = useTool()

</script>

<style scoped lang="scss">
.player {
  display: flex;
  align-items: center;
  padding: 0 20px;
  .list_btn {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 20px;
  }
  &_btn {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 5px;
    border-radius: 50%;
    border: 1px solid #ccc;
    .btn_icon {
      transform: translateX(1.5px);
    }
  }
  .music {
    flex: 1 1 0%;
    margin-left: 8px;
    vertical-align: middle;
    font-size: 10px;

    color: #666;
    &_name {
      font-size: 14px;
      font-weight: 700;
      color: var(--color-text);
    }
  }
  .music_poster {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    border: 5px solid #000;
    animation: rotating 10s linear infinite;
    @keyframes rotating {
      0% {
      }
      100% {
        transform: rotate(360deg);
      }
    }
  }
}
</style>