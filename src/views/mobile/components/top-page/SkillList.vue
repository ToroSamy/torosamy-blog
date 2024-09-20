<script setup>
import { ref } from 'vue';
const activeNames = ref()
</script>

<template>
  <div class="skill-list" style="overflow: auto;display: flex; flex-direction: column; align-items: center;">

    <div style="color: white;font-size: 3.5vw;">龙猫能为你做些什么</div>

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
</template>

<style scoped>
::v-deep .el-collapse {
  border: 0;
}

::v-deep .el-collapse-item {
  width: 35vw;
  border: 1px solid #5a5656;
}

::v-deep .el-collapse-item__header {
  background-color: rgba(255, 255, 255, 0.2) !important;
  border-radius: 3px;
  border: 1px solid #5a5656;
}

::v-deep .el-collapse-item__wrap {
  background-color: rgba(255, 255, 255, 0.2) !important;
  border-radius: 3px;
  border: 1px solid #5a5656;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0;
}

.skill-header-title {
  color: white;
  margin-left: 2vw;
  font-size: 3.5vw;
  white-space: nowrap;
}

.skill-text {
  color: white;
  font-size: 3vw;
}

.skill-list {
  /* 大小 */
  width: 40vw;
  height: 60vw;
  /* 边框 */
  background-color: rgba(90, 86, 86, 0.4);
  border-radius: 10px;
  border: 1px solid #5a5656;
  /* 边距 */
  padding: 2vw 1.5vw;
  gap: 2vw;
}
</style>