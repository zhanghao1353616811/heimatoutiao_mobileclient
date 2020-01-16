/**
 * Vuex 容器
 *    获取方便
 *    响应式的
 * 本地存储
 *    持久化
 */

import Vue from 'vue'
import Vuex from 'vuex'

import { getItem, setItem } from '@/utils/storage.js'
import decodeJwt from 'jwt-decode'

Vue.use(Vuex)

const USER_KEY = 'user'

export default new Vuex.Store({
  state: {
    user: getItem(USER_KEY) // 当前登录用户状态(token)
  },
  mutations: {
    // 本地存储只是为了持久化 页面中怎么访问到用户登录状态 拿到token 可以直接找容器拿 而容器内部已经把持久化自行解决了
    setUser (state, data) {
      if (data && data.token) {
        // console.log(decodeJwt(data.token)) 解析 Jwt中token数据 得到一个对象 在对象里拿取用户id
        data.id = decodeJwt(data.token).user_id // data.id 自定义一个id
      }
      state.user = data
      // 为了避免页面刷新数据丢失  我们这里使用本地存储进行 持久化
      setItem(USER_KEY, state.user)
    }
  },
  actions: {
  },
  modules: {
  }
})
