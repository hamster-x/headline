<template>
  <!-- 一条文章单元格 -->
  <van-cell>
    <!-- 标题区域的插槽 -->
    <template #title>
      <div class="title-box">
        <!-- 标题 -->
        <span>{{ news.title }}</span>
<!--        显示一张图片的时候-->
        <img class="thumb"  v-if="news.cover.type === 1"  :src="news.cover.images[0]" alt="">
      </div>
<!--      显示多张图片的时候-->
      <div class="thumb-box" v-if="news.cover.type > 1">
        <img class="thumb"  v-for="(img,index) in news.cover.images" :key="index" :src="img" alt="">
      </div>
    </template>
    <!-- label 区域的插槽 -->
    <template #label>
      <div class="label-box">
        <div>
          <span>{{ news.aut_name }}</span>
          <span>{{news.comm_count}}评论</span>
          <span>{{formatTime(news.pubdate)}}</span>
        </div>
        <!-- 反馈按钮 -->
        <van-icon name="cross" />
      </div>
    </template>
  </van-cell>
</template>

<script>

import { timeAgo } from '@/utils/date'

export default {
  name: 'ArticleItem',
  props: {
    news: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  methods: {
    formatTime: timeAgo
  }
}
</script>

<style scoped lang="less">
/* 标题样式 */
.title-box {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
}

/* label描述样式 */
.label-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* 文章信息span */
.label-box span{
  margin: 0 3px;
  &:first-child{
    margin-left: 0;
  }
}

/* 图片的样式, 矩形黄金比例：0.618 */
.thumb {
  width: 113px;
  height: 70px;
  background-color: #f8f8f8;
  object-fit: cover;
}

/* 三图, 图片容器 */
.thumb-box {
  display: flex;
  justify-content: space-between;
}
</style>
