<template>
  <div class="confirmation-page">
    <h1>Commande confirmée !</h1>
    <p>
      Merci pour votre commande
      <strong>n°{{ orderId }}</strong> 🎉
    </p>

    <div class="summary">
      <h2>Résumé :</h2>
      <ul>
        <li v-for="(item,i) in orderedItems" :key="i">
          <strong>{{ item.name }}</strong> – {{ item.price.toFixed(2) }} €
        </li>
      </ul>
      <p>Total : {{ orderedTotal.toFixed(2) }} €</p>
    </div>

    <p class="countdown">
      Retour à l’accueil dans
      <strong>{{ countdown }}</strong>
      seconde<span v-if="countdown > 1">s</span>...
    </p>

    <!-- BOUTON AVEC ARRÊT DU TIMER -->
    <button class="home-btn" @click="goHome">
      Revenir à l’accueil
    </button>
  </div>
</template>


<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useCartStore } from '@/stores/cart'
import { useRouter } from 'vue-router'

const cart = useCartStore()
const router = useRouter()

const orderId = ref(Math.floor(Math.random() * 100000))
const orderedItems = ref([])
const orderedTotal = ref(0)
const countdown = ref(10)

const timer = ref(null) // 🔴 stockage du timer

function stopTimer() {
  if (timer.value) {
    clearInterval(timer.value)
    timer.value = null
  }
}

function goHome() {
  stopTimer()
  router.push('/')
}

onMounted(() => {
  orderedItems.value = [...cart.items]
  orderedTotal.value = cart.totalPrice
  cart.clearCart()

  timer.value = setInterval(() => {
    countdown.value--
    if (countdown.value <= 0) {
      stopTimer()
      router.push('/')
    }
  }, 1000)
})

onBeforeUnmount(() => {
  stopTimer()
})
</script>


<style scoped>
.confirmation-page{
  min-height:100vh;
  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content:center;
  text-align:center;
  padding:1rem;
  background:url('/public/images/fond.jpg') center/cover;
  font-family:Arial,sans-serif
}
h1{
  margin-bottom:1rem
}
.summary{
  background:rgba(238, 186, 95, 0.9);
  padding: 1rem;
  border-radius: 1rem;
  max-width: 300px;
  width: 90%;
  margin-bottom: 1rem
}
.summary h2{
  text-decoration:underline;
  margin-bottom:0.5rem
}
.countdown{
  margin-top:1rem;
  color:#555
}
.home-btn {
  display: inline-block;
  margin-top: 1rem;
  padding: 0.5rem 1.5rem;
  background: #42b983;
  color: white;
  border-radius: 2rem;
  border: none;
  cursor: pointer;
  font-size: 1rem;
}
@media(max-width:480px){ .summary{max-width:90%} h1{font-size:1.5rem} }
</style>
