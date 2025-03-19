<script setup>
import { ref } from 'vue';

const audioInstance = ref(null);
const isPlaying = ref(false);
const playMusicCommand = () => {
  isPlaying.value = !isPlaying.value;
  if (isPlaying.value) {
    audioInstance.value.play();
    //ElMessage.success('开始播放');
  } else {
    audioInstance.value.pause();
    //ElMessage.success('暂停成功');
  }
};


</script>

<template>
    <img src="./music.png" :class="{ 'little-icon': true, 'rotate': isPlaying }" @click="playMusicCommand">
    <audio ref="audioInstance" src="./music.mp3" loop></audio>
</template>


<style scoped>
@keyframes profile {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.little-icon {
  color: rgb(5, 238, 255);
  transition: filter 0.3s ease;
  margin: 0.5vw;
}

.little-icon:hover {
  filter: brightness(0.7);
}

.rotate {
  animation: profile 5s linear infinite;
}

/* 电脑端样式 */
.little-icon {
  width: 1.8vw;
}

/* 手机端样式 */
@media (max-width: 768px) { /* 768px 是一个常见的手机屏幕宽度阈值 */
  .little-icon {
    width: 7vw;
  }
}
</style>
