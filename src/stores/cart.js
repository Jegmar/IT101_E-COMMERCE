// stores/cart.js
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { cupcakes } from '../data/cupcakes'

export const useCartStore = defineStore('cart', () => {
  const items = ref([])

  const addItem = (cupcakeId, quantity = 1) => {
    const existing = items.value.find(i => i.id === cupcakeId)
    if (existing) {
      existing.quantity += quantity
    } else {
      const cupcake = cupcakes.find(c => c.id === cupcakeId)
      if (cupcake) {
        items.value.push({ 
          id: cupcake.id,
          name: cupcake.name,
          price: cupcake.price,
          image: cupcake.image, // This now has the full public path
          description: cupcake.description,
          quantity: quantity 
        })
      }
    }
  }

  const removeItem = (cupcakeId) => {
    items.value = items.value.filter(i => i.id !== cupcakeId)
  }

  const updateQuantity = (cupcakeId, quantity) => {
    if (quantity <= 0) {
      removeItem(cupcakeId)
      return
    }
    const item = items.value.find(i => i.id === cupcakeId)
    if (item) item.quantity = quantity
  }

  const clearCart = () => {
    items.value = []
  }

  const totalItems = computed(() => 
    items.value.reduce((sum, item) => sum + item.quantity, 0)
  )

  const totalPrice = computed(() => 
    items.value.reduce((sum, item) => sum + item.price * item.quantity, 0)
  )

  const cartItems = computed(() => items.value)

  return {
    items: cartItems,
    totalItems,
    totalPrice,
    addItem,
    removeItem,
    updateQuantity,
    clearCart
  }
})