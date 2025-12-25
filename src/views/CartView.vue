<template>
  <div class="cart-page">
    <h1 class="title">Panier</h1>

    <!-- NAVIGATION -->
    <nav class="nav-links">
      <router-link to="/home">Accueil</router-link>
      <router-link to="/food">Retour</router-link>
    </nav>

    <!-- PANIER VIDE -->
    <div v-if="items.length === 0" class="empty-cart">
      <p>Votre panier est vide.</p>
    </div>

    <!-- PANIER AVEC ARTICLES -->
    <div v-else class="cart-items">
      <h4>Voici votre commande :</h4>
      <ul>
        <li v-for="(item, index) in items" :key="index" class="cart-item">
          <span>{{ item.name }} - {{ item.price.toFixed(2) }}€</span>
          <button @click="removeItem(index)">Supprimer</button>
        </li>
      </ul>

      <p class="total"><strong>Total = </strong> {{ totalPrice.toFixed(2) }}€</p>

      <button 
        :disabled="items.length === 0"
        @click="goToConfirmation"
        class="confirm-btn">
        Passer la commande
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useCartStore } from '@/stores/cart'
import { useRouter } from 'vue-router'

const cart = useCartStore()
const router = useRouter()

const items = computed(() => cart.items)
const totalPrice = computed(() => cart.totalPrice)

function removeItem(index) {
  cart.removeItem(index)
}

function goToConfirmation() {
  router.push('/confirmation')
}
</script>

<style scoped>
.cart-page {
  padding: 1rem;
  background-image: url('/public/images/fond.jpg');
  min-height: 100vh;
  font-family: 'Segoe UI', sans-serif;
}

.title {
  text-align: center;
  font-size: 2rem;
  margin-bottom: 1rem;
}

/* NAVIGATION */
.nav-links {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-bottom: 1rem;
}

.nav-links a {
  background-color: white;
  color: black;
  border-radius: 50px;
  padding: 0.5rem 1rem;
  text-decoration: none;
  font-weight: bold;
  transition: background 0.2s;
}

.nav-links a:hover {
  background-color: #f0f0f0;
}

/* PANIER VIDE */
.empty-cart {
  text-align: center;
  font-size: 1.2rem;
  margin-top: 2rem;
}

/* LISTE DES ARTICLES */
.cart-items {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.cart-items ul {
  list-style: none;
  padding: 0;
  width: 100%;
  max-width: 600px;
  margin-bottom: 1rem;
}

.cart-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgba(255,255,255,0.9);
  padding: 0.5rem 1rem;
  border-radius: 1rem;
  margin-bottom: 0.5rem;
}

.cart-item button {
  background-color: red;
  color: white;
  border: none;
  border-radius: 1rem;
  padding: 0.3rem 0.8rem;
  cursor: pointer;
}

.cart-item button:hover {
  background-color: darkred;
}

/* TOTAL ET CONFIRMATION */
.total {
  font-size: 1.2rem;
  margin-bottom: 1rem;
}

.confirm-btn {
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 40px;
  padding: 10px 20px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.2s;
}

.confirm-btn:disabled {
  background-color: grey;
  cursor: not-allowed;
}

.confirm-btn:hover:not(:disabled) {
  background-color: #369a6c;
}

/* MOBILE */
@media (max-width: 768px) {
  .cart-item {
    flex-direction: column;
    align-items: flex-start;
  }

  .cart-item button {
    margin-top: 0.5rem;
  }

  .nav-links {
    flex-direction: column;
    gap: 0.5rem;
  }
}
</style>
