<script setup></script>

<template>
  <div class="body">
    <div style="display: flex; gap: 1vw; margin-left: 5vw;">
      <img src="../../assets/view-page-2/profile.jpg" style="width: 5vw; height: auto;">

      <div class="title-box">
        <div style="font-size: 1.5vw;">Leisure Daily</div>
        <div style="font-size: 1vw;">不像你们这些大少爷， 我们光是活下去就要拼尽全力了啊 ！</div>
        <div style="font-size: 1vw;">Unlike you young masters, we have to give our all just to survive</div>
      </div>
    </div>

    <div class="img-box">
      <img src="../../assets/view-page-2/fool.png" style="height: 5vw; width: auto;">
      <img src="../../assets/view-page-2/want.png" style="height: 5vw; width: auto;">
      <img src="../../assets/view-page-2/anger.jpg" style="height: 5vw; width: auto;">
      <img src="../../assets/view-page-2/love.jpg" style="height: 5vw; width: auto;">
    </div>


  </div>
</template>

<style scoped>
.body {
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
