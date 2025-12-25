<template>
  <div class="confirmation flex flex-col items-center justify-center min-h-screen bg-green-50 p-6 text-center print:p-2" style ="background-image: url('/images/fond.jpg')">
    <h1 style = "margin : 1px">Commande confirmée !</h1>
    <p class="text-lg text-gray-700 mb-4">Merci pour votre commande <strong>n°{{ orderId }}</strong> 🎉</p>

    <div class="bg-white shadow-md rounded-lg p-6 w-full max-w-md text-left print:shadow-none print:border print:rounded-none" style="background-color : rgb(101, 166, 222); width : 20rem">
      <h2 class="text-xl font-semibold mb-2" style="text-decoration : underline">Résumé :</h2>
      <ul class="mb-4 text-sm">
        <li v-for="(item, index) in orderedItems" :key="index">
          {{ item.name }} – {{ item.price.toFixed(2) }} €
        </li>
      </ul>
      <p class="font-bold text-green-700">Total : {{ orderedTotal.toFixed(2) }} €</p>
    </div>

    <p class="mt-6 text-gray-600 text-sm print:hidden">
      Retour à l’accueil dans <span class="font-bold">{{ countdown }}</span> seconde<span v-if="countdown > 1">s</span>...
    </p>

    <router-link
      to="/"
      class="mt-4 px-6 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition print:hidden"
    >
      Revenir à l’accueil
    </router-link>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useCartStore } from '@/stores/cart'
import { useRouter } from 'vue-router'

const cart = useCartStore()
const router = useRouter()

const orderId = ref(Math.floor(Math.random() * 100000))
const orderedItems = ref([])
const orderedTotal = ref(0)
const countdown = ref(10)

onMounted(() => {
  // Capture des items avant suppression
  orderedItems.value = [...cart.items]
  orderedTotal.value = cart.totalPrice
  cart.clearCart()

  // Déclenchement impression automatique
  //setTimeout(() => {
  //window.print()
  //}, 500)

  // Décompte automatique vers l'accueil
  const interval = setInterval(() => {
    countdown.value--
    if (countdown.value <= 0) {
      clearInterval(interval)
      router.push('/')
    }
  }, 1000)
})
</script>

<style scoped>
.confirmation h1 {
  font-family: 'Segoe UI', sans-serif;
}
@media print {
  a,
  button,
  .print\:hidden {
    display: none !important;
  }
}
</style>
