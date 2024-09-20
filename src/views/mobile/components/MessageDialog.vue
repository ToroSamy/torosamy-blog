<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { sendUserCommentService, sendUnknownCommentService } from '@/api/comment'
import { useUserStore } from '@/stores';
import { ElMessage } from 'element-plus'
import { useSecondStore } from '@/stores';
const secondStore = useSecondStore()
onMounted(() => {
  secondStore.checkCountdown() // 页面加载时检查是否需要恢复倒计时
})
const dialogVisible = ref(false)
const input = ref('')
const userStore = useUserStore()
const open = () => {
  dialogVisible.value = true
}
const onSubmit = async () => {
  if (userStore.user.username) await sendUserCommentService(userStore.user.username, input.value)
  else await sendUnknownCommentService(input.value)
  ElMessage.success('留言成功')
  secondStore.reStart()
  dialogVisible.value = false
}

defineExpose({
  open
})
</script>

<template>
  <el-dialog v-model="dialogVisible" title="匿名留言" style="width: 65vw; height: auto;">
    <el-input v-model="input" placeholder="有什么想和龙猫说的吗~" style="font-size: 3vw;" type="textarea" :rows="6" maxlength="50"
      show-word-limit />
    <template #footer>
      <el-button @click="dialogVisible = false" type="danger">取消</el-button>
      <el-button type="primary" :disabled="secondStore.isButtonDisabled" @click="onSubmit" class="comment-button">
        {{ secondStore.buttonText }}
      </el-button>
    </template>
  </el-dialog>
</template>

<style scoped></style>