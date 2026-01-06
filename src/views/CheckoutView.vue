<template>
  <section class="checkout-page">
    <div class="container checkout-grid">
      <div class="form-section">
        <h2>Customer Information</h2>
        <form @submit.prevent="handleSubmit">
          <div class="form-group">
            <label for="name">Full Name *</label>
            <input 
              type="text" 
              id="name" 
              v-model="form.name" 
              required 
              placeholder="John Doe"
            />
          </div>
          
          <div class="form-group">
            <label for="email">Email Address *</label>
            <input 
              type="email" 
              id="email" 
              v-model="form.email" 
              required 
              placeholder="john@example.com"
            />
          </div>
          
          <div class="form-group">
            <label for="mobile">Mobile Number *</label>
            <input 
              type="tel" 
              id="mobile" 
              v-model="form.mobile" 
              required 
              placeholder="0912 345 6789"
              pattern="[0-9\s\-\(\)]+"
              title="Please enter a valid phone number"
            />
            <small class="hint-text">For delivery updates and order confirmation</small>
          </div>
          
          <div class="form-group">
            <label for="address">Delivery Address *</label>
            <textarea 
              id="address" 
              v-model="form.address" 
              rows="4" 
              required 
              placeholder="Street, Barangay, City, Province"
            ></textarea>
          </div>
          
          <div class="form-group">
            <label for="notes">Delivery Notes (Optional)</label>
            <textarea 
              id="notes" 
              v-model="form.notes" 
              rows="3" 
              placeholder="e.g., Leave at the gate, call before delivery, etc."
            ></textarea>
          </div>
          
          <button type="submit" :disabled="!isFormValid || isSubmitting" class="submit-btn">
            <span v-if="!isSubmitting">Complete Order</span>
            <span v-else class="submitting-text">
              <i class="pi pi-spinner pi-spin"></i> Processing...
            </span>
          </button>
          
          <p v-if="!isFormValid" class="validation-hint">
            Please fill in all required fields (*)
          </p>
        </form>
      </div>

      <div class="summary-section">
        <h2>Order Summary</h2>
        
        <div class="summary-list">
          <div v-for="item in cartItems" :key="item.id" class="summary-item">
            <div class="item-info">
              <span class="item-name">{{ item.name }}</span>
              <span class="item-qty">× {{ item.quantity }}</span>
            </div>
            <span class="item-price">${{ (item.price * item.quantity).toFixed(2) }}</span>
          </div>
        </div>
        
        <div class="summary-total">
          <strong>Total:</strong>
          <strong>${{ totalPrice.toFixed(2) }}</strong>
        </div>
        
        <div class="delivery-info">
          <h3>Delivery Information</h3>
          <p><i class="pi pi-clock"></i> Estimated delivery: 30-45 minutes</p>
          <p><i class="pi pi-info-circle"></i> We'll contact you on your mobile number for delivery updates</p>
        </div>
      </div>
    </div>

    <!-- Success Modal -->
    <teleport to="body">
      <transition name="modal">
        <div v-if="showSuccessModal" class="success-modal-overlay" @click.self="closeModal">
          <div class="success-modal">
            <button class="modal-close-btn" @click="closeModal">
              <i class="pi pi-times"></i>
            </button>
            
            <div class="success-icon">
              <i class="pi pi-check-circle"></i>
            </div>
            
            <h3>Order Successful!</h3>
            <p>Thank you for your purchase. Your order has been confirmed.</p>
            
            <div class="order-details-card">
              <div class="detail-row">
                <span>Order ID:</span>
                <strong>#{{ orderId }}</strong>
              </div>
              <div class="detail-row">
                <span>Order Total:</span>
                <strong>${{ totalPrice.toFixed(2) }}</strong>
              </div>
              <div class="detail-row">
                <span>Delivery To:</span>
                <strong>{{ form.name }}</strong>
              </div>
              <div class="detail-row">
                <span>Contact:</span>
                <strong>{{ form.mobile }}</strong>
              </div>
            </div>
            
            <p class="delivery-note">
              <i class="pi pi-info-circle"></i>
              We'll contact you on <strong>{{ form.mobile }}</strong> for delivery updates.
            </p>
            
            <div class="modal-actions">
              <button @click="closeModal" class="got-it-btn">
                Got it!
              </button>
              
              <p class="continue-shopping">
                <router-link to="/products" @click="closeModal">
                  <i class="pi pi-shopping-bag"></i> Continue Shopping
                </router-link>
              </p>
            </div>
          </div>
        </div>
      </transition>
    </teleport>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useCartStore } from '../stores/cart'
