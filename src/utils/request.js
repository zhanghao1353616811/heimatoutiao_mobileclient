/**
 * 基于axios的请求模块
 */

import axios from 'axios'
import jsonBig from 'json-bigint'

// 在非组件模块中 直接加载获取容器
// 这里拿到的store 和你在组件中访问 this.$store 是一个东西
import store from '@/store/index.js'
import router from '@/router'

// axios.create 方法创建一个和 axios 本身功能一样的一个对象
const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/' // 基础路径
})

// axios 开放了自定义转换后端返回数据的 API
// data 就是后端返回的原始数据
request.defaults.transformResponse = [function (data) {
  // 现在我们定制使用 json-bigint 来帮我们处理转换原始的 JSON 格式字符串
  // 这个方法类似于 JSON.parse,只不过它能把数据中超出 JS 安全整数范围的数字给处理成正确的
  // 它内部有自己的算法  会把大数字转为一个对象  我们在使用的时候把对象.toString() 就得到字符串形式的 id
  // 如果转换成功 则返回成功的结果给请求使用
  // 如果转换失败 则进入 catch 返回一个空对象
  try {
    return jsonBig.parse(data)
    // 它默认是这样的 JSON.parse(data)
  } catch (error) {
    // console.log('超出 JS 安全整数范围数字转换失败', error)
    return {}
  }
}]

// 请求拦截器
request.interceptors.request.use(function (config) {
  // config请求配置对象 我们可以通过修改 config 来实现统一请求数据处理
  const { user } = store.state
  // console.log(user)
  if (user) {
    // console.log(config)
    // 统一添加 token
    // config.headers 获取操作请求头对象
    // Authorization 是后端要求的字段名称 数据值后端要求提供 Bearer token数据
    config.headers.Authorization = `Bearer ${user.token}`
  }
  return config
}, function (error) {
  return Promise.reject(error)
})

// 响应拦截器
request.interceptors.response.use(function (response) {
  return response
}, async function (error) {
  // 处理token过期
  // 任何请求都会携带 token 都可能发生 token 过期 401
  // 如果单独给每个请求处理响应 401 太麻烦 所以使用响应拦截器统一处理
  if (error.response && error.response.status === 401) {
    // 1. 如果没有refresh_token 则直接跳转到登录页面
    const user = store.state.user
    if (!user || !user.refresh_token) {
      redirectLogin()
      return
    }
    // 2.如果有 则请求更新token
    try {
      // 这里为啥使用 axios 请求刷新 token?
      // 刷新 token 的接口要求把 refresh_token 放到请求头中 名字叫做 Authorization
      // 如果我们使用 request 请求 刷新 token
      // 则会走 request 的请求拦截器 request 的请求拦截器中添加的是 token 不是 refresh_token
      // 刷新 token 请求 接口需要 refresh_token 非刷新 token 的请求 则需要 token 需要改逻辑
      // 如果 request 刷新 token 失败了 还会进入 request自己的响应拦截器中 在这里会执行请求刷新 token 的操作
      // 而我们需要 当刷新 token 失败之后的直接跳转登录页 不需要在执行任何的处理了
      // 所以 request 请求拦截器处理 和响应拦截器 不符合我们请求刷新 token 的要求 除非你在里面继续更多的判断逻辑
      const { data } = await axios({
        method: 'PUT',
        url: 'http://ttapi.research.itcast.cn/app/v1_0/authorizations',
        Headers: {
          Authorization: `Bearer ${user.refresh_token}`
        }
      })
      // 3.如果刷新token成功了 则把新的 token更新到容器中
      // console.log(data)

      // store.commit 修改容器数据必须通过 mutation来修改
      store.commit('setUser', {
        ...user, // 原来数据不变 user:{ id,token,refresh_token }
        token: data.data.token // 更新token
      })
      // 4.把之前失败的请求继续发出去
      // error.config 获取道德是本次请求的相关配置对象 其中包含它的 method url等信息
      // 谁请求失败 谁就是 error.config 错误的请求
      console.log(error.config)
      // 把本次因为 token无效过期的失败请求重新发送
      // 注意: 这里使用 request 还是走原来的请求拦截器 响应拦截器
      // 注意: 使用 return 把请求结果继续返回 真正请求的代码才能拿到
      return request(error.config)
    } catch (error) {
      console.log('刷新token失败', error)
      redirectLogin()
    }
  }
  return Promise.reject(error)
})

function redirectLogin () {
  router.push({
    name: 'login',
    // query 参数会以 ？key=calue&key=value 的格式添加到 url 后面
    query: {
      // 这里使用查询参数 把要跳转回来的路由地址传递给了登录页面
      // router.currentRoute 就是当前路由对象 好比我们在组件中的 this.$route
      // 当前路由对象的fullPath就是当前路由的路径
      redirect: router.currentRoute.fullPath
    }
  })
}

export default request
