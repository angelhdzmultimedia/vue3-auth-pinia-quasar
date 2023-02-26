<script setup>
import { ref } from 'vue'
import { useAuthStore } from '../stores/auth'
import { Notify } from 'quasar'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const username = ref('')
const name = ref('')

const auth = useAuthStore()
const router = useRouter()

async function register() {
  try {
    const response = await auth.register({
      email: email.value,
      password: password.value,
      name: name.value,
      username: username.value,
    })

    if (response.ok) {
      return router.push('/login')
    } else {
      Notify.create({
        message: await response.text(),
        type: 'negative',
      })
    }
  } catch (error) {
    Notify.create({
      message: error,
      type: 'negative',
    })
  }
}
</script>

<template>
  <div
    class="
      column
      q-pb-md
      items-center
      q-mt-lg q-gutter-sm
      full-width full-height
    "
  >
    <span class="text-h6"> Registro </span>
    <QForm @submit.prevent="register" class="column q-gutter-md">
      <QInput v-model="name" label="Nombre" dense></QInput>
      <QInput v-model="username" label="Nombre Usuario" dense></QInput>
      <QInput v-model="email" label="Correo Electrónico" dense></QInput>
      <QInput v-model="password" label="Contraseña" dense></QInput>
      <QBtn color="purple" type="submit">Registrarme</QBtn>
    </QForm>

    <div class="column q-gutter-sm items-center">
      <span>¿Tienes una cuenta?</span>
      <QBtn color="primary" to="/login">Iniciar Sesión</QBtn>
    </div>
  </div>
</template>

<style scoped></style>
