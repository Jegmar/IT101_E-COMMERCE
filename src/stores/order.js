import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useOrderStore = defineStore('order', () => {
  const latestOrder = ref(null)

  function setLatestOrder(orderData) {
    latestOrder.value = { ...orderData }
  }

  function clearOrder() {
    latestOrder.value = null
  }

  return { latestOrder, setLatestOrder, clearOrder }
})