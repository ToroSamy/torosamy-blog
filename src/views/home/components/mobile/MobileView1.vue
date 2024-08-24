<script setup>
import { ref } from 'vue';
const activeNames = ref()
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
const liveRoomCommand = () => {
  window.open('https://live.bilibili.com/13130873', '_blank');
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

      <div class="button-box">
        <div class="button-group">
          <el-button type="primary" @click="oicqCommand">OICQ</el-button><el-button type=" primary"
            @click="liveRoomCommand">LiveRoom</el-button>
        </div>
        <div class="button-group"><el-button type="primary" @click="gitCommand">Github</el-button></div>
        <div class="button-group">
          <el-button type="primary" @click="weChatCommand">Wechat</el-button><el-button type=" primary"
            @click="serverWebCommand">ServerWeb</el-button>
        </div>
      </div>


      <div class="skill-list" style="overflow: auto">
        <span style="color: white;font-size: 4vw; margin-left: 2vw;">龙猫能为你做些什么</span>
        <el-collapse v-model="activeNames" accordion>
          <el-collapse-item name="1">
            <template #title>
              <span style="margin-left:6vw;">各类前端</span>
            </template>
            <div class="skill-text"> · html+css+ts <br> · vue3+前端部署<br> · wxPython Pyside6<br> · QT </div>
          </el-collapse-item>
          <el-collapse-item name="2">
            <template #title>
              <span style="margin-left:6vw;">Java后端</span>
            </template>
            <div class="skill-text"> · SpringBoot全家桶 <br> · Yggdrasil<br> · 微服务 </div>
          </el-collapse-item>
          <el-collapse-item name=" 3">
            <template #title>
              <span style="margin-left:6vw;">计算机视觉</span>
            </template>
            <div class="skill-text"> · c/cpp+openCV+linux <br> · 线性卡尔曼</div>
          </el-collapse-item>
          <el-collapse-item name="4">
            <template #title>
              <span style="margin-left:6vw;">雷达导航</span>
            </template>
            <div class="skill-text"> · OpenCV + Ros2</div>
          </el-collapse-item>
          <el-collapse-item name="5">
            <template #title>
              <span style="margin-left:6vw;">游戏开发</span>
            </template>
            <div class="skill-text"> · kotlin+java+Bukkit<br> · C# + Unity</div>
          </el-collapse-item>
          <el-collapse-item name="6">
            <template #title>
              <span style="margin-left:6vw;">其他技能</span>
            </template>
            <div class="skill-text"> · Golang<br> · rust<br> · kotlin+java+Mirai<br> · FPGA</div>
          </el-collapse-item>
        </el-collapse>
      </div>
    </div>
  </el-carousel-item>

  <custom-dialog ref="oicqRef" style="width: 65vw;">
    <img-content @click="closeOicqDialog">
      <template #title>
        <div>腾讯已于2020年关闭QQ临时会话功能</div>
        <div>您可以扫码联系龙猫哦</div>
      </template>
      <template #img>
        <img src="@/assets/my-qq.jpg" style="width: 50vw; height: auto;">
      </template>
    </img-content>
  </custom-dialog>
  <custom-dialog ref="weChatRef" style="width: 65vw; background-color: #6ba5cb;">
    <img-content @click="closeWeChatDialog">
      <template #title>
        <div>腾讯已于2020年关闭临时会话功能</div>
        <div>您可以扫码联系龙猫哦</div>
      </template>
      <template #img>
        <img src="@/assets/my-we-chat.jpg" style="width: 50vw; height: auto; margin-top: 1vh;">
      </template>
    </img-content>
  </custom-dialog>

</template>

<style scoped>
.button-box {
  gap: 0.5vh;
  padding: 1vh 1.5vw;
  background-color: rgba(90, 86, 86, 0.4);
  border-radius: 10px;
  border: 1px solid #5a5656;
  width: 50vw;
  height: 15vh;
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
  height: 5vh;
  margin: 0;
}

/deep/ .el-collapse {
  border: 0;
  margin-top: 1vh;
}

/deep/ .el-collapse-item {
  border: 1px solid #5a5656;

  margin-top: 0.5vh;

}



/deep/ .el-collapse-item__header {
  background-color: rgba(255, 255, 255, 0.2) !important;
  border-radius: 3px;
  border: 1px solid #5a5656;

  color: white;
}

/deep/.el-collapse-item__wrap {
  background-color: rgba(255, 255, 255, 0.2) !important;
  border-radius: 3px;
  border: 1px solid #5a5656;
  margin: 0;
}


.skill-text {
  font-size: 3vw;
  margin-left: 3vw;
  margin-bottom: -3vh;
  color: white;
}

.skill-list {
  /* 大小 */
  width: 40vw;
  height: 30vh;
  /* 边框 */
  background-color: rgba(90, 86, 86, 0.4);
  border-radius: 10px;
  border: 1px solid #5a5656;
  /* 边距 */
  padding: 1vh 1.5vw;
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
  width: 68vw;
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
  font-size: 2.5vw;
}

.text-2 {
  margin-top: 1vh;
  font-size: 1.9vw;
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
  justify-content: flex-start;
  margin-top: 5vh;
  gap: 6vh;
  padding: 0 5vw;
}
</style>