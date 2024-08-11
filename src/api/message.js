import request from '@/utils/request'

export const sendMessageService = (message, ip) => {
  return request({
    url: '/message/send',
    method: 'get',
    params: {message,ip}
  })
}
