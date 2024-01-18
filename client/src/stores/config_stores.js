import { createPinia } from 'pinia'
import { createPersistedState } from 'pinia-plugin-persistedstate'

export const pinia = createPinia()

/*TODO: use for production
pinia.use(createPersistedState({
    auto: true,
    storage: localStorage
  }))*/