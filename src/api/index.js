// 统一引入接口 并向外暴露
import * as user from './user'
import * as channel from './channel'
import * as news from './news'
export default {
  user,
  channel,
  news
}
