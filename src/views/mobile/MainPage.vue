<script setup>
import { ref } from 'vue'
import KfcDialog from '@/components/KfcDialog.vue';
import TopPage from './views/TopPage.vue';
import EndPage from './views/EndPage.vue';
import MessageDialog from './components/MessageDialog.vue';
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

const messageDialogInstance = ref()
const openMessageDialog = () => {
  messageDialogInstance.value.open()
}


const tempCommand = () => {
  ElMessage.success('敬请期待')
}
</script>

<template>

  <el-carousel style="height: 100vh; position: relative;" direction="vertical" :autoplay="false">
    <TopPage></TopPage>
    <EndPage></EndPage>
    <!-- <MobileView3></MobileView3> -->
  </el-carousel>


  <div class="function-box">
    <img :class="{ 'little-icon': true, 'rotate': isRotating }" src="@/assets/images/button/music.png"
      @click="playMusicCommand">
    <img class="little-icon" src="@/assets/images/button/login.png" @click="tempCommand">
    <img class="little-icon" src="@/assets/images/button/message.png" @click="openMessageDialog">
    <img class="little-icon" src="@/assets/images/button/kfc.png" v-if="dayIndex === 4" @click="kfcCommangd">
    <img class="little-icon" src="@/assets/images/button/more.png" @click="tempCommand">
  </div>

  <MessageDialog ref="messageDialogInstance"></MessageDialog>
  <KfcDialog ref="kfcInstance"></KfcDialog>
  <audio ref="audioInstance" src="@/../music-mobile.mp3" loop></audio>
</template>

<style scoped>
.function-box {
  /* 边框 */
  background-color: rgba(90, 86, 86, 0.4);
  border-radius: 10px;
  border: 1px solid #5a5656;
  /* 布局 */
  display: flex;
  justify-content: center;
  align-items: center;
  /* 边距 */
  padding: 1vh 5vw;
  position: absolute;
  top: 88vh;
  /* 根据需要调整位置 */
  left: 5vw;
  /* 根据需要调整位置 */
  z-index: 10;
  /* 确保在 el-carousel 上方 */
}

.little-icon {
  margin: 0 1vw;
  width: 10vw;
  height: auto;
  transition: filter 0.3s ease;
}

.little-icon:hover {
  filter: brightness(0.7);
}

.rotate {
  animation: profile 5s linear infinite;
}

@keyframes profile {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}
</style>
