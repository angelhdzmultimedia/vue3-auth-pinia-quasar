import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useStorageStore = defineStore('storage', () => {
  function get(key) {
    return {
      data: ref(JSON.parse(localStorage.getItem(key))),
      set: (newValue) => {
        localStorage.setItem(key, JSON.stringify(newValue))
      },
    }
  }

  return {
    get,
  }
})
