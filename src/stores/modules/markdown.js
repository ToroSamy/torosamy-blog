import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useMarkdownStore = defineStore(
  'forum-markdown',
  () => {
    const markdown = ref({
      name: '',
      content: ''
    })
    const setMarkdown = (obj) => {
      markdown.value = obj
    }
    const setMarkdownName = (name) => {
      markdown.value.name = name
    }

    const setMarkdownContent = (content) => {
      markdown.value.content = content
    }

    const clearMarkdown = () => {
      markdown.value.name = ''
      markdown.value.content = ''
    }

    return {
      markdown,
      setMarkdown,
      clearMarkdown,
      setMarkdownName,
      setMarkdownContent
    }
  },
  {
    persist: true
  }
)
