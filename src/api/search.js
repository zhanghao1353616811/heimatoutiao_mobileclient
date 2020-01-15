/**
 * 文章搜索相关接口模块
 */
import request from '@/utils/request'

// 请求加载联想建议数据
export const getSuggestions = q => {
  return request({
    method: 'GET',
    url: '/app/v1_0/suggestion',
    params: {
      q
    }
  })
}

// 搜索结果数据
export const getSearchResult = params => {
  return request({
    method: 'GET',
    url: '/app/v1_0/search',
    params
  })
}
