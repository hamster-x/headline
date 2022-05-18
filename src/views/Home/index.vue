<template>
<div>
<!--头部导航栏-->
  <Navbar></Navbar>
<!--  tab栏-->
  <Tab ></Tab>
</div>
</template>

<script>
import Navbar from './Navbar'
import Tab from './Tab'

export default {
  name: 'Home',
  components: { Navbar, Tab },
  data () {
    return {
      channelScrollTObj: {} // 保存每个频道的滚动位置
    }
  },
  // 前提路由组件缓存 路由组件失活时触发
  // 无缓存 切走了 destroyed销毁生命周期方法
  activated () {
    // 给window添加滚动事件 实时保存滚动条位置
    window.addEventListener('scroll', this.scrollFn)
    // 再把滚动条位置 设置回之前保存的
    document.documentElement.scrollTop = this.$route.meta.scrollT
  },
  deactivated () {
    // 路由切走之后 移除滚动事件
    window.removeEventListener('scroll', this.scrollFn)
  },
  methods: {
    scrollFn () {
      this.$route.meta.scrollT = document.documentElement.scrollTop
    }
  }
}
</script>

<style scoped>

</style>
