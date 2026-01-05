<template>
  <section class="detail-page" v-if="cupcake">
    <div class="container detail-grid">
      <div class="image-section">
        <img :src="cupcake.image" :alt="cupcake.name" />
      </div>
      <div class="info-section">
        <h1>{{ cupcake.name }}</h1>
        <p class="price">${{ cupcake.price.toFixed(2) }}</p>
        <p class="description">{{ cupcake.description }}</p>
        
        <div class="quantity-selector">
          <label for="quantity">Quantity:</label>
          <div class="controls">
            <button @click="qty > 1 && qty--" :disabled="qty <= 1">-</button>
            <input type="number" id="quantity" v-model.number="qty" min="1" />
            <button @click="qty++">+</button>
          </div>
        </div>

        <button @click="addToCart" class="add-to-cart-btn">
          Add to Cart ({{ qty }})
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { cupcakes } from '../data/cupcakes'
import { useCartStore } from '../stores/cart'

const route = useRoute()
const cartStore = useCartStore()
const qty = ref(1)

const cupcake = computed(() => 
  cupcakes.find(c => c.id === Number(route.params.id))
)

const addToCart = () => {
  cartStore.addItem(cupcake.value.id, qty.value)
  qty.value = 1
  // Could show toast here
}

onMounted(() => {
  if (!cupcake.value) {
    // handle not found (optional)
  }
})
</script>

<style scoped>
.detail-page {
  padding: 4rem 0;
}
.detail-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: start;
}
.image-section img {
  border-radius: 20px;
  box-shadow: 0 8px 25px rgba(0,0,0,0.1);
}
.info-section h1 {
  font-size: 2.8rem;
  margin-bottom: 1rem;
}
.price {
  font-size: 2rem;
  color: var(--primary-dark);
  margin: 1rem 0;
}
.description {
  font-size: 1.1rem;
  color: var(--text-light);
  margin-bottom: 2rem;
}
.quantity-selector {
  margin: 2rem 0;
}
.quantity-selector label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
}
.controls {
  display: flex;
  align-items: center;
  gap: 1rem;
}
.controls button {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: var(--primary);
  color: white;
  font-size: 1.4rem;
}
.controls input {
  width: 80px;
  padding: 0.8rem;
  text-align: center;
  font-size: 1.1rem;
  border: 2px solid var(--border);
  border-radius: 12px;
}
.add-to-cart-btn {
  background: var(--accent);
  color: white;
  font-size: 1.3rem;
  padding: 1rem 2.5rem;
  margin-top: 1rem;
}
.add-to-cart-btn:hover {
  background: #ff9d1a;
}
@media (max-width: 900px) {
  .detail-grid {
    grid-template-columns: 1fr;
  }
}
</style>