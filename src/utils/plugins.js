export default {
  install (Vue) {
    // 自定义指令
    Vue.directive('focus', {
      // 指令所在标签 被插入到真实dom时才触发 如果标签通过display none 隐藏再出现 不会再次触发
      inserted (el) {
        if (el instanceof HTMLTextAreaElement || el instanceof HTMLInputElement) {
          el.focus()
        } else {
          const input = el.querySelector('input')
          input.focus()
        }
      },
      // 指令所在标签 被更新时触发
      update (el) {
        if (el instanceof HTMLTextAreaElement || el instanceof HTMLInputElement) {
          el.focus()
        } else {
          const input = el.querySelector('input')
          input.focus()
        }
      }
    })
  }
}
