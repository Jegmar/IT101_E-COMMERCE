<template>
  <header class="navbar">
    <div class="container nav-container">
      <router-link to="/" class="logo">
        <h1>Sweet Bites</h1>
      </router-link>
      <nav class="nav-links" :class="{ open: mobileMenuOpen }">
        <router-link to="/" @click="mobileMenuOpen = false">Home</router-link>
        <router-link to="/products" @click="mobileMenuOpen = false">Menu</router-link>
        <router-link to="/order-confirmation" @click="mobileMenuOpen = false" class="orders-link">
          Orders
          <span v-if="hasRecentOrder" class="order-badge">1</span>
        </router-link>
        <router-link to="/cart" class="cart-link" @click="mobileMenuOpen = false">
          Cart 🛒
          <span v-if="cartTotal > 0" class="cart-count">{{ cartTotal }}</span>
        </router-link>
      </nav>
      <button class="mobile-toggle" @click="mobileMenuOpen = !mobileMenuOpen" aria-label="Toggle menu">
        ☰
      </button>
    </div>
  </header>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useCartStore } from '../stores/cart'
import { RouterLink } from 'vue-router'
import { useOrderStore } from '../stores/order'

const orderStore = useOrderStore()
const hasOrder = computed(() => orderStore.hasOrder())
const cartStore = useCartStore()
const cartTotal = computed(() => cartStore.totalItems)
const mobileMenuOpen = ref(false)
</script>

<style scoped>
.navbar {
  background: white;
  box-shadow: 0 2px 10px rgba(0,0,0,0.08);
  position: sticky;
  top: 0;
  z-index: 1000;
}
.nav-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
}
.logo h1 {
  font-size: rem;
  color: var(--primary);
}
.nav-links {
  display: flex;
  gap: 2rem;
  align-items: center;
}
.nav-links a {
  text-decoration: none;
  color: var(--text);
  font-weight: 500;
  font-size: 1.1rem;
  transition: color 0.3s;
}
.nav-links a:hover, .nav-links a.router-link-active {
  color: var(--primary-dark);
}
.cart-link {
  position: relative;
}
.cart-count {
  position: absolute;
  top: -8px;
  right: -12px;
  background: var(--accent);
  color: white;
  font-size: 0.8rem;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: grid;
  place-items: center;
}
.mobile-toggle {
  display: none;
  font-size: 1.8rem;
  background: none;
  border: none;
}
@media (max-width: 768px) {
  .nav-links {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: white;
    flex-direction: column;
    padding: 1rem;
    box-shadow: 0 4px 10px rgba(0,0,0,0.1);
    transform: translateY(-100%);
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
  }
  .nav-links.open {
    transform: translateY(0);
    opacity: 1;
    visibility: visible;
  }
  .mobile-toggle {
    display: block;
  }
}

.orders-link {
  position: relative;
}
.order-badge {
  position: absolute;
  top: -8px;
  right: -12px;
  background: var(--accent);
  color: white;
  font-size: 0.8rem;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: grid;
  place-items: center;
}
</style>