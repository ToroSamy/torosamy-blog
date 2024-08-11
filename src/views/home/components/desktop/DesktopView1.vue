<script setup>
import { ref, computed } from 'vue'
import { Promotion } from '@element-plus/icons-vue'
import { sendMessageService } from '@/api/message'
import axios from 'axios'
/* border: 1px solid #c21818; */

const audioSrc = '@/../music.mp3';
const audio = ref(null);
const isButtonDisabled = ref(false)
const buttonText = ref('点击发射')
const input = ref('')
const isRotating = ref(false);
const dayIndex = new Date().getDay()
const dayOfWeek = computed(() => {
  const days = ['日', '一', '二', '三', '四', '五', '六'];
  return days[dayIndex];
});
const startCountdown = () => {
  isButtonDisabled.value = true
  let countdown = 30
  buttonText.value = `${countdown}s后重试`

  const countdownTimer = () => {
    countdown--
    buttonText.value = `${countdown}s后重试`
    if (countdown > 0) {
      setTimeout(countdownTimer, 1000)
    } else {
      isButtonDisabled.value = false
      buttonText.value = '点击发射'
    }
  }
  setTimeout(countdownTimer, 1000)
}
const sendMessageCommand = async () => {
  const response = await axios.get('https://api.ipify.org?format=json')
  await sendMessageService(input.value, response.data.ip)
  ElMessage.success('发送成功')
  startCountdown()
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
const gitCommand = () => {
  window.open('https://github.com/ToroSamy', '_blank');
}
const serverWebCommand = () => {
  window.open('https://server.torosamy.net:11699', '_blank');
}
const discordCommand = () => {
  ElMessage.success('尽情期待')
}
const oicqCommand = () => {
  ElMessage.success('尽情期待')
}
const weChatCommand = () => {
  ElMessage.success('尽情期待')
}
const telegramCommand = () => {
  ElMessage.success('尽情期待')
}
const moreCommand = () => {
  ElMessage.success('尽情期待')
}
const tempCommand = () => {
  ElMessage.success('尽情期待')
}
</script>

<template>
  <el-carousel-item>
    <audio ref="audio" :src="audioSrc" loop></audio>
    <div class="background"></div>

    <div class="content">

      <div class="main-box">

        <div class="header-box">
          <img class="profile-picture" src="../../assets/profile.png">
          <div class="word-box">
            <div class="top-word">Welcome~ </div>
            <div class="bottom-word">这里是Torosamyの小窝</div>
            <div class="text">如果你能在浪费时间中获得乐趣，那就不是浪费时间。</div>
            <div class="text">I KNOW EVERYTHING HAPPENS FOR A REASON, BUT WHAT THE FU*K</div>
          </div>
        </div>

        <div class="footer-box">
          <img class="little-icon" src="../../assets/little-icon/git.png" @click="gitCommand">
          <img class="little-icon" src="../../assets/little-icon/server-web.png" @click="serverWebCommand">
          <img class="little-icon" src="../../assets/little-icon/discord.png" @click="discordCommand">
          <img class="little-icon" src="../../assets/little-icon/oicq.png" @click="oicqCommand">
          <img class="little-icon" src="../../assets/little-icon/we-chat.png" @click="weChatCommand">
          <img class="little-icon" src="../../assets/little-icon/telegram.png" @click="telegramCommand">
          <img class="little-icon" src="../../assets/little-icon/more.png" @click="moreCommand">
        </div>

        <div class="post-message-box">
          <el-input v-model="input" placeholder="有什么想和龙猫说的吗~" class="message" maxlength="50" show-word-limit />
          <el-button type="primary" :disabled="isButtonDisabled" :icon="Promotion" @click="sendMessageCommand">
            {{ buttonText }}
          </el-button>
        </div>

      </div>


      <div class="icon-group">
        <img src="../../assets/button/music.png" :class="{ 'little-icon': true, 'rotate': isRotating }"
          @click="playMusicCommand">
        <img class="little-icon" src="../../assets/button/kfc.png" v-if="dayIndex === 4" @click="vivo50Command">
        <img class="little-icon" src="../../assets/button/day.png" v-else @click="vivo50Command">
        <img src="../../assets/button/kfc.png" class="little-icon" @click="tempCommand">
        <img src="../../assets/button/message.png" class="little-icon" @click="tempCommand">
      </div>

    </div>
  </el-carousel-item>
</template>

<style scoped>
.background {
  width: 100%;
  height: 100%;
  background: inherit;
  filter: brightness(50%) contrast(125%) saturate(200%);
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
  position: absolute;
  align-items: center;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.main-box {
  margin-top: -3rem;
  margin-right: 15rem;
  background-color: rgba(90, 86, 86, 0.4);
  border-radius: 10px;
  border: 1px solid #5a5656;
  padding: 1.5rem 2rem 1rem 2rem;
  /* 上下 左右 上、右、下、左。 */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.header-box {
  display: flex;
  width: 100%;
  padding: 1rem 1em;
  flex-direction: row;
}

.header-box .profile-picture {
  width: 100px;
  height: 100px;
  margin-right: 1rem;
  animation: profile 10s linear infinite;
}

@keyframes profile {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}

.word-box {
  font-family: 'Comic Sans MS';
  display: flex;
  flex-direction: column;
}

.word-box .top-word {
  color: white;
  font-size: 2rem;
}

.word-box .bottom-word {
  margin-top: -0.3rem;
  color: white;
  font-size: 3rem;
}

.word-box .text {
  margin-top: 0.3rem;
  color: white;
  font-size: 1rem;
}

.footer-box {
  margin-top: 0.5rem;
}



.post-message-box {
  margin-top: 1.5rem;
  display: flex;
  flex-direction: row;

  .message {
    opacity: 0.5;
    width: 25rem;
  }

  .button {
    margin-left: 2rem;
  }
}


.icon-group {
  background-color: #678dd4;
  border-radius: 10px;
  border: 1px solid #d3d3d3;
  margin-right: 2rem;
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
