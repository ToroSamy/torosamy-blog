import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore(
  'forum-user',
  () => {
    const user = ref({})
    const setUser = (obj) => {
      user.value = obj
    }

    return {
      user,
      setUser
    }
  },
  {
    persist: true
  }
)
