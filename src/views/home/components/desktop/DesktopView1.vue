<script setup>
import { ref } from 'vue'
import { Promotion } from '@element-plus/icons-vue'
import { sendMessageService } from '@/api/message'
import axios from 'axios'

const isButtonDisabled = ref(false)
const buttonText = ref('点击发射')
const input = ref('')

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


const gitCommand = () => {
  window.open('https://github.com/ToroSamy', '_blank');
}
const serverWebCommand = () => {
  window.open('https://server.torosamy.net', '_blank');
}
const discordCommand = () => {
  ElMessage.success('敬请期待')
}
const oicqRef = ref()
const oicqCommand = () => {
  oicqRef.value.open()
}
const closeOicqDialog = () => {
  oicqRef.value.close()
}
const weChatRef = ref()
const weChatCommand = () => {
  weChatRef.value.open()
}
const closeWeChatDialog = () => {
  weChatRef.value.close()
}
const telegramCommand = () => {
  ElMessage.success('敬请期待')
}
const liveRoomCommand = () => {
  window.open('https://live.bilibili.com/13130873', '_blank');
}

</script>

<template>
  <el-carousel-item>
    <div class="container">
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
          <img class="little-icon" src="../../assets/little-icon/server-web.png" @click="serverWebCommand">
          <img class="little-icon" src="../../assets/little-icon/oicq.png" @click="oicqCommand">
          <img class="little-icon" src="../../assets/little-icon/we-chat.png" @click="weChatCommand">
          <img class="little-icon" src="../../assets/little-icon/live-room.png" @click="liveRoomCommand">
          <img class="little-icon" src="../../assets/little-icon/git.png" @click="gitCommand">
          <img class="little-icon" src="../../assets/little-icon/telegram.png" @click="telegramCommand">
          <img class="little-icon" src="../../assets/little-icon/discord.png" @click="discordCommand">
        </div>

        <div class="post-message-box">
          <el-input v-model="input" placeholder="有什么想和龙猫说的吗~" class="message" maxlength="50" show-word-limit />
          <el-button type="primary" :disabled="isButtonDisabled" :icon="Promotion" @click="sendMessageCommand">
            {{ buttonText }}
          </el-button>
        </div>
      </div>

    </div>
  </el-carousel-item>

  <custom-dialog ref="vivoRef" :show-close="false"
    style="width: 45vw; height: auto; background-color: rgba(0, 0, 0, 0); display: flex; justify-content: center; align-items: center;">
    <img src="@/assets/vivo50.png" style="width: 43vw; height: auto;"></img>
  </custom-dialog>


  <custom-dialog ref="oicqRef" style="width: 18vw;">
    <img-content @click="closeOicqDialog">
      <template #title>
        <div>腾讯已于2020年关闭QQ临时会话功能</div>
        <div>您可以扫码联系龙猫哦</div>
      </template>
      <template #img>
        <img src="@/assets/my-qq.jpg" style="width: 15vw; height: auto;">
      </template>
    </img-content>
  </custom-dialog>
  <custom-dialog ref="weChatRef" style="width: 18vw; background-color: #6ba5cb;">
    <img-content @click="closeWeChatDialog">
      <template #title>
        <div>腾讯已于2020年关闭临时会话功能</div>
        <div>您可以扫码联系龙猫哦</div>
      </template>
      <template #img>
        <img src="@/assets/my-we-chat.jpg" style="width: 17vw; height: auto; margin-top: 1vh;">
      </template>
    </img-content>
  </custom-dialog>
</template>

<style scoped>
.el-carousel__item {
  background-image: url(../../assets/background.png);
  background-size: cover;
  width: 100vw;
  height: 100vh;
}

.container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
}

.main-box {
  margin-left: 15vw;
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
