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
  },
  // 放到一级路由
  {
    name: 'article',
    path: '/article/:articleId',
    component: () => import('@/views/article')
  },
  {
    path: '/',
    component: () => import('@/views/tab-bar'),
    children: [
      // 主页
      {
        name: 'home',
        path: '', // 子路由什么也不写 默认子路由 组件home
        component: () => import('@/views/home')
      },
      // 问答
      {
        name: 'question',
        path: '/question',
        component: () => import('@/views/question')
      },
      // 视频
      {
        name: 'video',
        path: '/video',
        component: () => import('@/views/video')
      },
      // 我的
      {
        name: 'my',
        path: '/my',
        component: () => import('@/views/my')
      },
      // 用户 组件放在二级路由
      {
        name: 'user',
        path: '/user/:userId',
        component: () => import('@/views/user')
      },
      // 搜索 组件放在二级路由
      {
        name: 'search',
        path: 'search',
        component: () => import('@/views/search')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
