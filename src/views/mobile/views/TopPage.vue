<script setup>
import ButtonPanel from '../components/top-page/ButtonPanel.vue';
import MainPanel from '../components/top-page/MainPanel.vue';
import SkillList from '../components/top-page/SkillList.vue';

</script>

<template>
  <el-carousel-item>
    <MainPanel></MainPanel>
    <ButtonPanel></ButtonPanel>
    <SkillList></SkillList>
  </el-carousel-item>
</template>

<style scoped>
.el-carousel__item {
  background-color: #65bbca;
  background-image: url(../assets/top-page/background.png);
  background-size: 100vw 100vh;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 15vw;
  padding: 10vw 5vw;
}
</style>