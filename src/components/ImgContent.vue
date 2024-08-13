<script setup lang="ts">
</script>

<template>
    <div class="img-container">
        <slot name="title"></slot>
        <slot name="img"></slot>
        <el-button type="primary" style="margin-top: 2vh;">确认</el-button>

    </div>
</template>

<style lang="scss" scoped>
.img-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.img-container :deep(img) {
    width: 10vw;
    height: 40vh;
}
</style>