import { defineConfig } from 'vitepress'
import AutoSidebar from 'vite-plugin-vitepress-auto-sidebar';

export default defineConfig({
  title: "Torosamy`s blog",
  srcDir: './src',
  cleanUrls: false,
  lastUpdated: true,
  description: "",
  themeConfig: { //  注意：配置应该放在 themeConfig 中
    search: {
      provider: 'local'
    },
    outlineTitle: '章节目录',
    siteTitle: "Welcome to Torosamy`s blog",
    nav: [
      { text: 'Home', link: '/' },
      { text: 'AboutMe', link: '/torosamy' },
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/ToroSamy' },
      { icon: 'bilibili', link: 'https://live.bilibili.com/13130873' },
      { icon: 'qq', link: 'https://qm.qq.com/q/jn3iX2qppu', },
    ],
    sidebar: {}
  },
  // vite: {
  //   plugins: [
  //     AutoSidebar({
  //       path: 'docs/src',
  //       collapsed: true
  //     })
  //   ]
  // },
  vite: {
    plugins: [
      AutoSidebar({
        path: 'docs/src',
        collapsed: true,
        beforeCreateSideBarItems: (data) => {
          const prefaceIndex = data.findIndex(item => item === '前言.md');

          if (prefaceIndex > 0) {
            const preface = data.splice(prefaceIndex, 1)[0];
            data.unshift(preface);
          }
          return data;
        }
      })
    ]
  }
})