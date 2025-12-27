<template>
  <div class="nav-chat-wrapper">
    <div class="nav-center-anchor">
      <button 
        type="button" 
        class="nav-chat-btn" 
        :class="{ 'is-active': isOpen }"
        @click.stop.prevent="toggleChat"
      >
        <span class="chat-icon">匿名对话</span>
      </button>
    </div>

    <Teleport to="body">
      <Transition name="fade">
        <div v-if="isOpen" class="chat-overlay" @click="isOpen = false"></div>
      </Transition>
    </Teleport>

    <Teleport to="body">
      <Transition name="slide-down">
        <div v-if="isOpen" class="chat-card shadow-xl">
          <div class="chat-header">
            <div class="header-info">
              <span class="status-dot" :class="{ 'is-loading': isLoading }"></span>
              <h3>匿名对话池</h3>
            </div>
            <div class="header-actions">
              <button type="button" class="action-link" @click="showRestoreInput = !showRestoreInput">
                {{ chatUuid ? '换个ID' : '恢复ID' }}
              </button>
              <button type="button" class="close-btn" @click.stop.prevent="isOpen = false">✕</button>
            </div>
          </div>

          <div v-if="showRestoreInput" class="restore-panel">
            <input v-model="tempUuid" type="text" placeholder="输入 UUID 恢复会话..." @keyup.enter="restoreSession" />
            <button type="button" @click="restoreSession">同步</button>
          </div>

          <div class="chat-body" ref="messageBox">
            <div v-if="chatUuid" class="id-badge" @click="copyUuid" title="点击复制">
              <small>当前会话 ID: {{ chatUuid }}. 使用会话 ID可以在其他设备继续对话</small>
            </div>

            <div v-for="(msg, index) in messages" :key="index" 
                 :class="['message-item', msg.isAuthor ? 'is-other' : 'is-self']">
              <div class="msg-content">{{ msg.message }}</div>
            </div>
            
            <div v-if="messages.length === 0 && !isLoading" class="empty-state">
              发送消息开启新对话, ID 将自动生成. 使用会话 ID可以在其他设备继续对话
            </div>
          </div>

          <div class="chat-footer">
            <div class="input-group">
              <input v-model="inputMsg" type="text" :maxlength="maxChars" placeholder="输入内容..." @keyup.enter.stop.prevent="sendMessage" />
              <span class="char-count">{{ inputMsg.length }}/{{ maxChars }}</span>
            </div>
            <button type="button" @click.stop.prevent="sendMessage" :disabled="!inputMsg.trim() || isLoading">发送</button>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, nextTick, onMounted } from 'vue'
import { blogChatSendService, blogChatRecoverService } from '../apis/BLog'

const maxChars = 100


const isOpen = ref(false)
const isLoading = ref(false)
const showRestoreInput = ref(false)
const inputMsg = ref('')
const tempUuid = ref('')
const messageBox = ref(null)
const messages = ref([])
const chatUuid = ref(null)


const messageDTO = ref({
  chatId: '',
  message: ''
})

onMounted(() => {
  chatUuid.value = localStorage.getItem('blog_chat_uuid')
  window.addEventListener('keydown', handleEsc)
})

const toggleChat = async () => {
  isOpen.value = !isOpen.value
  if (isOpen.value && chatUuid.value && messages.value.length === 0) {
    await fetchHistory(chatUuid.value)
  }
}

const sendMessage = async () => {
    const text = inputMsg.value.trim()
    if (!text || isLoading.value) return

    messageDTO.value.chatId = chatUuid.value
    messageDTO.value.message = text

    const result = await blogChatSendService(messageDTO.value)

    if (chatUuid.value !== result) {
      chatUuid.value = result
    }

    messages.value.push({ message: text, isAuthor: false })
    inputMsg.value = ''
    scrollToBottom()
}

const fetchHistory = async (target) => {
  if (!target) return
  isLoading.value = true

  const result = await blogChatRecoverService(target)

  messages.value = result
}

const restoreSession = async () => {
  const target = tempUuid.value.trim()
  
  if (!target) return
  
  await fetchHistory(target)
  
  chatUuid.value = target
  
  localStorage.setItem('blog_chat_uuid', target)

  showRestoreInput.value = false
}

const copyUuid = () => {
  navigator.clipboard.writeText(chatUuid.value)
  alert("ID 已复制。")
}

const scrollToBottom = async () => {
  await nextTick()
  if (messageBox.value) messageBox.value.scrollTop = messageBox.value.scrollHeight
}

const handleEsc = (e) => { if (e.key === 'Escape') isOpen.value = false }
</script>

