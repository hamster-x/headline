import Vue from 'vue'
import VueRouter from 'vue-router'
import { getToken } from '@/utils/token'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/layout/home' // 直接重定向到home
  },
  {
    path: '/login',
    component: () => import('@/views/Login')
  },
  {
    path: '/layout',
    component: () => import('@/views/layout'),
    children: [
      {
        path: 'home',
        component: () => import('@/views/Home')
      },
      {
        path: 'user',
        component: () => import('@/views/User')
      }
    ]
  },
  {
    path: '/search',
    component: () => import('@/views/Search')
  },
  {
    name: 'searchResult',
    path: '/search_result/:kw',
    component: () => import('@/views/SearchResult')
  },
  {
    path: '/article_detail',
    component: () => import('@/views/ArticleDetail')
  },
  {
    path: '/user_edit',
    component: () => import('@/views/UserEdit')
  },
  {
    path: '/chat',
    component: () => import('@/views/Chat')
  }
]

const router = new VueRouter({
  routes
})

// 路由 全局前置守卫(在路由发生真正跳转之前，执行此函数)
router.beforeEach((to, form, next) => {
  if (getToken() && to.path === '/login') {
    next(false)
  } else {
    next()
  }
})
export default router
