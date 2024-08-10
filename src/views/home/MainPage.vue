<script setup lang="ts">
import { ref, defineAsyncComponent } from 'vue'
const HomeContainer = defineAsyncComponent(() =>
  deviceType === 'mobile'
    ? import('./components/mobile/HomeContainer.vue')
    : import('./components/desktop/HomeContainer.vue')
)

function isMobileDevice() {
  return /Mobi|Android/i.test(navigator.userAgent);
}
function isTabletDevice() {
  return /Tablet|iPad/i.test(navigator.userAgent);
}
function getDeviceType() {
  if (isMobileDevice()) {
    return 'mobile';
  } else if (isTabletDevice()) {
    return 'tablet';
  } else {
    return 'desktop';
  }
}
const deviceType = getDeviceType()

</script>

<template>
  <HomeContainer></HomeContainer>
</template>

<style scoped lang="scss"></style>
