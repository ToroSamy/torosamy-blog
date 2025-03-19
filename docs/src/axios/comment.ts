import request from './request.ts'

export const sendUserCommentService = (username: string, comment: string) => {
  return request({
    url: '/comment/send/user',
    method: 'get',
    params: { username, comment }
  })
}

export const sendUnknownCommentService = (comment: string) => {
  return request({
    url: '/comment/send/unknown',
    method: 'get',
    params: { comment }
  })
}
