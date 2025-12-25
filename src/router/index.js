import { createRouter, createWebHistory } from 'vue-router'
import SplashView from '@/views/SplashView.vue'
import HomeView from '@/views/HomeView.vue'
import FoodView from '@/views/FoodView.vue'
import CartView from '@/views/CartView.vue'
import ConfirmationView from '@/views/ConfirmationView.vue'

const routes = [
  { path: '/', name: 'Splash', component: SplashView },
  { path: '/home', name: 'Home', component: HomeView },
  { path: '/food', name: 'Food', component: FoodView },
  { path: '/cart', name: 'Cart', component: CartView },
  { path: '/confirmation', name: 'Confirmation', component: ConfirmationView }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
