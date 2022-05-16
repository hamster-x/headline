<template>
  <div>
    <!-- 搜索结果页-头部导航 -->
    <div class="search-result-container">
      <!-- 点击实现后退效果 -->
      <van-nav-bar
        title="搜索结果"
        left-arrow
        @click-left="$router.go(-1)"
        fixed
      />
    </div>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      :immediate-check="false"
    >
      <ArticleItem @click="toArticleDetail(news)"  v-for="news in searchResult" :key="news.art_id" :news="news"></ArticleItem>
    </van-list>
  </div>
</template>

<script>
import ArticleItem from '@/components/ArticleItem'
export default {
  name: 'SearchResult',
  data () {
    return {
      page: 1, // 存储当前第几页
      perPage: 10, // 存储每页显示几条数据
      searchResult: [], // 存储搜索结果数据的数组
      loading: false, // 加载状态
      finished: false // 是否全部加载完成
    }
  },
  components: { ArticleItem },
  mounted () {
    // 请求搜索结果的数据
    this.getSearchResult(this.page, this.perPage, this.$route.params.kw)
  },
  methods: {
    async getSearchResult (page, perPage, kw) {
      const result = await this.$API.search.reqSearchResult(page, perPage, kw)
      // 请求成功
      if (result.status === 200) {
        // 如果请求回来的数组为空 证明数据加载完毕
        if (result.data.data.results.length === 0) {
          this.finished = true
          return
        }
        // 新请求出来的数据 和原数组进行合并
        this.searchResult.push(...result.data.data.results)
        this.loading = false
        this.page++
      }
    },
    // 触底时的回调函数
    onLoad () {
      // 数组中有数据 才会加载
      if (this.searchResult.length > 0) {
        // 请求更多数据
        this.getSearchResult(this.page, this.perPage, this.$route.params.kw)
      }
    },
    // 跳转新闻详情页
    toArticleDetail (news) {
      this.$router.push({
        path: '/article_detail',
        query: {
          art_id: news.art_id
        }
      })
    }
  }
}
</script>

<style scoped>
.search-result-container {
  padding-top: 46px;
}
</style>
