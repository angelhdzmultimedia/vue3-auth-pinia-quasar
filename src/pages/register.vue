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
    <span class="text-h6"> Register </span>
    <QForm @submit.prevent="register" class="column q-gutter-md">
      <QInput v-model="name" label="Name" dense></QInput>
      <QInput v-model="username" label="Username" dense></QInput>
      <QInput v-model="email" label="Email" dense></QInput>
      <QInput v-model="password" label="Password" dense></QInput>
      <QBtn color="primary" type="submit">Register</QBtn>
    </QForm>

    <div class="column q-gutter-sm items-center">
      <span>Already registered?</span>
      <QBtn color="purple" to="/login">Login</QBtn>
    </div>
  </div>
</template>

<style scoped></style>
