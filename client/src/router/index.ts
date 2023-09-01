import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue'),
      meta: {
        layout: 'Default',
        requiresGuest: true
      }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/auth/LoginView.vue'),
      meta: {
        layout: 'Default',
        requiresGuest: true
      }
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/views/auth/RegisterView.vue'),
      meta: {
        layout: 'Default',
        requiresGuest: true
      }
    },
    {
      path: '/user',
      name: 'user',
      component: () => import('@/views/auth/UserView.vue'),
      meta: {
        layout: 'Dashboard',
        requiresAuth: true
      }
    }
  ]
})

router.beforeResolve(async (to, from, next) => {
  const authStore = useAuthStore()

  if (to.meta.requiresAuth && !authStore.isAuth) {
    return next({ name: 'login' })
  } else if (to.meta.requiresGuest && authStore.isAuth) {
    return next({ name: 'user' })
  } else {
    return next()
  }
})

export default router
