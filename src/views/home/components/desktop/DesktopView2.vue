<script setup>
</script>

<template>
  <el-carousel-item>
    <div class="view2-container">
      <div class="view2-header">
      </div>


      <div class="view2-footer">
        <div class="footer-header">
          <div class="footer-header-title">龙猫の技能树 —— 我能为你做些什么呢?</div>

          <img src="../../assets/anger.jpg" style="height: 5vw; width: auto;">
          <img src="../../assets/cry.jpg" style="height: 5vw; width: auto;">
          <img src="../../assets/think.png" style="height: 5vw; width: auto;">
          <img src="../../assets/question.jpg" style="height: 5vw; width: auto;">
          <img src="../../assets/fool.png" style="height: 5vw; width: auto;">
          <img src="../../assets/want.png" style="height: 5vw; width: auto;">
          <img src="../../assets/love.jpg" style="height: 5vw; width: auto;">
        </div>


        <div class="footer-footer">

          <div class="skill-list">
            <el-collapse v-model="activeNames" accordion>
              <el-collapse-item name="1">
                <template #title>
                  <span style="color: #009999; margin-left: 1vw;">各类前端</span>
                </template>
                <div class="skill-text"> · html+css+ts <br> · vue3+前端部署<br> · wxPython|Pyside6<br> · QT </div>
              </el-collapse-item>
              <el-collapse-item name="2">
                <template #title>
                  <span style="color: #009999; margin-left: 1vw;">Java后端</span>
                </template>
                <div class="skill-text"> · SpringBoot全家桶 <br> · Yggdrasil<br> · 微服务 </div>
              </el-collapse-item>
              <el-collapse-item name=" 3">
                <template #title>
                  <span style="color: #009999; margin-left: 1vw;">计算机视觉</span>
                </template>
                <div class="skill-text"> · c/cpp+openCV <br> · 线性卡尔曼</div>
              </el-collapse-item>
              <el-collapse-item name="4">
                <template #title>
                  <span style="color: #009999; margin-left: 1vw;">雷达导航</span>
                </template>
                <div class="skill-text"> · OpenCV + Ros2</div>
              </el-collapse-item>
              <el-collapse-item name="5">
                <template #title>
                  <span style="color: #009999; margin-left: 1vw;">游戏开发</span>
                </template>
                <div class="skill-text"> · kotlin|java+Bukkit<br> · C# + Unity</div>
              </el-collapse-item>
              <el-collapse-item name="6">
                <template #title>
                  <span style="color: #009999; margin-left: 1vw;">其他技能</span>
                </template>
                <div class="skill-text"> · Golang<br> · rust<br> · kotlin+java+Mirai<br> · FPGA</div>
              </el-collapse-item>
            </el-collapse>
          </div>

          <div class="skill-img"></div>



          <div class="footer-content">
            <div>服务器内有近200种自制RPG装备 并且每一种的介绍和UI都经过精心设计打磨</div>
            <div>我们有强力正式的剧情RPG装备的同时 也丰富了轻松娱乐用的融梗道具</div>
            <div>在维护赞助玩家体验的同时 我们也设计了可肝的平民装备 使零赞助肝帝与钞能力使者55开</div>
            <div>我们也在主城精心设置了各路NPC 有主线 有支线 有日常 更有隐藏剧情等你发掘!</div>
            <div>装备属性变动时 玩家手里的装备可自动更新 服主也会与玩家进行PVP 随时调整装备强度</div>
            <div> 我们有技能粒子炫酷的世界Boss 也有可肝可应用技巧的Boss</div>
          </div>
        </div>



      </div>


    </div>
  </el-carousel-item>
</template>

<style scoped>
.el-carousel__item {
  width: 100vw;
  height: 100vh;
}

.view2-container {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100vw;
  height: 100vh;
}

.view2-header {
  background-color: #a4cbe8;
  width: 100vw;
  height: 25vh;
}

.view2-footer {
  padding-top: 5vh;
  background-color: white;
  height: 75vh;
  width: 100vw;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
}

.footer-header {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 3vw;
  margin-left: 2vh;

}

.footer-header-title {
  color: #009999;
  font-size: 2vw;
}



.footer-footer {
  height: 60vh;
  width: 100vw;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
}


.skill-img {
  background-image: url(../../assets/rubbish.jpg);
  background-size: cover;
  height: 50vh;
  width: 30vw;
}


.footer-content {
  border-radius: 3px;
  border: 2px solid #a4cbe8;
  font-size: 1vw;
  color: rgb(152, 152, 152);
  gap: 3vh;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  width: 45vw;
  height: 48vh;
  margin-left: 2vw;
  padding-top: 2vh;
  padding-left: 1vw;
}




.skill-list {
  overflow: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;
  width: 8vw;
  height: 48vh;
  background-color: rgba(143, 197, 239, 0.4);
  border-radius: 10px;
  padding: 1vh 1.5vw;
  margin-left: 2vw;
}

.skill-list::-webkit-scrollbar {
  display: none;
}

.skill-text {
  font-size: 0.8vw;
  margin-left: 0.3vw;
  margin-bottom: -3vh;
  color: black;
}

/deep/ .el-collapse {
  border: 0;
  margin-top: 1vh;
}

/deep/ .el-collapse-item {
  border: 1px solid white;

  margin-top: 0.5vh;

}

/deep/ .el-collapse-item__header {
  background-color: rgba(255, 255, 255, 0.2) !important;
  border-radius: 3px;
  border: 1px solid white;

  color: black;
}

/deep/.el-collapse-item__wrap {
  background-color: rgba(255, 255, 255, 0.2) !important;
  border-radius: 3px;
  border: 1px solid white;
  margin: 0;
}
</style>