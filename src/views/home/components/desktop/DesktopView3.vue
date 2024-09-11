<script setup>
</script>

<template>
  <el-carousel-item>
    <div class="view3-container">
      <div class="left-container">
        <div class="left-title-container">
          <img src="../../assets/akuya.png" style="width: 5vw; height: auto;">

          <div class="left-word-container">
            <div style="color: white; font-size: 1.5vw;font-family: 'Comic Sans MS'; margin-bottom: 1vh;">Leisure Daily
            </div>
            <div style="color: white; font-size: 1vw;font-family: 'Comic Sans MS';">不像你们这些大少爷， 我们光是活下去就要拼尽全力了啊 ！</div>
            <div style="color: white; font-size: 1vw;font-family: 'Comic Sans MS';">Unlike you young masters, we have to
              give our all just to survive </div>

          </div>

        </div>



        <div class="left-img-container">
          <div class="left-img-group">
            <img src="../../assets/samurai.jpg" style="width: 20vw; height: 25vh;">
            <img src="../../assets/touhou.png" style="width: 20vw; height: 25vh;">
          </div>
          <div class="left-img-group">
            <img src="../../assets/acg.jpg" style="width: 20vw; height: 25vh;">
            <img src="../../assets/pokemon.png" style="width: 20vw; height: 25vh;">
          </div>
        </div>


      </div>

      <div class="right-container">
        <div style="color: white; font-size: 2vw; font-family: 'Comic Sans MS'; margin-bottom: 1vh;">龙猫の构成元素</div>
        <div style="color: white; font-size: 1vw; font-family: 'Comic Sans MS'; margin-bottom: 1vh;">
          文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文
        </div>
        <div style="color: white; font-size: 1vw; font-family: 'Comic Sans MS'; margin-bottom: 1vh;">
          文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文
        </div>
        <div style="color: white; font-size: 1vw; font-family: 'Comic Sans MS'; margin-bottom: 1vh;">
          文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文
        </div>
        <div style="color: white; font-size: 1vw; font-family: 'Comic Sans MS'; margin-bottom: 1vh;">
          文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文
        </div>
        <div style="color: white; font-size: 1vw; font-family: 'Comic Sans MS'; margin-bottom: 1vh;">
          文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文
        </div>
        <img src="../../assets/height.jpg" style="width: 30vw; height: auto;  margin-top: 1vh;">
      </div>

    </div>
  </el-carousel-item>
</template>

<style scoped>
.el-carousel__item {
  width: 100vw;
  height: 100vh;
}

.view3-container {
  background-image: url("../../assets/no-designed-2.png");
  background-size: 100% 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 100vw;
  height: 100vh;
  gap: 3vw;
}


.right-container {
  padding: 1vw;
  width: 38vw;
  height: 60vh;
  background-color: #7cb6e1;
  border-radius: 10px;
  border: 2px solid #0068bf;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}



.left-container {
  margin-left: 5vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 3vh;
}

.left-title-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 1vw;
  background-color: #7cb6e1;
  border-radius: 10px;
  border: 2px solid #0068bf;
  gap: 1vw;
}

.left-word-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
}

.left-img-container {
  padding: 1vw;
  display: flex;
  background-color: #7cb6e1;
  border-radius: 10px;
  border: 2px solid #0068bf;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2vh;
}

.left-img-group {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 2vh;
}
</style>