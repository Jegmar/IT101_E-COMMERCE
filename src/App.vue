<!-- App.vue - COMPLETE REPLACEMENT -->
<template>
  <div id="app">
    <header>
      <router-link to="/">Home</router-link> |
      <router-link to="/products">Menu</router-link> |
      <router-link to="/cart">Cart</router-link>
    </header>
    
    <main style="padding: 2rem;">
      <router-view />
    </main>
    
    <footer style="text-align: center; padding: 2rem;">
      Sweet Bites Cupcake Shop
    </footer>
  </div>
</template>

<script setup>
// Empty - no imports
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: sans-serif;
}

#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

main {
  flex: 1;
}

a {
  color: #ff69a8;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

header {
  background: white;
  padding: 1rem;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}
</style>