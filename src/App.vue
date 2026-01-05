<template>
  <Navbar />
  <main>
    <router-view />
  </main>
  <Footer />
</template>

<script setup>
</script>

<style scoped>
main {
  min-height: calc(100vh - 160px);
}
</style>