import Vue from 'vue'
import VueRouter from 'vue-router'

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
  }
]

const router = new VueRouter({
  routes
})

export default router
