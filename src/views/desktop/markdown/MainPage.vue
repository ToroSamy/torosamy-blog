<script setup lang="ts">
import MainAside from './components/MainAside.vue';
import MainHeader from './components/MainHeader.vue';
</script>

<template>
  <el-container class="layout-container">
    <MainAside></MainAside>

    <el-container class="aside-container">
      <MainHeader></MainHeader>
      <el-main><router-view></router-view></el-main>
    </el-container>


  </el-container>
</template>

<style lang="scss" scoped>
.layout-container {
  background-color: #2E2E2E;
  height: 52.5rem;
}

.aside-container {
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: 0;
}
</style>
