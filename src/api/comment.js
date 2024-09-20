import request from '@/utils/request'

export const sendUserCommentService = (username, comment) => {
  return request({
    url: '/comment/send/user',
    method: 'get',
    params: {username, comment}
  })
}

export const sendUnknownCommentService = (comment) => {
  return request({
    url: '/comment/send/unknown',
    method: 'get',
    params: {comment}
  })
}
