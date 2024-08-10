import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/index',
      component: () => import('../views/home/MainPage.vue'),
      children: [
        {path: '/',component: () => import('../views/home/MainPage.vue')}
      ]
    }
  ]
})

export default router
