import request from '@/utils/request'

// 获取联想建议（自动补全）
export const reqSuggestion = (q) => request({
  url: '/v1_0/suggestion',
  method: 'get',
  params: {
    q
  }
})

// 获取搜索结果
export const reqSearchResult = (page, perPage, q) => request({
  url: '/v1_0/search',
  method: 'get',
  params: {
    page,
    per_page: perPage,
    q
  }
})
