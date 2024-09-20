<script setup>
import ViewHeader from '../components/view-page-1/ViewHeader.vue';
import ViewBody from '../components/view-page-1/ViewBody.vue';
</script>

<template>
  <el-carousel-item>
    <ViewHeader></ViewHeader>
    <ViewBody></ViewBody>
    <div class="footer"></div>
  </el-carousel-item>
</template>

<style scoped>
.el-carousel__item {
  width: 100vw;
  height: 100vh;
  background-color: #1A1D26;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}


.footer {
  background-color: #2B2B33;
  width: 100vw;
  height: 3vw;
}
</style>