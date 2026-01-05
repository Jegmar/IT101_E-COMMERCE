<template>
  <section class="products-page">
    <div class="container">
      <h1>Our Cupcake Menu</h1>
      <p class="subtitle">Choose from our delicious selection of freshly baked cupcakes</p>
      <div class="grid">
        <CupcakeCard v-for="cupcake in cupcakes" :key="cupcake.id" :cupcake="cupcake" />
      </div>
    </div>
  </section>
</template>

<script setup>
import { cupcakes } from '../data/cupcakes'
import CupcakeCard from '../components/CupcakeCard.vue'
</script>

<style scoped>
.products-page {
  padding: 4rem 0;
}
h1 {
  text-align: center;
  margin-bottom: 1rem;
  font-size: 3rem;
}
.subtitle {
  text-align: center;
  margin-bottom: 3rem;
  font-size: 1.2rem;
  color: var(--text-light);
}
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2.5rem;
}
</style>