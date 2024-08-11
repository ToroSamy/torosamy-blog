<script setup>
import MobileView1 from './MobileView1.vue';
import MobileView2 from './MobileView2.vue';
import MobileView3 from './MobileView3.vue';
</script>

<template>
  <el-carousel direction="vertical" :autoplay="false">
    <MobileView1></MobileView1>
    <MobileView2></MobileView2>
    <!-- <MobileView3></MobileView3> -->
  </el-carousel>
</template>

<style scoped>
.el-carousel {
  width: 100%;
  height: 100vh;
}
</style>
