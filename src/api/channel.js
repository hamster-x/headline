// 频道相关的接口
import request from '@/utils/request'

// 获取所有频道
export const reqChannelAll = () => request({
  url: '/v1_0/channels',
  method: 'get'
})

// 获取用户的频道
export const reqUserChannels = () => request({
  url: '/v1_0/user/channels',
  method: 'get'
})
