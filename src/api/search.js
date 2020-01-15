/**
 * 文章搜索相关接口模块
 */
import request from '@/utils/request'

// 获取用户频道列表
export const getSuggestions = q => {
  return request({
    method: 'GET',
    url: '/app/v1_0/suggestion',
    params: {
      q
    }
  })
}
