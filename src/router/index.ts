import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'

const router = createRouter({
  history: createWebHistory('/'),
  routes: [
    {
      path: '/',
      name: 'home',
      component: LoginView,
    },
    {
      path: '/my',
      name: 'my',
      component: () => import('../views/ProfileView.vue'),
    },
    {
      path: '/main',
      name: 'main',
      component: () => import('../views/HomeView.vue'),
    },
    {
      path: '/hackathon',
      name: 'hackathon',
      component: () => import('../views/HackathonView.vue'),
    },
  ],
})

export default router
