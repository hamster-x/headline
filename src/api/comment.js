import request from '@/utils/request'

// 评论相关的接口
export const reqComment = ({ source, offset = null, limit = 10 }) => request({
  url: '/v1_0/comments',
  method: 'get',
  params: {
    type: 'a',
    source,
    offset,
    limit
  }
})

// 对评论点赞
export const reqCollect = (comId) => request({
  url: '/v1_0/comment/likings',
  method: 'post',
  data: {
    target: comId
  }
})

// 对评论取消点赞
export const reqCancelCollect = (comId) => request({
  url: `/v1_0/comment/likings/${comId}`,
  method: 'delete'
})

// 对文章进行评论
export const reqSendComment = (id, content, artId = null) => {
  const obj = {
    target: id,
    content
  }
  // 只有对评论进行评论时 才会需要此参数
  if (artId !== null) {
    obj.art_id = artId
  }
  return request({
    url: '/v1_0/comments',
    method: 'post',
    data: obj
  })
}
