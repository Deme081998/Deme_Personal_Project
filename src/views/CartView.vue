<template>
  <div class="cart" style ="background-image: url('/images/fond.jpg'); height : 45rem">
    <h1>Panier</h1>
    <nav style = " background-color:#42b983; margin-left : 5px; padding : 30px 10px; border-radius : 100px">
      <router-link to="/home" style = "background-color : white; margin-right : 30rem; color : black; border-radius : 100px; padding : 4px 10px">Accueil</router-link>
      <router-link to="/food" style = "background-color : white; color : black; border-radius : 100px; padding : 4px 10px"> Retour</router-link>
    </nav>

    <div v-if="items.length === 0">
      <p>Votre panier est vide.</p>
    </div>

    <ul v-else>
    <h4> Voici votre commande :</h4>
      <li v-for="(item, index) in items" :key="index">
        {{ item.name }} - {{ item.price.toFixed(2) }}€
        <button @click="removeItem(index)" style="background-color : red; border-radius : 1em; border : solid; margin-bottom : 10px">Supprimer</button>
      </li>
    </ul>

    <p v-if="items.length > 0"><strong>Total = </strong> {{ totalPrice.toFixed(2) }}€</p>

    <button 
      :disabled="items.length === 0"
      @click="goToConfirmation"
      style="margin-top: 20px; padding: 10px 15px; background-color:#42b983; color:white; border:none; border-radius:40px; cursor:pointer">
      Passer la commande
    </button>
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

function removeItem(item) {
  cart.removeItem(item)
}

function goToConfirmation() {
  router.push('/confirmation')
}
</script>

<style scoped>
.cart {
  padding: 20px;
}
button {
  margin-left: 10px;
}
button:disabled {
  background-color: grey;
  cursor: not-allowed;
}
</style>
