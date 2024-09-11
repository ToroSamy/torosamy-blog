@ -0,0 +1,143 @@
<script setup>
</script>

<template>
  <el-carousel-item>
    <div class="view3-header">
      <div class="header-title-container">
        <div class="title-box">
          <img src="../../assets/akuya.png" style="width: 5vw; height: auto; margin-left: 5vw;">

          <div class="header-word-container">
            <div style="color: white; font-size: 1.3vw;font-family: 'Comic Sans MS'; margin-bottom: 1vh;">
              Leisure Daily
            </div>
            <div style="color: white; font-size: 0.8vw;font-family: 'Comic Sans MS';">
              不像你们这些大少爷， 我们光是活下去就要拼尽全力了啊 ！
            </div>
            <div style="color: white; font-size: 0.8vw;font-family: 'Comic Sans MS';">
              Unlike you young masters, we have to give our all just to survive
            </div>
          </div>
        </div>


        <div class="img-box">
          <img src="../../assets/fool.png" style="height: 5vw; width: auto;">
          <img src="../../assets/want.png" style="height: 5vw; width: auto;">
          <img src="../../assets/anger.jpg" style="height: 5vw; width: auto;">
          <img src="../../assets/love.jpg" style="height: 5vw; width: auto;">
        </div>

      </div>
    </div>

    <div class="view3-body">

      <div class="left-container">
        <div style="color: white; font-size: 2.5vw;  margin-bottom: 3vh;">
          interests & hobbies
        </div>
        <div>在11年因《罪冠》入坑Acg 阅番量蛮大的 但因篇幅有限 就先放这么多图片吧~</div>
        <div>喜欢 Jazz 爵士蓝调 科幻题材作品 不玩手游 不看短视频</div>
        <div>高贵的主机玩家(不是 但电子yy 正版游戏 但云通关 </div>
        <div>玩贴吧 知乎 这辈子真是有了 </div>
        <img src="../../assets/learn-more.png" class="learn-more">
      </div>


      <div class="right-container">

        <div class="right-img-container">
          <div class="right-img-group">
            <img src="../../assets/samurai.jpg" class="right-img-format">
            <img src=" ../../assets/touhou.png" class="right-img-format">
          </div>
          <div class="right-img-group">
            <img src="../../assets/acg.jpg" class="right-img-format">
            <img src="../../assets/pokemon.png" class="right-img-format">
          </div>
        </div>


      </div>


    </div>
    <div class="view3-footer"> </div>



  </el-carousel-item>
</template>

<style scoped>
.el-carousel__item {
  width: 100vw;
  height: 100vh;
}


.view3-header {
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
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
}

.view3-body {
  background-color: #1A1D26;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 80vh;
}

.view3-footer {
  background-color: #2B2B33;
  width: 100vw;
  height: 7vh;
}

.left-container {
  padding: 0.8vw;
  width: 38vw;

  color: gray;
  font-size: 1vw;
  font-family: 'Comic Sans MS';
  gap: 1vh;

  background-color: rgba(90, 86, 86, 0.4);
  border-radius: 10px;
  border: 1px solid #5a5656;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}





.right-container {
  margin-left: 5vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 3vh;
}

.right-img-container {
  padding: 1vw;
  display: flex;
  background-color: rgba(90, 86, 86, 0.4);
  border-radius: 10px;
  border: 1px solid #5a5656;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2vh;
}

.right-img-group {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 2vh;
}

.right-img-format {
  width: 15vw;
  height: 22vh;
  border-radius: 10px;
  border: 2px solid #5a5656;
}

.right-img-format:hover {
  filter: brightness(0.7);
}

.learn-more {
  width: 13vw;
  height: 8vh;
  margin-top: 3vh;
}

.learn-more:hover {
  filter: brightness(0.7);
}
</style>