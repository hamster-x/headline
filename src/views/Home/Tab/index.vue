<template>
<div class="main">
<!--  顶部的tab栏-->
  <van-tabs v-model="active" sticky animated offset-top="1.226667rem" >
    <van-tab v-for="channel in channelList" :key="channel.id" :title="channel.name">
      <ArticleList :active="active"></ArticleList>
    </van-tab>
  </van-tabs>
  <!-- 编辑频道图标 -->
  <van-icon name="plus" size="0.37333334rem" @click="showPopup" class="moreChannels"/>
  <!--  编辑频道列表的弹出层-->
  <van-popup v-model="show" get-container="body" class="channel-popup">
    <ChannelEdit :channelUserList="channelList"/>
  </van-popup>
</div>
</template>

<script>
import ArticleList from './ArticleList'
import ChannelEdit from '../ChannelEdit'
export default {
  name: 'Tab',
  components: { ArticleList, ChannelEdit },
  props: {
    channelList: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      // 当前选中的 tab栏
      active: 0,
      // 控制编辑频带列表的弹出层是否展示
      show: false
    }
  },
  methods: {
    showPopup () {
      this.show = true
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
