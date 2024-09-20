<script lang="ts" setup>
import { ref } from 'vue'
const dialogVisible = ref(false)

const open = () => {
  dialogVisible.value = true
}
defineExpose({
  open
})
</script>

<template>
  <el-dialog v-model="dialogVisible" class="kfc-dialog">
  </el-dialog>
</template>


<style lang="scss">
.kfc-dialog {
  background-image: url(@/assets/images/kfc.png);
  background-size: 100% 100%;
  width: 25rem;
  height: 25rem;
}
</style>