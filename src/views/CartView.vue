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
          <div class="summary-content">
            <div class="total-section">
              <div class="total-wrapper">
                <span class="total-label">Total:</span>
                <strong class="total-amount">${{ totalPrice.toFixed(2) }}</strong>
              </div>
            </div>
            <router-link to="/checkout" class="btn-primary checkout-btn">
              Proceed to Checkout
            </router-link>
          </div>
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
  min-height: 70vh;
}

h1 {
  text-align: center;
  margin-bottom: 3rem;
  font-size: 2.5rem;
  color: var(--primary-dark);
}

.empty-cart {
  text-align: center;
  padding: 4rem 0;
}

.empty-cart p {
  font-size: 1.4rem;
  margin-bottom: 2rem;
  color: var(--text-light);
  font-weight: 500;
}

.empty-cart .btn-primary {
  background: var(--accent);
  color: white;
  padding: 1rem 2rem;
  border-radius: 12px;
  text-decoration: none;
  font-size: 1.1rem;
  font-weight: 600;
  transition: all 0.3s ease;
  display: inline-block;
}

.empty-cart .btn-primary:hover {
  background: #ff9d1a;
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(255, 179, 71, 0.3);
}

.cart-list {
  margin-bottom: 2rem;
}

.cart-summary {
  background: var(--card-bg);
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  padding: 2rem;
  border-top: 3px solid var(--primary);
}

.summary-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
}

.total-section {
  display: flex;
  align-items: center;
}

.total-wrapper {
  display: flex;
  flex-direction: column;
}

.total-label {
  font-size: 1.1rem;
  color: var(--text-light);
  margin-bottom: 0.5rem;
}

.total-amount {
  font-size: 2.2rem;
  color: var(--primary-dark);
  font-weight: 700;
}

.checkout-btn {
  background: var(--accent);
  color: white;
  padding: 1.2rem 3rem;
  border-radius: 12px;
  text-decoration: none;
  font-size: 1.2rem;
  font-weight: 600;
  transition: all 0.3s ease;
  border: none;
  cursor: pointer;
  display: inline-block;
  text-align: center;
  white-space: nowrap;
}

.checkout-btn:hover {
  background: #ff9d1a;
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(255, 179, 71, 0.4);
}

@media (max-width: 768px) {
  .summary-content {
    flex-direction: column;
    align-items: stretch;
    text-align: center;
    gap: 1.5rem;
  }
  
  .total-section {
    justify-content: center;
  }
  
  .total-amount {
    font-size: 1.8rem;
  }
  
  .checkout-btn {
    width: 100%;
    padding: 1rem 2rem;
  }
  
  .cart-summary {
    padding: 1.5rem;
  }
}

@media (max-width: 480px) {
  h1 {
    font-size: 2rem;
  }
  
  .total-amount {
    font-size: 1.6rem;
  }
  
  .checkout-btn {
    font-size: 1.1rem;
    padding: 0.9rem 1.5rem;
  }
}
</style>