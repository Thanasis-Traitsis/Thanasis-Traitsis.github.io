import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './index.css'
import { validateEnv } from './config/env'

// Validate environment variables before app initialization
try {
  validateEnv()
} catch (error) {
  console.error('Environment validation failed:', error.message)
  document.body.innerHTML = `
    <div style="padding: 2rem; font-family: sans-serif;">
      <h1>Configuration Error</h1>
      <p>${error.message}</p>
    </div>
  `
  throw error
}

const app = createApp(App)
app.use(router)
app.mount('#app')
