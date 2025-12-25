import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: []
  }),
  actions: {
    addItem(item) {
      this.items.push(item)
    },
    removeItem(index) {
      this.items.splice(index, 1)
    },
    clearCart() {
      this.items = []
    }
  },
  getters: {
    totalItems: (state) => state.items.length,
    totalPrice: (state) => state.items.reduce((sum, i) => sum + i.price, 0)
  }
})
