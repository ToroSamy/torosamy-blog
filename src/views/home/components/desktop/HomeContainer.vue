<script setup>
import { ref, computed } from 'vue';
import { ElMessage } from 'element-plus';
import DesktopView1 from './DesktopView1.vue';
import DesktopView2 from './DesktopView2.vue';
const dayIndex = new Date().getDay()
const dayOfWeek = computed(() => {
  const days = ['日', '一', '二', '三', '四', '五', '六'];
  return days[dayIndex];
});
const audioSrc = '@/../music.mp3';
const audio = ref(null);
const isPlaying = ref(false);
const tempCommand = () => {
  ElMessage.success('尽情期待')
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
  if (dayIndex === 4) vivoRef.value.open()
  else ElMessage.success('今天是星期' + dayOfWeek.value + ' 但也可以vivo50')

}
</script>

<template>
  <audio ref="audio" :src="audioSrc" loop></audio>
  <el-carousel style="height: 52.25rem; position: relative;" direction="vertical" :autoplay="false">
    <DesktopView1></DesktopView1>
    <DesktopView2></DesktopView2>
  </el-carousel>

  <div class="icon-group">
    <img src="../../assets/button/music.png" :class="{ 'little-icon': true, 'rotate': isPlaying }"
      @click="playMusicCommand">
    <img class="little-icon" src="../../assets/button/kfc.png" v-if="dayIndex === 4" @click="vivo50Command">
    <img class="little-icon" src="../../assets/button/day.png" v-else @click="vivo50Command">
    <!-- <img src="../../assets/button/kfc.png" class="little-icon" @click="tempCommand"> -->
    <img src="../../assets/button/more.png" class="little-icon" @click="tempCommand">
  </div>
</template>


<!-- <template>
  <img src="../../assets/no-design-desktop.jpg"
    style="width: 100vw; height: 100vh; margin: 0;  filter:blur(1px) brightness(50%) contrast(125%) saturate(200%);">
  </img>
</template> -->

<style scoped>
@keyframes profile {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}

.icon-group {
  position: absolute;
  top: 37vh;
  /* 根据需要调整位置 */
  right: 2vw;
  /* 根据需要调整位置 */
  z-index: 10;
  /* 确保在 el-carousel 上方 */
  background-color: #678dd4;
  border-radius: 10px;
  border: 1px solid #d3d3d3;
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
