import { createRouter, createWebHistory } from 'vue-router'
import { defineAsyncComponent } from 'vue';
function isMobileDevice() {
  return /Mobi|Android/i.test(navigator.userAgent);
}
function getDeviceType() {
  if (isMobileDevice()) {
    return 'mobile';
  } else {
    return 'desktop';
  }
}
const deviceType = getDeviceType()

const Main = defineAsyncComponent(() =>
  deviceType === 'mobile'
    ? import('@/views/mobile/MainPage.vue')
    : import('@/views/desktop/MainPage.vue')
)
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: Main },
    { path: '/:pathMatch(.*)*', redirect: '/' }
  ]
})

export default router
