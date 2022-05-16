<template>
  <div>
    <!-- 搜索页面头部 -->
    <div class="search-header">
      <!-- 后退按钮 -->
      <van-icon name="arrow-left" color="white" size="0.48rem" class="goback" @click="$router.back()"/>
      <!-- 搜索组件 -->
      <van-search
        v-model.trim="kw"
        v-focus
        placeholder="请输入搜索关键词"
        background="#007BFF"
        shape="round"
        @input="input"
        @search="searchFn"
      />
    </div>
    <!-- 搜索建议列表 -->
    <div class="sugg-list" v-if="kw.length !== 0">
      <div v-for="(sugg,index) in suggest" @click="suggestClick(sugg)" :key="index" class="sugg-item" v-html="lightFn(sugg,kw)">
      </div>
    </div>
    <!-- 搜索历史 -->
    <div v-else class="search-history">
      <!-- 标题 -->
      <van-cell title="搜索历史">
        <!-- 使用 right-icon 插槽来自定义右侧图标 -->
        <template #right-icon>
          <van-icon @click="clearFn" name="delete" class="search-icon" />
        </template>
      </van-cell>

      <!-- 历史列表 -->
      <div class="history-list">
        <span class="history-item" @click="historyClick(item)" v-for="(item,index) in history" :key="index">{{item}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Search',
  data () {
    return {
      kw: '', // 搜索关键字
      timer: null, // 存储防抖的定时器
      suggest: [], // 存储用户的搜索建议
      history: JSON.parse(localStorage.getItem('history')) || [] // 搜索历史
    }
  },
  methods: {
    // 输入框输入文本时触发的事件
    input (inputText) {
      clearTimeout(this.timer)
      if (this.kw.length === 0) {
        this.suggest = []
      } else {
        this.timer = setTimeout(async () => {
          const result = await this.$API.search.reqSuggestion(inputText)
          this.suggest = result.data.data.options
        }, 300)
      }
    },
    // 专门处理搜索关键字高亮的方法
    lightFn (originStr, target) {
      // originStr原始的字符串
      // target要高亮的关键字

      // 如果服务器返回的是null 直接结束函数执行
      if (!originStr) return
      // 创建正则表达式 根据用户输入的内容
      const reg = new RegExp(target, 'ig')
      return originStr.replace(reg, (match) => {
        // 使用回调函数的方式 将匹配到的内容 拼接字符串返回
        return `<span style="color:red">${match}</span>`
      })
    },
    // 点击搜索的回调
    searchFn () {
      if (this.kw.length > 0) {
        // 路由跳转之前 存储点击的搜索建议记录
        this.history.push(this.kw)
        // 因为watch 监听是异步执行的 而路由跳转是同步的 要先保存搜索记录 所以给路由跳转包裹 延时定时器 保证在路由跳转之前
        setTimeout(() => {
          this.$router.push({ name: 'searchResult', params: { kw: this.kw } })
        })
      }
    },
    // 点击搜索建议的回调
    suggestClick (sugg) {
      // 路由跳转之前 存储点击的搜索建议记录
      this.history.push(sugg)
      setTimeout(() => {
        this.$router.push(`/searchResult/${sugg}`)
      })
    },
    // 点击历史列表的回调
    historyClick (str) {
      this.$router.push({ name: 'searchResult', params: { kw: str } })
    },
    // 清空搜索记录的回调
    clearFn () {
      this.history = []
    }
  },
  watch: {
    // 监听 history变化 进行本地存储
    history: {
      deep: true,
      handler () {
        // 通过set进行数组去重
        const theSet = new Set(this.history)
        // 再把set对象 转为数组
        const newArr = Array.from(theSet)
        localStorage.setItem('history', JSON.stringify(newArr))
      }
    }
  }
}
</script>

<style scoped lang="less">
.search-header {
  height: 46px;
  display: flex;
  align-items: center;
  background-color: #007bff;
  overflow: hidden;
  /*后退按钮*/
  .goback {
    padding-left: 14px;
  }
  /*搜索组件*/
  .van-search {
    flex: 1;
  }
}

/*搜索建议列表样式 */
.sugg-list {
  .sugg-item {
    padding: 0 15px;
    border-bottom: 1px solid #f8f8f8;
    font-size: 14px;
    line-height: 50px;
    // 实现省略号的三行代码
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}

/**搜索历史 */
.search-icon {
  font-size: 16px;
  line-height: inherit;
}

.history-list {
  padding: 0 10px;
  .history-item {
    display: inline-block;
    font-size: 12px;
    padding: 8px 14px;
    background-color: #efefef;
    margin: 10px 8px 0px 8px;
    border-radius: 10px;
  }
}
</style>
