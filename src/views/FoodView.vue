<template>
  <div class="food-page">
    <!-- TITRE -->
    <h1 class="title">
      {{ selectedCategory?.label === 'Jus'
        ? '🥤 Choisissez votre Jus'
        : `🍽️ Choisissez votre ${selectedCategory?.label?.toLowerCase() || 'catégorie'}`
      }}
    </h1>

    <!-- CONTENEUR PRINCIPAL -->
    <div ref="columnsContainer" class="layout">

      <!-- COLONNE CATÉGORIES -->
      <aside ref="leftCol" class="categories-col">
        <div class="categories-list">
          <div
            v-for="category in categories"
            :key="category.name"
            @click="selectCategory(category)"
            :class="['category-item', { selected: selectedCategory?.name === category.name }]"
          >
            <img :src="category.image" :alt="category.label" />
            <p>{{ category.label }}</p>
          </div>
        </div>
      </aside>

      <!-- COLONNE PRODUITS -->
      <main ref="rightCol" class="products-col">
        <div v-if="selectedCategory">
          <div class="grid">
            <article
              v-for="item in selectedCategory.items"
              :key="item.name"
              class="product-card"
            >
              <img
                @click="addToCart(item)"
                :src="item.image"
                :alt="item.name"
              />
              <p class="product-name">
                {{ item.name }} : {{ item.price.toFixed(2) }} €
                <span v-if="item.composant">({{ item.composant }})</span>
              </p>
            </article>
          </div>
        </div>

        <div v-else class="no-selection">
          🧭 Cliquez sur une catégorie pour composer votre menu
        </div>
      </main>

      <!-- PANIER À DROITE -->
      <!-- PANIER À DROITE (DESKTOP) -->
      <aside ref="cartCol" class="cart-right">
        <button class="back-btn" @click="goToHome">
          ⬅ Retour
        </button>

        <CartSummary />

        <button
          class="pay-btn"
          :disabled="cart.items.length === 0"
          @click="goToConfirmation"
        >
          ✅ Passer la commande
        </button>
      </aside>

      <!-- ===== BOUTON PANIER MOBILE ===== -->
        <div
          class="cart-floating"
          v-if="cart.items.length > 0">
          <button class="cart-floating-content" @click="toggleMobileCart">
            <span>🛒 {{ cart.items.length }} article <span v-if="cart.items.length>1">s</span></span>
            <span>{{ cart.totalPrice.toFixed(2) }} €</span>
            <span>{{ showMobileCart ? '▼' : '▲' }}</span>
          </button>
        </div>

      <!-- ===== PANIER DÉROULANT MOBILE ===== -->
      <div class="mobile-cart-sheet" v-if="showMobileCart">
        <div class="sheet-header">
          //<h3>🛒 Votre panier</h3>
          <button @click="toggleMobileCart">✕</button>
        </div>

        <!-- ZONE SCROLLABLE -->
        <div class="sheet-content">
          <CartSummary />
        </div>

        <!-- ACTION FIXE EN BAS -->
        <button
          class="pay-btn mobile-pay"
          :disabled="cart.items.length === 0"
          @click="goToConfirmation">
          ✅ Passer la commande
        </button>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useCartStore } from '@/stores/cart'
import { useRouter } from 'vue-router'
import CartSummary from '@/components/CartSummary.vue'

const cart = useCartStore()
const router = useRouter()
const showMobileCart = ref(false)


function addToCart(item) {
  cart.addItem({ ...item, category: 'food' })
}

function goToConfirmation() {
  if (cart.items.length > 0) {
    router.push('/cart')
  }
}

function goToHome() {
  router.push('/home')
}

function toggleMobileCart() {
  showMobileCart.value = !showMobileCart.value
}


