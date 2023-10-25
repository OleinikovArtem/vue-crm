import './assets/main.css'

import { createApp } from 'vue'
import { provideApolloClient } from '@vue/apollo-composable'

import App from '@/App.vue'
import { router } from '@/router'
import { apolloClient } from '@/services/apollo'

const app = createApp(App)

provideApolloClient(apolloClient)

app.use(router)

app.mount('#app')
