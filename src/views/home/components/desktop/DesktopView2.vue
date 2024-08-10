<script setup>
</script>

<template>
  <el-carousel-item>
    <div class="background"></div>


    <div>123</div>
  </el-carousel-item>
</template>

<style scoped>
.background {
  width: 100%;
  height: 100%;
  background: inherit;
  filter: brightness(25%) contrast(100%) saturate(150%);
}

.el-carousel__item {
  background-image: url(../../assets/background.jpg);
  background-size: cover;
  width: 100%;
  height: 52.25rem;
}
</style>