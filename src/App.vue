<script setup>
import { onMounted } from 'vue'
import { RouterView } from 'vue-router'
import { useAuthStore } from './stores/auth'
import { Dark } from 'quasar'
import { useStorageStore } from './stores/storage'

const auth = useAuthStore()
const storage = useStorageStore()

onMounted(() => {
  const { data: dark } = storage.get('darkMode')
  Dark.set(dark.value)
})
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
