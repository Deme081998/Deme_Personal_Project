<template>
  <div class="p-6" style ="background-image: url('/images/fond.jpg')">
    <div v-if="selectedCategory?.label!=='Jus'">
      <h1 class="text-3xl font-bold mb-8 text-center"> 🍽️ Choisissez votre {{ selectedCategory?.label.toLowerCase() || 'catégorie' }} </h1>
    </div>
    <div v-else>
      <h1 class="text-3xl font-bold mb-8 text-center">🥤 Choisissez votre Jus </h1>
    </div>

    <!-- conteneur des colonnes ; on fixe la hauteur pour permettre les scroll indépendants -->
    <div
      ref="columnsContainer"
      class="flex gap-6 mx-auto max-w-7xl"
      :style="{ height: 'calc(100vh - 8rem)' }"
    >
      <!-- COLONNE GAUCHE : CATÉGORIES -->
      <aside
        ref="leftCol"
        class="w-64 pr-4 border-r border-gray-300 overflow-y-auto"
      >
        <div class="flex flex-col gap-6 py-2">
          <div
            v-for="category in categories"
            :key="category.name"
            @click="selectCategory(category)"
            class="cursor-pointer transform hover:scale-105 transition-all duration-200"
          >
              <img
                :src="category.image"
                :alt="category.label"
                class="rounded-xl shadow-lg w-52 h-36 object-cover mx-auto border-3"
                :class="{
              'border-green-600': selectedCategory?.name === category.name,
              'border-transparent': selectedCategory?.name !== category.name
            }"
            style = "width : 25rem; margin-left : 15px; margin-right : 25px; border-radius : 2em"
              />
            <p
              class="mt-2 text-center font-semibold text-lg text-gray-800 bg-white rounded-xl py-1"
            >
              {{ category.label }}
            </p>
          </div>
        </div>
      </aside>


      <!-- COLONNE DROITE : PRODUITS -->
      <main
        ref="rightCol"
        class="flex-1 pl-6 overflow-y-auto"
      >
        <transition-group
          name="fade-slide"
          tag="div"
          class="grid grid-cols-3 sm:grid-cols-2 lg:grid-cols-3 gap-6 py-2"
          style = ""
        >
          <article
            v-for="item in selectedCategory?.items || []"
            :key="item.name"
            class="bg-white rounded-2xl shadow-md p-4 hover:scale-[1.03] transition transform duration-300"
          >
          
          <div style ="margin-left : 1.5em">
            <img 
            @click="addToCart(item)"
            :src="item.image" class="cursor-pointer rounded-xl h-36 w-full object-cover mb-3" style ="border-radius : 2.5rem; background : rgb(159, 159, 173)"/>
            <div v-if="selectedCategory?.label!=='Jus'">
              <p class="text-xl font-bold mb-1"><strong>{{ item.name }} : {{ item.price.toFixed(2) }} €</strong> ({{item.composant}})</p>
            </div>
            <div v-else>
              <h4 class="text-xl font-bold mb-1">{{ item.name }} : {{ item.price.toFixed(2) }} €</h4>
            </div>
          </div>
          </article>
        </transition-group>

        <div v-if="!selectedCategory" class="text-gray-500 text-center py-8">
          🧭 Cliquez sur une catégorie à gauche pour commander
        </div>

        <!-- PANIER -->
        <div class="mt-8">
          <CartSummary />
        </div>
      </main>
      
    </div>

    <!-- Navigation -->
    <div class="mt-10 flex justify-between" style ="margin-left : 76rem; border-radius : 100px; padding : 1.5px; height : 2rem; width : 5rem;  background-color : rgb(226, 120, 58)">
      <router-link
        to="/home"
        class="px-3 py-3" style="margin-left : 8.5px; color : white; font-size : 1.5em"
      >
        Retour
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useCartStore } from '@/stores/cart'
import CartSummary from '@/components/CartSummary.vue'

const cart = useCartStore()

