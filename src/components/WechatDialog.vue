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
  <el-dialog v-model="dialogVisible" width="18rem" style="font-size: 1vw; background-color: #6ba5cb;">
    <template #header>
      <div style="font-size: 1rem; color: white;">服务器娘提示您</div>

    </template>


    <div class="container">
      <div>腾讯已于2020年关闭临时会话功能</div>
      <div>您可以扫码联系龙猫哦</div>
      <img src="@/assets/images/show-wechat.jpg" style="width: 13rem; height: auto; "></img>
    </div>
  </el-dialog>
</template>


<style lang="scss" scoped>
.container {
  // width: 13rem;
  color: white;
  background-color: #6ba5cb;
  font-size: 0.8rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>