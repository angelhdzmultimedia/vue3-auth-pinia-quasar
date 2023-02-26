<script setup>
import { ref } from 'vue'
import { useAuthStore } from '../stores/auth'
import { Notify } from 'quasar'
import { useRouter } from 'vue-router'
import { isEmail, isRequired, isLength } from '../utils/form-validation'

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
      <QInput
        lazy-rules
        :rules="[isRequired('Nombre requerido.')]"
        v-model="name"
        label="Nombre"
        dense
      ></QInput>
      <QInput
        lazy-rules
        :rules="[isRequired('Nombre de Usuario requerido.')]"
        v-model="username"
        label="Nombre Usuario"
        dense
      ></QInput>
      <QInput
        lazy-rules
        :rules="[
          isEmail('Correo electrónico no válido.'),
          isRequired('Email requerido.'),
        ]"
        v-model="email"
        label="Correo Electrónico"
        dense
      ></QInput>
      <QInput
        lazy-rules
        :rules="[
          isRequired('Contraseña Requerida.'),
          isLength(6, 16, 'La contraseña debe ser de 6 a 16 caracteres.'),
        ]"
        v-model="password"
        label="Contraseña"
        min="6"
        max="16"
        counter
        dense
      ></QInput>
      <QBtn color="purple" type="submit">Registrarme</QBtn>
    </QForm>

    <div class="column q-gutter-sm items-center">
      <span>¿Tienes una cuenta?</span>
      <QBtn color="primary" to="/login">Iniciar Sesión</QBtn>
    </div>
  </div>
</template>

<style scoped></style>
