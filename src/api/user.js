/**
 * 用户请求相关接口模块
 */
import request from '@/utils/request.js'

// 获取用户登录数据
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

// 获取验证码数据
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

// 获取指定用户
export const getUserById = userId => {
  return request({
    method: 'GET',
    url: `/app/v1_0/users/${userId}`
  })
}

// 获取关注用户
export const addFollow = target => {
  return request({
    method: 'POST',
    url: '/app/v1_0/user/followings',
    data: {
      target
    }
  })
}

// 获取取消关注用户
export const deleteFollow = userId => {
  return request({
    method: 'DELETE',
    url: `/app/v1_0/user/followings/${userId}`
  })
}

// 获取用户个人资料
export const getUserProfile = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/user/profile'
  })
}

// 编辑用户照片资料
export const updateUserPhoto = data => {
  return request({
    method: 'PATCH',
    url: '/app/v1_0/user/photo',
    data
  })
}
