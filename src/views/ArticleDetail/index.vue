<template>
  <div>
    <!-- Header 区域 -->
    <van-nav-bar fixed title="文章详情" left-arrow @click-left="$router.back()" />

    <!-- 文章信息区域 -->
    <div  class="article-container">
      <!-- 文章标题 -->
      <h1 class="art-title">{{articleDetail.title}}</h1>

      <!-- 用户信息 -->
      <van-cell center :title="articleDetail.aut_name" :label="formatDate(articleDetail.pubdate)">
        <template #icon>
          <img :src="articleDetail.aut_photo" alt="" class="avatar">
        </template>
        <template #default>
          <div>
            <van-button v-if="articleDetail.is_followed"  @click="follow(true)" type="info" size="mini">已关注</van-button>
            <van-button v-else icon="plus" type="info"  @click="follow(false)" size="mini" plain>关注</van-button>
          </div>
        </template>
      </van-cell>

      <!-- 分割线 -->
      <van-divider></van-divider>

      <!-- 文章内容 -->
      <div class="art-content" v-html="articleDetail.content"></div>

      <!-- 分割线 -->
      <van-divider>End</van-divider>

      <!-- 点赞 -->
      <div class="like-box">
        <van-button @click="like(1)" v-if="articleDetail.attitude  === 1" icon="good-job" type="danger" size="small">已点赞</van-button>
        <van-button @click="like(-1)" v-else icon="good-job-o" type="danger" plain size="small">点赞</van-button>
      </div>
    </div>

<!--    评论区域-->
    <CommentList></CommentList>
  </div>
</template>

<script>
import { timeAgo } from '@/utils/date'
import CommentList from './CommentList'
export default {
  name: 'ArticleDetail',
  data () {
    return {
      articleDetail: {} // 存储文章详情的信息
    }
  },
  components: { CommentList },
  mounted () {
    this.getArticleDetail()
  },
  methods: {
    // 获取文章详情
    async getArticleDetail () {
      const result = await this.$API.news.reqArticleDetail(this.$route.query.art_id)
      if (result.status === 200) {
        this.articleDetail = result.data.data
      }
    },
    formatDate: timeAgo,
    // 关注/取消关注的回调函数
    async follow  (flag) {
      if (flag) {
        // 点击已关注 用户取消关注操作
        const result = await this.$API.user.reqCancelFollow(this.articleDetail.aut_id)
        if (result.status === 204) {
          this.articleDetail.is_followed = false
        }
      } else {
        // 点击未关注 用户关注操作
        const result = await this.$API.user.reqFollow(this.articleDetail.aut_id)
        if (result.status === 201) {
          this.articleDetail.is_followed = true
        }
      }
    },
    // 点赞/取消点赞
    async  like (flag) {
      if (flag === 1) {
        // 文章处于点赞状态 点击取消点赞
        const result = await this.$API.news.reqCancelLike(this.articleDetail.art_id)
        if (result.status === 204) {
          this.articleDetail.attitude = -1
        }
      } else {
        // 文章处于为点赞状态 点击点赞
        const result = await this.$API.news.reqLike(this.articleDetail.art_id)
        if (result.status === 201) {
          this.articleDetail.attitude = 1
        }
      }
    }
  }
}
</script>

<style scoped lang="less">
.article-container {
  padding: 10px;
  margin-top: 46px;
}
.art-title {
  font-size: 16px;
  font-weight: bold;
  margin: 10px 0;
}

.art-content {
  font-size: 12px;
  line-height: 24px;
  width: 100%;
  overflow-x: scroll;
  word-break: break-all;
  /deep/ img{
    width: 100%;
  }
  /deep/ pre {
    white-space: pre-wrap;
    word-wrap: break-word;
  }
}

.van-cell {
  padding: 5px 0;
  &::after {
    display: none;
  }
}

.avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #f8f8f8;
  margin-right: 5px;
  border: none;
}

.like-box {
  display: flex;
  justify-content: center;
}
</style>