import { useRouter } from 'vue-router'

const cartStore = useCartStore()
const router = useRouter()
const cartItems = computed(() => cartStore.items)
const totalPrice = computed(() => cartStore.totalPrice)

const form = ref({
  name: '',
  email: '',
  mobile: '',
  address: '',
  notes: ''
})

const isSubmitting = ref(false)
const showSuccessModal = ref(false)
const orderId = ref(generateOrderId())

const isFormValid = computed(() => 
  form.value.name.trim() && 
  form.value.email.trim() && 
  form.value.mobile.trim() && 
  form.value.address.trim()
)

function generateOrderId() {
  return 'ORD-' + Date.now().toString().slice(-6) + Math.floor(Math.random() * 1000)
}

const handleSubmit = async () => {
  if (!isFormValid.value) return
  
  isSubmitting.value = true
  
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  // In a real app, you would send this to a backend
  const orderData = {
    ...form.value,
    items: cartItems.value,
    total: totalPrice.value,
    orderId: orderId.value,
    orderDate: new Date().toISOString()
  }
  
  console.log('Order submitted:', orderData)
  
  // Show success modal
  showSuccessModal.value = true
  
  // Clear cart
  cartStore.clearCart()
  isSubmitting.value = false
  
  // Generate new order ID for next purchase
  orderId.value = generateOrderId()
}

const closeModal = () => {
  showSuccessModal.value = false
  
  // Reset form after modal closes
  form.value = {
    name: '',
    email: '',
    mobile: '',
    address: '',
    notes: ''
  }
  
  // Redirect to homepage
  router.push('/')
}
</script>

<style scoped>
.checkout-page {
  padding: 4rem 0;
  background: linear-gradient(to bottom, rgba(255, 158, 197, 0.05), transparent);
  min-height: calc(100vh - 160px);
}

.checkout-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  align-items: start;
}

.form-section, .summary-section {
  background: var(--card-bg);
  padding: 2.5rem;
  border-radius: 20px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(255, 158, 197, 0.1);
}

h2 {
  margin-bottom: 2rem;
  text-align: center;
  font-size: 1.8rem;
  color: var(--primary-dark);
  position: relative;
  padding-bottom: 1rem;
}

h2::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 3px;
  background: var(--primary);
  border-radius: 2px;
}

.form-group {
  margin-bottom: 1.8rem;
}

label {
  display: block;
  margin-bottom: 0.6rem;
  font-weight: 600;
  color: #444;
  font-size: 1rem;
}

label::after {
  content: '*';
  color: var(--accent);
  margin-left: 0.25rem;
}

label[for="notes"]::after {
  content: none;
}

input, textarea {
  width: 100%;
  padding: 1rem 1.2rem;
  border: 2px solid #e0e0e0;
  border-radius: 12px;
  font-size: 1rem;
  font-family: inherit;
  transition: all 0.3s ease;
  background: white;
}

input:focus, textarea:focus {
  border-color: var(--primary);
  box-shadow: 0 0 0 3px rgba(255, 158, 197, 0.2);
  outline: none;
}

.hint-text {
  display: block;
  margin-top: 0.4rem;
  font-size: 0.85rem;
  color: #666;
  font-style: italic;
}

