<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { RouterView, useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import { Dark } from 'quasar'
import { useStorageStore } from '../stores/storage'

const simularConexionLenta = ref(false)

const router = useRouter()
const auth = useAuthStore()
const storage = useStorageStore()

watch(simularConexionLenta, (newValue) => {
  auth.timeout = newValue ? 2000 : 0
  const { _, set: setSlowMode } = storage.get('slowMode')
  setSlowMode(newValue)
})

onMounted(() => {
  const { data: slowMode } = storage.get('slowMode')
  simularConexionLenta.value = slowMode.value ?? false
})

async function logout() {
  await auth.logout()
  return router.push('/login')
}

async function toggleDark() {
  Dark.toggle()
  const { _, set: setDark } = storage.get('darkMode')
  setDark(Dark.isActive)
}
</script>

<template>
  <QLayout view="hHh lpR fFf">
    <QHeader>
      <QToolbar>
        <QBtn icon="home" to="/"></QBtn>
        <QToolbarTitle>App</QToolbarTitle>
        <QBtn
          @click="toggleDark"
          :icon="!Dark.isActive ? 'light_mode' : 'dark_mode'"
        ></QBtn>
        <QAvatar class="cursor-pointer" color="white">
          <QMenu auto-close>
            <QList>
              <QItem to="/profile" clickable>
                <QItemSection>{{
                  auth.isAuth ? auth.user?.name : 'Invitado/a'
                }}</QItemSection>
              </QItem>
              <QItem v-if="!auth.isAuth" clickable>
                <QBtn color="primary" to="/login">Iniciar Sesión</QBtn>
              </QItem>
              <QItem v-if="!auth.isAuth" clickable>
                <QBtn color="purple" to="/register">Regístrate</QBtn>
              </QItem>
              <QItem v-if="auth.isAuth" clickable>
                <QBtn @click="logout" color="primary">Salir</QBtn>
              </QItem>
            </QList>
          </QMenu>
        </QAvatar>
      </QToolbar>
    </QHeader>
    <QFooter
      class="q-pa-sm"
      :class="Dark.isActive ? 'bg-dark text-white' : 'bg-grey-2 text-black'"
    >
      <QToolBar>
        <span>Simular Conexión lenta</span>
        <QToggle v-model="simularConexionLenta" />
      </QToolBar>
    </QFooter>
    <QPageContainer class="window-width window-height">
      <QPage class="column full-width full-height">
        <RouterView :key="$route.path" />
      </QPage>
    </QPageContainer>
  </QLayout>
</template>

<style scoped></style>
