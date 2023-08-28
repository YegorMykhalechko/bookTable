import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
      meta: {
        layout: 'Default'
      }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/auth/LoginView.vue'),
      meta: {
        layout: 'Default'
      }
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/auth/RegisterView.vue'),
      meta: {
        layout: 'Default'
      }
    },
    {
      path: '/user',
      name: 'user',
      component: () => import('../views/auth/UserView.vue'),
      meta: {
        layout: 'Dashboard'
      }
    }
  ]
})

export default router
