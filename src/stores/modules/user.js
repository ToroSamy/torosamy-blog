import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore(
  'forum-user',
  () => {
    const user = ref({
      id: 0,
      username: '',
      qq: '',
      status: 0,
      token: ''
    })
    const setUser = (obj) => {
      user.value = obj
    }
    const clearUser = () => {
      user.value.id = 0
      user.value.username = ''
      user.value.qq = ''
      user.value.status = 0
      user.value.token = ''
    }

    return {
      user,
      setUser,
      clearUser
    }
  },
  {
    persist: true
  }
)
