/**
 * 用户请求相关模块
 */
import request from '@/utils/request.js'

export const userLogin = data => {
  // 具体的请求代码
  return request({
    url: '/app/v1_0/authorizations',
    method: 'POST',
    data // body查询参数
    // params:{} query 查询参数
    // headers:{
    // axios 会自动添加该请求头
    //   'Content-Type':'application/json'
    // }//请求头参数
  })
}

export const getSmsCode = mobile => {
  return request({
    method: 'GET',
    url: `/app/v1_0/sms/codes/${mobile}`
  })
}

// 获取当前登录的信息
export const getUserInfo = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/user'
  })
}
