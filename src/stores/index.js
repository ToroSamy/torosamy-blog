import { createPinia } from 'pinia'
import persist from 'pinia-plugin-persistedstate'

const pinia = createPinia()
pinia.use(persist)

export default pinia

import { useUserStore } from './modules/user'
export { useUserStore }

import { useSecondStore } from "./modules/second"
export { useSecondStore }


import { useMarkdownStore } from './modules/markdown'
export {useMarkdownStore}