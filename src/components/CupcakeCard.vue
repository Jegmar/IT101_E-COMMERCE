<template>
  <div class="card">
    <router-link :to="{ name: 'product-detail', params: { id: cupcake.id } }">
      <img :src="cupcake.image" :alt="cupcake.name" />
    </router-link>
    <div class="card-body">
      <h3>{{ cupcake.name }}</h3>
      <p class="price">${{ cupcake.price.toFixed(2) }}</p>
      <button @click="addToCart" class="add-btn">Add to Cart</button>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'
import { useCartStore } from '../stores/cart'

const props = defineProps({
  cupcake: Object
})

const cartStore = useCartStore()

const addToCart = () => {
  cartStore.addItem(props.cupcake.id)
  // Simple toast could be added, but keeping minimal
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
.card img {
  aspect-ratio: 1/1;
  object-fit: cover;
}
.card-body {
  padding: 1.5rem;
  text-align: center;
}
.card-body h3 {
  margin-bottom: 0.5rem;
  font-size: 1.3rem;
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
}
.add-btn:hover {
  background: var(--primary-dark);
}
</style>