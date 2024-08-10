<script setup>
import DesktopView1 from './DesktopView1.vue';
import DesktopView2 from './DesktopView2.vue';
import DesktopView3 from './DesktopView3.vue';
</script>

<template>
  <el-carousel style="height: 52.25rem;" direction="vertical" :autoplay="false">
    <DesktopView1></DesktopView1>
    <DesktopView2></DesktopView2>
    <DesktopView3></DesktopView3>
  </el-carousel>
</template>

<style scoped></style>
