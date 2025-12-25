<template>
  <div class="splash-screen" @click="goToHome">
    <video autoplay muted loop playsinline class="splash-video">
      <source src="/videos/plat.mp4" type="video/mp4" />
      Votre navigateur ne supporte pas la lecture vidéo.
    </video>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
function goToHome() { router.push('/home') }
</script>

<style scoped>
.splash-screen {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url('/public/images/fond.jpg');
  background-size: cover;
  background-position: center;
  cursor: pointer;
  overflow: hidden;
}

.splash-video {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 1rem;
  box-shadow: 0 4px 15px rgba(0,0,0,0.3);
}

@media (max-width: 768px) {
  .splash-video { border-radius: 0.5rem; object-position: center top; }
}

@media (max-width: 480px) {
  .splash-video { object-position: top; }
}
</style>
