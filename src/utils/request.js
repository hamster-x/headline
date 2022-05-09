// 引入axios
import axios from 'axios'

const request = axios.create({
  baseURL: 'http://toutiao.itheima.net/',
  timeout: 5000
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
