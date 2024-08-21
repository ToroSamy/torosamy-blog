<script setup>

</script>

<template>

  <el-carousel-item>
    <div class="container">
      <div class="info-box">
        <div class="header-box">
          <img class="profile-picture" src="../../assets/profile.png">
          <div class="word-box">
            <div class="top-word">Welcome~ </div>
            <div class="bottom-word">这里是Torosamyの小窝</div>
          </div>
        </div>
        <div class="text-1">如果你能在浪费时间中获得乐趣，那就不是浪费时间。</div>
        <div class="text-2">I KNOW EVERYTHING HAPPENS FOR A REASON, BUT WHAT THE FU*K</div>
      </div>


      <ul class="global-list" style="overflow: auto">
        <li class="list-item">Java</li>
        <li class="list-item">Kotlin</li>
        <li class="list-item">Go</li>
        <li class="list-item">Python</li>
        <li class="list-item">C/Cpp</li>
        <li class="list-item">rust</li>
        <li class="list-item">html css</li>
        <li class="list-item">js ts</li>
        <li class="list-item">sql</li>
        <li class="list-item">And More ! </li>
      </ul>

      <ul class="global-list" style="overflow: auto">
        <li class="list-item">SpringBoot</li>
        <li class="list-item">Ros2</li>
        <li class="list-item">openCV</li>
        <li class="list-item">Vue</li>
        <li class="list-item">Bukkit </li>
        <li class="list-item">Linux </li>
        <li class="list-item">Mirai </li>
        <li class="list-item">And More ! </li>
      </ul>



    </div>
  </el-carousel-item>

</template>

<style scoped>
.global-list {
  /* 大小 */
  width: 33vw;
  height: 29vh;
  /* 边框 */
  background-color: rgba(90, 86, 86, 0.4);
  border-radius: 10px;
  border: 1px solid #5a5656;
  /* 边距 */
  padding: 0 1.5vw;
  margin-left: -3vw;
}


.list-item {
  margin-top: 0.8vh;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 5vh;
  background-color: rgba(165, 165, 165, 0.5);
  color: white;
  font-size: 5vw;
}


.info-box {
  font-family: 'Comic Sans MS';
  color: white;
  background-color: rgba(90, 86, 86, 0.4);
  border-radius: 10px;
  border: 1px solid #5a5656;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 50vw;
  height: 12vh;
  padding: 1vh 3vw;
}

.header-box {
  display: flex;
  flex-direction: row;
  width: 100%;
  padding: 1vh 0;
}

.header-box .profile-picture {
  margin-right: 2vw;
  width: auto;
  height: 5vh;
}

.word-box {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.word-box .top-word {
  font-size: 3vw
}

.word-box .bottom-word {
  font-size: 3.5vw;
}

.text-1 {
  font-size: 2vw;
}

.text-2 {
  margin-top: 1vh;
  font-size: 1.35vw;
}


.el-carousel__item {
  margin: 0;
  background-color: #65bbca;
  background-image: url(../../assets/background-mobile.png);
  background-size: cover;
  background-repeat: no-repeat;
  background-position: 50% 50%;
  width: 100vw;
  height: 100vh;
}

.container {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 0 8vw;
}
</style>