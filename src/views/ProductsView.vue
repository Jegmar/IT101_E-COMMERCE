<template>
  <section class="products-page">
    <div class="container">
      <router-link to="/" class="back-btn">
        <i class="pi pi-arrow-left"></i>
      </router-link>
      
      <h1>Our Cupcake Menu</h1>
      <p class="subtitle">Choose from our delicious selection of freshly baked cupcakes</p>

      <!-- Full Menu -->
      <!-- <h2 class="section-title full-menu-title">Full Menu</h2> -->
      <div class="grid">
        <CupcakeCard 
          v-for="cupcake in cupcakes" 
          :key="cupcake.id" 
          :cupcake="cupcake"
          @open-modal="openModal"
        />
      </div>

      <!-- Best Sellers Section -->
      <div class="bestsellers-section">
        <h2 class="section-title">Best Sellers ⭐</h2>
        <p class="section-subtitle">Our most loved cupcakes — customers can't get enough!</p>
        <div class="bestsellers-grid">
          <CupcakeCard 
            v-for="cupcake in bestSellers" 
            :key="cupcake.id" 
            :cupcake="cupcake"
            @open-modal="openModal"
          />
        </div>
      </div>

    </div>
    
    <!-- Product Modal -->
    <ProductModal 
      v-if="showModal"
      :show="showModal"
      :selectedCupcake="selectedCupcake"
      @close="closeModal"
      @add-to-cart="handleAddToCart"
    />
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import { cupcakes } from '../data/cupcakes'
import CupcakeCard from '../components/CupcakeCard.vue'
import ProductModal from '../components/ProductModal.vue'

const showModal = ref(false)
const selectedCupcake = ref(null)

// Define which cupcakes are best sellers (choose 3 IDs from your data)
const bestSellerIds = [2, 8, 5] // e.g., Vanilla, Red Velvet, Lemon — change as you like!

const bestSellers = computed(() => 
  cupcakes.filter(cupcake => bestSellerIds.includes(cupcake.id))
)

const openModal = (cupcake) => {
  selectedCupcake.value = cupcake
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
  selectedCupcake.value = null
}

const handleAddToCart = ({ id, quantity }) => {
  console.log(`Added ${quantity} of product ${id} to cart`)
}
</script>

<style scoped>
.products-page {
  padding: 2rem 0;
  min-height: 100vh;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
  position: relative;
}

.back-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 2rem;
  color: var(--primary-dark);
  text-decoration: none;
  padding: 0.5rem;
  transition: all 0.3s ease;
  height: 60px;
  width: 60px;
  position: absolute;
  left: 1.5rem;
  top: 0;
}

.back-btn:hover {
  color: var(--primary);
}

h1 {
  text-align: center;
  margin-bottom: 1rem;
  font-size: 3rem;
  padding: 0 80px;
}

.subtitle {
  text-align: center;
  margin-bottom: 4rem;
  font-size: 1.2rem;
  color: var(--text-light);
}

/* Best Sellers Section */
.bestsellers-section {
  margin-bottom: 5rem;
}

.section-title {
  text-align: center;
  font-size: 2.5rem;
  color: var(--primary-dark);
  margin-top: 5rem;
  margin-bottom: 1rem;
  padding-top: 2rem;
  font-family: 'Pacifico', cursive;
  border-top: 1.5px solid #c8c8c8;
}

.section-subtitle {
  text-align: center;
  font-size: 1.3rem;
  color: var(--text-light);
  margin-bottom: 3rem;
  font-style: italic;
}

.bestsellers-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2.5rem;
  justify-items: center;
  margin-bottom: 2rem;
}

.full-menu-title {
  margin-top: 3rem;
  margin-bottom: 2rem;
}

/* Full Menu Grid */
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2.5rem;
  justify-items: center;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  h1 {
    padding: 0 70px;
    font-size: 2.5rem;
  }
  
  .back-btn {
    left: 1rem;
  }
  
  .section-title {
    font-size: 2.2rem;
  }
}

@media (max-width: 600px) {
  h1 {
    padding-top: 70px;
    padding-left: 0;
    padding-right: 0;
  }
  
  .back-btn {
    position: relative;
    left: 0;
    top: 0;
    margin: 0 auto 1.5rem;
    display: inline-flex;
  }
  
  .container {
    text-align: center;
  }
}

@media (max-width: 480px) {
  h1 {
    font-size: 2rem;
    padding-top: 60px;
  }
  
  .back-btn {
    font-size: 1.8rem;
    height: 50px;
    width: 50px;
  }
}
</style>