<template>
  <div class="cart-item">
    <img :src="item.image" :alt="item.name" />
    <div class="details">
      <h4>{{ item.name }}</h4>
      <p>${{ item.price.toFixed(2) }} each</p>
      <div class="quantity">
        <button @click="update(-1)" :disabled="item.quantity <= 1">-</button>
        <span>{{ item.quantity }}</span>
        <button @click="update(1)">+</button>
      </div>
    </div>
    <div class="subtotal">
      <p>${{ (item.price * item.quantity).toFixed(2) }}</p>
      <button @click="remove" class="remove-btn" aria-label="Remove item">×</button>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'
import { useCartStore } from '../stores/cart'

const props = defineProps({
  item: Object
})

const cartStore = useCartStore()

const update = (delta) => {
  cartStore.updateQuantity(props.item.id, props.item.quantity + delta)
}

const remove = () => {
  cartStore.removeItem(props.item.id)
}
</script>

<style scoped>
.cart-item {
  display: grid;
  grid-template-columns: 100px 1fr auto;
  gap: 1rem;
  padding: 1rem 0;
  border-bottom: 1px solid var(--border);
  align-items: center;
}
.cart-item img {
  width: 100%;
  border-radius: 12px;
  object-fit: cover;
}
.details h4 {
  margin-bottom: 0.5rem;
}
.quantity {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-top: 0.8rem;
}
.quantity button {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: var(--primary);
  color: white;
  font-size: 1.2rem;
}
.subtotal {
  text-align: right;
}
.subtotal p {
  font-size: 1.2rem;
  font-weight: 600;
}
.remove-btn {
  background: none;
  font-size: 1.8rem;
  color: var(--error);
  margin-top: 0.5rem;
}
@media (max-width: 600px) {
  .cart-item {
    grid-template-columns: 80px 1fr;
  }
  .subtotal {
    grid-column: 1 / -1;
    text-align: left;
    margin-top: 0.5rem;
  }
}
</style>