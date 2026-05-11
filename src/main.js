import { createApp } from 'vue'
import { createPinia } from 'pinia' // Import Pinia
import router from './router'       // Import Router
import './style.css'
import App from './App.vue'

const app = createApp(App)

app.use(createPinia()) // Gunakan Pinia
app.use(router)        // Gunakan Router
app.mount('#app')