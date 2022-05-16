<template>
  <div>
    <!-- 评论列表 -->
    <div class="cmt-list" :class="{'art-cmt-container-1': isShowCmtInput, 'art-cmt-container-2':!isShowCmtInput}">
      <!-- 评论的 Item 项 -->
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        :immediate-check="false"
      >
      <div class="cmt-item" v-for="comItem in commentList" :key="comItem.com_id">
        <!-- 头部区域 -->
        <div class="cmt-header">
          <!-- 头部左侧 -->
          <div class="cmt-header-left">
            <img :src="comItem.aut_photo" alt="" class="avatar">
            <span class="uname">{{comItem.aut_name}}</span>
          </div>
          <!-- 头部右侧 -->
          <div class="cmt-header-right">
            <van-icon name="like" size="16" color="red" @click="collect(true,comItem)" v-if="comItem.is_liking" />
            <van-icon name="like-o" size="16" color="gray"  @click="collect(false,comItem)" v-else />
          </div>
        </div>
        <!-- 主体区域 -->
        <div class="cmt-body">
          {{comItem.content}}
        </div>
        <!-- 尾部区域 -->
        <div class="cmt-footer">{{formatDate(comItem.pubdate)}}</div>
      </div>
      </van-list>
    </div>

<div>
  <!-- 底部添加评论区域 - 1 -->
  <div class="add-cmt-box van-hairline--top"  v-if="isShowCmtInput">
    <van-icon name="arrow-left" size="0.48rem" @click="$router.back()" />
    <div class="ipt-cmt-div" @click="toggleInput">发表评论</div>
    <div class="icon-box">
      <van-badge :content="commentCount > 0 ? commentCount : ''" max="99">
        <van-icon @click="commentClick" name="comment-o" size="0.53333334rem" />
      </van-badge>
      <van-icon name="star-o" size="0.53333334rem" />
      <van-icon name="share-o" size="0.53333334rem" />
    </div>
  </div>
  <!-- 底部添加评论区域 - 2 -->
  <div class="cmt-box van-hairline--top"  v-else>
    <textarea v-focus @blur="blurFN" v-model.trim="userComment" placeholder="友善评论、理性发言、阳光心灵"></textarea>
    <van-button type="default" @click="sendComment" :disabled="userComment.length > 0 ? false : true">发布</van-button>
  </div>
</div>
  </div>
</template>

<script>
import { timeAgo } from '@/utils/date'

export default {
  name: 'CommentList',
  data () {
    return {
      commentList: [], // 存储文章评论的数据
      isShowCmtInput: true, // 控制输入框状态 true显示矮的评论框
      commentCount: 0, // 存储评论的条数
      userComment: '', // 收集用户的评论内容
      loading: false, // 是否处于加载状态
      finished: false, // 是否全部加载完毕
      offset: null // 评论数据的偏移量
    }
  },
  mounted () {
    this.getComment()
  },
  methods: {
    // 请求评论的数据
    async  getComment () {
      const result = await this.$API.comment.reqComment({
        source: this.$route.query.art_id,
        offset: this.offset
      })
      // 如果返回的是null 说明没有更多评论了
      if (result.data.data.last_id === null) {
        this.finished = true
        return
      }
      if (result.status === 200) {
        this.commentList.push(...result.data.data.results)
        this.commentCount = result.data.data.total_count
        this.offset = result.data.data.last_id
        this.loading = false
      }
    },
    formatDate: timeAgo,
    // 点赞
    async collect (flag, comItem) {
      if (flag) {
        // 点赞状态点击的 用户操作是取消点赞
        const result = await this.$API.comment.reqCancelCollect(comItem.com_id)
        if (result.status === 204) {
          comItem.is_liking = false
        }
      } else {
        // 取消点赞状态点击的 用户操作是点赞
        const result = await this.$API.comment.reqCollect(comItem.com_id)
        if (result.status === 201) {
          comItem.is_liking = true
        }
      }
    },
    // 切换输入框的状态
    toggleInput () {
      this.isShowCmtInput = false
    },
    // 评论按钮点击事件 把第一条评论 拖到最上面
    commentClick () {
      // 初始滚动的高度
      /*       let scrollHeight = 0
      const tiemr = setInterval(() => {
        // 如果滚动的高度高于 内容区的高度 停止定时器
        if (scrollHeight >= document.querySelector('.article-container').scrollHeight) clearInterval(tiemr)
        scrollHeight += 10
        window.scrollTo(0, scrollHeight)
      }, 1) */
      // 真实DOM都在document(所以不再一个vue文件内), 也是可以获取的
      document.querySelector('.like-box').scrollIntoView({
        behavior: 'smooth'
      })
    },
    // 发布评论按钮的回调
    async sendComment () {
      const result = await this.$API.comment.reqSendComment(this.$route.query.art_id, this.userComment)
      if (result.status === 201) {
        this.commentList.unshift(result.data.data.new_obj)
        // 评论数加一
        this.commentCount++
        // 回到第一条评论
        this.commentClick()
        // 清空用户的输入框
        this.userComment = ''
      }
    },
    // 评论输入框失去焦点的回调
    blurFN () {
      setTimeout(() => {
        this.isShowCmtInput = true
      })
    },
    // 评论触底触发的回调
    onLoad () {
      if (this.commentList.length === 0) {
        this.loading = false
        return
      }
      this.getComment()
    }
  }
}
</script>

<style scoped lang="less">
.cmt-list {
  padding: 10px;
  .cmt-item {
    padding: 15px 0;
    + .cmt-item {
      border-top: 1px solid #f8f8f8;
    }
    .cmt-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .cmt-header-left {
        display: flex;
        align-items: center;
        .avatar {
          width: 40px;
          height: 40px;
          background-color: #f8f8f8;
          border-radius: 50%;
          margin-right: 15px;
        }
        .uname {
          font-size: 12px;
        }
      }
    }
    .cmt-body {
      font-size: 14px;
      line-height: 28px;
      text-indent: 2em;
      margin-top: 6px;
      word-break: break-all;
    }
    .cmt-footer {
      font-size: 12px;
      color: gray;
      margin-top: 10px;
    }
  }
}

/*美化 - 文章详情 - 底部的评论页面 */
// 外层容器
.art-cmt-container-1 {
  padding-bottom: 46px;
}
.art-cmt-container-2 {
  padding-bottom: 80px;
}

// 发布评论的盒子 - 1
.add-cmt-box {
  position: fixed;
  bottom: 0px;
  width: 100%;
  box-sizing: border-box;
  background-color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 46px;
  line-height: 46px;
  padding-left: 10px;
  .ipt-cmt-div {
    flex: 1;
    border: 1px solid #efefef;
    border-radius: 15px;
    height: 30px;
    font-size: 12px;
    line-height: 30px;
    padding-left: 15px;
    margin-left: 10px;
    background-color: #f8f8f8;
  }
  .icon-box {
    width: 40%;
    display: flex;
    justify-content: space-evenly;
    line-height: 0;
  }
}

.child {
  width: 20px;
  height: 20px;
  background: #f2f3f5;
}

// 发布评论的盒子 - 2
.cmt-box {
  position: fixed;
  bottom: 0px;
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  padding-left: 10px;
  box-sizing: border-box;
  background-color: white;
  textarea {
    flex: 1;
    height: 66%;
    border: 1px solid #efefef;
    background-color: #f8f8f8;
    resize: none;
    border-radius: 6px;
    padding: 5px;
  }
  .van-button {
    height: 100%;
    border: none;
  }
}
</style>