/* ================== DONNÉES ================== */
const categories = [
  {
    name: 'plats',
    label: 'Plat',
    image: '/images/categorie_plat.jpg',
    items: [
      { name: 'Thiébou dieune', composant: 'riz, poisson, légumes', price: 16, image: '/images/tieboudiene.jpg' },
      { name: 'Thiébou diaga', composant: 'riz, poisson, légumes, boulette', price: 16, image: '/images/thiébou_diaga.jpg' },
      { name: 'Thiébou guinaar', composant: 'riz, poulet, œufs, légumes', price: 16, image: '/images/poulet.jpg' },
      { name: 'Thiébou yapp', composant: 'riz, viande, œufs, légumes', price: 16, image: '/images/thiébou_yapp.jpg' },
      { name: 'Domoda yapp', composant: 'riz, viande', price: 16, image: '/images/domoda_yapp.jpg' },
      { name: 'Yassa guinaar', composant: 'riz, poulet', price: 16, image: '/images/yassa.jpg' },
      { name: 'Salade composée', composant: 'salade, viande', price: 13, image: '/images/salade.jpg' },
      { name: 'Couscous guinaar', composant: 'couscous, poulet', price: 16, image: '/images/couscous-de-poulet-au-raisins.jpg' }
    ]
  },
  {
    name: 'desserts',
    label: 'Dessert',
    image: '/images/categorie_dessert.jpg',
    items: [
      { name: 'Lakh sow', composant: 'lait caillé', price: 10, image: '/images/laakh.jpg' },
      { name: 'Lakh neuteri', composant: 'ngalakh', price: 10, image: '/images/neuteri.jpg' },
      { name: 'Thiakry', composant: 'mil, lait', price: 10, image: '/images/thiakry.jpg' }
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
      { name: 'Goyave', price: 6, image: '/images/jus_goyave.jpg'},
      { name: 'Gingembre', price: 6, image: '/images/ginger.jpg'},
      { name: 'Pastèque', price: 6, image: '/images/jus_pasteque.jpg'},
      { name: 'Melon', price: 6, image: '/images/jus_melon.jpg'},
      { name: 'Poire', price: 6, image: '/images/jus_poire.jpg'}
    ]
  }
]

/* ================== ÉTAT ================== */
const selectedCategory = ref(null)
const leftCol = ref(null)
const rightCol = ref(null)
const cartCol = ref(null)
const columnsContainer = ref(null)

function selectCategory(category) {
  selectedCategory.value = category
}

/* ================== SCROLL INTELLIGENT ================== */
function onWheel(e) {
  if (Math.abs(e.deltaY) < Math.abs(e.deltaX)) return

  const el = document.elementFromPoint(e.clientX, e.clientY)
  if (!el) return

  const scrollables = [leftCol.value, rightCol.value, cartCol.value]

  for (const col of scrollables) {
    if (col && col.contains(el)) {
      col.scrollTop += e.deltaY
      e.preventDefault()
      return
    }
  }
}

onMounted(() => {
  columnsContainer.value?.addEventListener('wheel', onWheel, { passive: false })
})

onBeforeUnmount(() => {
  columnsContainer.value?.removeEventListener('wheel', onWheel)
})
</script>

