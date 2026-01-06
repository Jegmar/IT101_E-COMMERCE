import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import './styles/global.css'
import PrimeVue from 'primevue/config';
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)
app.use(PrimeVue);
app.component('Navbar', Navbar)
app.component('Footer', Footer)
app.mount('#app')
