import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

// Vuetify
import Vuetify from '@/plugins/vuetify'
import 'vuetify/styles'

import { registerLayouts } from '@/plugins/globalRegisterComponent'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(Vuetify)

registerLayouts(app)

app.mount('#app')
