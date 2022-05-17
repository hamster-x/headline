<template>
  <div class="user-edit-container">
    <!-- Header 区域 -->
    <van-nav-bar title="编辑资料" left-arrow @click-left="$router.back()" fixed />

    <!-- 用户资料 -->
    <van-cell-group class="action-card">
      <van-cell title="头像" is-link center>
        <template #default>
          <van-image round class="avatar" @click="OnClickImg" :src="userProfile.photo"/>
          <input
            type="file"
            ref="iptFile"
            v-show="false"
            accept="image/*"
            @change="onFileChange"
          />
        </template>
      </van-cell>
      <van-cell title="名称" is-link @click="updateName" :value="userProfile.name" />
      <van-cell title="生日" is-link  @click="updateBirthday" :value="userProfile.birthday"/>
    </van-cell-group>

<!--   修改姓名的弹出框 -->
    <van-dialog v-model="show" title="标题" :before-close="beforeClose" show-cancel-button>
      <input ref="nameInput" v-model="userName" v-focus  type="text" />
    </van-dialog>

    <van-popup v-model="dataPopShow" round  position="bottom"><van-datetime-picker
      v-model="currentDate"
      type="date"
      title="选择年月日"
      :min-date="minDate"
      :max-date="maxDate"
      @cancel="cancelDatePop"
      @confirm="confirmDate"
    /></van-popup>
  </div>
</template>

<script>
import { Notify } from 'vant'
import dayjs from 'dayjs'
export default {
  name: 'UserEdit',
  data () {
    return {
      userProfile: {}, // 存储用户资料
      show: false, // 控制修改姓名弹出框的显示与隐藏
      userName: '', // 存储用户输入的名字
      minDate: new Date(1900, 0, 1),
      maxDate: new Date(),
      currentDate: new Date(),
      dataPopShow: false // 控制选择日期弹出层的显示
    }
  },
  mounted () {
    this.getUserProfile()
  },
  methods: {
    async getUserProfile () {
      const result = await this.$API.user.reqUserProfile()
      if (result.status === 200) {
        this.userProfile = result.data.data
      }
    },
    // input file 点击事件回调
    async onFileChange (e) {
      if (e.target.files.length === 0) return // 如果用户没有选择文件 下面代码不会执行
      // new FormData对象
      const theFormObj = new FormData()
      theFormObj.append('photo', e.target.files[0]) // 往对象里面添加属性名和值
      // 发送请求将表单对象发送给后台
      const result = await this.$API.user.reqUpdatePhoto(theFormObj)
      if (result.status === 200) {
        this.userProfile.photo = result.data.data.photo
      }
    },
    // 点击图片的回调函数
    OnClickImg () {
      // 模拟点击file表单 调出文件选择窗口
      this.$refs.iptFile.click()
    },
    // 点击修改姓名的回调
    updateName () {
      this.show = true
      this.$nextTick(() => {
        this.userName = this.userProfile.name
      })
    },
    // 修改姓名弹窗关闭之前的回调
    async beforeClose (action, done) {
      if (action === 'confirm') {
        // 点击确定
        const reg = /^[A-Za-z0-9\u4e00-\u9fa5]{1,7}$/
        if (reg.test(this.userName)) {
          // 输入的内容符合要求 关闭弹窗
          const result = await this.$API.user.reqEditUserProfile({ name: this.userName })
          if (result.status === 200) {
            this.userProfile.name = this.userName
          }
          done()
        } else {
          // 不符合要求 提示用户
          Notify({ type: 'warning', message: '用户名中英文和数字1-7位' })
          done(false)
        }
      } else {
        // 点击取消 关闭弹窗
        done()
      }
    },
    // 点击修改生日的回调
    updateBirthday () {
      this.dataPopShow = true
      // 修改日期组件的默认日期
      this.currentDate = new Date(this.userProfile.birthday)
    },
    // 选择时间弹出层 取消按钮的回调
    cancelDatePop () {
      this.dataPopShow = false
    },
    // 选择时间弹出层 确定按钮的回调
    async confirmDate (currentDate) {
      const formatDate = (dayjs(currentDate).format('YYYY-MM-DD'))
      const result = await this.$API.user.reqEditUserProfile({ birthday: formatDate })
      if (result.status === 200) {
        this.userProfile.birthday = formatDate
        this.dataPopShow = false
      }
    }
  }
}
</script>

<style lang="less" scoped>
.user-edit-container {
  padding-top: 46px;
  .avatar {
    width: 50px;
    height: 50px;
  }
}

/deep/.van-dialog__content {
  text-align: center;

  input {
    border: none;
    outline: none;
    text-align: center;
  }
}
</style>
