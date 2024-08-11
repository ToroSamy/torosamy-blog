<script lang="ts" setup>
import { ref } from 'vue'
import axios from 'axios'
import { sendMessageService } from '@/api/message'
import { ElMessage } from 'element-plus'
const dialogVisible = ref(false)
const input = ref('')

const open = () => {
  dialogVisible.value = true
}
const onSubmit = async () => {
  const response = await axios.get('https://api.ipify.org?format=json')
  await sendMessageService(input.value, response.data.ip)
  ElMessage.success('留言成功')
  dialogVisible.value = false
}

defineExpose({
  open
})
</script>

<template>
  <el-dialog v-model="dialogVisible" title="匿名留言" class="dialog">
    <el-input v-model="input" placeholder="有什么想和龙猫说的吗~" class="message" type="textarea" :rows="6" />
    <template #footer>
      <el-button @click="dialogVisible = false" type="danger">取消</el-button>
      <el-button @click="onSubmit" type="primary">确认</el-button>
    </template>
  </el-dialog>
</template>

<style scoped>
.dialog {
  width: 50vw;
  height: 50vh;
}

.message {
  font-size: 1.8vh;
}
</style>