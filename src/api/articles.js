import request from '@/utils/request'

// 获取文章列表数据
export const getUserArticles = (userId, params) => {
  return request({
    params,
    method: 'GET',
    url: `/app/v1_0/users/${userId}/articles`
  })
}

// 获取频道的文章列表数据
export const getArticleChannels = params => {
  return request({
    params,
    method: 'GET',
    url: '/app/v1_1/articles'
  })
}
