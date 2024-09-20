<script setup></script>

<template>
  <div class="body">

    <div class="left-container">
      <div style="color: white; font-size: 2.5vw;">
        interests & hobbies
      </div>
      <div>在11年因《罪冠》入坑Acg 阅番量蛮大的 但因篇幅有限 就先放这么多图片吧~</div>
      <div>喜欢 Jazz 爵士蓝调 科幻题材作品 不玩手游 不看短视频</div>
      <div>高贵的主机玩家(不是 但电子yy 正版游戏 但云通关 </div>
      <div>玩贴吧 知乎 这辈子真是有了 </div>
      <img src="../../assets/view-page-2/learn-more.png" class="learn-more">
    </div>


    <div class="right-container">

      <div class="right-img-container">
        <div class="right-img-group">
          <img src="../../assets/view-page-2/samurai.jpg" class="right-img-format">
          <img src=" ../../assets/view-page-2/touhou.png" class="right-img-format">
        </div>
        <div class="right-img-group">
          <img src="../../assets/view-page-2/acg.jpg" class="right-img-format">
          <img src="../../assets/view-page-2/pokemon.png" class="right-img-format">
        </div>
      </div>
    </div>


  </div>
</template>

<style scoped>
.left-container {
  padding: 0.8vw;
  width: 38vw;

  color: gray;
  font-size: 1vw;
  font-family: 'Comic Sans MS';
  gap: 1vw;

  background-color: rgba(90, 86, 86, 0.4);
  border-radius: 10px;
  border: 1px solid #5a5656;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}





.right-container {
  width: 38vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 3vw;
}

.right-img-container {
  padding: 1vw;

  background-color: rgba(90, 86, 86, 0.4);
  border-radius: 10px;
  border: 1px solid #5a5656;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2vw;
}

.right-img-group {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 2vw;
}

.right-img-format {
  width: 15vw;
  height: 11vw;
  border-radius: 10px;
  border: 2px solid #5a5656;
  transition: filter 0.3s ease;
}

.right-img-format:hover {
  filter: brightness(0.7);
}

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
</style>
