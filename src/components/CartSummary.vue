<template>
  <div class="bg-gray-100 p-4 rounded-xl shadow-md w-full lg:w-72" style="margin-left : 0.5em">
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
        <span style = "background-color : rgb(20, 179, 65); margin-left: 1.5rem"><strong>Total</strong> = {{ total.toFixed(2) }} €</span>
      </div>
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
