<template>
  <footer class="footer">
    <div class="container footer-content">
      <!-- About Us -->
      <div class="footer-column">
        <h3>About Us</h3>
        <p>
          Sweet Bites is a cozy cupcake shop dedicated to bringing joy through freshly baked, handcrafted cupcakes made with love and the finest ingredients every day.
        </p>
        <p class="tagline">Your happiness is our sweetest reward! 🧁</p>
      </div>

      <!-- Contact Info -->
      <div class="footer-column">
        <h3>Contact Us</h3>
        <p><i class="pi pi-map-marker"></i> 123 Bakery Lane<br>Sweetville, CA 90210</p>
        <p><i class="pi pi-phone"></i> (555) 123-4567</p>
        <p><i class="pi pi-envelope"></i> hello@sweetbites.com</p>
      </div>

      <!-- Social Media Icons -->
      <div class="footer-column social-links">
        <h3>Follow Us</h3>
        <div class="icons">
          <a href="#" aria-label="Facebook" class="social-icon">
            <i class="pi pi-facebook"></i>
          </a>
          <a href="#" aria-label="Instagram" class="social-icon">
            <i class="pi pi-instagram"></i>
          </a>
          <a href="#" aria-label="Twitter" class="social-icon">
            <i class="pi pi-twitter"></i>
          </a>
        </div>
      </div>
    </div>

    <!-- Darker pink copyright strip -->
    <div class="copyright-strip">
      <p class="copyright">&copy; 2026 Sweet Bites Cupcake Shop. All rights reserved.</p>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background: var(--primary);
  color: white;
  padding: 4rem 0 0;
  margin-top: 5rem;
}

.footer-content {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 3rem;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.footer-column h3 {
  font-size: 1.6rem;
  margin-bottom: 1.2rem;
  color: white;
}

.footer-column p {
  font-size: 1rem;
  line-height: 1.6;
  opacity: 0.9;
  margin-bottom: 0.8rem;
}

.tagline {
  font-style: italic;
  margin-top: 1rem;
  opacity: 0.8;
}

.footer-column i {
  margin-right: 0.8rem;
  font-size: 1.1rem;
}

.social-links {
  text-align: right;
}

.icons {
  display: flex;
  gap: 1.5rem;
  justify-content: flex-end;
}

.social-icon {
  color: white;
  font-size: 2rem;
  opacity: 0.9;
  transition: all 0.3s ease;
}

.social-icon:hover {
  opacity: 1;
  transform: translateY(-4px);
}

/* Darker pink copyright area */
.copyright-strip {
  background: var(--primary-dark); /* Darker pink */
  padding: 1.5rem 0;
  margin-top: 3rem;
}

.copyright {
  text-align: center;
  margin: 0;
  opacity: 0.9;
  font-size: 0.9rem;
}

/* Responsive */
@media (max-width: 992px) {
  .footer-content {
    grid-template-columns: 1fr 1fr;
  }
  .social-links {
    grid-column: 1 / -1;
    text-align: center;
  }
  .icons {
    justify-content: center;
  }
}

@media (max-width: 768px) {
  .footer-content {
    grid-template-columns: 1fr;
    text-align: center;
    gap: 2.5rem;
  }
  .social-links {
    text-align: center;
  }
  .icons {
    justify-content: center;
  }
}
</style>