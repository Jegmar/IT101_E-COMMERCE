<template>
  <section class="confirmation-page">
    <div class="container">
      <!-- Page title - always visible, centered like your cart -->
      <h1 class="page-title">My Orders</h1>

      <!-- Confirmed order view -->
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

      <!-- Empty state - styled exactly like your cart empty page -->
      <div v-else class="empty-order">
        <!-- Optional cute illustration (uncomment after adding image) -->
        <!-- <img src="@/assets/images/empty-orders.png" alt="No orders yet" class="empty-illustration" /> -->

        <p class="empty-message">Your order history is empty.</p>
        <router-link to="/products" class="browse-btn">Browse Cupcakes</router-link>
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
/* Main page centering */
.confirmation-page {
  padding: 4rem 0;
  min-height: 50vh;
  display: flex;
  flex-direction: column;
  justify-content: center; /* Vertical centering */
  background: var(--bg);
}
.container {
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.page-title {
  text-align: center;
  margin-top: auto;
  margin-bottom: 3rem;
  font-size: 2.5rem;
  color: var(--primary-dark);
}

/* Confirmed order card */
.confirmation-card {
  max-width: 600px;
  margin: 0 auto;
  background: white;
  padding: 3rem;
  border-radius: 20px;
  box-shadow: 0 15px 35px rgba(0,0,0,0.15);
}

/* Empty state - identical to your cart empty page */
.empty-order {
  text-align: center;
  padding: 4rem 0;
}

.empty-message {
  font-size: 1.4rem;
  margin-bottom: 2rem;
  color: var(--text-light);
  font-weight: 500;
}

.browse-btn {
  background: var(--accent);
  color: white;
  padding: 1rem 2rem;
  border-radius: 50px;
  text-decoration: none;
  font-size: 1.1rem;
  font-weight: 600;
  transition: all 0.3s ease;
  display: inline-block;
}

.browse-btn:hover {
  background: #ff9d1a;
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(255, 179, 71, 0.3);
}

/* Confirmed order styles (keep these) */
.success-icon {
  font-size: 4rem;
  color: #4CAF50;
  margin-bottom: 1rem;
}

h1 {
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

/* The connecting line */
.progress-tracker::before {
  content: '';
  position: absolute;
  top: 30px; /* Half of circle height */
  left: 0;
  right: 0;
  height: 4px;
  background: #e0e0e0;
  z-index: 0;
}

/* Active/Completed line (progress bar) */
.progress-tracker::after {
  content: '';
  position: absolute;
  top: 30px;
  left: 0;
  height: 4px;
  background: var(--accent); /* Orange progress line */
  width: 35%; /* Adjust based on current step: 0%, 33%, 66%, 100% */
  transition: width 0.6s ease;
  z-index: 1;
}

/* Step circles */
.step {
  flex: 1;
  text-align: center;
  position: relative;
  z-index: 2;
}

.circle {
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
  margin-bottom: 2rem;
}
/* Completed steps */
.completed .circle {
  background: #4CAF50; /* Green */
}

/* Active step */
.active .circle {
  background: var(--accent); /* Orange */
  transform: scale(1.15);
  box-shadow: 0 0 20px rgba(255, 184, 77, 0.6);
  animation: pulse 2s infinite;
}

/* Step text */
.step p {
  font-size: 1rem;
  color: var(--text-light);
  margin: 0;
  line-height: 1.3;
}

.completed ~ .step p,
.active p {
  color: var(--text);
  font-weight: 600;
}

@keyframes pulse {
  0%, 100% { transform: scale(1.15); }
  50% { transform: scale(1.25); }
}

/* Responsive */
@media (max-width: 768px) {
  .progress-tracker {
    flex-direction: column;
    gap: 2rem;
  }
  .progress-tracker::before,
  .progress-tracker::after {
    display: none;
  }
  .step {
    margin: 0;
  }
}

.got-it-btn {
  background: #cccccc;
  color: #666666;
  cursor: not-allowed;
  opacity: 0.6;
  transform: none;
  width: 100%;
  padding: 1.2rem;
  font-size: 1.2rem;
  border: none;
  border-radius: 12px;
  transition: all 0.3s ease;
}

</style>