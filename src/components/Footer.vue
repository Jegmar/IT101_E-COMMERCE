<template>
  <footer class="footer">
    <div class="container footer-content">
      <!-- About Us -->
      <div class="footer-column">
        <h3>About Sweet Bites</h3>
        <p>
          A cozy cupcake shop dedicated to bringing joy through freshly baked, handcrafted cupcakes made with love and the finest ingredients every day.
        </p>
        <p class="tagline">Your happiness is our sweetest reward! 🧁</p>
      </div>

      <!-- Quick Links -->
      <div class="footer-column">
        <h3>Quick Links</h3>
        <ul class="quick-links">
          <li><router-link to="/">Home</router-link></li>
          <li><router-link to="/products">Menu</router-link></li>
          <li><router-link to="/order-confirmation">My Orders</router-link></li>
          <li><router-link to="/cart">Cart</router-link></li>
          <li><router-link to="/">About Us</router-link></li>
          <li><router-link to="/">Contact</router-link></li>
        </ul>
      </div>

      <!-- Contact Info -->
      <div class="footer-column">
        <h3>Contact Us</h3>
        <p><i class="pi pi-map-marker"></i> 123 Bakery Lane<br>Sweetville, CA 90210</p>
        <p><i class="pi pi-phone"></i> (555) 123-4567</p>
        <p><i class="pi pi-envelope"></i> hello@sweetbites.com</p>
      </div>

      <!-- Newsletter & Social -->
      <div class="footer-column newsletter-social">

        <div class="social-links">
          <h3>Follow Us</h3>
          <div class="icons">
            <a href="#" aria-label="Facebook" class="social-icon"><i class="pi pi-facebook"></i></a>
            <a href="#" aria-label="Instagram" class="social-icon"><i class="pi pi-instagram"></i></a>
            <a href="#" aria-label="TikTok" class="social-icon"><i class="pi pi-tiktok"></i></a>
            <a href="#" aria-label="X/Twitter" class="social-icon"><i class="pi pi-twitter"></i></a>
          </div>
        </div>
      </div>
    </div>

    <!-- Clean copyright strip -->
    <div class="copyright-strip">
      <p>
        &copy; 2026 Sweet Bites Cupcake Shop. All rights reserved.
        <span class="legal-links">
          <router-link to="/">Privacy Policy</router-link> |
          <router-link to="/">Terms of Service</router-link>
        </span>
      </p>
    </div>
  </footer>
</template>


<style scoped>
.footer {
  background: var(--primary); /* Solid pink — clean and premium */
  color: white;
  padding: 5rem 0 0;
  margin-top: 6rem;
}

.footer-content {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 3rem;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

.footer-column h3 {
  font-size: 1.7rem;
  margin-bottom: 1.5rem;
  position: relative;
  display: inline-block;
}

.footer-column h3::after {
  content: '';
  position: absolute;
  bottom: -8px;
  left: 0;
  width: 50px;
  height: 3px;
  background: rgb(255, 191, 73); /* Orange underline for pop */
  border-radius: 2px;
}

.footer-column p {
  font-size: 1rem;
  line-height: 1.7;
  opacity: 0.92;
  margin-bottom: 1rem;
}

.tagline {
  font-style: italic;
  font-size: 1.1rem;
  opacity: 0.85;
  margin-top: 1.2rem;
}

.quick-links {
  list-style: none;
  padding: 0;
  margin: 0;
}

.quick-links li {
  margin-bottom: 0.8rem;
}

.quick-links a {
  color: white;
  text-decoration: none;
  opacity: 0.9;
  transition: all 0.3s ease;
}

.quick-links a:hover {
  opacity: 1;
  padding-left: 6px;
  color:white;
}

.footer-column i {
  margin-right: 0.8rem;
  font-size: 1.1rem;
}

/* Newsletter */
.newsletter-form {
  display: flex;
  margin-top: 1rem;
  gap: 0.8rem;
  flex-wrap: wrap;
}

.newsletter-form input {
  flex: 1;
  min-width: 200px;
  padding: 0.9rem 1.2rem;
  border: none;
  border-radius: 50px;
  font-size: 1rem;
  background: rgba(255, 255, 255, 0.95);
}

.newsletter-form button {
  padding: 0.9rem 1.8rem;
  background: var(--accent);
  color: white;
  border: none;
  border-radius: 50px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.newsletter-form button:hover {
  background: #ffffff;
  transform: translateY(-2px);
}

/* Social */
.icons {
  display: flex;
  gap: 1.2rem;
  margin-top: 1rem;
}

.social-icon {
  color: white;
  font-size: 1.5rem;
  opacity: 0.9;
  transition: all 0.3s ease;
}
.social-icon:hover {
  opacity: 1;
  transform: translateY(-5px) scale(1.1);
  color: white;
}

/* Copyright strip - clean and elegant */
.copyright-strip {
  background: var(--primary-dark);
  padding: 2rem 0;
  margin-top: 4rem;
  text-align: center;
  font-size: 0.95rem;
  opacity: 0.9;
  border-top: 2px solid var(--accent); /* Subtle orange separator */
}

.legal-links a {
  color: white;
  text-decoration: none;
  margin: 0 0.8rem;
  opacity: 0.8;
  transition: opacity 0.3s;
}

.legal-links a:hover {
  opacity: 1;
  text-decoration: underline;
}

/* Responsive */
@media (max-width: 1024px) {
  .footer-content {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .footer-content {
    grid-template-columns: 1fr;
    text-align: center;
    gap: 3rem;
  }

  .newsletter-form {
    flex-direction: column;
  }

  .newsletter-form input,
  .newsletter-form button {
    width: 100%;
  }

  .icons {
    justify-content: center;
  }

  .footer-column h3::after {
    left: 50%;
    transform: translateX(-50%);
  }
}
</style>