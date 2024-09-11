<script setup>
</script>

<template>
  <el-carousel-item>
    <div class="view3-container">


      <div class="left-container">
        <div class="left-title-container">
          <img src="../../assets/akuya.png" style="width: 5vw; height: auto;">
          <div class="left-title-word-container">
            <div style="color: white; font-size: 1.5vw;font-family: 'Comic Sans MS'; margin-bottom: 1vh;">Leisure Daily
            </div>
            <div style="color: white; font-size: 1vw;font-family: 'Comic Sans MS';">不像你们这些大少爷， 我们光是活下去就要拼尽全力了啊 ！</div>
            <div style="color: white; font-size: 0.8vw;font-family: 'Comic Sans MS';">Unlike you young masters, we have
              to
              give our all just to survive </div>
          </div>
        </div>

        <div class="left-word-container">
          <div>龙猫の构成元素</div>
          <div>
            文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文
          </div>
          <div>
            文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文
          </div>
          <div>
            文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文
          </div>
          <img src="../../assets/height.jpg" style="width: 30vw; height: auto;  margin-top: 1vh;">
        </div>




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
  </el-carousel-item>
</template>

<style scoped>
.el-carousel__item {
  width: 100vw;
  height: 100vh;
}

.title-text-decoration {
  color: #1f1217;
  border-radius: 1px;
  border-bottom: 3px solid #0068bf;
  margin-top: -1.5vh;
  margin-bottom: 4vh;
}


.view3-container {
  background-color: #1f1217;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 100vw;
  height: 100vh;
}


.left-container {
  border: 1px solid red;
  margin-left: 6vw;
  margin-right: 6vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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
  margin-bottom: 4vh;
}

.left-title-word-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
}

.left-word-container {
  background-color: #7cb6e1;
  border-radius: 10px;
  border: 2px solid #0068bf;
  width: 40vw;
  height: 55vh;
  color: white;
  font-size: 1vw;
  font-family: 'Comic Sans MS';
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.8vh;
}


.right-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 3vh;
}





.right-img-container {
  padding: 1vh;
  background-color: #7cb6e1;
  border-radius: 10px;
  border: 2px solid #0068bf;
  display: flex;
  border-radius: 10px;
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
  width: 17vw;
  height: 22vh;
  border-radius: 10px;
  border: 2px solid #7cb6e1;
}
</style>