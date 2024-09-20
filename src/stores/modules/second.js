import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useSecondStore = defineStore(
  'second',
  () => {
    const second = ref(0)
    const buttonText = ref('点击发射~')
    const isButtonDisabled = ref(false)
    let timer = null

    const startCountdown = () => {
      isButtonDisabled.value = true
      buttonText.value = `${second.value}秒后重试`
      timer = setInterval(() => {
        second.value--
        buttonText.value = `${second.value}秒后重试`
        if (second.value <= 0) {
          clearInterval(timer)
          isButtonDisabled.value = false
          buttonText.value = '点击发射~'
        }
      }, 1000)
    }

    const reStart = () => {
      second.value = 60
      startCountdown()
    }

    // 检查页面刷新后的倒计时状态
    const checkCountdown = () => {
      if (second.value > 0 && isButtonDisabled.value) {
        startCountdown()  // 页面刷新后继续倒计时
      }
    }

    return {
      reStart,
      second,
      buttonText,
      isButtonDisabled,
      checkCountdown, // 用于初始化时检查
    }
  },
  {
    persist: true, // 使用持久化插件
  }
)
