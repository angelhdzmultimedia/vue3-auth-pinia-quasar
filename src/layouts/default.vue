<script setup lang="ts">
import { onMounted } from 'vue'
import { RouterView, useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import { Dark } from 'quasar'
import { useStorageStore } from '../stores/storage'

const router = useRouter()
const auth = useAuthStore()
const storage = useStorageStore()

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
                  auth.isAuth ? auth.user?.name : 'Guest'
                }}</QItemSection>
              </QItem>
              <QItem v-if="!auth.isAuth" clickable>
                <QBtn color="primary" to="/login">Login</QBtn>
              </QItem>
              <QItem v-if="auth.isAuth" clickable>
                <QBtn @click="logout" color="primary">Logout</QBtn>
              </QItem>
            </QList>
          </QMenu>
        </QAvatar>
      </QToolbar>
    </QHeader>

    <QPageContainer class="window-width window-height">
      <QPage class="column full-width full-height">
        <RouterView :key="$route.path" />
      </QPage>
    </QPageContainer>
  </QLayout>
</template>

<style scoped></style>
