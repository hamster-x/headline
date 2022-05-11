<template>
<div class="main">
  <van-tabs v-model="active" sticky animated offset-top="1.226667rem" >
    <van-tab v-for="channel in channelList" :key="channel.id" :title="channel.name">
      <ArticleList :active="active"></ArticleList>
    </van-tab>
  </van-tabs>
</div>
</template>

<script>
import ArticleList from './ArticleList'
export default {
  name: 'Tab',
  components: { ArticleList },
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
      active: 0
    }
  }

}
</script>

<style scoped>
.main {
  margin-top: 46px;
}
</style>
