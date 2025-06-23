import { defineConfig } from 'vitepress'
import AutoSidebar from 'vite-plugin-vitepress-auto-sidebar';

export default defineConfig({
  title: "Torosamy`s blog",
  srcDir: './src',
  cleanUrls: false,
  appearance: 'dark',
  lastUpdated: true,
  description: "",
  themeConfig: {
    search: {
      provider: 'local'
    },
    outlineTitle: '章节目录',
    outline: 'deep',
    siteTitle: "Welcome to Torosamy`s blog",
    nav: [
      { text: 'Home', link: '/' },
      // { text: 'AboutMe', link: '/torosamy' },
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/ToroSamy' },
      { icon: 'bilibili', link: 'https://live.bilibili.com/13130873' },
      { icon: 'qq', link: 'https://qm.qq.com/q/jn3iX2qppu', },
    ],
    lastUpdated: {
      text: '最后更新于',
      formatOptions: {
        dateStyle: 'medium',
        timeStyle: 'medium'
      }
    },
    docFooter: {
      prev: '上一篇',
      next: '下一篇'
    },
    darkModeSwitchTitle: "dark",
    lightModeSwitchTitle: "dark",
    sidebar: {},
  },
  vite: {
    plugins: [
      AutoSidebar({
        path: 'docs/src',
        collapsed: true,
        sideBarResolved: (data) => {
          return data
        },
        sideBarItemsResolved: (data) => {
          data.forEach(element => {
            if (element.text) {
              element.text = element.text.replaceAll("_", " ")
            }


            if (element.link === '/article/index.html') {
              element.text = 'Torosamy Feel So Good'
            }

            if (element.link === '/article/JavaScript/nodejs.html') {
              element.text = 'Node.js'
            }
          });
          return data
        },
        beforeCreateSideBarItems: (data) => {
          const prefaceIndex = data.findIndex(item => item === 'index.md');

          if (prefaceIndex > 0) {
            const preface = data.splice(prefaceIndex, 1)[0];
            data.unshift(preface);

          }
          return data;
        }
      }) as PluginOption
    ]
  }
})