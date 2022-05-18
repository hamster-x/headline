// 引入axios
import axios from 'axios'
import router from '@/router'
import { getToken, setToken } from '@/utils/token'
import { reqNewToken } from '@/api/user'
import Notify from '@/ui/Notify'

const request = axios.create({
  baseURL: 'http://toutiao.itheima.net/',
  timeout: 5000
})

// 添加请求拦截器
request.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  if (getToken() && config.headers.Authorization === undefined) {
    config.headers.Authorization = `Bearer ${getToken()}`
  }
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
request.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  // http响应状态码为2,3开头的进入到这里
  return response
}, async function (error) {
  // 对响应错误做点什么
  // http响应状态码4,5开头的进入到这里
  if (error.response.status === 401) {
    // token过期 强制跳转登录页面

    // 原来的方式 强制跳转登录页
    /* // 清除本地token
    removeToken()
    router.replace('/login') */

    // 方式二 使用refresh_token 换回新的token继续使用 js代码实现 使用户无感知
    const result = await reqNewToken()
    // 1.新的token回来之后 存储token在本地
    setToken(result.data.data.token)
    // 更新新的token在请求头里
    error.config.headers.Authorization = `Bearer ${result.data.data.token}`
    // 3.把未完成的请求 再发起一次
    return request(error.config)
  } else if (error.response.status === 500 && error.config.url === '/v1_0/authorizations' && error.config.method === 'put') {
    // 如果refresh_token 也失效
    Notify({ type: 'warning', message: '身份过期' })
    // 清除所有token
    localStorage.clear()
    // 跳转登录页
    router.replace('/login')
  }
  return Promise.reject(error)
})

export default ({ url, method = 'GEt', params = {}, data = {}, headers = {} }) => {
  return request({
    url,
    method,
    params,
    data,
    headers
  })
}
