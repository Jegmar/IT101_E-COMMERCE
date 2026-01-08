<template>
  <!-- Main container with proper structure -->
  <div id="app">
    <Header />
    <main class="main-content">
      <router-view /> <!-- This is where your pages render -->
    </main>
    <Footer />
  </div>
</template>

<script>
import Header from './components/Navbar.vue'
import Footer from './components/Footer.vue'

export default {
  components: { Header, Footer }
}
</script>

<style>
/* Reset and base styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
}
</style>