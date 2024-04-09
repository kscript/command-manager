import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    redirect: '/manager/manifest',
    children: [
      {
        path: '/manager',
        name: 'manager',
        redirect: '/manager/manifest',
        component: () => import(/* webpackChunkName: "manager" */ '../views/manager/index.vue'),
        children: [
          {
            path: '/manager/add',
            name: 'managerAdd',
            component: () => import(/* webpackChunkName: "managerAdd" */ '../views/manager/add.vue')
          },
          {
            path: '/manager/edit',
            name: 'managerEdit',
            component: () => import(/* webpackChunkName: "managerEdit" */ '../views/manager/add.vue')
          },
          {
            path: '/manager/copy',
            name: 'managerCopy',
            component: () => import(/* webpackChunkName: "managerCopy" */ '../views/manager/add.vue')
          },
          {
            path: '/manager/list',
            name: 'managerList',
            component: () => import(/* webpackChunkName: "managerList" */ '../views/manager/list.vue')
          },
          {
            path: '/manager/manifest',
            name: 'managerManifest',
            component: () => import(/* webpackChunkName: "managerManifest" */ '../views/manager/manifest.vue')
          }
        ]
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
