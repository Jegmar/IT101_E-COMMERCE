<template>
  <div v-if="show" class="modal-overlay" @click="closeModal">
    <div class="modal-content" @click.stop>
      <button class="modal-close" @click="closeModal">×</button>
      <div class="modal-grid">
        <div class="modal-image-section">
          <div class="full-vertical-image-container">
            <img 
              :src="selectedCupcake.image" 
              :alt="selectedCupcake.name" 
              class="full-vertical-image"
            />
          </div>
        </div>
        <div class="modal-info">
          <h2>{{ selectedCupcake.name }}</h2>
          <p class="modal-price">₱{{ selectedCupcake.price.toFixed(2) }}</p>
          <p class="modal-description">{{ selectedCupcake.description }}</p>
          
          <div class="modal-quantity">
            <label for="modal-quantity">Quantity:</label>
            <div class="modal-controls">
              <button @click="qty > 1 && qty--" :disabled="qty <= 1">-</button>
              <input 
                type="number" 
                id="modal-quantity" 
                v-model.number="qty" 
                min="1" 
                @keydown.prevent
              />
              <button @click="qty++">+</button>
            </div>
          </div>

          <button @click="addToCart" class="modal-add-btn" :disabled="qty <= 0">
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

const emit = defineEmits(['close', 'addToCart'])
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
  if (qty.value > 0) {
    emit('addToCart', { 
      id: props.selectedCupcake.id, 
      quantity: qty.value
    })
    closeModal()
  }
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
  align-items: stretch;
  min-height: 400px;
}

.modal-image-section {
  display: flex;
  align-items: center;
  justify-content: center;
}

.full-vertical-image-container {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border-radius: 16px;
  box-shadow: 0 12px 30px rgba(0,0,0,0.15);
  background: #f8f8f8;
}

.full-vertical-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
  transition: transform 0.3s ease;
}

.full-vertical-image:hover {
  transform: scale(1.02);
}

.modal-close {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: rgba(0, 0, 0, 0.1);
  border: none;
  font-size: 2rem;
  color: #333;
  cursor: pointer;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  z-index: 10;
}

.modal-close:hover {
  background: rgba(0, 0, 0, 0.2);
  transform: rotate(90deg);
}

.modal-info {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
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
  margin-top: 2rem;
}

.modal-quantity {
  margin: 1.5rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
}

.modal-quantity label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #333;
  text-align: center;
  width: 100%;
}

.modal-controls {
  display: flex;
  align-items: center;
  justify-content: center;
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
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  font-size: 1.4rem;
  font-weight: bold;
}

.modal-controls button:hover:not(:disabled) {
  background: var(--primary-dark);
  transform: scale(1.1);
}

.modal-controls button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
}

.modal-controls input {
  width: 70px;
  padding: 0.7rem;
  text-align: center;
  font-size: 1.1rem;
  border: 2px solid #ddd;
  border-radius: 10px;
  -moz-appearance: textfield;
}

.modal-controls input::-webkit-outer-spin-button,
.modal-controls input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
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
  transition: all 0.3s ease;
  margin-top: 2rem;
}

.modal-add-btn:hover:not(:disabled) {
  background: #ff9d1a;
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(255, 157, 26, 0.3);
}

.modal-add-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

@media (max-width: 768px) {
  .modal-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
    min-height: auto;
    align-items: start;
  }
  
  .modal-image-section {
    height: auto;
  }
  
  .full-vertical-image-container {
    height: 300px;
    min-height: 300px;
  }
  
  .full-vertical-image {
    height: auto;
    max-height: 300px;
    width: auto;
    max-width: 100%;
  }
  
  .modal-info {
    height: auto;
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
    margin-top: 1.5rem;
  }
  
  .modal-controls button {
    width: 40px;
    height: 40px;
    font-size: 1.2rem;
  }
  
  .modal-controls input {
    width: 60px;
    padding: 0.6rem;
  }
}

@media (max-width: 480px) {
  .modal-content {
    padding: 1rem;
  }
  
  .modal-grid {
    gap: 1rem;
  }
  
  .full-vertical-image-container {
    height: 250px;
    min-height: 250px;
  }
  
  .full-vertical-image {
    max-height: 250px;
  }
  
  .modal-info h2 {
    font-size: 1.6rem;
  }
  
  .modal-add-btn {
    margin-top: 1rem;
    font-size: 1.1rem;
    padding: 0.9rem 1.5rem;
  }
}
</style>