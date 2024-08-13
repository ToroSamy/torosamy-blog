<script lang="ts" setup>
import { ref } from 'vue'
const props = defineProps<{ title: string }>() // 接收 title 作为 prop
const dialogVisible = ref(false)
const open = () => {
  dialogVisible.value = true
}
const close = () => {
  dialogVisible.value = false
}
defineExpose({
  open,
  close
})
</script>

<template>
  <el-dialog v-model="dialogVisible" :title="props.title">
    <slot></slot>
  </el-dialog>
</template>