<style scoped>
/* 样式保持之前的设计... */
.nav-center-anchor { position: fixed; top: 0; left: 50%; transform: translateX(-50%); height: var(--vp-nav-height); display: flex; align-items: center; justify-content: center; z-index: 100; pointer-events: none; }
.nav-chat-btn { pointer-events: auto; display: flex; align-items: center; gap: 8px; padding: 4px 14px; background: var(--vp-c-bg-soft); border: 1px solid var(--vp-c-divider); border-radius: 20px; font-size: 13px; font-weight: 600; cursor: pointer; color: var(--vp-c-text-1); transition: all 0.2s; }
.nav-chat-btn:hover { border-color: var(--vp-c-brand); }
.nav-chat-btn.is-active { background: var(--vp-c-brand); color: white; border-color: var(--vp-c-brand); }

.chat-card { position: fixed; top: calc(var(--vp-nav-height) + 15px); left: 50%; transform: translateX(-50%); width: 90vw; max-width: 420px; height: 500px; background: var(--vp-c-bg); border: 1px solid var(--vp-c-divider); border-radius: 16px; display: flex; flex-direction: column; z-index: 2000; box-shadow: 0 20px 40px rgba(0,0,0,0.3); overflow: hidden; }

.chat-header { padding: 12px 16px; background: var(--vp-c-bg-soft); border-bottom: 1px solid var(--vp-c-divider); display: flex; justify-content: space-between; align-items: center; }
.header-info { display: flex; align-items: center; gap: 8px; font-weight: bold; font-size: 14px; }
.status-dot { width: 8px; height: 8px; background: #10b981; border-radius: 50%; }
.status-dot.is-loading { background: #f59e0b; animation: pulse 1.5s infinite; }
@keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }

.header-actions { display: flex; align-items: center; gap: 10px; }
.action-link { font-size: 11px; color: var(--vp-c-brand); cursor: pointer; border: none; background: none; text-decoration: underline; }
.close-btn { background: none; border: none; font-size: 18px; cursor: pointer; color: var(--vp-c-text-2); }

.restore-panel { background: var(--vp-c-bg-mute); padding: 8px 12px; display: flex; gap: 8px; border-bottom: 1px solid var(--vp-c-divider); }
.restore-panel input { flex: 1; font-size: 12px; padding: 4px 8px; border-radius: 4px; border: 1px solid var(--vp-c-divider); background: var(--vp-c-bg); }
.restore-panel button { font-size: 11px; background: var(--vp-c-brand); color: white; border: none; padding: 4px 8px; border-radius: 4px; cursor: pointer; }

.chat-body { flex: 1; padding: 16px; overflow-y: auto; display: flex; flex-direction: column; gap: 12px; }
.id-badge { align-self: center; background: var(--vp-c-bg-mute); padding: 4px 12px; border-radius: 20px; font-size: 10px; color: var(--vp-c-text-3); cursor: pointer; margin-bottom: 8px; }
.id-badge:hover { color: var(--vp-c-brand); }

.message-item { max-width: 85%; }
.msg-content { padding: 8px 14px; border-radius: 12px; font-size: 14px; line-height: 1.5; background: var(--vp-c-bg-mute); color: var(--vp-c-text-1); word-break: break-all; }
.is-self { align-self: flex-end; }
.is-self .msg-content { background: var(--vp-c-brand); color: white; border-bottom-right-radius: 2px; }
.is-other .msg-content { border-bottom-left-radius: 2px; }

.chat-footer { padding: 12px 16px; border-top: 1px solid var(--vp-c-divider); display: flex; gap: 10px; background: var(--vp-c-bg-soft); }
.input-group { flex: 1; position: relative; display: flex; align-items: center; }
.input-group input { width: 100%; padding: 8px 45px 8px 12px; border-radius: 10px; border: 1px solid var(--vp-c-divider); background: var(--vp-c-bg); color: var(--vp-c-text-1); outline: none; font-size: 14px; }
.char-count { position: absolute; right: 10px; font-size: 10px; color: var(--vp-c-text-3); }
.chat-footer button { padding: 0 16px; background: var(--vp-c-brand); color: white; border: none; border-radius: 10px; font-weight: 600; cursor: pointer; }
.chat-footer button:disabled { opacity: 0.5; cursor: not-allowed; }

.empty-state { text-align: center; color: var(--vp-c-text-3); font-size: 13px; margin-top: 40px; }

.chat-overlay { position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background: rgba(0,0,0,0.4); backdrop-filter: blur(4px); z-index: 1999; }
.fade-enter-active, .fade-leave-active { transition: opacity 0.2s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
.slide-down-enter-active, .slide-down-leave-active { transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1); }
.slide-down-enter-from, .slide-down-leave-to { opacity: 0; transform: translate(-50%, -20px); }
</style>