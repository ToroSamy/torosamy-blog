import request from '@/utils/request'

export const sendMarkdownNamesService = () => {
  return request({
    url: '/markdown/list',
    method: 'post'
  })
}

export const sendMarkdownContentService = (markdownName) => {
  return request({
    url: '/markdown/get',
    method: 'get',
    params: {markdownName}
  })
}
