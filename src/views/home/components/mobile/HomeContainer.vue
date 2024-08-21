<script setup>
import MobileView1 from './MobileView1.vue';
import MobileView2 from './MobileView2.vue';
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
const vivoRef = ref()
const vivo50Command = () => {
  vivoRef.value.open()
}

const sendMessageCommand = () => {
  diglog.value.open()
}
</script>

<template>
  <div class="button-box">
    <img :class="{ 'little-icon': true, 'rotate': isRotating }" src="../../assets/button/music.png"
      @click="playMusicCommand">
    <img class="little-icon" src="../../assets/button/kfc.png" v-if="dayIndex === 4" @click="vivo50Command">
    <img class="little-icon" src="../../assets/button/day.png" v-else @click="oicqCommand">
    <img class="little-icon" src="../../assets/button/message.png" @click="sendMessageCommand">
  </div>
  <el-carousel direction="vertical" :autoplay="false">
    <MobileView1></MobileView1>
    <MobileView2></MobileView2>
    <!-- <MobileView3></MobileView3> -->
  </el-carousel>
  <custom-dialog ref="vivoRef"
    style="width: auto; height: 36vh; background-color: rgba(0, 0, 0, 0); display: flex; justify-content: center; align-items: center;"
    :show-close="false">
    <img src="@/assets/vivo50.png" style="width: auto; height: 34vh; "></img>
  </custom-dialog>
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
.el-carousel {
  width: 100%;
  height: 100vh;
}

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
  position: absolute;
  top: 90vh;
  /* 根据需要调整位置 */
  right: 2vw;
  /* 根据需要调整位置 */
  z-index: 10;
  /* 确保在 el-carousel 上方 */
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
