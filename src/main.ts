import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import pinia from './store'
import './assets/main.css' // Estilos globales, resets, etc.
import "@fortawesome/fontawesome-free/css/all.css";

createApp(App)
  .use(router)
  .use(pinia)
  .mount('#app')