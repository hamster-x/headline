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
