// src/views/Home/HomeLogic.ts
import { useRouter } from 'vue-router'
import { useAuthStore } from '../../store/auth'
import { useProductCrud } from '../ProductCrud/useProductCrud'
import { ref } from 'vue'

export function useHomeLogic() {
  const router = useRouter()
  const authStore = useAuthStore()

  const { products } = useProductCrud()
  function handleLogout(): void {
    authStore.logout()
    router.push({ name: 'Login' })
  }

  return { handleLogout,products }
}
