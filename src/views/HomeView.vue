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
</template>

<script setup>
import { ref } from 'vue'
import { cupcakes } from '../data/cupcakes'
import CupcakeCard from '../components/CupcakeCard.vue'
import ProductModal from '../components/ProductModal.vue'

const featured = cupcakes.slice(0, 4)
const showModal = ref(false)
const selectedCupcake = ref(null)

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
  console.log(`Added ${quantity} of product ${id} to cart`)
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
}
.hero p {
  font-size: 1.4rem;
  max-width: 600px;
  margin: 0 auto 2rem;
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
@media (max-width: 768px) {
  .hero h1 {
    font-size: 2.5rem;
  }
  .hero-buttons {
    flex-direction: column;
    align-items: center;
  }
}
</style>