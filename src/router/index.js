import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProductsView from '../views/ProductsView.vue'
import ProductDetailView from '../views/ProductDetailView.vue'
import CartView from '../views/CartView.vue'
import CheckoutView from '../views/CheckoutView.vue'
import OrderConfirmationView from '../views/OrderConfirmationView.vue'

const routes = [
  { path: '/', 
    name: 'home', 
    component: HomeView,
    meta: { 
        transition: 'fade',
        title: 'Home - Cupcake Shop'
    }
  },
  { path: '/products', 
    name: 'products', 
    component: ProductsView,
    meta: { 
        transition: 'slide',
        title: 'Our Menu - Cupcake Shop'
    }
  },
  { path: '/product/:id', 
    name: 'product-detail', 
    component: ProductDetailView,
    meta: { 
        transition: 'slide',
        title: 'Our Menu - Cupcake Shop'
    }
  },
  { path: '/cart', 
    name: 'cart', 
    component: CartView 
  },
  { path: '/checkout', 
    name: 'checkout', 
    component: CheckoutView 
  },
  { path: '/order-confirmation', 
    name: 'order-confirmation', 
    component: OrderConfirmationView 
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  }
})

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})

export default router