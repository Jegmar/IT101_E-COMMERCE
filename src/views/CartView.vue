<template>
  <section class="cart-page">
    <div class="container">
      <h1>Shopping Cart</h1>
      
      <div v-if="cartItems.length === 0" class="empty-cart">
        <!-- Shopping cart icon -->
        <div class="cart-icon">
          <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 12 L8 12 L12 40 L52 40 L56 12 L44 12" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
            <circle cx="20" cy="52" r="6" fill="none" stroke="currentColor" stroke-width="4"/>
            <circle cx="44" cy="52" r="6" fill="none" stroke="currentColor" stroke-width="4"/>
            <path d="M26 24 L38 24" stroke="var(--accent)" stroke-width="6" stroke-linecap="round"/>
          </svg>
        </div>

        <h2 class="empty-title">Your Cart Is Currently Empty!</h2>
        
        <p class="empty-subtitle">
          Let’s fill it with something sweet!<br>
          You’ll find plenty of delicious options on our "Menu" page.
        </p>

        <router-link to="/products" class="btn-primary return-btn">
          Return To Shop
        </router-link>
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
                <strong class="total-amount">₱{{ totalPrice.toFixed(2) }}</strong>
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
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  max-width: 600px;
  margin: 0 auto;
}

.cart-icon {
  width: 120px;
  height: 120px;
  color: var(--text-light);
  opacity: 0.8;
}

.cart-icon svg {
  width: 100%;
  height: 100%;
}

.empty-title {
  font-size: 2.4rem;
  font-weight: 700;
  color: var(--primary-dark);
  margin: 0;
  line-height: 1.2;
}

.empty-subtitle {
  font-size: 1.1rem;
  color: var(--text-light);
  line-height: 1.6;
  margin: 0 0 1.5rem 0;
}

.return-btn {
  background: var(--accent);
  color: white;
  padding: 1rem 3rem;
  border-radius: 50px;
  text-decoration: none;
  font-size: 1.2rem;
  font-weight: 600;
  transition: all 0.3s ease;
  display: inline-block;
}

.return-btn:hover {
  background: #ff9d1a;
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(255, 179, 71, 0.3);
}

/* Existing non-empty cart styles remain unchanged */
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

  .empty-title {
    font-size: 2rem;
  }

  .cart-icon {
    width: 100px;
    height: 100px;
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

  .empty-title {
    font-size: 1.8rem;
  }
}
</style>