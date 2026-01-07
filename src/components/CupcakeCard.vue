<template>
  <div class="card" :class="{ 'search-result': isSearchResult }">
    <div class="card-image" @click="openProductModal">
      <img :src="cupcake.image" :alt="cupcake.name" />
    </div>
    <div class="card-body">
      <h3 @click="openProductModal" class="product-title">{{ cupcake.name }}</h3>
      
      <!-- Simplified rating: one star + number + reviews -->
      <div class="rating">
        <span class="single-star" :class="{ 'high-rating': cupcake.rating >= 4.0 }">
          ★
        </span>
        <span class="rating-score">{{ cupcake.rating.toFixed(1) }}</span>
        <span class="review-count">({{ cupcake.ratingCount }} reviews)</span>
      </div>
      
      <p class="price">₱{{ cupcake.price.toFixed(2) }}</p>
      <button @click="openProductModal" class="add-btn">Add to Cart</button>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  cupcake: Object,
  isSearchResult: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['openModal'])

const openProductModal = (event) => {
  if (event) {
    event.stopPropagation()
  }
  emit('openModal', props.cupcake)
}
</script>

<style scoped>
.card {
  background: var(--card-bg);
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0,0,0,0.08);
  transition: transform 0.3s ease;
}

.card:hover {
  transform: translateY(-8px);
}

.card-image {
  cursor: pointer;
  height: 250px;
  overflow: hidden;
}

.card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.card-image:hover img {
  transform: scale(1.05);
}

.card-body {
  padding: 1.5rem;
  text-align: center;
}

.product-title {
  margin: 0 0 0.8rem 0;
  font-size: 1.3rem;
  cursor: pointer;
  transition: color 0.3s ease;
  min-height: 3.2em;
  display: flex;
  align-items: center;
  justify-content: center;
}

.product-title:hover {
  color: var(--primary);
}

.rating {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin: 0.8rem 0 1rem;
  font-size: 1.1rem;
  flex-wrap: wrap;
}

.single-star {
  font-size: 2rem;
  color: #e0e0e0;
}

.high-rating {
  color: #ffb84d;
}

.rating-score {
  font-weight: bold;
  color: var(--text);
}

.review-count {
  color: var(--text-light);
  font-size: 0.95rem;
}

.price {
  font-size: 1.4rem;
  font-weight: 600;
  color: var(--primary-dark);
  margin: 0.5rem 0;
}

.add-btn {
  background: var(--primary);
  color: white;
  width: 100%;
  border-radius: 30px;
  padding: 0.8rem;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.3s ease;
  margin-top: 0.5rem;
}

.add-btn:hover {
  background: var(--primary-dark);
  transform: translateY(-2px);
}

.card.search-result .card-image {
  height: 180px;
}

.card.search-result .card-body {
  padding: 1.25rem;
}

.card.search-result .product-title {
  font-size: 1.15rem;
  margin-bottom: 0.6rem;
  min-height: 2.8em;
}

.card.search-result .rating {
  margin: 0.6rem 0 0.8rem;
  font-size: 1rem;
}

.card.search-result .single-star {
  font-size: 1.6rem;
}

.card.search-result .price {
  font-size: 1.2rem;
  margin: 0.4rem 0 0.8rem;
}

.card.search-result .add-btn {
  padding: 0.7rem;
  font-size: 0.95rem;
}

@media (max-width: 768px) {
  .card-image {
    height: 200px;
  }
  
  .card.search-result .card-image {
    height: 140px;
  }
}
</style>