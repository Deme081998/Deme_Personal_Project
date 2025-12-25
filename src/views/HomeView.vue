<template>
  <div class="home w-80 h-60">
    <h1>Bienvenue sur la borne de commande</h1>
    <nav>
      <router-link 
        to="/food" 
        style="border-radius: 100px; color: black; background-color: white; padding: 8px 20px; margin-left: 10rem; font-size : 1.5rem"
      >
        <strong>Je commande</strong>
      </router-link>

      <button 
        @click="afficherPopup = true"
        style="border-radius: 100px; color: black; background-color: white; padding: 8px 20px; margin-left: 10rem; font-size : 1.5rem; border: none; cursor: pointer;"
      >
        <strong>Abandonner</strong>
      </button>
    </nav>

    <p>Utilisez la navigation ci-dessus 👆🏾 pour commencer votre commande.</p>

    <!-- Popup de confirmation -->
    <div v-if="afficherPopup" class="overlay">
      <div class="popup">
        <h2>Abandonner la commande ?</h2>
        <p>Êtes-vous sûr de vouloir quitter et annuler votre commande ?</p>
        <div class="popup-buttons">
          <button class="btn-oui" @click="quitterCommande">Oui</button>
          <button class="btn-non" @click="afficherPopup = false">Non</button>
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
    quitterCommande() {
      this.cartStore.clearCart()
      this.afficherPopup = false;
      this.$router.push('/');
    }
  }
}
</script>

<style scoped>
.home {
  padding: 20px;
  font-family: Arial, sans-serif;
  background-color: rgb(237, 97, 27);
  height: 57.5rem;
  position: relative;
}

nav a {
  margin: 0 10px;
  text-decoration: none;
}
nav a.router-link-exact-active {
  font-weight: bold;
  text-decoration: underline;
}

/* Style du fond flou lors de la popup */
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

/* Style de la popup */
.popup {
  background: white;
  padding: 2rem;
  border-radius: 20px;
  text-align: center;
  max-width: 400px;
  width: 90%;
  box-shadow: 0 4px 15px rgba(0,0,0,0.3);
}

.popup h2 {
  font-size: 1.8rem;
  margin-bottom: 1rem;
}

.popup p {
  font-size: 1.2rem;
  margin-bottom: 2rem;
}

/* Boutons larges pour écran tactile */
.popup-buttons {
  display: flex;
  justify-content: space-around;
}

.btn-oui {
  background: red;
  color: white;
  font-size: 1.2rem;
  padding: 1rem 2rem;
  border: none;
  border-radius: 15px;
  cursor: pointer;
}

.btn-non {
  background: green;
  color: white;
  font-size: 1.2rem;
  padding: 1rem 2rem;
  border: none;
  border-radius: 15px;
  cursor: pointer;
}

.btn-oui:hover {
  background: darkred;
}

.btn-non:hover {
  background: darkgreen;
}
</style>
