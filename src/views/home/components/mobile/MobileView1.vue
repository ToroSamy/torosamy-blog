<script setup>
import { ref, computed } from 'vue'
import MessageDialog from '../common/MessageDialog.vue';
const diglog = ref()
const dayIndex = new Date().getDay()
const dayOfWeek = computed(() => {
  const days = ['日', '一', '二', '三', '四', '五', '六'];
  return days[dayIndex];
});
const audioSrc = '@/../music-mobile.mp3';
const audio = ref(null);
const isRotating = ref(false);
const playMusicCommand = () => {
  isRotating.value = !isRotating.value;
  if (isRotating.value) {
    audio.value.play();
    ElMessage.success('开始播放')
  } else {
    audio.value.pause();
    ElMessage.success('暂停成功')
  }
}
const vivo50Command = () => {
  if (dayIndex === 4) ElMessage.success('vivo50')
  else {
    ElMessage.success('今天是星期' + dayOfWeek.value + ' 但也可以vivo50')
  }
}

const sendMessageCommand = () => {
  diglog.value.open()
}

</script>

<template>
  <audio ref="audio" :src="audioSrc" loop></audio>
  <MessageDialog ref="diglog"></MessageDialog>
  <el-carousel-item>
    <div class="background"></div>

    <div class="container">

      <div class="info-box">
        <div class="header-box">
          <img class="profile-picture" src="../../assets/profile.png">
          <div class="word-box">
            <div class="top-word">Welcome~ </div>
            <div class="bottom-word">这里是Torosamyの小窝</div>
          </div>
        </div>
        <div class="text-1">如果你能在浪费时间中获得乐趣，那就不是浪费时间。</div>
        <div class="text-2">I KNOW EVERYTHING HAPPENS FOR A REASON, BUT WHAT THE FU*K</div>
      </div>


      <ul class="code-language shared-box" style="overflow: auto">
        <li class="message-box-item">Java Kotlin Go</li>
        <li class="message-box-item">Python C/Cpp rust</li>
        <li class="message-box-item">html+css+js ts</li>
        <li class="message-box-item">And More ! </li>
      </ul>

      <ul class="technology-stack shared-box" style="overflow: auto">
        <li class="message-box-item">vue bukkit </li>
        <li class="message-box-item">SpringBoot Ros2</li>
        <li class="message-box-item">Bukkit openCV</li>
        <li class="message-box-item">And More ! </li>
      </ul>

      <div class="button-box">
        <img :class="{ 'little-icon': true, 'rotate': isRotating }" src="../../assets/button/music.png"
          @click="playMusicCommand">
        <img class="little-icon" src="../../assets/button/kfc.png" v-if="dayIndex === 4" @click="vivo50Command">
        <img class="little-icon" src="../../assets/button/day.png" v-else @click="vivo50Command">
        <img class="little-icon" src="../../assets/button/message.png" @click="sendMessageCommand">
      </div>

    </div>

  </el-carousel-item>
</template>

<style scoped>
.background {
  width: 100%;
  height: 100%;
  background: inherit;
  filter: brightness(75%) contrast(100%) saturate(150%);
}

.el-carousel__item {
  background-image: url(../../assets/background-mobile.jpg);
  background-size: cover;
  width: 100%;
  height: 100vh;
}

.container {
  display: flex;
  flex-direction: column;
}

.info-box {
  margin-top: 3rem;
  margin-left: 3rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  position: absolute;
  top: 0;
  left: 0;
  width: 50%;
  height: 15rem;
  background-color: rgba(90, 86, 86, 0.4);
  border-radius: 10px;
  border: 1px solid #5a5656;
  padding: 0rem 1rem;
}

.shared-box {
  margin-left: 2rem;
  position: absolute;
  top: 0;
  left: 0;
  width: 30%;
  height: 25rem;
  background-color: rgba(90, 86, 86, 0.4);
  border-radius: 10px;
  border: 1px solid #5a5656;
  padding: 0rem 1rem;
}

.code-language {
  margin-top: 20rem;
}

.technology-stack {
  margin-top: 47rem;
}

.message-box-item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 6rem;
  background-color: rgba(165, 165, 165, 0.5);
  margin: 1rem 0rem;
  color: white;
  font-size: 2rem;
}

.button-box {
  margin-top: 75rem;
  margin-left: 3rem;
  position: absolute;
  top: 0;
  left: 0;
  width: 35%;
  height: 6rem;
  background-color: rgba(90, 86, 86, 0.4);
  border-radius: 10px;
  border: 1px solid #5a5656;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.little-icon {
  margin: 0 0.3rem;
  width: 6rem;
  height: 6rem;
  transition: filter 0.3s ease;
}

.little-icon:hover {
  filter: brightness(0.7);
}

.header-box {
  display: flex;
  width: 100%;
  padding: 0.5rem 1em;
  flex-direction: row;
}

.header-box .profile-picture {
  width: 100px;
  height: 100px;
  margin-right: 1rem;
}

.word-box {
  color: white;
  font-family: 'Comic Sans MS';
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.word-box .top-word {
  font-size: 1.5rem;
}

.word-box .bottom-word {
  font-size: 2rem;
}

.text-1 {
  margin-top: 0.5rem;
  color: white;
  font-size: 1.2rem;
}

.text-2 {
  margin-top: 0.6rem;
  color: white;
  font-size: 0.8rem;
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