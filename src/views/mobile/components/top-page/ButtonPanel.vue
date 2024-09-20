<script setup>
import { ref } from 'vue';
import OicqDialog from '@/components/OicqDialog.vue';
import WechatDialog from '@/components/WechatDialog.vue';
const gitCommand = () => {
  window.open('https://github.com/ToroSamy', '_blank');
}
const serverWebCommand = () => {
  window.open('https://server.torosamy.net', '_blank');
}

const oicqRef = ref()
const oicqCommand = () => {
  oicqRef.value.open()
}

const weChatRef = ref()
const weChatCommand = () => {
  weChatRef.value.open()
}


const liveRoomCommand = () => {
  window.open('https://live.bilibili.com/13130873', '_blank');
}
</script>

<template>

  <div class="container">
    <div class="button-group">
      <el-button type="primary" @click="oicqCommand">OICQ</el-button>
      <el-button type="primary" @click="liveRoomCommand">LiveRoom</el-button>
    </div>
    <div class="button-group"><el-button type="primary" @click="gitCommand">Github</el-button></div>
    <div class="button-group">
      <el-button type="primary" @click="weChatCommand">Wechat</el-button>
      <el-button type="primary" @click="serverWebCommand">ServerWeb</el-button>
    </div>
  </div>

  <WechatDialog ref="weChatRef"></WechatDialog>
  <OicqDialog ref="oicqRef"></OicqDialog>
</template>

<style scoped>
.container {
  padding: 1.5vw 1.5vw;
  background-color: rgba(90, 86, 86, 0.4);
  border-radius: 10px;
  border: 1px solid #5a5656;
  width: 50vw;
  height: 30vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.button-group {
  display: flex;
  flex-direction: row;

}

.button-group .el-button {
  background-color: rgba(255, 255, 255, 0.2);
  color: white;
  border-radius: 3px;
  border: 1px solid #5a5656;
  width: 100%;
  height: 10vw;
  margin: 0;
}
</style>