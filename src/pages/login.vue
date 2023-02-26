<script setup>
import { ref, watch, onMounted } from 'vue'
import { useAuthStore } from '../stores/auth'
import { Notify } from 'quasar'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const guardarCredenciales = ref(false)

const auth = useAuthStore()
const router = useRouter()

onMounted(() => {
  const cookie = localStorage.getItem('credentials')
  const data = JSON.parse(cookie) ?? { saveCredentials: false }

  if (data.saveCredentials) {
    email.value = data.email
    password.value = data.password
    guardarCredenciales.value = data.saveCredentials
  }

  watch(guardarCredenciales, (newValue) => {
    if (newValue) {
      localStorage.setItem(
        'credentials',
        JSON.stringify({
          saveCredentials: true,
          email: email.value,
          password: password.value,
        })
      )
    } else {
      localStorage.setItem(
        'credentials',
        JSON.stringify({
          saveCredentials: false,
          email: undefined,
          password: undefined,
        })
      )
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
  <div class="column items-center q-mt-lg q-gutter-sm full-width full-height">
    <span class="text-h6"> Login </span>
    <QForm @submit.prevent="login" class="column q-gutter-md">
      <QInput v-model="email" label="Email" dense></QInput>
      <QInput v-model="password" label="Password" dense></QInput>
      <span
        >¿Guardar credenciales?
        <QToggle v-model="guardarCredenciales" color="primary"
      /></span>

      <QBtn color="primary" type="submit">Login</QBtn>
    </QForm>

    <div class="column q-gutter-sm items-center">
      <span>Don't have an account?</span>
      <QBtn color="purple" to="/register">Register</QBtn>
    </div>
  </div>
</template>

<style scoped></style>