<style scoped>
  /* ===== BOUTON RETOUR ===== */
  .back-btn {
    display: block;
    text-align: center;
    margin-bottom: 0.75rem;
    padding: 0.6rem 1rem;
    background: rgb(226, 120, 58);
    color: white;
    border-radius: 999px;
    font-size : 20px;
    text-decoration: none;
    font-weight: 600;
    border: solid Orange;
    transition: background 0.2s ease, transform 0.1s ease;
  }

  .back-btn:hover {
    background: rgb(200, 100, 45);
    transform: scale(1.03);
  }

  .pay-btn {
    display: block;
    width: 60%;
    text-align: center;
    margin-top: 0.75rem;
    margin-bottom: 5rem;
    margin-left: 1.5em;
    padding: 0.9rem 1rem;
    background: rgb(4, 127, 24);
    color: white;
    border-radius: 999px;
    font-weight: 700;
    cursor: pointer;
    transition: background 0.2s ease, transform 0.1s ease, opacity 0.2s;
  }

  .pay-btn:hover:not(:disabled) {
    background: rgb(0, 180, 60);
    transform: scale(1.03);
  }

  .pay-btn:disabled {
    background: #9ca3af;
    cursor: not-allowed;
    opacity: 10.6;
    transform: none;
  }

  .food-page {
    padding: 1rem;
    min-height: 100vh;
    background-image: url('/public/images/fond.jpg');
    font-family: 'Segoe UI', sans-serif;
  }

  .title {
    text-align: center;
    font-size: 2rem;
    margin-bottom: 1rem;
  }

  /* ===== LAYOUT ===== */
  .layout {
    display: flex;
    gap: 1.5rem;
    max-width: 1400px;
    margin: 0 auto;
    height: calc(100vh - 6rem);
    overflow: hidden;
  }

  /* ===== CATÉGORIES ===== */
  .categories-col {
    width: 260px;
    overflow-y: auto;
    border-right: 1px solid #ccc;
  }

  .categories-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-bottom: 5rem;
  }

  .category-item {
    cursor: pointer;
    text-align: center;
    transition: transform 0.2s;
  }

  .category-item.selected {
    border: 3px solid #22c55e;
    border-radius: 1.5rem;
    transform: scale(1.05);
  }

  .category-item img {
    width: 100%;
    border-radius: 1.5rem;
  }

  /* ===== PRODUITS ===== */
  .products-col {
    flex: 1;
    overflow-y: auto;
    padding: 0 1rem;
    margin-bottom: 5rem;
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
  }

  .product-card {
    background: white;
    border-radius: 1.5rem;
    padding: 0.5rem;
    text-align: center;
  }

  .product-card img {
    width: 100%;
    border-radius: 1rem;
    cursor: pointer;
  }

  /* ===== PANIER ===== */
  .cart-right {
    width: 350px;
    max-height: calc(100vh - 8rem);
    overflow-y: auto;
    position: sticky;
    top: 1rem;
  }

  /* ===== NAV ===== */
  .nav-back {
    display: flex;
    justify-content: flex-end;
    margin-top: 1rem;
  }

  .nav-back a {
    background: rgb(226, 120, 58);
    color: white;
    padding: 0.6rem 1.2rem;
    border-radius: 100px;
    text-decoration: none;
  }

  /* ===== MOBILE / TABLETTE ===== */
  @media (max-width: 1024px) {
    .layout {
      flex-direction: row; /* IMPORTANT */
      height: calc(100vh - 5rem);
      overflow: hidden;
    }

    /* CATÉGORIES À GAUCHE */
    .categories-col {
      width: 120px;
      overflow-y: auto;
      border-right: 1px solid #ddd;
    }

    .categories-list {
      flex-direction: column;
      gap: 0.75rem;
    }

    .category-item p {
      font-size: 0.75rem;
    }

    /* PRODUITS AU CENTRE */
    .products-col {
      flex: 1;
      overflow-y: auto;
      padding: 0 0.5rem;
    }

    .grid {
      grid-template-columns: repeat(2, 1fr);
    }

    /* PANIER À DROITE */
    .cart-right {
      width: 220px;
      position: sticky;
      top: 0.5rem;
      max-height: calc(100vh - 6rem);
      overflow-y: auto;
      background: white;
      box-shadow: -2px 0 10px rgba(0,0,0,0.1);
    }

    .back-btn,
    .pay-btn {
      font-size: 0.85rem;
      padding: 0.5rem;
    }
  }
  /* ===== BARRE PANIER FLOTTANTE (MOBILE) ===== */
.cart-floating {
  display: none;
}

@media (max-width: 768px) {
  .cart-floating {
    display: block;
    position: fixed;
    bottom: 1rem;
    left: 50%;
    transform: translateX(-50%);
    width: 92%;
    z-index: 2000;
  }

  .cart-floating-content {
    background: rgb(4, 127, 24);
    color: white;
    padding: 0.75rem 1rem;
    border-radius: 999px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-weight: 700;
    box-shadow: 0 6px 20px rgba(0,0,0,0.25);
    cursor: pointer;
    transition: transform 0.15s ease;
  }

  .cart-floating-content:active {
    transform: scale(0.96);
  }

  .cart-count {
    background: rgba(255,255,255,0.2);
    padding: 0.35rem 0.75rem;
    border-radius: 999px;
  }

  .cart-total {
    font-size: 1rem;
  }

  /* Cache le panier latéral sur mobile */
  .cart-right {
    display: none;
  }
  /* ===== PANIER DÉROULANT MOBILE (SCROLLABLE) ===== */
  .mobile-cart-sheet {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 70vh; /* IMPORTANT */
    background: white;
    border-top-left-radius: 1.5rem;
    border-top-right-radius: 1.5rem;
    z-index: 3000;
    display: flex;
    flex-direction: column;
    box-shadow: 0 -6px 20px rgba(0,0,0,0.25);
  }

  /* Header fixe */
  .sheet-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    border-bottom: 1px solid #e5e7eb;
    font-weight: bold;
  }

  /* 🔥 ZONE QUI SCROLL 🔥 */
  .sheet-content {
    flex: 1;
    overflow-y: auto;
    padding: 1rem;
    -webkit-overflow-scrolling: touch;
  }

  /* Bouton fixé en bas */
  .mobile-pay {
    margin: 0.75rem auto 1rem;
    width: 90%;
  }

}

</style>
