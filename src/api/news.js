// 新闻相关
import request from '@/utils/request'

// 获取新闻列表
export const reqArticles = (channelId, timestamp) => request({
  url: '/v1_0/articles',
  method: 'get',
  params: {
    channel_id: channelId,
    timestamp
  }
})
// 新闻不感兴趣
export const reqDislikes = (target) => request({
  url: '/v1_0/article/dislikes',
  method: 'post',
  data: {
    target
  }
})

// 举报文章
export const reqReports = (target, type, remark) => request({
  url: '/v1_0/article/reports',
  method: 'post',
  data: {
    target,
    type,
    remark
  }
})

// 获取新闻详情
export const reqArticleDetail = (artId) => request({
  url: `/v1_0/articles/${artId}`
})

// 对新闻点赞
export const reqLike = (artId) => request({
  url: '/v1_0/article/likings',
  method: 'post',
  data: {
    target: artId
  }
})

// 对新闻取消点赞
export const reqCancelLike = (artId) => request({
  url: `/v1_0/article/likings/${artId}`,
  method: 'delete'
})
