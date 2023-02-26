<script setup>
import { RouterView } from 'vue-router'
import { Dark } from 'quasar'
import { useAuthStore } from './stores/auth'

const auth = useAuthStore()

Dark.set(true)
</script>

<template>
  <main
    v-if="auth.isLoading"
    class="column items-center justify-center window-width window-height"
  >
    <span class="text-primary text-h6">Cargando...</span>
    <QSpinner color="primary" size="3em" />
  </main>
  <RouterView v-else :key="$route.path" />
</template>

<style scoped></style>
