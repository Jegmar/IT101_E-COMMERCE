<template>
  <section class="checkout-page">
    <div class="container checkout-grid">
      <div class="form-section">
        <h2>Customer Information</h2>
        <form @submit.prevent="handleSubmit">
          <div class="form-group">
            <label for="name">Full Name *</label>
            <input type="text" id="name" v-model="form.name" required />
          </div>
          <div class="form-group">
            <label for="email">Email *</label>
            <input type="email" id="email" v-model="form.email" required />
          </div>
          <div class="form-group">
            <label for="address">Delivery Address *</label>
            <textarea id="address" v-model="form.address" rows="4" required></textarea>
          </div>
          <button type="submit" :disabled="!isFormValid" class="submit-btn">
            Complete Order
          </button>
          <p v-if="!isFormValid" class="hint">Please fill in all required fields</p>
        </form>
      </div>

      <div class="summary-section">
        <h2>Order Summary</h2>
        <div class="summary-list">
          <div v-for="item in cartItems" :key="item.id" class="summary-item">
            <span>{{ item.name }} × {{ item.quantity }}</span>
            <span>${{ (item.price * item.quantity).toFixed(2) }}</span>
          </div>
        </div>
        <div class="summary-total">
          <strong>Total:</strong>
          <strong>${{ totalPrice.toFixed(2) }}</strong>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useCartStore } from '../stores/cart'

const cartStore = useCartStore()
const cartItems = computed(() => cartStore.items)
const totalPrice = computed(() => cartStore.totalPrice)

const form = ref({
  name: '',
  email: '',
  address: ''
})

const isFormValid = computed(() => 
  form.value.name.trim() && 
  form.value.email.trim() && 
  form.value.address.trim()
)

const handleSubmit = () => {
  if (isFormValid.value) {
    alert('Order placed successfully! (This is a frontend-only demo)')
    cartStore.clearCart()
  }
}
</script>

<style scoped>
.checkout-page {
  padding: 4rem 0;
}
.checkout-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
}
.form-section, .summary-section {
  background: var(--card-bg);
  padding: 2rem;
  border-radius: 16px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.05);
}
h2 {
  margin-bottom: 2rem;
  text-align: center;
}
.form-group {
  margin-bottom: 1.5rem;
}
label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
}
input, textarea {
  width: 100%;
  padding: 1rem;
  border: 2px solid var(--border);
  border-radius: 12px;
  font-size: 1rem;
}
input:focus, textarea:focus {
  border-color: var(--primary);
}
.submit-btn {
  width: 100%;
  background: var(--success);
  color: white;
  font-size: 1.3rem;
  padding: 1.2rem;
  margin-top: 1rem;
}
.submit-btn:disabled {
  background: #ccc;
}
.hint {
  color: var(--error);
  font-size: 0.9rem;
  text-align: center;
  margin-top: 0.5rem;
}
.summary-item {
  display: flex;
  justify-content: space-between;
  padding: 0.8rem 0;
  border-bottom: 1px solid var(--border);
}
.summary-total {
  display: flex;
  justify-content: space-between;
  font-size: 1.4rem;
  margin-top: 1.5rem;
  padding-top: 1rem;
  border-top: 2px solid var(--primary);
}
@media (max-width: 900px) {
  .checkout-grid {
    grid-template-columns: 1fr;
  }
}
</style>