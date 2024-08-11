<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const audioSrc = '@/../music.mp3'; // 替换为你的音频文件路径
const audio = ref(null);

const playAudio = () => {
    ElMessageBox.confirm('允许播放背景音乐吗')
        .then(() => { audio.value.play(); })
        .catch(() => { })
};

playAudio()

onUnmounted(() => {
    // 在组件卸载时暂停音频
    audio.value.pause();
});
</script>

<template>
    <div>
        <audio ref="audio" :src="audioSrc" loop></audio>
    </div>
</template>


<style scoped>
button {
    margin: 5px;
}
</style>
