import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'DefaultLayout',
      component: import('../layouts/default.vue'),
      children: [
        {
          path: '',
          name: 'IndexPage',
          component: import('../pages/index.vue'),
          meta: {
            requiresProfile: true,
          },
        },
        {
          path: 'login',
          name: 'LoginPage',
          component: import('../pages/login.vue'),
        },
        {
          path: 'register',
          name: 'RegisterPage',
          component: import('../pages/register.vue'),
        },
        {
          path: 'profile',
          name: 'ProfilePage',
          component: import('../pages/profile.vue'),
          meta: {
            requiresProfile: true,
            requiresAuth: true,
          },
        },
      ],
    },
  ],
})

router.beforeResolve(async (to) => {
  const auth = useAuthStore()

  if ((to.path === '/login' || to.path === '/register') && auth.isAuth) {
    return '/'
  }

  if (to.meta.requiresProfile) {
    await auth.loadProfile()
  }

  if (to.meta.requiresAuth && !auth.isAuth) {
    return '/login'
  }
})

export default router
