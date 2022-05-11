<template>
<div>
<!--头部导航栏-->
  <Navbar></Navbar>
<!--  tab栏-->
  <Tab :channelList="channelList"></Tab>
</div>
</template>

<script>
import Navbar from './Navbar'
import Tab from './Tab'

import { Notify } from 'vant'
export default {
  name: 'Home',
  data () {
    return {
      // 存储频道列表的数据
      channelList: []
    }
  },
  components: { Navbar, Tab },
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
          this.channelList = result.data.data.channels
        }
      } catch (e) {
        // 请求失败
        Notify({ type: 'danger', message: e.response.statusText })
      }
    }
  }
}
</script>

<style scoped>

</style>
