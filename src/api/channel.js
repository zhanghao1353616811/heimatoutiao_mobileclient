/**
 * 文章频道相关接口模块
 */
import request from '@/utils/request'

// 获取用户频道列表
export const getUserChannel = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/user/channels'
  })
}

// 获取全部频道列表
export const getAllChannels = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/channels'
  })
}
