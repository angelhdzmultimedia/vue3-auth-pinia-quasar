import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import * as components from 'quasar'
const { Quasar, Notify, Dark } = components
import 'quasar/src/css/index.sass'
import '@quasar/extras/material-icons/material-icons.css'
import '@quasar/extras/roboto-font/roboto-font.css'
import '@quasar/extras/fontawesome-v6/fontawesome-v6.css'

const app = createApp(App)

app.use(Quasar, {
  components,
  plugins: {
    Dark,
    Notify,
  },
})
app.use(createPinia())
app.use(router)

app.mount('#app')
