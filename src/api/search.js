/**
 * 文章搜索相关接口模块
 */
import request from '@/utils/request'

// 获取联想建议数据
export const getSuggestions = q => {
  return request({
    method: 'GET',
    url: '/app/v1_0/suggestion',
    params: {
      q
    }
  })
}

// 获取搜索结果数据
export const getSearchResult = params => {
  return request({
    method: 'GET',
    url: '/app/v1_0/search',
    params
  })
}

// 删除用户搜索历史
export const getSearchHistories = params => {
  return request({
    method: 'GET',
    url: '/app/v1_0/search/histories'
  })
}
