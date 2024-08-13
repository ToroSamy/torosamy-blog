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

const oicqRef = ref()
const oicqCommand = () => {
  oicqRef.value.open()
}
const closeOicqDialog = () => {
  oicqRef.value.close()
}
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

  <el-carousel-item>
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


      <ul class="global-list" style="overflow: auto">
        <li class="list-item">Java</li>
        <li class="list-item">Kotlin</li>
        <li class="list-item">Go</li>
        <li class="list-item">Python</li>
        <li class="list-item">C/Cpp</li>
        <li class="list-item">rust</li>
        <li class="list-item">html css</li>
        <li class="list-item">js ts</li>
        <li class="list-item">sql</li>
        <li class="list-item">And More ! </li>
      </ul>

      <ul class="global-list" style="overflow: auto">
        <li class="list-item">SpringBoot</li>
        <li class="list-item">Ros2</li>
        <li class="list-item">openCV</li>
        <li class="list-item">Vue</li>
        <li class="list-item">Bukkit </li>
        <li class="list-item">Linux </li>
        <li class="list-item">Mirai </li>
        <li class="list-item">And More ! </li>
      </ul>

      <div class="button-box">
        <img :class="{ 'little-icon': true, 'rotate': isRotating }" src="../../assets/button/music.png"
          @click="playMusicCommand">
        <img class="little-icon" src="../../assets/button/kfc.png" v-if="dayIndex === 4" @click="vivo50Command">
        <img class="little-icon" src="../../assets/button/day.png" v-else @click="oicqCommand">
        <img class="little-icon" src="../../assets/button/message.png" @click="sendMessageCommand">
      </div>

    </div>
  </el-carousel-item>
  <audio ref="audio" :src="audioSrc" loop></audio>
  <MessageDialog ref="diglog"></MessageDialog>
  <custom-dialog ref="oicqRef" style="width: 65vw; height: auto;">
    <img-content @click="closeOicqDialog">
      <template #title>
        <div style="font-size: 3vw;">腾讯已于2020年关闭QQ临时会话功能</div>
        <div style="font-size: 3vw;">您可以扫码联系龙猫哦</div>
      </template>
      <template #img>
        <img style="width: 50vw;height: auto;" src="@/assets/my-qq.jpg">
      </template>
    </img-content>
  </custom-dialog>
</template>

<style scoped>
.button-box {
  /* 边框 */
  background-color: rgba(90, 86, 86, 0.4);
  border-radius: 10px;
  border: 1px solid #5a5656;
  /* 大小 */
  width: 33vw;
  height: 5vh;
  /* 布局 */
  display: flex;
  justify-content: center;
  align-items: center;
  /* 边距 */
  padding: 1vh 5vw;
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


.global-list {
  /* 大小 */
  width: 33vw;
  height: 29vh;
  /* 边框 */
  background-color: rgba(90, 86, 86, 0.4);
  border-radius: 10px;
  border: 1px solid #5a5656;
  /* 边距 */
  padding: 0 1.5vw;
  margin-left: -3vw;
}


.list-item {
  margin-top: 0.8vh;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 5vh;
  background-color: rgba(165, 165, 165, 0.5);
  color: white;
  font-size: 5vw;
}


.info-box {
  font-family: 'Comic Sans MS';
  color: white;
  background-color: rgba(90, 86, 86, 0.4);
  border-radius: 10px;
  border: 1px solid #5a5656;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 50vw;
  height: 12vh;
  padding: 1vh 3vw;
}

.header-box {
  display: flex;
  flex-direction: row;
  width: 100%;
  padding: 1vh 0;
}

.header-box .profile-picture {
  margin-right: 2vw;
  width: auto;
  height: 5vh;
}

.word-box {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.word-box .top-word {
  font-size: 3vw
}

.word-box .bottom-word {
  font-size: 3.5vw;
}

.text-1 {
  font-size: 2vw;
}

.text-2 {
  margin-top: 1vh;
  font-size: 1.35vw;
}


.el-carousel__item {
  margin: 0;
  background-color: #65bbca;
  background-image: url(../../assets/background-mobile.png);
  background-size: cover;
  background-repeat: no-repeat;
  background-position: 50% 50%;
  width: 100vw;
  height: 100vh;
}

.container {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 0 8vw;
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