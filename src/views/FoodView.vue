<template>
  <div class="food-page">
    <!-- TITRE -->
    <h1 class="title">
      {{ selectedCategory?.label === 'Jus' ? '🥤 Choisissez votre Jus' : `🍽️ Choisissez votre ${selectedCategory?.label?.toLowerCase() || 'catégorie'}` }}
    </h1>

    <!-- CONTENEUR PRINCIPAL -->
    <div ref="columnsContainer" class="layout">

      <!-- COLONNE CATEGORIES -->
      <aside ref="leftCol" class="categories-col">
        <div class="categories-list">
          <div
            v-for="category in categories"
            :key="category.name"
            @click="selectCategory(category)"
            :class="['category-item', { 'selected': selectedCategory?.name === category.name }]"
          >
            <img :src="category.image" :alt="category.label"/>
            <p>{{ category.label }}</p>
          </div>
        </div>
      </aside>

      <!-- COLONNE PRODUITS -->
      <main ref="rightCol" class="products-col">
        <div v-if="selectedCategory">
          <div class="grid">
            <article v-for="item in selectedCategory.items" :key="item.name" class="product-card">
              <img @click="addToCart(item)" :src="item.image" :alt="item.name"/>
              <p class="product-name">
                {{ item.name }} : {{ item.price.toFixed(2) }} €
                <span v-if="item.composant">({{ item.composant }})</span>
              </p>
            </article>
          </div>
        </div>

        <div v-else class="no-selection">
          🧭 Cliquez sur une catégorie à gauche pour commander
        </div>
      </main>

      <!-- PANIER FIXE À DROITE -->
      <aside class="cart-right">
        <CartSummary />
      </aside>
    </div>

    <!-- NAVIGATION RETOUR -->
    <div class="nav-back">
      <router-link to="/home">Retour</router-link>
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
  if (Math.abs(e.deltaY) < Math.abs(e.deltaX)) return
  const x = e.clientX
  const y = e.clientY
  const el = document.elementFromPoint(x, y)
  if (!el) return
  if (leftCol.value && leftCol.value.contains(el)) {
    leftCol.value.scrollTop += e.deltaY
    e.preventDefault()
  } else if (rightCol.value && rightCol.value.contains(el)) {
    rightCol.value.scrollTop += e.deltaY
    e.preventDefault()
  }
}

onMounted(() => {
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
.food-page {
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

.layout {
  display: flex;
  gap: 1.5rem;
  max-width: 1400px;
  margin: 0 auto;
  min-height: calc(100vh - 6rem);
  position: relative;
}

/* COLONNE CATEGORIES */
.categories-col {
  width: 260px;
  overflow-y: auto;
  border-right: 1px solid #ccc;
}

.categories-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem 0;
}

.category-item {
  cursor: pointer;
  text-align: center;
  border-radius: 1.5rem;
  transition: transform 0.2s, box-shadow 0.2s;
}

.category-item.selected {
  border: 3px solid #22c55e;
  transform: scale(1.05);
}

.category-item img {
  width: 100%;
  border-radius: 1.5rem;
  object-fit: cover;
}

.category-item p {
  margin-top: 0.5rem;
  font-weight: bold;
  background: white;
  border-radius: 0.5rem;
}

/* COLONNE PRODUITS */
.products-col {
  flex: 1;
  padding: 0 1rem;
  overflow-y: auto;
}

.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}

.product-card {
  background: white;
  border-radius: 1.5rem;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  padding: 0.5rem;
  text-align: center;
}

.product-card img {
  width: 100%;
  border-radius: 1rem;
  object-fit: cover;
  cursor: pointer;
}

.product-name {
  margin-top: 0.5rem;
  font-weight: bold;
}

/* PANIER FIXE À DROITE */
.cart-right {
  position: sticky;
  top: 1rem;
  width: 280px;
  flex-shrink: 0;
  height: fit-content;
}

/* NAVIGATION RETOUR */
.nav-back {
  margin-top: 1.5rem;
  display: flex;
  justify-content: flex-end;
}

.nav-back a {
  background-color: rgb(226, 120, 58);
  color: white;
  border-radius: 100px;
  padding: 0.5rem 1rem;
  font-size: 1.2rem;
  text-decoration: none;
  transition: background 0.2s;
}

.nav-back a:hover {
  background-color: rgb(200, 100, 20);
}

/* === MOBILE === */
@media (max-width: 1024px) {
  .layout {
    flex-direction: column;
  }

  .categories-col {
    width: 100%;
    border-right: none;
    display: flex;
    overflow-x: auto;
    padding: 0.5rem 0;
  }

  .category-item {
    min-width: 140px;
    margin-right: 0.5rem;
  }

  .grid {
    grid-template-columns: 1fr !important;
  }

  .cart-right {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    background: white;
    box-shadow: 0 -2px 10px rgba(0,0,0,0.15);
    padding: 0.5rem;
    z-index: 1000;
  }
}
</style>
