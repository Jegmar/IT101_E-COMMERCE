<template>
  <section class="hero">
    <div class="container hero-content">
      <h1>Freshly Baked Cupcakes<br>Made with Love</h1>
      <p>Indulge in our handcrafted delights – perfect for any occasion!</p>
      <div class="hero-buttons">
        <a href="#featured-cupcakes" class="btn-primary btn-ripple" @click.prevent="scrollToFeatured">Shop Now</a>
        <router-link to="/products" class="btn-secondary btn-ripple">
          View Menu
        </router-link>
      </div>
    </div>
  </section>

  <section id="featured-cupcakes" class="featured">
    <div class="container">
      <h2>Featured Cupcakes</h2>
      <div class="grid">
        <CupcakeCard 
          v-for="cupcake in featured" 
          :key="cupcake.id" 
          :cupcake="cupcake"
          @open-modal="openModal"
        />
      </div>
    </div>
  </section>

  <!-- Product Modal -->
  <ProductModal 
    v-if="showModal"
    :show="showModal"
    :selectedCupcake="selectedCupcake"
    @close="closeModal"
    @add-to-cart="handleAddToCart"
  />

  <!-- Toast Notification -->
  <div v-if="showToast" class="toast-notification" :class="{ 'toast-hide': isToastHiding }">
    <div class="toast-content">
      <i class="pi pi-check-circle toast-icon"></i>
      <div class="toast-message">
        <p class="toast-title">Added to Cart!</p>
        <p class="toast-desc">{{ toastMessage }}</p>
      </div>
      <button @click="hideToast" class="toast-close">
        <i class="pi pi-times"></i>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { cupcakes } from '../data/cupcakes'
import CupcakeCard from '../components/CupcakeCard.vue'
import ProductModal from '../components/ProductModal.vue'
import { useCartStore } from '../stores/cart' // Import cart store

const cartStore = useCartStore() // Get cart store
const featured = cupcakes.slice(0, 6)
const showModal = ref(false)
const selectedCupcake = ref(null)

// Toast notification state
const showToast = ref(false)
const isToastHiding = ref(false)
const toastMessage = ref('')
let toastTimeout = null

const scrollToFeatured = () => {
  const featuredSection = document.getElementById('featured-cupcakes')
  if (featuredSection) {
    featuredSection.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    })
  }
}

const openModal = (cupcake) => {
  selectedCupcake.value = cupcake
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
  selectedCupcake.value = null
}

const handleAddToCart = ({ id, quantity }) => {
  // Actually add item to cart
  cartStore.addItem(id, quantity)
  
  // Show toast notification
  const cupcake = cupcakes.find(c => c.id === id)
  if (cupcake) {
    showToastMessage(`${quantity} × ${cupcake.name} added to cart`)
  }
  console.log(`Added ${quantity} of product ${id} to cart`)
}

const showToastMessage = (message) => {
  // Clear any existing timeout
  if (toastTimeout) {
    clearTimeout(toastTimeout)
    isToastHiding.value = false
  }
  
  // Set message and show toast
  toastMessage.value = message
  showToast.value = true
  
  // Auto-hide after 3 seconds
  toastTimeout = setTimeout(() => {
    hideToast()
  }, 3000)
}

const hideToast = () => {
  // Start hiding animation
  isToastHiding.value = true
  
  // Wait for animation to complete before removing from DOM
  setTimeout(() => {
    showToast.value = false
    isToastHiding.value = false
  }, 300)
}
</script>


<style scoped>
.hero {
  background: linear-gradient(rgba(255,156,201,0.4), rgba(255,156,201,0.4)), url('/src/assets/images/hero.jpg') center/cover no-repeat;
  padding: 8rem 0;
  text-align: center;
  color: white;
}
.hero h1 {
  font-size: 3.5rem;
  margin-bottom: 1rem;
  color: white;
  text-shadow: 0 4px 6px rgba(0, 0, 0, 0.6);
}
.hero p {
  font-size: 1.4rem;
  max-width: 600px;
  margin: 0 auto 2rem;
  text-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
}
.hero-buttons {
  display: flex;
  gap: 1.5rem;
  justify-content: center;
}
.btn-primary {
  background: var(--primary);
  color: white;
  padding: 1rem 2rem;
  border-radius: 50px;
  text-decoration: none;
  font-size: 1.2rem;
  cursor: pointer;
  border: none;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.btn-primary:hover {
  background: var(--primary-dark);
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}
.btn-secondary {
  background: transparent;
  color: white;
  border: 2px solid white;
  padding: 1rem 2rem;
  border-radius: 50px;
  text-decoration: none;
  font-size: 1.2rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.btn-secondary:hover {
  background: rgba(255, 255, 255, 0.1);
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}
.featured {
  padding: 4rem 0;
}
.featured h2 {
  text-align: center;
  margin-bottom: 3rem;
  font-size: 2.5rem;
}
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
}

/* Toast Notification Styles */
.toast-notification {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  background: white;
  border-radius: 12px;
  padding: 1rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  z-index: 9999;
  max-width: 380px;
  animation: toastSlideIn 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border-left: 4px solid #4CAF50;
}

.toast-hide {
  animation: toastSlideOut 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards;
}

@keyframes toastSlideIn {
  from {
    opacity: 0;
    transform: translateX(100%) translateY(0);
  }
  to {
    opacity: 1;
    transform: translateX(0) translateY(0);
  }
}

@keyframes toastSlideOut {
  from {
    opacity: 1;
    transform: translateX(0) translateY(0);
  }
  to {
    opacity: 0;
    transform: translateX(100%) translateY(0);
  }
}

.toast-content {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
}

.toast-icon {
  color: #4CAF50;
  font-size: 1.8rem;
  flex-shrink: 0;
  margin-top: 0.1rem;
}

.toast-message {
  flex: 1;
}

.toast-title {
  font-weight: 600;
  color: #2E7D32;
  margin: 0 0 0.25rem 0;
  font-size: 1.1rem;
}

.toast-desc {
  color: #666;
  margin: 0;
  font-size: 0.95rem;
  line-height: 1.4;
}

.toast-close {
  background: none;
  border: none;
  color: #999;
  font-size: 1rem;
  cursor: pointer;
  padding: 0.25rem;
  border-radius: 50%;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  flex-shrink: 0;
  margin-top: 0.1rem;
}

.toast-close:hover {
  background: #f5f5f5;
  color: #666;
}

/* Responsive adjustments for toast */
@media (max-width: 768px) {
  .hero h1 {
    font-size: 2.5rem;
  }
  .hero-buttons {
    flex-direction: column;
    align-items: center;
  }
  
  .toast-notification {
    bottom: 1rem;
    right: 1rem;
    left: 1rem;
    max-width: none;
  }
  
  @keyframes toastSlideIn {
    from {
      opacity: 0;
      transform: translateY(100%);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @keyframes toastSlideOut {
    from {
      opacity: 1;
      transform: translateY(0);
    }
    to {
      opacity: 0;
      transform: translateY(100%);
    }
  }
}

@media (max-width: 480px) {
  .toast-content {
    gap: 0.75rem;
  }
  
  .toast-icon {
    font-size: 1.5rem;
  }
  
  .toast-title {
    font-size: 1rem;
  }
  
  .toast-desc {
    font-size: 0.9rem;
  }
}
</style>