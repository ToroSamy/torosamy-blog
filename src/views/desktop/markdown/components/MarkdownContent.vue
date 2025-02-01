<script setup>
import { ref, nextTick } from 'vue'
import MarkdownIt from 'markdown-it'
import hljs from 'highlight.js'
import 'highlight.js/styles/atom-one-dark.css'  // 替换为想要的高亮样式
import { useMarkdownStore } from '@/stores'
const markdownStore = useMarkdownStore()
// 创建一个 MarkdownIt 实例
const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
  breaks: true,
  highlight: function (str, lang) {
    // 自动高亮代码块
    return hljs.highlightAuto(str).value
  }
})

const htmlContent = ref('')

// 提取代码高亮的操作，避免重复代码
const highlightCodeBlocks = () => {
  nextTick(() => {
    document.querySelectorAll('pre code').forEach((el) => {
      hljs.highlightElement(el)
    })
  })
}

// 获取 Markdown 文件并渲染为 HTML
const fetchMarkdown = () => {
  htmlContent.value = md.render(markdownStore.markdown.content)
  highlightCodeBlocks()  // 执行代码高亮
}

// 页面加载时调用
fetchMarkdown()
</script>

<template>
  <!-- <button @click="test()"></button> -->
  <div class="container" v-html="htmlContent"></div>
</template>

<style lang="scss">
.container {
  background-color: #292929;
  width: 83vw;
  margin: 0;
  padding: 20px;
  color: rgb(240, 238, 238);
  font-family: 'Courier New', Courier, monospace;
  font-size: 14px;
  line-height: 1.6;
}
</style>
