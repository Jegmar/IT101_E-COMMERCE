<template>
  <div class="cart-item" v-if="item && item.id">
    <img :src="item.image" :alt="item.name" class="cart-item-image" />
    <div class="details">
      <h4>{{ item.name }}</h4>
      <p>₱{{ item.price.toFixed(2) }} each</p>
      <div class="quantity">
        <button @click="update(-1)" :disabled="item.quantity <= 1" class="qty-btn">
          <span class="qty-symbol">−</span>
        </button>
        <span class="qty-display">{{ item.quantity }}</span>
        <button @click="update(1)" class="qty-btn">
          <span class="qty-symbol">+</span>
        </button>
      </div>
    </div>
    <div class="subtotal">
      <p class="subtotal-amount">₱{{ (item.price * item.quantity).toFixed(2) }}</p>
      <button @click="remove" class="remove-btn" aria-label="Remove item">
        <span class="remove-symbol">×</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'
import { useCartStore } from '../stores/cart'

const props = defineProps({
  item: {
    type: Object,
    required: true
  }
})

const cartStore = useCartStore()

const update = (delta) => {
  const newQuantity = props.item.quantity + delta
  if (newQuantity >= 1) {
    cartStore.updateQuantity(props.item.id, newQuantity)
  }
}

const remove = () => {
  cartStore.removeItem(props.item.id)
}
</script>

<style scoped>
.cart-item {
  display: grid;
  grid-template-columns: 100px 1fr auto;
  gap: 1.5rem;
  padding: 1.5rem 0;
  border-bottom: 1px solid var(--border);
  align-items: center;
  transition: background-color 0.2s ease;
}

.cart-item:hover {
  background-color: rgba(255, 158, 197, 0.05);
}

.cart-item-image {
  width: 100%;
  height: 100px;
  border-radius: 12px;
  object-fit: cover;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.details h4 {
  margin-bottom: 0.5rem;
  font-size: 1.2rem;
  color: var(--primary-dark);
  font-weight: 600;
}

.details > p {
  color: var(--text-light);
  font-size: 1rem;
  margin-bottom: 1rem;
}

.quantity {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-top: 0.5rem;
}

.qty-btn {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: var(--primary);
  color: white;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  position: relative;
}

.qty-symbol {
  font-size: 1.4rem;
  font-weight: 500;
  line-height: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
  position: relative;
  top: -1px;
}

.qty-btn:hover:not(:disabled) {
  background: var(--primary-dark);
  transform: scale(1.08);
}

.qty-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
  background: #ccc;
}

.qty-display {
  font-size: 1.2rem;
  font-weight: 600;
  min-width: 30px;
  text-align: center;
  color: var(--primary-dark);
  padding: 0.2rem 0.5rem;
  background: rgba(255, 158, 197, 0.1);
  border-radius: 6px;
}

.subtotal {
  text-align: right;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.5rem;
}

.subtotal-amount {
  font-size: 1.4rem;
  font-weight: 700;
  color: var(--primary-dark);
}

.remove-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.25rem 0.5rem;
  border-radius: 6px;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
}

.remove-symbol {
  font-size: 1.8rem;
  color: #ff6b6b;
  font-weight: 500;
  line-height: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
}

.remove-btn:hover {
  background-color: rgba(255, 107, 107, 0.1);
  transform: scale(1.1);
}

.remove-btn:hover .remove-symbol {
  color: #ff5252;
}

@media (max-width: 600px) {
  .cart-item {
    grid-template-columns: 80px 1fr;
    gap: 1rem;
    padding: 1rem 0;
  }
  
  .cart-item-image {
    height: 80px;
  }
  
  .subtotal {
    grid-column: 1 / -1;
    text-align: left;
    margin-top: 0.5rem;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding-top: 0.5rem;
    border-top: 1px dashed var(--border);
  }
  
  .details h4 {
    font-size: 1.1rem;
  }
}
</style>