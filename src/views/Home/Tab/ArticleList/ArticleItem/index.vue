<template>
  <!-- 一条文章单元格 -->
  <div>
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
          <van-icon name="cross" @click="show = true"/>
        </div>
      </template>
    </van-cell>
    <van-action-sheet
      v-model="show"
      @close="close"
      :actions="actions"
      :cancel-text="cancelText"
      @cancel="onCancel"
      @select="onSelect" get-container="body"/>
  </div>
</template>

<script>

import { timeAgo } from '@/utils/date'
import { firstActions, secondActions } from '@/api/report'
import { Notify } from 'vant'

export default {
  name: 'ArticleItem',
  data () {
    return {
      show: false, // 控制反馈弹窗的显示与隐藏
      actions: firstActions, // 弹出展示的内容
      cancelText: '取消' // 底部按钮的文本
    }
  },
  props: {
    news: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  methods: {
    formatTime: timeAgo,
    // 点击弹出层的某一选项时
    async onSelect (action) {
      // 默认情况下点击选项时不会自动收起
      // 可以通过 close-on-click-action 属性开启自动收起
      if (action.name === '反馈垃圾内容') {
        // 点击 反馈垃圾内容 更改弹出层的内容
        this.actions = secondActions
        // 将底部的取消改成返回
        this.cancelText = '返回'
      } else if (action.name === '不感兴趣') {
        // 点击不感兴趣 发送请求
        const result = await this.$API.news.reqDislikes(this.news.art_id)
        if (result.status === 201) {
          Notify({ type: 'success', message: '反馈成功' })
        } else {
          Notify({ type: 'danger', message: '反馈失败' })
        }

        // 点击不感兴趣 不论成功失败 都把弹窗关闭
        this.show = false
      } else {
        // 如果进入此判断 就是点击的二级选项 发送请求
        const result = await this.$API.news.reqReports(this.news.art_id, this.actions.value, this.actions.name)
        if (result.status === 201) {
          Notify({ type: 'success', message: '反馈成功' })
        } else {
          Notify({ type: 'danger', message: '反馈失败' })
        }
        // 关闭弹出层
        this.show = false
        // 修改弹出层的数据为 初始状态
        this.actions = firstActions
        this.cancelText = '取消'
      }
    },
    //  点击底部的返回按钮时
    onCancel () {
      if (this.cancelText === '返回') {
        // 如果是返回按钮 将底部文字改回取消 弹出层选项改回初始状态 并且不让弹出层关闭
        this.actions = firstActions
        this.cancelText = '取消'
        this.show = true
      } else {
        this.show = false
      }
    },
    // 点击遮罩层时触发
    close () {
      // 修改弹出层的数据为 初始状态
      this.actions = firstActions
      this.cancelText = '取消'
    }
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
