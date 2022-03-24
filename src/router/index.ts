import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '',
    redirect: '/login'
  },
  {
    path:'/login',
    component: ()=> import('../views/login.vue')
  },
  {
    path: '/page/:id',
    component: () => import ('../views/FolderPage.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
