import request from '@/utils/request.js'

export const userLogin = data => {
  return request({
    url: '/app/v1_0/authorizations',
    method: 'POST',
    data
  })
}
