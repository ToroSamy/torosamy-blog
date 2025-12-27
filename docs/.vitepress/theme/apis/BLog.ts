import request from '../utils/request'


export const blogChatSendService = (data: any) => {
  return request({
    url: '/blog/chat/send',
    method: 'post',
    data
  })
}

export const blogChatRecoverService = (id: string) => {
  return request({
    url: `/blog/chat/recover/${id}`,
    method: 'get'
  })
}


export const blogPingService = () => {
  return request({
    url: '/blog/ping',
    method: 'post'
  })
}