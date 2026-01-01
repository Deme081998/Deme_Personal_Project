<template>
  <div class="home">
    <h1>Bienvenue chez Sene'Eat</h1>

    <div class="actions">
      <button class="btn primary" @click="allerCommander">
  Je commande
</button>


      <button class="btn secondary" @click="afficherPopup = true">
        Abandonner
      </button>
    </div>


    <!-- Popup -->
    <div v-if="afficherPopup" class="overlay">
      <div class="popup">
        <h2>Abandonner la commande ?</h2>
        <p>Êtes-vous sûr de vouloir quitter et annuler votre commande ?</p>

        <div class="popup-buttons">
          <button class="btn danger" @click="quitterCommande">Oui</button>
          <button class="btn success" @click="afficherPopup = false">Non</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useCartStore } from '@/stores/cart'

export default {
  name: 'HomeView',
  data() {
    return {
      afficherPopup: false
    }
  },
  setup() {
    const cartStore = useCartStore()
    return { cartStore }
  },
  methods: {
    allerCommander() {
    this.$router.push('/food')
  },
    quitterCommande() {
      this.cartStore.clearCart()
      this.afficherPopup = false
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>
/* === Layout général === */
.home {
  min-height: 98.4vh;
  background-color: rgb(237, 97, 27);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1.5rem;
  text-align: center;
  box-sizing: border-box;
}

h1 {
  font-size: 2rem;
  margin-bottom: 2rem;
  color: white;
}

/* === Boutons === */
.actions {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 100%;
  max-width: 350px;
}

.btn {
  display: block;
  padding: 1.2rem;
  font-size: 1.3rem;
  border-radius: 50px;
  border: none;
  cursor: pointer;
  text-decoration: none;
  font-weight: bold;
}

/* Variantes */
.primary {
  background: white;
  color: black;
}

.secondary {
  background: #f5f5f5;
  color: black;
}

.danger {
  background: red;
  color: white;
}

.success {
  background: green;
  color: white;
}

/* === Texte aide === */

/* === Popup === */
.overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.popup {
  background: white;
  padding: 5rem;
  border-radius: 20px;
  width: 90%;
  max-width: 400px;
}

.popup-buttons {
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
}

.popup-buttons .btn {
  flex: 1;
  font-size: 1.1rem;
}
</style>
