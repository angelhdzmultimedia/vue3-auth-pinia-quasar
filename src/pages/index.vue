<script setup>
import { useAuthStore } from '../stores/auth'
const auth = useAuthStore()
</script>

<template>
  <main class="column items-center justify-center full-width full-height">
    <span class="text-h6"
      >¡Te damos la bienvenida,
      {{ auth.isAuth ? auth.user?.name : 'guest' }}!</span
    >
  </main>
</template>
