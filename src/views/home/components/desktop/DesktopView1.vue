<script setup>
import AudioPlayer from '../common/AudioPlayer.vue';
import { ArrowUpBold, ArrowDownBold } from '@element-plus/icons-vue'
</script>

<template>
  <el-carousel-item>
    <AudioPlayer />
    <div class="background"></div>

    <div class="content">
      <div class="main-box">
        <div class="title-word">测试</div>
      </div>
      <div class="icon-group">
        <span class="little-img">文字</span>
        <span class="little-img">文字</span>
      </div>
    </div>
  </el-carousel-item>
</template>

<style scoped>
.background {
  width: 100%;
  height: 100%;
  background: inherit;
  filter: brightness(25%) contrast(100%) saturate(150%);
}

.el-carousel__item {
  background-image: url(../../assets/background.jpg);
  background-size: cover;
  width: 100%;
  height: 52.25rem;
}

.content {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}

.main-box {
  background-color: rgba(22, 96, 232, 0.4);
  border-radius: 10px;
  border: 1px solid #d3d3d3;
  padding: 3rem 5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .title-word {
    color: white;
    font-size: 10rem;
  }
}

.icon-group {
  background-color: #678dd4;
  border-radius: 10px;
  border: 1px solid #d3d3d3;
  padding: 1rem 1rem;
  margin-right: 3rem;
  margin-left: 25rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
}

.little-img {
  color: white;
}
</style>
