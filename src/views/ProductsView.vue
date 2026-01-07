<template>
  <section class="products-page">
    <div class="container">
      <router-link to="/" class="back-btn">
        <i class="pi pi-arrow-left"></i>
      </router-link>
      
      <h1>Our Cupcake Menu</h1>
      <p class="subtitle">Choose from our delicious selection of freshly baked cupcakes</p>

      <!-- Search Bar -->
      <div class="search-container">
        <div class="search-bar">
          <i class="pi pi-search"></i>
          <input 
            type="text" 
            v-model="searchQuery" 
            placeholder="Search cupcakes..." 
            class="search-input"
            @input="handleSearch"
          />
          <button 
            v-if="searchQuery" 
            @click="clearSearch" 
            class="clear-search-btn"
          >
            <i class="pi pi-times"></i>
          </button>
        </div>
        <div v-if="searchQuery" class="search-results-info">
          <p>Found {{ filteredCupcakes.length }} result{{ filteredCupcakes.length !== 1 ? 's' : '' }} for "{{ searchQuery }}"</p>
        </div>
      </div>

      <!-- Full Menu -->
      <div v-if="!searchQuery || filteredCupcakes.length > 0" class="grid" :class="{ 'search-mode': searchQuery }">
        <CupcakeCard 
          v-for="cupcake in displayedCupcakes" 
          :key="cupcake.id" 
          :cupcake="cupcake"
          :is-search-result="!!searchQuery"
          @open-modal="openModal"
        />
      </div>

      <!-- No Results Message -->
      <div v-if="searchQuery && filteredCupcakes.length === 0" class="no-results">
        <i class="pi pi-search"></i>
        <h3>No cupcakes found</h3>
        <p>Try searching for something else or browse our full menu</p>
        <button @click="clearSearch" class="browse-btn">
          Browse All Cupcakes
        </button>
      </div>

      <!-- Best Sellers Section (only show when not searching) -->
      <div v-if="!searchQuery" class="bestsellers-section">
        <h2 class="section-title">Best Sellers ⭐</h2>
        <p class="section-subtitle">Our most loved cupcakes — customers can't get enough!</p>
        <div class="bestsellers-grid">
          <CupcakeCard 
            v-for="cupcake in bestSellers" 
            :key="cupcake.id" 
            :cupcake="cupcake"
            :is-search-result="false"
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
const searchQuery = ref('')

// Define which cupcakes are best sellers (choose 3 IDs from your data)
const bestSellerIds = [2, 8, 5] // e.g., Vanilla, Red Velvet, Lemon — change as you like!

const bestSellers = computed(() => 
  cupcakes.filter(cupcake => bestSellerIds.includes(cupcake.id))
)

// Filter cupcakes based on search query
const filteredCupcakes = computed(() => {
  if (!searchQuery.value) return cupcakes
  
  const query = searchQuery.value.toLowerCase()
  return cupcakes.filter(cupcake => 
    cupcake.name.toLowerCase().includes(query) ||
    cupcake.description.toLowerCase().includes(query) ||
    cupcake.flavors?.some(flavor => flavor.toLowerCase().includes(query))
  )
})

// Determine which cupcakes to display
const displayedCupcakes = computed(() => {
  return searchQuery.value ? filteredCupcakes.value : cupcakes
})

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

const handleSearch = () => {
  // Search is already reactive due to v-model
}

const clearSearch = () => {
  searchQuery.value = ''
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
  margin-bottom: 2.5rem;
  font-size: 1.2rem;
  color: var(--text-light);
}

/* Search Bar Styles */
.search-container {
  margin-bottom: 3rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.search-bar {
  position: relative;
  display: flex;
  align-items: center;
  background: white;
  border-radius: 50px;
  padding: 0.75rem 1.5rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  border: 2px solid transparent;
  transition: all 0.3s ease;
}

.search-bar:focus-within {
  border-color: var(--primary);
  box-shadow: 0 6px 20px rgba(255, 158, 197, 0.2);
}

.search-bar i {
  color: var(--text-light);
  font-size: 1.2rem;
  margin-right: 1rem;
}

.search-input {
  flex: 1;
  border: none;
  outline: none;
  font-size: 1.1rem;
  padding: 0.5rem 0;
  background: transparent;
  color: #333;
}

.search-input::placeholder {
  color: #aaa;
}

.clear-search-btn {
  background: none;
  border: none;
  color: #999;
  font-size: 1rem;
  cursor: pointer;
  padding: 0.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  border-radius: 50%;
  width: 32px;
  height: 32px;
}

.clear-search-btn:hover {
  background: #f5f5f5;
  color: #666;
}

.search-results-info {
  text-align: center;
  margin-top: 1rem;
  color: var(--text-light);
  font-size: 0.95rem;
}

/* Search Mode Grid - make cards more compact */
.grid.search-mode {
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
}

/* No Results Message */
.no-results {
  text-align: center;
  padding: 4rem 1rem;
  background: linear-gradient(to bottom, rgba(255, 158, 197, 0.05), transparent);
  border-radius: 20px;
  margin: 2rem 0;
}

.no-results i {
  font-size: 3.5rem;
  color: var(--text-light);
  margin-bottom: 1.5rem;
  opacity: 0.7;
}

.no-results h3 {
  font-size: 1.8rem;
  color: var(--primary-dark);
  margin-bottom: 0.75rem;
}

.no-results p {
  color: var(--text-light);
  font-size: 1.1rem;
  margin-bottom: 2rem;
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
}

.browse-btn {
  background: var(--primary);
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 50px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(255, 158, 197, 0.3);
}

.browse-btn:hover {
  background: var(--primary-dark);
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(255, 158, 197, 0.4);
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

/* Full Menu Grid */
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2.5rem;
  justify-items: center;
  margin-bottom: 4rem;
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
  
  .search-container {
    margin-bottom: 2.5rem;
  }
  
  .search-bar {
    padding: 0.6rem 1.25rem;
  }
  
  .grid.search-mode {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.75rem;
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
  
  .search-container {
    margin-top: 1rem;
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
  
  .section-title {
    font-size: 1.8rem;
  }
  
  .no-results i {
    font-size: 2.5rem;
  }
  
  .no-results h3 {
    font-size: 1.5rem;
  }
  
  .grid.search-mode {
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 1.5rem;
  }
}
</style>