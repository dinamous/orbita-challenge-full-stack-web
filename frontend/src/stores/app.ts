
import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => ({
    isSidebarOpen: false,
  }),
  actions: {
    toggleSidebar() {
      this.isSidebarOpen = !this.isSidebarOpen
    },
    closeSidebar() {
      this.isSidebarOpen = false
    },
    openSidebar() {
      this.isSidebarOpen = true
    },
  },
})
