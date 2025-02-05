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

const Main = 
  deviceType === 'mobile'
    ? () => import('@/views/mobile/MainPage.vue')
    : () => import('@/views/desktop/MainPage.vue')


const MarkdownList = 
  deviceType === 'mobile'
    ? () => import('@/views/mobile/markdown/components/MarkdownList.vue')
    : () => import('@/views/desktop/markdown/components/MarkdownList.vue')


const MarkdownContainer = 
  deviceType === 'mobile'
    ? () => import('@/views/mobile/markdown/MainPage.vue')
    : () => import('@/views/desktop/markdown/MainPage.vue')

import MarkdownContent from '@/views/desktop/markdown/components/MarkdownContent.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: Main },
    {
      path: '/markdown',
      component: MarkdownContainer,
      redirect: '/markdown/list',
      children: [
        { path: '/markdown/list', component: MarkdownList }, 
        { path: '/markdown/content', component: MarkdownContent }
      ]
    },
    { path: '/:pathMatch(.*)*', redirect: '/' }
  ]
})

export default router
