<script setup>
</script>

<template>
  <el-carousel-item>
    <div class="container">

      <div class="main-box">
        <div class="header-box">
          <div class="word-box">
            <div class="top-word">Welcome~ </div>
            <div class="bottom-word">这里是Torosamyの小窝</div>
            <div class="text">如果你能在浪费时间中获得乐趣，那就不是浪费时间。</div>
            <div class="text">I KNOW EVERYTHING HAPPENS FOR A REASON, BUT WHAT THE FU*K</div>
            <br>
            <div style="font-size: 2vw; color: white;">尚未设计完成 敬请期待</div>
            <div style="font-size: 1.5vw; color: white;">欢迎您提出更多意见</div>
          </div>
        </div>

      </div>
    </div>
  </el-carousel-item>
</template>

<style scoped>
.el-carousel__item {
  background-image: url(../../assets/end-background.png);
  background-size: cover;
  width: 100vw;
  height: 100vh;
}

.container {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 100vw;
  height: 100vh;
}

.main-box {
  margin-left: 8vw;
  background-color: rgba(90, 86, 86, 0.4);
  border-radius: 10px;
  border: 1px solid #5a5656;
  padding: 1.5rem 2rem 1rem 2rem;
  /* 上下 左右 上、右、下、左。 */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.header-box {
  display: flex;
  width: 100%;
  padding: 1rem 1em;
  flex-direction: row;
}




.word-box {
  font-family: 'Comic Sans MS';
  display: flex;
  flex-direction: column;
}

.word-box .top-word {
  color: white;
  font-size: 2rem;
}

.word-box .bottom-word {
  margin-top: -0.3rem;
  color: white;
  font-size: 3rem;
}

.word-box .text {
  margin-top: 0.3rem;
  color: white;
  font-size: 1rem;
}
</style>