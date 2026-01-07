<template>
  <section class="detail-page" v-if="cupcake">
    <div class="container">
      <div class="detail-grid">
        <div class="left-column">
          <router-link to="/products" class="back-btn">
            <i class="pi pi-arrow-left"></i>
          </router-link>
          <div class="image-section">
            <img :src="cupcake.image" :alt="cupcake.name" />
          </div>
        </div>
        <div class="info-section">
          <h1>{{ cupcake.name }}</h1>
          <p class="price">₱{{ cupcake.price.toFixed(2) }}</p>
          <p class="description">{{ cupcake.description }}</p>
          
          <div class="quantity-selector">
            <label for="quantity">Quantity:</label>
            <div class="controls">
              <button @click="qty > 0 && qty--" :disabled="qty <= 0">-</button>
              <input type="number" id="quantity" v-model.number="qty" min="0" />
              <button @click="qty++">+</button>
            </div>
          </div>

          <button @click="addToCart" class="add-to-cart-btn" :disabled="qty === 0">
            Add to Cart
          </button>
        </div>
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
const qty = ref(0) // Default quantity set to 0

const cupcake = computed(() => 
  cupcakes.find(c => c.id === Number(route.params.id))
)

const addToCart = () => {
  if (qty.value > 0) {
    cartStore.addItem(cupcake.value.id, qty.value)
    qty.value = 0 // Reset to 0 after adding to cart
    // Could show toast here
  }
}
</script>

<style scoped>
.detail-page {
  padding: 4rem 1.5rem;
  min-height: 100vh;
  background: linear-gradient(rgba(255,156,201,0.4), rgba(255,156,201,0.4)), url('/src/assets/images/hero.jpg') center/cover no-repeat;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
}

.container {
  max-width: 1200px;
  width: 100%;
}

.detail-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: start;
  background: white;
  border-radius: 24px;
  padding: 3rem;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.15);
  margin: 0 auto;
}

.left-column {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.back-btn {
  font-weight: 500;
  font-size: 1.2rem;
  color: var(--primary-dark);
  text-decoration: none;
  transition: all 0.3s ease;
  display: inline-block;
  padding: 0.5rem 0;
  align-self: flex-start;
}

.back-btn:hover {
  color: var(--primary);
  text-decoration: none;
  text-decoration-thickness: 2px;
  transform: translateY(-2px);
}

.image-section img {
  border-radius: 20px;
  box-shadow: 0 8px 25px rgba(0,0,0,0.1);
  width: 100%;
  height: auto;
  display: block;
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
  margin: 1rem 0;
}

.quantity-selector label {
  display: block;
  margin-bottom: 1rem;
  font-weight: 500;
}

.controls {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}

.controls button {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: var(--primary);
  color: white;
  font-size: 1.6rem;
  font-weight: bold;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
  padding: 0;
}

.controls button:hover:not(:disabled) {
  background: var(--primary-dark);
  transform: scale(1.05);
}

.controls button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
}

.controls input {
  width: 90px;
  height: 48px;
  padding: 0.8rem;
  text-align: center;
  font-size: 1.2rem;
  font-weight: 600;
  border: 2px solid var(--border);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.add-to-cart-btn {
  background: var(--accent);
  color: white;
  font-size: 1.3rem;
  font-weight: bold;
  padding: 1rem 2.5rem;
  margin-top: 2rem;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100%;
}

.add-to-cart-btn:hover:not(:disabled) {
  background: #ff9d1a;
  transform: translateY(-2px);
}

.add-to-cart-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
}

@media (max-width: 900px) {
  .detail-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
    padding: 2rem;
  }
  
  .left-column {
    order: 2;
  }
  
  .info-section {
    order: 1;
  }
}

@media (max-width: 768px) {
  .detail-page {
    background-attachment: scroll;
    padding: 2rem 1rem;
  }
  
  .detail-grid {
    padding: 1.5rem;
    border-radius: 20px;
  }
  
  .controls button {
    width: 44px;
    height: 44px;
    font-size: 1.5rem;
  }
  
  .controls input {
    width: 80px;
    height: 44px;
    font-size: 1.1rem;
  }
}

@media (max-width: 480px) {
  .back-btn {
    font-size: 1rem;
    padding: 0.3rem 0;
  }
  
  .info-section h1 {
    font-size: 2.2rem;
  }
  
  .price {
    font-size: 1.6rem;
  }
  
  .detail-grid {
    padding: 1rem;
    border-radius: 16px;
  }
  
  .controls {
    gap: 0.8rem;
  }
  
  .controls button {
    width: 40px;
    height: 40px;
    font-size: 1.4rem;
  }
  
  .controls input {
    width: 70px;
    height: 40px;
    font-size: 1rem;
  }
}
</style>