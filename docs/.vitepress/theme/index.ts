import { h, onMounted } from 'vue'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import { inBrowser, useRouter } from 'vitepress'
import './style.css'
import GlobalMusic from './components/GlobalMusic/GlobalMusic.vue'

function ping() {
  const url = '/api/visit/blog'
  const body = JSON.stringify({ t: Date.now() })

  if (inBrowser && 'sendBeacon' in navigator) {
    const ok = navigator.sendBeacon(url, new Blob([body], { type: 'application/json' }))
    if (ok) return
  }
  fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    keepalive: true,
    body
  }).catch(() => {})
}

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      'nav-bar-content-after': () => h(GlobalMusic)
    })
  },
  enhanceApp({ app, router, siteData }) {
    if (!inBrowser) return

    onMounted(() => ping())

    const r = router || useRouter()
    r.onAfterRouteChanged = () => ping()

    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') ping()
    })
  }
} satisfies Theme
