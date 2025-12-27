import { h, onMounted } from 'vue'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import { inBrowser, useRouter } from 'vitepress'
import './style.css'
import GlobalMusic from './components/GlobalMusic/GlobalMusic.vue'
import AnonymousChat from './components/AnonymousChat.vue'
import { blogPingService } from './apis/BLog'



export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      'nav-bar-title-after': () => h(AnonymousChat),
      'nav-bar-content-after': () => h(GlobalMusic)
    })
  },
  enhanceApp({ app, router, siteData }) {
    if (!inBrowser) return

    onMounted(() => blogPingService())

    const r = router || useRouter()
    // r.onAfterRouteChanged = () => blogPingService()

    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') blogPingService()
    })
  }
} satisfies Theme
