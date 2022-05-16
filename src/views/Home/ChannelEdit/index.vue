<template>
  <div>
    <!-- 弹出层的头部区域 -->
    <van-nav-bar title="频道管理">
      <template #right>
        <van-icon @click="closeShade" name="cross" size="0.37333334rem" color="white"/>
      </template>
    </van-nav-bar>
    <!-- 我的频道 -->
    <div class="my-channel-box">
      <div class="channel-title">
        <span>我的频道
          <span  class="small-title">
            点击{{isEdit ? '删除' : '进入'}}频道
          </span>
        </span>
        <span @click="editFn">{{isEdit ? '完成' : '编辑'}}</span>
      </div>
      <!-- 我的频道列表 -->
      <van-row type="flex">
        <van-col span="6" @click="deleteChannel(index,myChannel)" v-for="(myChannel, index) in channelUserList" :key="myChannel.id">
          <div  class="channel-item van-hairline--surround">
            {{myChannel.name}}
            <!-- 删除的徽标 -->
            <van-badge v-show="isEdit && myChannel.name!=='推荐'" color="transparent" class="cross-badge">
              <template #content>
                <van-icon
                  name="cross"
                  class="badge-icon"
                  color="#cfcfcf"
                  size="0.32rem"
                />
              </template>
            </van-badge>
          </div>
        </van-col>
      </van-row>
    </div>

    <!-- 更多频道 -->
    <div class="more-channel-box">
      <div class="channel-title">
        <span>点击添加更多频道：</span>
      </div>
      <!-- 更多频道列表 -->
      <van-row type="flex">
        <van-col v-for="moreChannel in moreChannelList" :key="moreChannel.id" span="6">
          <div @click="addChannel(moreChannel)"  class="channel-item van-hairline--surround">{{moreChannel.name}}</div>
        </van-col>
      </van-row>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ChannelEdit',
  data () {
    return {
      // 存储全部的频道
      channelListALl: [],
      // 控制频道列表是否在编辑状态
      isEdit: false
    }
  },
  props: {
    channelUserList: {
      type: Array,
      default () {
        return []
      }
    }
  },
  mounted () {
    // 获取全部的频道列表
    this.getChannelListAll()
  },
  methods: {
    // 发请求 获取全部的新闻列表
    async getChannelListAll () {
      const result = await this.$API.channel.reqChannelAll()
      this.channelListALl = result.data.data.channels
    },
    // 点击右上角编辑或完成的回调
    editFn () {
      this.isEdit = !this.isEdit
      if (!this.isEdit) {
        // 还要把最新的数组 发请求给后台
        const channels = this.channelUserList
        this.$API.channel.reqUpdateChannel(channels)
      }
    },
    // 点击某一个频道 添加到我的频道列表的回调
    addChannel (channel) {
      // 只有在 编辑状态下 才会执行
      if (this.isEdit) {
        // 通过 传入的频道对象 直接添加到用户已选的数组
        this.$emit('addChannelEV', channel)
      }
    },
    // 删除我的频道列表的回调
    deleteChannel (index, channel) {
      // 必须在编辑状态下 执行
      if (this.isEdit) {
        // 推荐频道不能删除
        if (channel.name !== '推荐') this.$emit('deleteChannelEV', index)
      } else {
        // 切换频道
        // 关闭弹出层
        this.$emit('closeShadeEV')
        // 触发v-model的input事件 把值传出去给v-model对应的变量
        this.$emit('input', index)
      }
    },
    // 关闭弹出层的回调
    closeShade () {
      this.$emit('closeShadeEV')
      // 重置编辑状态为false
      this.isEdit = false
    }
  },
  computed: {
    // 存储用户未选择的更多频道
    moreChannelList () {
      return this.channelListALl.filter(channel => {
        return this.channelUserList.every(channel2 => {
          return channel.name !== channel2.name
        })
      })
    }
  }
}
</script>

<style scoped lang="less">
.van-popup,
.popup-container {
  background-color: transparent;
  height: 100%;
  width: 100%;
}

.popup-container {
  display: flex;
  flex-direction: column;
}

.pop-header {
  height: 90px;
  background-color: #007bff;
  color: white;
  text-align: center;
  font-size: 14px;
  position: relative;
  .title {
    width: 100%;
    position: absolute;
    bottom: 15px;
  }
}

.pop-body {
  flex: 1;
  overflow: scroll;
  padding: 8px;
  background-color: white;
}

.my-channel-box,
.more-channel-box {
  .channel-title {
    display: flex;
    justify-content: space-between;
    font-size: 14px;
    line-height: 28px;
    padding: 0 6px;
  }
}

.channel-item {
  font-size: 12px;
  text-align: center;
  line-height: 36px;
  background-color: #fafafa;
  margin: 5px;
}

/*删除的微标 */
.cross-badge {
  position: absolute;
  right: -3px;
  top: 0;
  border: none;
}

/*提示文字 */
.small-title {
  font-size: 10px;
  color: gray;
}
</style>
