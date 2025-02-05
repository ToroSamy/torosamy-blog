<script setup lang="ts">

import { Service } from '@element-plus/icons-vue'
import { ref } from 'vue'


const audioInstance = ref(null);
const isPlaying = ref(false);
const playMusicCommand = () => {
  isPlaying.value = !isPlaying.value;
  if (isPlaying.value) {
    audioInstance.value.play();
    ElMessage.success('开始播放');
  } else {
    audioInstance.value.pause();
    ElMessage.success('暂停成功');
  }
};


</script>
<template>
  <el-header>
    <div class="icon-container">


      <el-tooltip effect="dark" content="播放音乐" placement="bottom">
        <el-icon @click="playMusicCommand">
          <Service />
        </el-icon>
      </el-tooltip>

    </div>
  </el-header>
  <audio ref="audioInstance" src="/markdown.mp3" loop></audio>

</template>
<style lang="scss" scoped>
.el-header {
  width: 100%;
  background-color: #1A1A1A;
  font-size: large;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.icon-container {
  display: flex;
  align-items: center;
  margin-right: 3%;
  gap: 1vw;

}

.username {
  display: flex;
  color: #f8faff;
  align-items: center;
  gap: 1vw;
  white-space: nowrap;

}

.el-icon {
  font-size: 180%;
  cursor: pointer;
  color: #f8faff;
  /* 鼠标悬停时显示为手形 */
}
</style>