import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

// Vuetify
import Vuetify from '@/plugins/vuetify'
import 'vuetify/styles'

import { registerLayouts } from '@/plugins/globalRegisterComponent'
import { authentication } from '@/plugins/authentication'

const app = createApp(App)

app.use(createPinia())
app.use(Vuetify)

registerLayouts(app)

authentication.install().then(() => {
  app.use(router)
  app.mount('#app')
})
