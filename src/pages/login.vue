<script setup>
import { ref } from 'vue'
import { useAuthStore } from '../stores/auth'
import { Notify } from 'quasar'
import { useRouter } from 'vue-router'

const email = ref('angelhdz@gmail.com')
const password = ref('123456')

const auth = useAuthStore()
const router = useRouter()

async function login() {
  try {
    await auth.login({
      email: email.value,
      password: password.value,
    })
    return router.push('/')
  } catch (error) {
    const nuxtError = error
    Notify.create({
      message: nuxtError.message,
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
      <QBtn color="primary" type="submit">Login</QBtn>
    </QForm>

    <div class="column q-gutter-sm items-center">
      <span>Don't have an account?</span>
      <QBtn color="purple" to="/register">Register</QBtn>
    </div>
  </div>
</template>

<style scoped></style>