function addToCart(item) {
  cart.addItem({ ...item, category: 'food' })
}

const categories = [
  {
    name: 'plats',
    label: 'Plat',
    image: '/images/categorie_plat.jpg',
    items: [
      { name: 'Thiébou dieune', composant: 'riz, poisson, légumes', price: 16, image: '/images/tieboudiene.jpg' },
      { name: 'Thiébou guinaar', composant: 'riz, poulet, légumineuses', price: 16, image: '/images/poulet.jpg' },
      { name: 'Domoda yapp', composant: 'riz, viande', price: 16, image: '/images/domoda_yapp.jpg' },
      { name: 'Yassa guinaar', composant: 'riz, poulet', price: 16, image: '/images/yassa.jpg' },
      { name: 'Salade composée', composant: 'salade, viande, tomate', price: 13, image: '/images/salade.jpg' },
      { name: 'Couscous guinaar', composant: 'couscous, poulet', price: 16, image: '/images/couscous-de-poulet-au-raisins.jpg' }
    ]
  },
  {
    name: 'desserts',
    label: 'Dessert',
    image: '/images/categorie_dessert.jpg',
    items: [
      { name: 'Lakh sow', composant: 'lait caillé, bouillie de mil', price: 10, image: '/images/laakh.jpg' },
      { name: 'Lakh neuteri', composant: 'ngalakh, bouillie de mil', price: 10, image: '/images/neuteri.jpg' },
      { name: 'Thiakry', composant: 'lait caillé, bouillie de mil, raisin', price: 10, image: '/images/thiakry.jpg' }
    ]
  },
  {
    name: 'boissons',
    label: 'Jus',
    image: '/images/jus_naturel.jpg',
    items: [
      { name: 'Bissap', price: 6, image: '/images/jus_bissap.jpg' },
      { name: 'Raisin', price: 6, image: '/images/raisin.jpg' },
      { name: 'Fraise', price: 6, image: '/images/fraise.jpg' },
      { name: 'Bouye', price: 6, image: '/images/bouye.jpg' },
      { name: 'Mangue', price: 6, image: '/images/jus_de_mangue.jpg' },
      { name: 'Orange', price: 6, image: '/images/jus_orange.jpg' },
      { name: 'Citron', price: 6, image: '/images/jus_de_citron.jpg' },
      { name: 'Pomme', price: 6, image: '/images/jus_de_pomme.jpg' },
      { name: 'Ananas', price: 6, image: '/images/jus_ananas.jpg' },
    ]
  }
]

const selectedCategory = ref(null)
const leftCol = ref(null)
const rightCol = ref(null)
const columnsContainer = ref(null)

function selectCategory(category) {
  selectedCategory.value = category
}

function onWheel(e) {
  // n'intervenir que pour scroll vertical
  if (Math.abs(e.deltaY) < Math.abs(e.deltaX)) return

  const x = e.clientX
  const y = e.clientY
  const el = document.elementFromPoint(x, y)
  if (!el) return

  // si le pointeur est sur la colonne gauche (leftCol)
  if (leftCol.value && leftCol.value.contains(el)) {
    leftCol.value.scrollTop += e.deltaY
    e.preventDefault()
  }
  // si le pointeur est sur la colonne droite (rightCol)
  else if (rightCol.value && rightCol.value.contains(el)) {
    rightCol.value.scrollTop += e.deltaY
    e.preventDefault()
  }
  // sinon : laisser le comportement par défaut (body scroll)
}

onMounted(() => {
  // attache l'écouteur non passive pour pouvoir preventDefault()
  if (columnsContainer.value) {
    columnsContainer.value.addEventListener('wheel', onWheel, { passive: false })
  }
})

onBeforeUnmount(() => {
  if (columnsContainer.value) {
    columnsContainer.value.removeEventListener('wheel', onWheel)
  }
})

</script>

<style scoped>
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.3s ease;
}
.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(10px);
}
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

h1 {
  font-family: 'Segoe UI', sans-serif;
}
</style>
