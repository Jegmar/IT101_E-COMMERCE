<template>
  <section class="cart-page">
    <div class="container">
      <h1>Shopping Cart</h1>
      
      <div v-if="cartItems.length === 0" class="empty-cart">
        <p>Your cart is empty.</p>
        <router-link to="/products" class="btn-primary">Browse Cupcakes</router-link>
      </div>

      <div v-else>
        <div class="cart-list">
          <CartItem v-for="item in cartItems" :key="item.id" :item="item" />
        </div>

        <div class="cart-summary">
          <div class="total">
            <span>Total:</span>
            <strong>${{ totalPrice.toFixed(2) }}</strong>
          </div>
          <router-link to="/checkout" class="btn-primary checkout-btn">
            Proceed to Checkout
          </router-link>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { useCartStore } from '../stores/cart'
import CartItem from '../components/CartItem.vue'

const cartStore = useCartStore()
const cartItems = computed(() => cartStore.items)
const totalPrice = computed(() => cartStore.totalPrice)
</script>

<style scoped>
.cart-page {
  padding: 4rem 0;
}
h1 {
  text-align: center;
  margin-bottom: 2rem;
}
.empty-cart {
  text-align: center;
  padding: 4rem 0;
}
.empty-cart p {
  font-size: 1.4rem;
  margin-bottom: 2rem;
  color: var(--text-light);
}
.cart-summary {
  margin-top: 3rem;
  text-align: right;
  padding: 2rem;
  background: var(--card-bg);
  border-radius: 16px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.05);
}
.total {
  font-size: 1.6rem;
  margin-bottom: 1.5rem;
}
.total strong {
  color: var(--primary-dark);
}
.checkout-btn {
  font-size: 1.2rem;
  padding: 1rem 3rem;
}
@media (max-width: 768px) {
  .cart-summary {
    text-align: center;
  }
}
</style>