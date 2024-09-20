<script setup>
import { ref } from 'vue';
import TopPage from './views/TopPage.vue'
import EndPage from './views/EndPage.vue'
import ViewPage1 from './views/ViewPage1.vue';
import ViewPage2 from './views/ViewPage2.vue';
import KfcDialog from '@/components/KfcDialog.vue';

const audioInstance = ref(null);
const isPlaying = ref(false);
const playMusicCommand = () => {
  isPlaying.value = !isPlaying.value;
  if (isPlaying.value) {
    audioInstance.value.play();
    ElMessage.success('开始播放');
  } else {
    audioInstance.value.pause();
    ElMessage.success('暂停成功');
  }
};


const dayIndex = new Date().getDay()

const kfcInstance = ref()
const kfcCommangd = () => {
  kfcInstance.value.open()
}



const tempCommand = () => {
  ElMessage.success('敬请期待')
}
</script>

<template>
  <el-carousel style="height: 100vh; position: relative; background-color: #1A1D26;" direction="vertical"
    :autoplay="false">
    <TopPage></TopPage>
    <ViewPage1></ViewPage1>
    <ViewPage2></ViewPage2>
    <EndPage></EndPage>
  </el-carousel>

  <div class="icon-group">
    <img src="@/assets/images/button/music.png" :class="{ 'little-icon': true, 'rotate': isPlaying }"
      @click="playMusicCommand">
    <img src="@/assets/images/button/kfc.png" class="little-icon" v-if="dayIndex === 4" @click="kfcCommangd">
    <img src="@/assets/images/button/login.png" class="little-icon" @click="tempCommand">
    <img src="@/assets/images/button/more.png" class="little-icon" @click="tempCommand">
  </div>


  <KfcDialog ref="kfcInstance"></KfcDialog>
  <audio ref="audioInstance" src="@/../music-desktop.mp3" loop></audio>
</template>



<style scoped>
/* .test {
  background-image: url(../../assets/no-design-desktop.jpg);
  background-size: 100% 100%;
  filter: brightness(110%) contrast(100%) saturate(100%);
  width: 100vw;
  height: 100vh;
} */

@keyframes profile {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}


.icon-group {
  border: 1px solid #d3d3d3;
  position: absolute;
  top: 50%;
  right: 2vw;
  transform: translateY(-50%);
  z-index: 10;
  background-color: #678dd4;
  border-radius: 10px;
  padding: 1vw 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.little-icon {
  width: 4vw;
  height: 4vw;
  margin: 0 0.3vw;
  transition: filter 0.3s ease;
}

.little-icon:hover {
  filter: brightness(0.7);
}

.rotate {
  animation: profile 5s linear infinite;
}
</style>
