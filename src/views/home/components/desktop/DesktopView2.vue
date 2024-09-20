<script setup>
</script>

<template>
  <el-carousel-item>
    <div class="view2-header">

      <div class="header-title-container">
        <div class="title-box">
          <img src="../../assets/profile.jpg" style="width: 5vw; height: auto; margin-left: 5vw;">
          <div class="header-word-container">
            <div style="color: white; font-size: 1.5vw;font-family: 'Comic Sans MS'; margin-bottom: 1vh;">Skill Tree
            </div>
            <div style="color: white;font-size: 1vw;font-family: 'Comic Sans MS';">正因为知道可以在空中翱翔 才会畏惧展翅的那一刻而忘却疾风</div>
            <div style="color: white;font-size: 1vw;font-family: 'Comic Sans MS';">
              Under the guidance of time, even when alone, there are things that cannot be forgotten
            </div>
          </div>
        </div>

        <div class="img-box">
          <img src="../../assets/think.png" style="height: 5vw; width: auto;">
          <img src="../../assets/want.png" style="height: 5vw; width: auto;">
          <img src="../../assets/cry.jpg" style="height: 5vw; width: auto;">
          <img src="../../assets/question.jpg" style="height: 5vw; width: auto;">
        </div>

      </div>
    </div>
    <div class="view2-body">



      <div class="skill-container">
        <div class="skill-list">
          <el-collapse v-model="activeNames" accordion>
            <el-collapse-item name="1">
              <template #title>
                <span class="skill-header-title">各类前端</span>
              </template>
              <div class="skill-text"> · html+css+ts <br> · vue3+前端部署<br> · wxPython|Pyside6<br> · QT </div>
            </el-collapse-item>
            <el-collapse-item name="2">
              <template #title>
                <span class="skill-header-title">各类后端</span>
              </template>
              <div class="skill-text"> · SpringBoot后端 <br> · Yggdrasil<br> · GameServer </div>
            </el-collapse-item>
            <el-collapse-item name=" 3">
              <template #title>
                <span class="skill-header-title">计算机视觉</span>
              </template>
              <div class="skill-text"> · c/cpp+openCV <br> · 线性卡尔曼</div>
            </el-collapse-item>
            <el-collapse-item name="4">
              <template #title>
                <span class="skill-header-title">雷达导航</span>
              </template>
              <div class="skill-text"> · OpenCV + Ros2</div>
            </el-collapse-item>
            <el-collapse-item name="5">
              <template #title>
                <span class="skill-header-title">游戏开发</span>
              </template>
              <div class="skill-text"> · kotlin|java+Bukkit<br> · C# + Unity</div>
            </el-collapse-item>
            <el-collapse-item name="6">
              <template #title>
                <span class="skill-header-title">其他技能</span>
              </template>
              <div class="skill-text"> · Golang<br> · rust<br> · kotlin+java+Mirai<br> · FPGA</div>
            </el-collapse-item>
          </el-collapse>
        </div>

        <div class="skill-img">
          <img src="../../assets/life-bug.png" style="width: 25vw; height: auto;">
        </div>
      </div>




      <div class="content-container">
        <div style="color: white; font-size: 2.5vw; margin-bottom: 3vh;">
          I can help you with anything!
        </div>

        <div> 吾生有涯 学海无涯 只要不断地前进 道路就会不断的延申.jpg </div>
        <div> 现在的龙猫仅仅是如此 但请相信龙猫不只是如此</div>
        <div> 未来的龙猫还将继续学习 机器学习、算法导论、Gba开发</div>
        <div> 期待龙猫能更好的为你服务！ </div>
        <img src="../../assets/learn-more.png" class="learn-more">
      </div>
    </div>




    <div class="view2-footer"></div>
  </el-carousel-item>
</template>

<style scoped>
.el-carousel__item {
  width: 100vw;
  height: 100vh;
}

.view2-header {
  background-color: #1A1D26;
  width: 100vw;
  height: 13vh;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
}


.img-box {
  margin-right: 2vw;
  gap: 1.5vw;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.title-box {
  gap: 1vw;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
}

.content-container {
  background-color: rgba(90, 86, 86, 0.4);
  border-radius: 10px;
  border: 1px solid #5a5656;


  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  color: gray;
  font-size: 1vw;
  font-family: 'Comic Sans MS';
  gap: 1vh;

  width: 35vw;
  height: 45vh;
  margin-left: 2vw;
  padding-top: 2vh;
  padding-left: 1vw;
}

.header-title-container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: rgba(90, 86, 86, 0.4);
  border-radius: 10px;
  border: 1px solid #5a5656;
  padding: 1vw;
  gap: 1vw;
  width: 100vw;
  height: 7vh;
}


.header-word-container {
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
}

.view2-body {
  background-color: #1A1D26;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 80vh;
}

.view2-footer {
  background-color: #2B2B33;
  width: 100vw;
  height: 7vh;
}


.learn-more {
  width: 13vw;
  height: 8vh;
  margin-top: 3vh;
}

.learn-more:hover {
  filter: brightness(0.7);
}



.skill-container {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
}

.skill-img {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(90, 86, 86, 0.4);
  border-radius: 10px;
  border: 1px solid #5a5656;
  height: 50vh;
  width: 30vw;
}

.skill-list {
  overflow: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;
  width: 8vw;
  height: 48vh;
  background-color: rgba(90, 86, 86, 0.4);
  border-radius: 10px;
  border: 1px solid #5a5656;
  padding: 1vh 1.5vw;
  margin-left: 2vw;
}

.skill-list::-webkit-scrollbar {
  display: none;
}

.skill-header-title {
  color: white;
  margin-left: 1vw;
}


.skill-text {
  font-size: 0.8vw;
  margin-left: 0.3vw;
  margin-bottom: -3vh;
  color: white;
}

::v-deep .el-collapse {
  border: 0;
  margin-top: 1vh;
}

::v-deep .el-collapse-item {
  border: 1px solid white;
  margin-top: 0.5vh;

}

::v-deep .el-collapse-item__header {
  background-color: rgba(255, 255, 255, 0.2) !important;
}

::v-deep .el-collapse-item__wrap {
  background-color: rgba(255, 255, 255, 0.2) !important;
  margin: 0;
}
</style>