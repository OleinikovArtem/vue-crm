import './assets/main.css'

import { createApp } from 'vue'
import { provideApolloClient } from '@vue/apollo-composable'
import Notifications from '@kyvg/vue3-notification'

import App from '@/App.vue'
import { router } from '@/router'
import { apolloClient } from '@/services/apollo'

const app = createApp(App)

provideApolloClient(apolloClient)

app.use(router)
app.use(Notifications)

app.mount('#app')
