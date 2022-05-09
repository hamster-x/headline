// 引入二次封装的axios
import request from '@/utils/request'

// 用户登录接口
export const reqLogin = (user) => request({
  url: '/v1_0/authorizations',
  method: 'post',
  data: user
})
