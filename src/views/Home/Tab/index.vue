<template>
<div class="main">
<!--  顶部的tab栏-->
  <van-tabs v-model="active" sticky animated offset-top="1.226667rem" >
    <van-tab v-for="channel in channelUserList" :key="channel.id" :title="channel.name">
      <ArticleList :active="active"></ArticleList>
    </van-tab>
  </van-tabs>
  <!-- 编辑频道图标 -->
  <van-icon name="plus" size="0.37333334rem" @click="showPopup" class="moreChannels"/>
  <!--  编辑频道列表的弹出层-->
  <van-popup v-model="show" get-container="body" class="channel-popup">
    <ChannelEdit @addChannelEV="addChannelFN" v-model="active" @deleteChannelEV="deleteChannelFN" @closeShadeEV="closeShadeFN" :channelUserList="channelUserList"/>
  </van-popup>
</div>
</template>

<script>
import ArticleList from './ArticleList'
import ChannelEdit from '../ChannelEdit'
import { Notify } from 'vant'
export default {
  name: 'Tab',
  components: { ArticleList, ChannelEdit },
  data () {
    return {
      // 当前选中的 tab栏
      active: 0,
      // 控制编辑频带列表的弹出层是否展示
      show: false,
      // 存储用户频道列表的数据
      channelUserList: []
    }
  },
  mounted () {
    // 组件挂载完毕 发送请求 获取频道
    this.getUserChannel()
  },
  methods: {
    // 获取用户的频道
    async getUserChannel () {
      try {
        const result = await this.$API.channel.reqUserChannels()
        if (result.status === 200) {
          // 请求成功
          this.channelUserList = result.data.data.channels
        }
      } catch (e) {
        // 请求失败
        Notify({ type: 'danger', message: e.response.statusText })
      }
    },
    // 编辑频道列表加号的回调
    showPopup () {
      this.show = true
    },
    // 添加更多频道列表的回调
    addChannelFN (channel) {
      this.channelUserList.push(channel)
    },
    // 删除用户频道列表的回调
    deleteChannelFN (index) {
      this.channelUserList.splice(index, 1)
    },
    // 点击关闭弹出层的回调
    closeShadeFN () {
      this.show = false
    }
  }
}
</script>

<style scoped lang="less">
.main {
  margin-top: 46px;
}

// 设置 tabs 容器的样式
   /deep/ .van-tabs__wrap {
     padding-right: 30px;
     background-color: #fff;
   }

// 设置小图标的样式
   .moreChannels {
     position: fixed;
     top: 62px;
     right: 8px;
     z-index: 999;
   }
//   设置编辑频道列表弹出层的样式
.channel-popup {
  width: 100%;
  height: 100%;
}
</style>
