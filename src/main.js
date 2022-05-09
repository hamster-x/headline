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
import { NavBar, Form, Field, Button } from 'vant'

Vue.use(NavBar)
Vue.use(Form)
Vue.use(Field)
Vue.use(Button)

Vue.config.productionTip = false
Vue.prototype.$API = API
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
