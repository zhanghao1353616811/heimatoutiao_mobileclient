import Vue from 'vue'
import VueRouter from 'vue-router'

// const login = () => import('@/views/login')

Vue.use(VueRouter)

// 配置路由表
const routes = [
  // 登录
  {
    name: 'login',
    path: '/login',
    component: () => import('@/views/login')
  },
  // 用户资料 这个路由组件需要写在用户 path: '/user/:userId' 前面 因为匹配优先级不同
  // 要注意路由匹配的优先级 从上到下
  {
    name: 'user-profile',
    path: '/user/profile',
    component: () => import('@/views/user-profile')
  },
  // 收藏/历史/作品
  {
    name: 'my-article',
    path: '/my-article/:type?', //  :type? 能够匹配 /my-article  /my-article/a  /my-article/b
    component: () => import('@/views/user-article'),
    props: true
  },
  // 用户
  {
    name: 'user',
    path: '/user/:userId', // 动态路由参数
    component: () => import('@/views/user')
  },
  // 搜索
  {
    name: 'search',
    path: '/search',
    component: () => import('@/views/search')
  },
  // 文章 放到一级路由
  {
    name: 'article',
    path: '/article/:articleId',
    component: () => import('@/views/article'),
    props: true // 将路由动态参数映射到组件的props中 更推荐这种做法
    // 获取动态路由参数两种方式方式  1:this.$router.params.id获取
    // 2. 将props设置为true 在组件中接收props映射过来的id
    // 参考文档：https://router.vuejs.org/zh/guide/essentials/passing-props.html
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
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
