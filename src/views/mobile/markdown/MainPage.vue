<script setup lang="ts">
import MainHeader from './components/MainHeader.vue';
</script>

<template>
  <el-container class="aside-container">
      <MainHeader></MainHeader>
      <el-main><router-view></router-view></el-main>

  </el-container>
</template>

<style lang="scss" scoped>


.aside-container {
  height: 52.5rem;
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: 0;
}
</style>
