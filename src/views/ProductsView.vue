<template>
  <section class="products-page">
    <div class="container">
      <router-link to="/" class="back-btn">
        <i class="pi pi-arrow-left"></i>
      </router-link>
      
      <h1>Our Cupcake Menu</h1>
      <p class="subtitle">Choose from our delicious selection of freshly baked cupcakes</p>
      
      <div class="grid">
        <CupcakeCard 
          v-for="cupcake in cupcakes" 
          :key="cupcake.id" 
          :cupcake="cupcake"
          @open-modal="openModal"
        />
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
import { ref } from 'vue'
import { cupcakes } from '../data/cupcakes'
import CupcakeCard from '../components/CupcakeCard.vue'
import ProductModal from '../components/ProductModal.vue'

const showModal = ref(false)
const selectedCupcake = ref(null)

const openModal = (cupcake) => {
  selectedCupcake.value = cupcake
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
  selectedCupcake.value = null
}

const handleAddToCart = ({ id, quantity }) => {
  // You can add any additional logic here if needed
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
  text-decoration: underline;
}

h1 {
  text-align: center;
  margin-bottom: 1rem;
  font-size: 3rem;
  padding: 0 80px; /* Add padding to account for the back button */
}

.subtitle {
  text-align: center;
  margin-bottom: 3rem;
  font-size: 1.2rem;
  color: var(--text-light);
  padding: 0 1rem;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2.5rem;
  justify-items: center; /* Centers items horizontally */
}

/* Media query for smaller screens */
@media (max-width: 768px) {
  h1 {
    padding: 0 70px;
    font-size: 2.5rem;
  }
  
  .back-btn {
    left: 1rem;
  }
}

@media (max-width: 600px) {
  h1 {
    padding-top: 70px; /* Move title down to avoid overlap */
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
  
  .grid {
    grid-template-columns: 1fr;
    justify-items: center;
  }
}
</style>