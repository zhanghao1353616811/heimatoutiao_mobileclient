/**
 * 文章列表相关接口模块
*/

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

// 获取新闻文章详情数据
export const getArticleDetails = articleId => {
  return request({
    method: 'GET',
    url: `/app/v1_0/articles/${articleId}`
  })
}

// 获取收藏文章数据
export const addCollect = target => {
  return request({
    method: 'POST',
    url: '/app/v1_0/article/collections',
    data: {
      target
    }
  })
}

// 获取取消收藏文章数据
export const deleteCollect = targetId => {
  return request({
    method: 'DELETE',
    url: `/app/v1_0/article/collections/${targetId}`
  })
}

// 获取对文章点赞数据
export const addLike = (target) => {
  return request({
    method: 'POST',
    url: '/app/v1_0/article/likings',
    data: {
      target
    }
  })
}

// 获取对文章点赞数据
export const deleteLike = targetId => {
  return request({
    method: 'DELETE',
    url: `/app/v1_0/article/likings/${targetId}`
  })
}
