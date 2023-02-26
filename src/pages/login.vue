<script setup>
import { ref, watch, onMounted } from 'vue'
import { useAuthStore } from '../stores/auth'
import { useStorageStore } from '../stores/storage'
import { Notify } from 'quasar'
import { useRouter } from 'vue-router'
import { isEmail, isRequired } from '../utils/form-validation'

const email = ref('')
const password = ref('')
const guardarCredenciales = ref(false)

// Pinia Stores
const auth = useAuthStore()
const storage = useStorageStore()

const router = useRouter()

onMounted(() => {
  const { get } = useStorageStore()
  const { data: credentials, set: setCredentials } = get('credentials')

  if (credentials.value.isSaved) {
    email.value = credentials.value.email
    password.value = credentials.value.password
    guardarCredenciales.value = credentials.value.isSaved
  }

  watch(guardarCredenciales, (newValue) => {
    if (newValue) {
      setCredentials({
        isSaved: true,
        email: email.value,
        password: password.value,
      })
    } else {
      setCredentials({
        isSaved: false,
        email: undefined,
        password: undefined,
      })
    }
  })
})

async function login() {
  try {
    const response = await auth.login({
      email: email.value,
      password: password.value,
    })
    return router.push('/')
  } catch (error) {
    Notify.create({
      message: error,
      type: 'negative',
    })
  }
}
</script>

<template>
  <main class="column items-center q-mt-lg q-gutter-sm full-width full-height">
    <span class="text-h6"> Inicio de Sesión </span>
    <QForm @submit.prevent="login" class="column q-gutter-md">
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
        :rules="[, isRequired('Contraseña requerida.')]"
        v-model="password"
        label="Contraseña"
        dense
      ></QInput>
      <span
        >Recuérdame <QToggle v-model="guardarCredenciales" color="primary"
      /></span>

      <QBtn color="primary" type="submit">Iniciar Sesión</QBtn>
    </QForm>

    <div class="column q-gutter-sm items-center">
      <span>¿No tienes una cuenta?</span>
      <QBtn color="purple" to="/register">Registrarme</QBtn>
    </div>
  </main>
</template>

<style scoped></style>
