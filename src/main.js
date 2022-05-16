import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 引入rem适配方案
import 'amfe-flexible'
// 统一引入api接口 挂载到Vue原型对象上面
import API from './api'
// 引入初始化css
import './styles/normalize.css'
// 按需引入vant组件
import { NavBar, Form, Field, Button, Tabbar, TabbarItem, Icon, Tab, Tabs, Cell, List, PullRefresh, ActionSheet, Popup, Row, Col, Badge, Search, Divider } from 'vant'

Vue.use(NavBar)
Vue.use(Form)
Vue.use(Field)
Vue.use(Button)
Vue.use(Tabbar)
Vue.use(TabbarItem)
Vue.use(Icon)
Vue.use(Tab)
Vue.use(Tabs)
Vue.use(Cell)
Vue.use(List)
Vue.use(PullRefresh)
Vue.use(ActionSheet)
Vue.use(Popup)
Vue.use(Row)
Vue.use(Col)
Vue.use(Badge)
Vue.use(Search)
Vue.use(Divider)

const plugins = {
  install (Vue) {
    // 自定义指令
    Vue.directive('focus', {
      inserted (el) {
        if (el instanceof HTMLTextAreaElement) {
          el.focus()
        } else {
          const input = el.querySelector('input')
          input.focus()
        }
      }
    })
  }
}
Vue.use(plugins)

Vue.config.productionTip = false
Vue.prototype.$API = API
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
