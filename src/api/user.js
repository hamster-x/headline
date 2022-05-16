// 引入二次封装的axios
import request from '@/utils/request'

// 用户登录接口
export const reqLogin = (user) => request({
  url: '/v1_0/authorizations',
  method: 'post',
  data: user
})

// 关注用户
export const reqFollow = (target) => request({
  url: '/v1_0/user/followings',
  method: 'post',
  data: {
    target
  }
})

// 取消关注用户
export const reqCancelFollow = (target) => request({
  url: `/v1_0/user/followings/${target}`,
  method: 'delete'
})
