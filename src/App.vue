<template>
  <div>
    <Navbar />
    <main>
      <router-view v-slot="{ Component }">
        <!-- Add a wrapper div inside transition -->
        <transition name="fade" mode="out-in">
          <div :key="$route.path">  <!-- Add key based on route -->
            <component :is="Component" />
          </div>
        </transition>
      </router-view>
    </main>
    <Footer />
  </div>
</template>

<script setup>
</script>

<style>
/* Global styles */
:root {
  --primary: #ff9ec5;
  --primary-light: #ffcfe0;
  --primary-dark: #ff6ba3;
  --accent: #ffb347;
  --text-light: #666;
  --card-bg: #fff;
  --border: #eee;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #333;
  line-height: 1.6;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

/* Simple fade transition */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}

main {
  min-height: calc(100vh - 160px);
}

/* Ensure router view takes full height */
.router-view-container {
  min-height: 100%;
}
</style>