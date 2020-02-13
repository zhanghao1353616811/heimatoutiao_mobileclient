import Vue from 'vue'
import VueRouter from 'vue-router'

// 路由懒加载:属于首屏加载优化的一种方案
// 默认情况下所有页面资源都会打包到一起 如果页面过多会导致单个文件体积过大 使用路由懒加载可以优化这种情况
// 它的思路就是把每个页面的资源都独立的生成一个资源文件 只有当访问到该页面的时候才会请求加载

// 路由懒加载: 访问谁就加载谁 资源比较多适合懒加载
import Login from '@/views/login'
import UserProfile from '@/views/user-profile'
import UserChat from '@/views/user-chat'
import UserArticle from '@/views/user-article'
import User from '@/views/user'
import Search from '@/views/search'
import Article from '@/views/article'
import TabBar from '@/views/tab-bar'
import Home from '@/views/home'
import Question from '@/views/question'
import Video from '@/views/video'
import My from '@/views/my'

Vue.use(VueRouter)

// 配置路由表
const routes = [
  // 登录
  {
    name: 'login',
    path: '/login',
    // component: () => import('@/views/login')
    component: Login
  },
  {
    path: '/',
    // component: () => import('@/views/tab-bar'),
    component: TabBar,
    children: [
      // 主页
      {
        name: 'home',
        path: '', // 子路由什么也不写 默认子路由 组件home
        // component: () => import('@/views/home')
        component: Home
      },
      // 问答
      {
        name: 'question',
        path: '/question',
        // component: () => import('@/views/question')
        component: Question
      },
      // 视频
      {
        name: 'video',
        path: '/video',
        // component: () => import('@/views/video')
        component: Video
      },
      // 我的
      {
        name: 'my',
        path: '/my',
        // component: () => import('@/views/my')
        component: My
      }
    ]
  },
  // 用户资料 这个路由组件需要写在用户 path: '/user/:userId' 前面 因为匹配优先级不同
  // 要注意路由匹配的优先级 从上到下
  {
    name: 'user-profile',
    path: '/user/profile',
    // component: () => import('@/views/user-profile')
    component: UserProfile
  },
  // 小智同学
  {
    name: 'user-chat',
    path: '/user/chat',
    // component: () => import('@/views/user-chat')
    component: UserChat
  },
  // 用户
  {
    name: 'user',
    path: '/user/:userId', // 动态路由参数
    // component: () => import('@/views/user')
    component: User
  },
  // 搜索
  {
    name: 'search',
    path: '/search',
    // component: () => import('@/views/search')
    component: Search
  },
  // 文章 放到一级路由
  {
    name: 'article',
    path: '/article/:articleId',
    // component: () => import('@/views/article'),
    component: Article,
    props: true // 将路由动态参数映射到组件的props中 更推荐这种做法
    // 获取动态路由参数两种方式方式  1:this.$router.params.id获取
    // 2. 将props设置为true 在组件中接收props映射过来的id
    // 参考文档：https://router.vuejs.org/zh/guide/essentials/passing-props.html
  },
  // 收藏/历史/作品
  {
    name: 'my-article',
    path: '/my-article/:type?', //  :type? 能够匹配 /my-article  /my-article/a  /my-article/b
    // component: () => import('@/views/user-article'),
    component: UserArticle,
    props: true
  }
]

const router = new VueRouter({
  routes
})

export default router
