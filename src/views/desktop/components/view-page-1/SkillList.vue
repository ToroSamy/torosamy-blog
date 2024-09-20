<script setup></script>

<template>
  <div class="skill-container">
    <div class="skill-list">
      <el-collapse v-model="activeNames" accordion>
        <el-collapse-item name="1">
          <template #title>
            <span class="skill-header-title">各类前端</span>
          </template>
          <div class="skill-text"> · html+css+ts</div>
          <div class="skill-text"> · vue3+前端部署</div>
          <div class="skill-text"> · wxPython Pyside6</div>
          <div class="skill-text"> · QT</div>
        </el-collapse-item>
        <el-collapse-item name="2">
          <template #title>
            <span class="skill-header-title">各类后端</span>
          </template>
          <div class="skill-text"> · SpringBoot全家桶</div>
          <div class="skill-text"> · Yggdrasil</div>
          <div class="skill-text"> · 微服务</div>
        </el-collapse-item>
        <el-collapse-item name=" 3">
          <template #title>
            <span class="skill-header-title">计算机视觉</span>
          </template>
          <div class="skill-text"> · c/cpp + openCV</div>
          <div class="skill-text"> · 线性卡尔曼</div>
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
          <div class="skill-text"> · kotlin+java+Bukkit</div>
          <div class="skill-text"> · C# + Unity</div>
        </el-collapse-item>
        <el-collapse-item name="6">
          <template #title>
            <span class="skill-header-title">其他技能</span>
          </template>
          <div class="skill-text"> · Golang</div>
          <div class="skill-text"> · rust</div>
          <div class="skill-text"> · kotlin+java+Mirai</div>
          <div class="skill-text"> · FPGA</div>
        </el-collapse-item>
      </el-collapse>
    </div>

    <div class="skill-img">
      <img src="../../assets/view-page-1/life-bug.png" style="width: 25vw; height: auto;">
    </div>
  </div>
</template>

<style scoped>
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
  height: 25vw;
  width: 30vw;
}

.skill-list {
  overflow: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;
  width: 10vw;
  height: 22vw;
  background-color: rgba(90, 86, 86, 0.4);
  border-radius: 10px;
  border: 1px solid #5a5656;
  padding: 1.5vw 1.5vw;
}

.skill-list::-webkit-scrollbar {
  display: none;
}

.skill-header-title {
  color: white;
  margin-left: 1vw;
  font-size: 0.8vw;
  white-space: nowrap;
}


.skill-text {
  font-size: 0.8vw;
  color: white;
}

::v-deep .el-collapse {
  border: 0;
}

::v-deep .el-collapse-item {
  border: 1px solid white;
}

::v-deep .el-collapse-item__header {
  background-color: rgba(255, 255, 255, 0.2) !important;
}

::v-deep .el-collapse-item__wrap {
  background-color: rgba(255, 255, 255, 0.2) !important;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0;
}
</style>
