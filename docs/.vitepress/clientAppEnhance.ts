import type { EnhanceAppContext } from 'vitepress'
import { inBrowser } from 'vitepress'

function ping() {
  const url = '/api/visit/blog'
  const body = JSON.stringify({ t: Date.now() })

  if ('sendBeacon' in navigator) {
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

export default function clientAppEnhance({ router }: EnhanceAppContext) {
  if (!inBrowser) return 
  
  ping()

  // 路由切换
  router.onAfterRouteChanged = () => {
    ping()
  }

  // 页面隐藏时尽量补发
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') ping()
  })
}
