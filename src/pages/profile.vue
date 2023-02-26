<script setup>
import { useAuthStore } from '../stores/auth'

const auth = useAuthStore()
</script>

<template>
  <main class="column items-center justify-center full-width full-height">
    <span class="text-h6">Perfil</span>
    <div class="column">
      <span>Nombre: {{ auth.user?.name }}</span>
      <span>ID: {{ auth.user?.id }}</span>
      <span>Correo Electrónico: {{ auth.user?.email }}</span>
      <span
        >Contraseña (<span class="text-negative">¡Debe estar vacía!</span>):
        {{ auth.user?.password }}</span
      >
      <span>Nombre de Usuario: {{ auth.user?.username }}</span>
    </div>
  </main>
</template>
