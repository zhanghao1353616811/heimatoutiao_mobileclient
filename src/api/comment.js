/**
 * 文章评论 接口模块
 */

import request from '@/utils/request'

// 获取文章评论
export const getArticleComments = params => {
  return request({
    method: 'GET',
    url: '/app/v1_0/comments',
    params
  })
}

// 添加评论或评论回复
export const addPostComments = data => {
  return request({
    method: 'POST',
    url: '/app/v1_0/comments',
    data
  })
}
