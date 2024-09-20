<script setup>
</script>

<template>
  <div class="container">

    <div class="header-box">
      <img class="header-box-profile" src="@/assets/images/torosamy-profile.png">
      <div class="header-box-word">
        <div style="font-size: 3vw;">Welcome~ </div>
        <div style="font-size: 3.5vw;">这里是Torosamyの小窝</div>
      </div>
    </div>

    <div style="font-size: 2.5vw;">如果你能在浪费时间中获得乐趣，那就不是浪费时间。</div>
    <div style="font-size: 1.9vw;">I KNOW EVERYTHING HAPPENS FOR A REASON, BUT WHAT THE FU*K</div>
  </div>
</template>

<style scoped>
.container {
  font-family: 'Comic Sans MS';
  color: white;

  background-color: rgba(90, 86, 86, 0.4);
  border-radius: 10px;
  border: 1px solid #5a5656;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 70vw;
  padding: 2vw 3vw;
  gap: 1vw;
}

.header-box {
  display: flex;
  flex-direction: row;
  width: 100%;
  gap: 2vw;
}

.header-box-profile {
  width: auto;
  height: 10vw;
}

.header-box-word {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>