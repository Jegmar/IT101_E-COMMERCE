<template>
  <div class="card">
    <div class="card-image" @click="openProductModal">
      <img :src="cupcake.image" :alt="cupcake.name" />
    </div>
    <div class="card-body">
      <h3 @click="openProductModal" class="product-title">{{ cupcake.name }}</h3>
      <p class="price">${{ cupcake.price.toFixed(2) }}</p>
      <button @click="openProductModal" class="add-btn">Add to Cart</button>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  cupcake: Object
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
}
.card-image img {
  aspect-ratio: 1/1;
  object-fit: cover;
  width: 100%;
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
  margin-bottom: 0.5rem;
  font-size: 1.3rem;
  cursor: pointer;
  transition: color 0.3s ease;
}
.product-title:hover {
  color: var(--primary);
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
}
.add-btn:hover {
  background: var(--primary-dark);
  transform: translateY(-2px);
}
</style>