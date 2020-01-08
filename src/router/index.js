import Vue from 'vue'
import VueRouter from 'vue-router'

// const login = () => import('@/views/login')

Vue.use(VueRouter)

// 配置路由表
const routes = [
  {
    name: 'login',
    path: '/login',
    component: () => import('@/views/login')
  }
]

const router = new VueRouter({
  routes
})

export default router
