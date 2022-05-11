// 频道相关的接口
import request from '@/utils/request'
import { getToken } from '@/utils/token'

export const reqUserChannels = () => request({
  url: '/v1_0/user/channels',
  method: 'get',
  headers: {
    Authorization: `Bearer ${getToken()}`
  }
})
