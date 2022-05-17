// 引入axios
import axios from 'axios'
import router from '@/router'
import { Notify } from 'vant'
import { getToken, removeToken } from '@/utils/token'

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
}, function (error) {
  // 对响应错误做点什么
  // http响应状态码4,5开头的进入到这里
  if (error.response.status === 401) {
    // token过期 强制跳转登录页面
    Notify({ type: 'warning', message: '登录信息失效' })
    // 清除本地token
    removeToken()
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
