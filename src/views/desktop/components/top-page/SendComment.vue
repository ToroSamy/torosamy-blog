<script setup>
import { ref, onMounted } from 'vue'
import { Promotion } from '@element-plus/icons-vue'
import { sendUserCommentService, sendUnknownCommentService } from '@/api/comment'
import { useSecondStore, useUserStore } from '@/stores';
const userStore = useUserStore()
const secondStore = useSecondStore()
onMounted(() => {
  secondStore.checkCountdown() // 页面加载时检查是否需要恢复倒计时
})

const input = ref('')

const send = async () => {
  if (userStore.user.username) await sendUserCommentService(userStore.user.username, input.value)
  else await sendUnknownCommentService(input.value)
  ElMessage.success('留言成功')
  secondStore.reStart()
}


</script>

<template>
  <div class="comment-box">
    <el-input v-model="input" placeholder="有什么想和龙猫说的吗~" class="comment-message" maxlength="50" />
    <el-button type="primary" :disabled="secondStore.isButtonDisabled" :icon="Promotion" @click="send"
      class="comment-button">
      {{ secondStore.buttonText }}
    </el-button>
  </div>
</template>

<style scoped>
.comment-box {

  width: 35vw;
  display: flex;
  flex-direction: row;
}

.comment-message {
  font-size: 0.8vw;
  opacity: 0.5;
  height: 2vw;
  width: 80%;
}

.comment-button {
  font-size: 0.8vw;
  height: 2vw;
  width: 20%;
}
</style>
