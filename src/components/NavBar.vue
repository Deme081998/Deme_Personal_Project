<template>
  <nav class="navbar">
    <router-link to="/">Accueil</router-link>
    <router-link to="/food">Nourriture</router-link>
    <router-link to="/cart">Panier</router-link>
  </nav>
</template>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-around;
  padding: 1rem;
  background: #eee;
  font-size: 1.2rem;
}
.router-link-active {
  font-weight: bold;
}
</style>
