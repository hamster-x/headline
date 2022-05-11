// 新闻相关
import request from '@/utils/request'
import { getToken } from '@/utils/token'
export const reqArticles = (channelId, timestamp) => request({
  url: '/v1_0/articles',
  method: 'get',
  params: {
    channel_id: channelId,
    timestamp
  },
  headers: {
    Authorization: `Bearer ${getToken()}`
  }
})
