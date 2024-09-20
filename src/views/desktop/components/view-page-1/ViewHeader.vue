<script setup></script>

<template>
  <div class="header">

    <div style="display: flex; gap: 1vw; margin-left: 5vw;">

      <img src="../../assets/view-page-1/profile.jpg" style="width: 5vw; height: auto;">

      <div class="title-box">
        <div style="font-size: 1.5vw;">Skill Tree</div>
        <div style="font-size: 1vw;">正因为知道可以在空中翱翔 才会畏惧展翅的那一刻而忘却疾风</div>
        <div style="font-size: 1vw;">
          Under the guidance of time, even when alone, there are things that cannot be forgotten
        </div>
      </div>
    </div>



    <div class="img-box">
      <img src="../../assets/view-page-1/think.png" style="height: 5vw; width: auto;">
      <img src="../../assets/view-page-1/yy.png" style="height: 5vw; width: auto;">
      <img src="../../assets/view-page-1/cry.jpg" style="height: 5vw; width: auto;">
      <img src="../../assets/view-page-1/question.jpg" style="height: 5vw; width: auto;">
    </div>


  </div>
</template>

<style scoped>
.header {
  background-color: #2B2B33;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-radius: 10px;
  border: 1px solid #5a5656;
  width: 100vw;
  height: 5vw;
  padding: 0.5vw;
}

.title-box {
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;
  font-family: 'Comic Sans MS'
}

.img-box {
  margin-right: 2vw;
  gap: 1.5vw;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
</style>