.submit-btn {
  width: 100%;
  background: var(--accent);
  color: white;
  font-size: 1.3rem;
  font-weight: 700;
  padding: 1.3rem;
  margin-top: 1.5rem;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  min-height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.submit-btn:hover:not(:disabled) {
  background: #ff9d1a;
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(255, 179, 71, 0.4);
}

.submit-btn:disabled {
  background: #ccc;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

.submitting-text {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.submitting-text i {
  font-size: 1.2rem;
}

/* Smaller Success Modal Styles */
.success-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  padding: 1rem;
  backdrop-filter: blur(3px);
}

.success-modal {
  background: white;
  border-radius: 20px;
  padding: 2rem;
  max-width: 450px;
  width: 90%;
  text-align: center;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
  position: relative;
  animation: modalPop 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

@keyframes modalPop {
  0% {
    opacity: 0;
    transform: scale(0.9) translateY(20px);
  }
  100% {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

.modal-close-btn {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  font-size: 1.2rem;
  color: #999;
  cursor: pointer;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  z-index: 10;
}

.modal-close-btn:hover {
  background: #f5f5f5;
  color: #333;
  transform: rotate(90deg);
}

.success-icon {
  font-size: 3.5rem;
  color: #4CAF50;
  margin-bottom: 1rem;
  animation: iconBounce 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

@keyframes iconBounce {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
}

.success-modal h3 {
  font-size: 1.6rem;
  color: #2E7D32;
  margin-bottom: 0.75rem;
  font-weight: 700;
}

.success-modal > p {
  font-size: 1rem;
  color: #555;
  line-height: 1.5;
  margin-bottom: 1.25rem;
}

.order-details-card {
  background: linear-gradient(135deg, rgba(76, 175, 80, 0.08), rgba(139, 195, 74, 0.08));
  padding: 1.25rem;
  border-radius: 12px;
  margin: 1.25rem 0;
  text-align: left;
  border: 1px solid rgba(76, 175, 80, 0.15);
}

.detail-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0;
  font-size: 0.95rem;
}

.detail-row:not(:last-child) {
  border-bottom: 1px solid rgba(76, 175, 80, 0.1);
}

.detail-row span {
  color: #555;
  font-weight: 500;
}

.detail-row strong {
  color: #2E7D32;
  font-weight: 600;
}

.delivery-note {
  background: rgba(255, 179, 71, 0.08);
  padding: 0.75rem 1rem;
  border-radius: 10px;
  border-left: 3px solid var(--accent);
  text-align: left;
  margin: 1.25rem 0;
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  font-size: 0.9rem;
}

.delivery-note i {
  color: var(--accent);
  font-size: 1rem;
  margin-top: 0.1rem;
  flex-shrink: 0;
}

.delivery-note strong {
  color: var(--accent);
}

.modal-actions {
  margin-top: 1.5rem;
}

.got-it-btn {
  background: linear-gradient(135deg, #4CAF50, #2E7D32);
  color: white;
  font-size: 1.1rem;
  font-weight: 600;
  padding: 1rem 2.5rem;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100%;
  margin-bottom: 1rem;
}

.got-it-btn:hover {
  background: linear-gradient(135deg, #43A047, #1B5E20);
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(76, 175, 80, 0.3);
}

.continue-shopping {
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #eee;
}

.continue-shopping a {
  color: var(--primary-dark);
  text-decoration: none;
  font-weight: 500;
  font-size: 1rem;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
  padding: 0.5rem 1rem;
  border-radius: 8px;
}

.continue-shopping a:hover {
  color: var(--primary);
  background: rgba(255, 158, 197, 0.1);
}

.continue-shopping i {
  font-size: 1rem;
}

/* Modal Transition Animations */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-active .success-modal,
.modal-leave-active .success-modal {
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .success-modal {
  transform: scale(0.9) translateY(20px);
}

.modal-leave-to .success-modal {
  transform: scale(0.95) translateY(10px);
}

/* Responsive Design */
@media (max-width: 900px) {
  .checkout-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
}

@media (max-width: 600px) {
  .success-modal {
    padding: 1.5rem;
  }
  
  .success-icon {
    font-size: 3rem;
  }
  
  .success-modal h3 {
    font-size: 1.4rem;
  }
  
  .order-details-card {
    padding: 1rem;
  }
  
  .detail-row {
    font-size: 0.9rem;
  }
  
  .got-it-btn {
    font-size: 1rem;
    padding: 0.9rem 2rem;
  }
}

@media (max-width: 400px) {
  .form-section, .summary-section {
    padding: 1.5rem;
  }
  
  .success-modal {
    padding: 1.25rem;
    width: 95%;
  }
  
  .success-modal h3 {
    font-size: 1.3rem;
  }
  
  .success-modal > p {
    font-size: 0.9rem;
  }
}
</style>