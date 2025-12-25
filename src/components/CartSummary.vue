<template>
  <div class="bg-gray-100 p-4 rounded-xl shadow-md w-full lg:w-72" style="margin-left : 0.5em">
    <h2 class="text-xl font-semibold mb-4">🛒 Votre panier</h2>
    <ul v-if="cart.items.length > 0" class="space-y-2">
      <li v-for="(item, index) in cart.items" :key="index" class="flex justify-between">
        <span ><img
            :src="item.image" :alt="item.label"
            style="width : 5rem; height : 5rem; margin-top : 0.5rem; border-radius : 20px"/>
            <strong style="align-self: center">{{ item.name }}</strong> : {{ item.price.toFixed(2) }} €
        </span>
      </li>
    </ul>
    <p v-else class="text-gray-500">Votre panier est vide.</p>

    <div v-if="cart.items.length > 0" class="mt-4">
      <hr class="my-2" />
      <div class="flex justify-between font-bold">
        <span style = "background-color : orange"><strong>Total</strong> = {{ total.toFixed(2) }} €</span>
      </div>
      <router-link
        to="/cart"
        class="block mt-4 bg-blue-600 text-white text-center py-2 rounded-lg hover:bg-blue-700 transition"
        style = "margin-left : 22rem; width : 6.5em; border-radius : 2em; font-size : 1.8em; color : black; background-color : green;"
      >
        Voir le panier
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { useCartStore } from '@/stores/cart'
import { computed } from 'vue'

const cart = useCartStore()
const total = computed(() =>
  cart.items.reduce((sum, item) => sum + item.price, 0)
)
</script>
