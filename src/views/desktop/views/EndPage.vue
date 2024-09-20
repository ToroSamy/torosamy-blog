<script setup></script>

<template>
  <el-carousel-item>
    <div class="main-box">

      <div class="message-box">
        <div style="font-size: 2vw;">GoodBye~ </div>
        <div style="font-size: 3vw;">这里是Torosamyの小窝</div>
        <div style="font-size: 1vw;">如果你能在浪费时间中获得乐趣，那就不是浪费时间。</div>
        <div style="font-size: 1vw;">I KNOW EVERYTHING HAPPENS FOR A REASON, BUT WHAT THE FU*K</div>
        <br>
        <div style="font-size: 2vw;">尚未设计完成 敬请期待</div>
        <div style="font-size: 1.5vw;">欢迎您提出更多意见</div>
      </div>

    </div>
  </el-carousel-item>


</template>

<style scoped>
.el-carousel__item {
  background-image: url(../assets/end-background.png);
  background-size: 100vw 100vh;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
}


.main-box {
  margin-left: 8vw;
  background-color: rgba(90, 86, 86, 0.4);
  border-radius: 10px;
  border: 1px solid #5a5656;
  padding: 1.5vw 2vw 1vw 2vw;
  /* 上下 左右 上、右、下、左。 */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1vw;
}

.message-box {
  padding: 1vw 1vw;
  font-family: 'Comic Sans MS';
  display: flex;
  flex-direction: column;
  color: white;
}
</style>
