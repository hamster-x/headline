<template>
  <div >
    <!--   头部导航 -->
    <van-nav-bar title="头条登录"/>
    <!--输入表单-->
    <van-form @submit="onSubmit">
      <van-field
        v-model="user.mobile"
        name="mobile"
        label="手机号"
        placeholder="手机号"
        required
        :rules="[{ required: true, message: '请填写正确的手机号', pattern: /^1[3-9][0-9]{9}$/ }]"
      />
      <van-field
        v-model="user.code"
        type="password"
        name="code"
        label="密码"
        placeholder="密码"
        required
        :rules="[{ required: true, message: '请填写正确的密码', pattern: /^[0-9]{6}$/ }]"
      />
      <div style="margin: 16px;">
        <van-button :loading="isLoading" :disabled="isLoading" loading-text="登录中..." round block type="info" native-type="submit">登录</van-button>
      </div>
    </van-form>

  </div>
</template>

<script>
import { Notify } from 'vant'

export default {
  name: 'Login',
  data () {
    return {
      user: {
        mobile: '17663237385', // 手机号
        code: '246810' // 密码 246810
      },
      isLoading: false // 存储是否是登录状态
    }
  },
  methods: {
    async onSubmit (user) {
      this.isLoading = true
      try {
        const result = await this.$API.user.reqLogin(user)
        if (result.status === 201) {
          Notify({ type: 'success', message: '登录成功' })
          this.isLoading = false
        }
      } catch (e) {
        Notify({ type: 'danger', message: e.response.data.message })
        this.isLoading = false
      }
    }
  }
}
</script>

<style scoped lang="less">

</style>
