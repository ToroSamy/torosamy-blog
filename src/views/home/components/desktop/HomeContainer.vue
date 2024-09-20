<script setup>
import { ref } from 'vue';
import { ElMessage } from 'element-plus';
import DesktopView1 from './DesktopView1.vue';
import DesktopView2 from './DesktopView2.vue';
import DesktopView3 from './DesktopView3.vue';
import HomeContainer from './MoreContent.vue';
const dayIndex = new Date().getDay()
const audioSrc = '@/../music.mp3';
const audio = ref(null);
const isPlaying = ref(false);
const tempCommand = () => {
  ElMessage.success('敬请期待')
}
const playMusicCommand = () => {
  isPlaying.value = !isPlaying.value;
  if (isPlaying.value) {
    audio.value.play();
    ElMessage.success('开始播放');
  } else {
    audio.value.pause();
    ElMessage.success('暂停成功');
  }
};
const vivoRef = ref()
const vivo50Command = () => {
  vivoRef.value.open()
}
</script>

<template>
  <!-- <div class="test"></div> -->
  <audio ref="audio" :src="audioSrc" loop></audio>
  <el-carousel style="height: 52.25rem; position: relative;" direction="vertical" :autoplay="false">
    <DesktopView1></DesktopView1>
    <DesktopView2></DesktopView2>
    <DesktopView3></DesktopView3>
    <HomeContainer></HomeContainer>
  </el-carousel>

  <div class="icon-group">
    <img src="../../assets/button/music.png" :class="{ 'little-icon': true, 'rotate': isPlaying }"
      @click="playMusicCommand">
    <img class="little-icon" src="../../assets/button/kfc.png" v-if="dayIndex === 4" @click="vivo50Command">
    <img src="../../assets/button/login.png" class="little-icon" @click="tempCommand">
    <img src="../../assets/button/more.png" class="little-icon" @click="tempCommand">
  </div>

  <custom-dialog ref="vivoRef" :show-close="false"
    style="width: 45vw; height: auto; background-color: rgba(0, 0, 0, 0); display: flex; justify-content: center; align-items: center;">
    <img src="@/assets/vivo50.png" style="width: 43vw; height: auto;"></img>
  </custom-dialog>
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
  padding: 1rem 0rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.little-icon {
  width: 4rem;
  height: 4rem;
  margin: 0 0.3rem;
  transition: filter 0.3s ease;
}

.little-icon:hover {
  filter: brightness(0.7);
}

.rotate {
  animation: profile 5s linear infinite;
}
</style>
