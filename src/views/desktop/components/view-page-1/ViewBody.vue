<script setup>
import SkillList from './SkillList.vue';
</script>

<template>
  <div class="body">
    <SkillList></SkillList>
    <div class="body-content">
      <div style="color: white; font-size: 2.5vw;">
        I can help you with anything!
      </div>
      <div> 吾生有涯 学海无涯 只要不断地前进 道路就会不断的延申.jpg </div>
      <div> 现在的龙猫仅仅是如此 但请相信龙猫不只是如此</div>
      <div> 未来的龙猫还将继续学习 机器学习、算法导论、Gba开发</div>
      <div> 期待龙猫能更好的为你服务！ </div>
      <img src="../../assets/view-page-1/learn-more.png" class="learn-more">
    </div>
  </div>
</template>

<style scoped>
.body {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 2vw;
  width: 100vw;
  height: 80vw;
}

.learn-more {
  width: 13vw;
  height: 5vw;
  transition: filter 0.3s ease;
}

.learn-more:hover {
  filter: brightness(0.7);
}

.body-content {
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
  gap: 1vw;

  width: 35vw;
  height: 25vw;
}
</style>
