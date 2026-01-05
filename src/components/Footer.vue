<template>
  <footer class="footer">
    <div class="container footer-content">
      <div class="footer-info">
        <h3>Sweet Bites Cupcake Shop</h3>
        <p>Freshly baked cupcakes made with love every day.</p>
        <p>123 Bakery Lane, Sweetville, CA 90210</p>
      </div>
      <div class="footer-links">
        <a href="#" aria-label="Facebook">Facebook</a>
        <a href="#" aria-label="Instagram">Instagram</a>
        <a href="#" aria-label="Twitter">Twitter</a>
      </div>
      <p class="copyright">&copy; 2026 Sweet Bites. All rights reserved.</p>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background: var(--primary);
  color: white;
  padding: 3rem 0 1.5rem;
  margin-top: 4rem;
}
.footer-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  text-align: left;
}
.footer-info h3 {
  font-size: 1.8rem;
  margin-bottom: 1rem;
}
.footer-links {
  display: flex;
  gap: 1.5rem;
  justify-content: flex-end;
}
.footer-links a {
  color: white;
  text-decoration: none;
  font-size: 1.2rem;
}
.copyright {
  grid-column: 1 / -1;
  text-align: center;
  margin-top: 2rem;
  opacity: 0.8;
}
@media (max-width: 768px) {
  .footer-content {
    grid-template-columns: 1fr;
    text-align: center;
  }
  .footer-links {
    justify-content: center;
  }
}
</style>