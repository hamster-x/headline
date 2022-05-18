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
import 'highlight.js/styles/default.css' // 代码高亮的样式
import plugins from '@/utils/plugins'
import './VueComponent' // 引入vant组件
Vue.use(plugins)

Vue.config.productionTip = false
Vue.prototype.$API = API
new Vue({
  beforeCreate () {
    Vue.prototype.$bus = this // 安装全局事件总线，$bus就是当前应用的vm
  },
  router,
  store,
  render: h => h(App)
}).$mount('#app')
