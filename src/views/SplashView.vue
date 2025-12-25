<template>
  <div
    class="w-screen h-screen flex items-center justify-center bg-cover bg-center relative cursor-pointer"
    style="background-image: url('/images/fond.jpg')"
    @click="goToHome"
  >
  <video
      autoplay
      muted
      loop
      playsinline
      class="w-full h-full object-cover rounded-xl shadow-lg" style = "position : relative"
    >
      <source src="/videos/plat.mp4" type="video/mp4" />
      Votre navigateur ne supporte pas la lecture vidéo.
    </video>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()

function goToHome() {
  router.push('/home')
}
</script>
