<template>
  <section class="confirmation-page">
    <div class="container">
      <!-- Page title with pink handwritten gradient -->
      <h1 class="page-title">My Orders</h1>

      <!-- Confirmed order view (unchanged) -->
      <div v-if="latestOrder" class="confirmation-card">
        <div class="success-icon">
          <i class="pi pi-check-circle"></i>
        </div>
        <h1>Order Confirmed!</h1>
        <p class="subtitle">Thank you for your order, {{ latestOrder.name || 'customer' }}! 🎉</p>

        <div class="order-details-card">
          <div class="detail-row">
            <span>Order ID:</span>
            <strong>#{{ latestOrder.orderId || '—' }}</strong>
          </div>
          <div class="detail-row">
            <span>Total Paid:</span>
            <strong>₱{{ latestOrder.total?.toFixed(2) || '0.00' }}</strong>
          </div>
          <div class="detail-row">
            <span>Delivery To:</span>
            <strong>{{ latestOrder.name || '—' }}</strong>
          </div>
          <div class="detail-row">
            <span>Contact:</span>
            <strong>{{ latestOrder.mobile || '—' }}</strong>
          </div>
        </div>

        <div class="status-section">
          <h2 class="status-title">Current Status</h2>
          <div class="progress-tracker">
            <div class="step active">
              <div class="circle">🧁</div>
              <p>Preparing Your<br>Cupcakes</p>
            </div>
            <div class="step">
              <div class="circle">🚚</div>
              <p>Out for<br>Delivery</p>
            </div>
            <div class="step">
              <div class="circle_delivered">🏠</div>
              <p>Delivered</p>
            </div>
          </div>
        </div>

        <button @click="handleOrderReceived" class="got-it-btn">Order Received</button>
      </div>

      <!-- Empty state - matching your new reference design -->
      <div v-else class="empty-orders">
        <!-- Cute empty icon -->
        <div class="empty-icon">
          <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <!-- Simple empty box/tray with a small cupcake hint -->
            <rect x="15" y="30" width="70" height="50" rx="10" fill="none" stroke="#999" stroke-width="6"/>
            <line x1="15" y1="50" x2="85" y2="50" stroke="#ffb347" stroke-width="8" stroke-linecap="round"/>
            <circle cx="30" cy="90" r="8" fill="#999"/>
            <circle cx="70" cy="90" r="8" fill="#999"/>
          </svg>
        </div>

        <h2 class="empty-title">Your Order History Is Currently Empty!</h2>

        <p class="empty-subtitle">
          No orders yet? Let’s change that with some yummy cupcakes!<br>
          Check out all the tasty choices on our "Menu" page.
        </p>

        <router-link to="/products" class="return-btn">Return To Shop</router-link>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { useOrderStore } from '../stores/order'

const orderStore = useOrderStore()
const latestOrder = computed(() => orderStore.latestOrder)
</script>

<style scoped>
.confirmation-page {
  padding: 4rem 0;
  min-height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: var(--bg);
}

.container {
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
}

/* Pink handwritten title */
.page-title {
  text-align: center;
  margin-bottom: 3rem;
  font-size: 2.5rem;
  color: var(--primary-dark);
}

/* Empty state */
.empty-orders {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  padding: 4rem 0;
  max-width: 600px;
  margin: 0 auto;
}

.empty-icon {
  width: 120px;
  height: 120px;
  color: #5f5f5f;
}

.empty-icon svg {
  width: 100%;
  height: 100%;
}

/* Big pink cursive heading */
.empty-title {
  font-size: 2.4rem;
  font-weight: 700;
  color: var(--primary-dark);
  margin: 0;
  line-height: 1.2;
}

/* Subtitle */
.empty-subtitle {
  font-size: 1.1rem;
  color: var(--text-light);
  line-height: 1.6;
  margin: 0 0 1.5rem 0;
}

/* Orange pill button */
.return-btn {
  background: #ffb347;
  color: white;
  padding: 1rem 3.5rem;
  border-radius: 50px;
  text-decoration: none;
  font-size: 1.3rem;
  font-weight: 600;
  transition: all 0.3s ease;
  box-shadow: 0 6px 15px rgba(255, 179, 71, 0.25);
  margin-top: 1.5rem;
}

.return-btn:hover {
  background: #ff9d1a;
  transform: translateY(-3px);
  box-shadow: 0 10px 25px rgba(255, 179, 71, 0.35);
}

/* Keep all your existing confirmed order styles below */
.confirmation-card {
  max-width: 600px;
  margin: 0 auto;
  background: white;
  padding: 3rem;
  border-radius: 20px;
  box-shadow: 0 15px 35px rgba(0,0,0,0.15);
}

.success-icon {
  font-size: 4rem;
  color: #4CAF50;
  margin-bottom: 1rem;
}

.confirmation-card h1 {
  font-size: 2.5rem;
  color: var(--primary-dark);
  margin: 2rem 0;
}

.subtitle {
  font-size: 1.2rem;
  color: #555;
  margin: 1rem 0;
}

.order-details-card {
  margin: 2rem 0;
  text-align: left;
}

.status-section {
  margin: 3rem 0;
  text-align: center;
}

.status-title {
  font-family: 'Pacifico', cursive;
  font-size: 2.2rem;
  background: linear-gradient(90deg, var(--primary), var(--primary-dark));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-top: 5rem;
  margin-bottom: 3rem;
}

.progress-tracker {
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  max-width: 700px;
  margin: 0 auto;
}

.progress-tracker::before {
  content: '';
  position: absolute;
  top: 30px;
  left: 0;
  right: 0;
  height: 4px;
  background: #e0e0e0;
  z-index: 0;
}

.progress-tracker::after {
  content: '';
  position: absolute;
  top: 30px;
  left: 0;
  height: 4px;
  background: var(--accent);
  width: 35%;
  transition: width 0.6s ease;
  z-index: 1;
}

.step {
  flex: 1;
  text-align: center;
  position: relative;
  z-index: 2;
}

.circle,
.circle_delivered {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: #e0e0e0;
  margin: 0 auto 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.8rem;
  color: white;
  transition: all 0.4s ease;
}

.active .circle {
  background: var(--accent);
  transform: scale(1.15);
  box-shadow: 0 0 20px rgba(255, 184, 77, 0.6);
  animation: pulse 2s infinite;
}

.step p {
  font-size: 1rem;
  color: var(--text-light);
  margin: 0;
  line-height: 1.3;
}

.active p {
  color: var(--text);
  font-weight: 600;
}

@keyframes pulse {
  0%, 100% { transform: scale(1.15); }
  50% { transform: scale(1.25); }
}

.got-it-btn {
  background: #cccccc;
  color: #666666;
  cursor: not-allowed;
  opacity: 0.6;
  width: 100%;
  padding: 1.2rem;
  font-size: 1.2rem;
  border: none;
  border-radius: 12px;
  transition: all 0.3s ease;
}

/* Responsive */
@media (max-width: 768px) {
  .page-title {
    font-size: 2.8rem;
  }

  .empty-title {
    font-size: 2.4rem;
  }

  .empty-icon {
    width: 100px;
    height: 100px;
  }

  .return-btn {
    padding: 1rem 3rem;
    font-size: 1.2rem;
  }
}

@media (max-width: 480px) {
  .page-title {
    font-size: 2.4rem;
  }

  .empty-title {
    font-size: 2rem;
  }
}
</style>