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

// 获取用户自己信息
export const reqUserInfo = () => request({
  url: '/v1_0/user',
  method: 'get'
})

// 获取用户个人资料
export const reqUserProfile = () => request({
  url: '/v1_0/user/profile',
  method: 'get'
})

// 用户更换头像
export const reqUpdatePhoto = formObj => request({
  url: '/v1_0/user/photo',
  method: 'patch',
  data: formObj
  // 如果你的请求体内容是表单对象, 浏览器会自动携带请求头Content-Type为multipart/form-data
})

// 编辑用户个人资料
export const reqEditUserProfile = (dataObj) => {
  const obj = {
    name: '',
    gender: '',
    birthday: '',
    real_name: '',
    intro: ''
  }
  // 对准备好的对象进行循环
  for (const objKey in obj) {
    // 如果传入的对象的找不到 obj里面的key 就把obj对应的key删除
    if (dataObj[objKey] === undefined) {
      delete obj[objKey]
    } else {
      // 如果找到了 就把传入的key赋值给obj
      obj[objKey] = dataObj[objKey]
    }
  }
  return request({
    url: '/v1_0/user/profile',
    method: 'patch',
    data: obj
  })
}
