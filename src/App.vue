<script setup>
import { RouterView } from 'vue-router'
import { Dark } from 'quasar'

Dark.set(true)
</script>

<template>
  <RouterView :key="$route.path" />
</template>

<style scoped></style>
