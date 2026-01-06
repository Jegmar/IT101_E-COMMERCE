<template>
  <div v-if="show" class="modal-overlay" @click="closeModal">
    <div class="modal-content" @click.stop>
      <div class="modal-grid">
        <div class="modal-image-container">
          <button class="modal-back-btn" @click="closeModal">
            <i class="pi pi-arrow-left"></i>
          </button>
          <div class="modal-image-wrapper">
            <img :src="selectedCupcake.image" :alt="selectedCupcake.name" />
          </div>
        </div>
        <div class="modal-info">
          <h2>{{ selectedCupcake.name }}</h2>
          <p class="modal-price">${{ selectedCupcake.price.toFixed(2) }}</p>
          <p class="modal-description">{{ selectedCupcake.description }}</p>
          
          <div class="modal-quantity">
            <label>Quantity:</label>
            <div class="modal-controls">
              <button @click="qty > 1 && qty--" :disabled="qty <= 1">
                <span class="button-text">-</span>
              </button>
              <input 
                type="number" 
                v-model.number="qty" 
                min="1" 
              />
              <button @click="qty++">
                <span class="button-text">+</span>
              </button>
            </div>
          </div>

          <button @click="addToCart" class="modal-add-btn">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useCartStore } from '../stores/cart'

const props = defineProps({
  show: Boolean,
  selectedCupcake: Object
})

const emit = defineEmits(['close'])
const cartStore = useCartStore()
const qty = ref(1)

watch(() => props.show, (newValue) => {
  if (newValue) {
    qty.value = 1
  }
})

const closeModal = () => {
  emit('close')
}

const addToCart = () => {
  cartStore.addItem(props.selectedCupcake.id, qty.value)
  closeModal()
}
</script>

<style scoped>

/* Fade + Slide transition */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-active .modal-content,
.modal-leave-active .modal-content {
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-content {
  transform: translateY(-30px);
}

.modal-leave-to .modal-content {
  transform: translateY(30px);
}

/* Content animation */
.modal-content {
  animation: modalContentIn 0.4s cubic-bezier(0.4, 0, 0.2, 1) 0.1s both;
}

@keyframes modalContentIn {
  0% {
    opacity: 0;
    transform: translateY(20px) scale(0.95);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
}

.modal-content {
  background: white;
  border-radius: 24px;
  padding: 2rem;
  max-width: 800px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
}

.modal-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2.5rem;
  align-items: stretch; /* Changed from start to stretch */
  min-height: 400px; /* Added min-height for consistent vertical centering */
}

.modal-image-container {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%; /* Added to fill the grid cell */
}

.modal-back-btn {
  position: absolute;
  top: 0;
  left: 0;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.8rem;
  color: var(--primary-dark);
  cursor: pointer;
  transition: all 0.3s ease;
  background: none;
  border: none;
  z-index: 5;
}

.modal-back-btn:hover {
  color: var(--primary);
  text-decoration: underline;
  transform: translateY(-2px);
}

.modal-image-wrapper {
  border-radius: 16px;
  overflow: hidden;
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%; /* Changed from 100% to fill container */
  min-height: 400px; /* Added min-height for vertical centering */
}

.modal-image-wrapper img {
  max-width: 100%;
  max-height: 100%; /* Changed from fixed height to percentage */
  width: auto; /* Changed from 100% to auto */
  height: auto;
  object-fit: contain;
  display: block;
}

.modal-info {
  display: flex;
  flex-direction: column;
  justify-content: space-between; /* Changed to distribute space */
  height: 100%; /* Added to fill the grid cell */
}

.modal-info h2 {
  font-size: 2.2rem;
  margin-bottom: 0.5rem;
}

.modal-price {
  font-size: 1.8rem;
  color: var(--primary-dark);
  font-weight: 600;
  margin: 0.5rem 0 1rem;
}

.modal-description {
  font-size: 1.1rem;
  color: #666;
  line-height: 1.6;
  margin-bottom: 2rem;
}

.modal-quantity {
  margin: 1.5rem 0;
  display: flex;
  flex-direction: column;
  align-items: center; /* Center the whole quantity section */
  justify-content: center;
  width: 100%;
}

.modal-quantity label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #333;
  text-align: center; /* Center the label text */
  width: 100%;
}

.modal-controls {
  display: flex;
  align-items: center;
  justify-content: center; /* Center the controls */
  gap: 1rem;
  width: 100%;
}

.modal-controls button {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: var(--primary);
  color: white;
  border: none;
  cursor: pointer;
  transition: background 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  position: relative;
}

.modal-controls .button-text {
  font-size: 1.8rem;
  font-weight: 500;
  line-height: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
}

.modal-controls button:hover:not(:disabled) {
  background: var(--primary-dark);
}

.modal-controls button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.modal-controls input {
  width: 70px;
  padding: 0.7rem;
  text-align: center;
  font-size: 1.1rem;
  border: 2px solid #ddd;
  border-radius: 10px;
}

.modal-add-btn {
  background: var(--accent);
  color: white;
  font-size: 1.2rem;
  font-weight: 600;
  padding: 1rem 2rem;
  width: 100%;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: background 0.3s ease;
  margin-top: 2rem; /* Changed from auto to fixed margin */
}

.modal-add-btn:hover {
  background: #ff9d1a;
}

@media (max-width: 768px) {
  .modal-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
    min-height: auto; /* Reset min-height on mobile */
    align-items: start; /* Reset to start on mobile */
  }
  
  .modal-image-container {
    height: auto; /* Reset height on mobile */
  }
  
  .modal-image-wrapper {
    min-height: 300px; /* Adjusted for mobile */
    height: auto; /* Reset height on mobile */
  }
  
  .modal-image-wrapper img {
    max-height: 300px; /* Restore fixed height for mobile */
    width: 100%; /* Full width on mobile */
  }
  
  .modal-info {
    height: auto; /* Reset height on mobile */
  }
  
  .modal-info h2 {
    font-size: 1.8rem;
  }
  
  .modal-price {
    font-size: 1.5rem;
  }
  
  .modal-content {
    padding: 1.5rem;
    max-height: 85vh;
  }
  
  .modal-add-btn {
    margin-top: 1.5rem; /* Adjusted margin for mobile */
  }
}

@media (max-width: 480px) {
  .modal-content {
    padding: 1rem;
  }
  
  .modal-grid {
    gap: 1rem;
  }
  
  .modal-image-wrapper {
    min-height: 250px; /* Smaller min-height for mobile */
  }
  
  .modal-image-wrapper img {
    max-height: 250px;
  }
  
  .modal-info h2 {
    font-size: 1.6rem;
  }
  
  .modal-controls button {
    width: 40px;
    height: 40px;
  }
  
  .modal-controls .button-text {
    font-size: 1.6rem;
  }
  
  .modal-controls input {
    width: 60px;
    padding: 0.5rem;
  }
  
  .modal-add-btn {
    margin-top: 1rem; /* Smaller margin for mobile */
  }
}
</style>