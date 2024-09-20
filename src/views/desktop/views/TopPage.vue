<script setup>
import { ref } from 'vue'
import SendComment from '../components/top-page/SendComment.vue';
import OicqDialog from '@/components/OicqDialog.vue';
import WechatDialog from '@/components/WechatDialog.vue';
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

const weChatRef = ref()
const weChatCommand = () => {
  weChatRef.value.open()
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
    <div class="main-box">

      <div class="message-box">
        <img class="message-profile" src="@/assets/images/torosamy-profile.png">
        <div class="message-word">
          <div style="font-size: 2vw;">Welcome~ </div>
          <div style="font-size: 3vw;">这里是Torosamyの小窝</div>
          <div style="font-size: 1vw;">如果你能在浪费时间中获得乐趣，那就不是浪费时间。</div>
          <div style="font-size: 1vw;">I KNOW EVERYTHING HAPPENS FOR A REASON, BUT WHAT THE FU*K</div>
        </div>
      </div>

      <div class="icon-box">
        <img class="little-icon" src="@/assets/images/little-icon/server-web.png" @click="serverWebCommand">
        <img class="little-icon" src="@/assets/images/little-icon/oicq.png" @click="oicqCommand">
        <img class="little-icon" src="@/assets/images/little-icon/we-chat.png" @click="weChatCommand">
        <img class="little-icon" src="@/assets/images/little-icon/live-room.png" @click="liveRoomCommand">
        <img class="little-icon" src="@/assets/images/little-icon/git.png" @click="gitCommand">
        <img class="little-icon" src="@/assets/images/little-icon/telegram.png" @click="telegramCommand">
        <img class="little-icon" src="@/assets/images/little-icon/discord.png" @click="discordCommand">
      </div>

      <SendComment></SendComment>
    </div>
  </el-carousel-item>

  <WechatDialog ref="weChatRef"></WechatDialog>
  <OicqDialog ref="oicqRef"></OicqDialog>
</template>

<style scoped>
.el-carousel__item {
  background-image: url(../assets/top-background.png);
  background-size: 100vw 100vh;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}


.main-box {
  margin-left: 15vw;
  background-color: rgba(90, 86, 86, 0.4);
  border-radius: 10px;
  border: 1px solid #5a5656;
  padding: 1.5vw 2vw 1vw 2vw;
  /* 上下 左右 上、右、下、左。 */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1vw;
}

.message-box {
  display: flex;
  flex-direction: row;
  gap: 1vw;
}

.message-profile {
  width: 5vw;
  height: 5vw;
}

.message-word {
  font-family: 'Comic Sans MS';
  display: flex;
  flex-direction: column;
  color: white;
}



.icon-box {
  display: flex;
  flex-direction: row;
  gap: 0.8vw;
}

.little-icon {
  width: 4vw;
  height: 4vw;
  transition: filter 0.3s ease;
}

.little-icon:hover {
  filter: brightness(0.7);
}
</style>
