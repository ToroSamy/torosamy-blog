<script setup>
import { ref } from 'vue'
import { Promotion } from '@element-plus/icons-vue'
import { sendMessageService } from '@/api/message'
import axios from 'axios'
/* border: 1px solid #c21818; */
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
const sendMessage = async () => {
  const response = await axios.get('https://api.ipify.org?format=json')
  await sendMessageService(input.value, response.data.ip)
  ElMessage.success('发送成功')
  startCountdown()
}
</script>

<template>
  <el-carousel-item>
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
          <img class="little-icon" src="../../assets/little-icon/git.png">
          <img class="little-icon" src="../../assets/little-icon/server-web.png">
          <img class="little-icon" src="../../assets/little-icon/discord.png">
          <img class="little-icon" src="../../assets/little-icon/qq.png">
          <img class="little-icon" src="../../assets/little-icon/we-chat.png">
          <img class="little-icon" src="../../assets/little-icon/telegram.png">
          <img class="little-icon" src="../../assets/little-icon/more.png">
        </div>

        <div class="post-message-box">
          <el-input v-model="input" placeholder="有什么想和龙猫说的吗~" class="message" />
          <el-button type="primary" :disabled="isButtonDisabled" :icon="Promotion" plain @click="sendMessage">
            {{ buttonText }}
          </el-button>
        </div>

      </div>


      <div class="icon-group">
        <span class="little-img">按钮A</span>
        <span class="little-img">按钮B</span>
        <span class="little-img">尚未</span>
        <span class="little-img">设计</span>
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

.little-icon {
  /* opacity: 0.7; */
  margin: 0 0.3rem
}

.post-message-box {
  margin-top: 1.5rem;
  margin-right: 5rem;
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
  padding: 1rem 1rem;
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
