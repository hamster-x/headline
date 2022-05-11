<template>
<div>
  <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
  <van-list
    v-model="loading"
    :finished="finished"
    finished-text="没有更多了"
    @load="onLoad"
    :immediate-check="false"
    offset="30"
  >
  <ArticleItem v-for="(news,index) in newsList" :key="index" :news="news"></ArticleItem>
    </van-list>
  </van-pull-refresh>
</div>
</template>

<script>
import ArticleItem from './ArticleItem'
import { Notify } from 'vant'
export default {
  name: 'ArticleList',
  components: { ArticleItem },
  props: {
    active: {
      type: Number
    }
  },
  data () {
    return {
      newsList: [], // 存储新闻列表
      preTimestamp: Date.now(), // 请求前一页的历史时间戳
      loading: false, // 是否处于加载状态，加载过程中不触发load事件
      finished: false, // 是否已加载完成，加载完成后不再触发load事件
      count: 0,
      isLoading: false
    }
  },
  mounted () {
    // 组件挂载完毕 发送请求 获取新闻列表
    this.getArticles(this.active, this.preTimestamp)
  },
  methods: {
    // 获取新闻列表
    async getArticles (channelId, timestamp) {
      try {
        const result = await this.$API.news.reqArticles(channelId, timestamp)
        this.loading = false

        // 保存请求前一页的历史时间戳 并且合并数据
        this.preTimestamp = result.data.data.pre_timestamp
        this.newsList.push(...result.data.data.results)

        if (result.data.data.pre_timestamp === null) {
          this.finished = true
        }
        this.isLoading = false
      } catch (e) {
        Notify({ type: 'danger', message: e.response.statusText })
      }
    },
    onLoad () {
      // 上拉加载的事件
      // 发送请求 获取数据
      this.getArticles(this.active, this.preTimestamp)
    },
    onRefresh () {
      // 发送请求 重新获取数据
      this.preTimestamp = Date.now()
      // 原先的列表清空
      this.newsList = []
      this.getArticles(this.active, this.preTimestamp)
    }
  }
}
</script>

<style scoped>

</style>
